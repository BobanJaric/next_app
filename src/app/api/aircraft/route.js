"use server";

import { NextResponse } from "next/server"; // if using Next.js
import dbConnect from "@/lib/mongodb";
import Aircraft from "@/models/Aircraft";


export async function GET(request) {
  try {
    await dbConnect();

    const aircraft = await Aircraft.find({});

    if (!aircraft) {
      return NextResponse.json(
        { error: "No crew in Data Base" },
        { status: 400 }
      );
    }

    return NextResponse.json(aircraft, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
