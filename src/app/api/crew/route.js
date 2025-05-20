"use server";

import { NextResponse } from "next/server"; // if using Next.js
import dbConnect from "@/lib/mongodb";
import Crew from "@/models/Crew";

export async function GET(request) {
  try {
    await dbConnect();

    const crew = await Crew.find({});

    if (!crew) {
      return NextResponse.json(
        { error: "No crew in Data Base" },
        { status: 400 }
      );
    }

    return NextResponse.json(crew, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
