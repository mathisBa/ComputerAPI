import { prisma } from "@/tools/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = () => {
    return NextResponse.json({
        message: "Bonjour"
    })
}

export const POST = async (request : NextRequest) => {
    const body = await request.json()
    const newUser = await prisma.user.create({
        data: {
            email: `${body.titi}@mail.org`,
            name: body.titi
        }
    })
    return NextResponse.json({
        message: `Hello world ${newUser.id}`
    })
}