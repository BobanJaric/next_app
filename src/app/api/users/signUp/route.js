"use server";

import { NextResponse } from "next/server"; // if using Next.js
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const userFound = await User.findOne({ email: body.email });

    console.log(userFound+" here");
    if (userFound) {
      return NextResponse.json({ error: 'Email already exists!' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    console.log(hashedPassword);
    const user = new User({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });

    console.log("user");
    console.log(user);
    const savedUser = await user.save();

    return NextResponse.json(savedUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

