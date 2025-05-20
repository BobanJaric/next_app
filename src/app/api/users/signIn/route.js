"use server";

import { NextResponse } from "next/server"; // if using Next.js
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { email, password } = body;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate session (e.g., JWT or cookie) — simplified version below
    // ✅ Create JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // ✅ Set token as HTTP-only cookie
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: { email: user.email, name: user.name },
      },
      { status: 200 }
    );

    // In production, use secure session handling
    console.log("Login successful");
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60, // 1 hour
    });

    return response;
  
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
