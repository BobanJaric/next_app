"use server";

import { NextResponse } from "next/server"; // if using Next.js
import dbConnect from "@/lib/mongodb";
import Airport from "@/models/Airport";

export async function GET(request, context) {
  const { id } = await context.params;
  const id1 = id.split("-")[0];
  const id2 = id.split("-")[1];

 

  try {
    await dbConnect();

    const airport1 = await Airport.find({ icao: id1 }).lean();
    const airport2 = await Airport.find({ icao: id2 }).lean();

    if (!airport1) {
      return NextResponse.json(
        { error: "No Airport in Data Base" },
        { status: 400 }
      );
    }

    return NextResponse.json([...airport1,...airport2], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
