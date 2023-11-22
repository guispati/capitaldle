import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const countries = await prisma.country.findMany();

    let json_response = {
        countries,
    };

    return new NextResponse(JSON.stringify(json_response));
};