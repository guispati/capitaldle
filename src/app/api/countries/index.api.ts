import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET")
        return res.status(405).json({ message: "Not allowed" });

    const countries = await prisma.country.findMany();

    return res.json({ countries });
};