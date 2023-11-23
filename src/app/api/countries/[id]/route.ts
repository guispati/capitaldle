import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    const country = await prisma.country.findUnique({
        where: {
            id,
        },
    });

    let json_response = {
        country,
    };

    return new NextResponse(JSON.stringify(json_response));
};