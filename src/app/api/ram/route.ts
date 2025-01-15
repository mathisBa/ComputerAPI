import { prisma } from "@/tools/prisma"
import { NextRequest, NextResponse } from "next/server"

export const GET = (request : NextRequest) => {
    return NextResponse.json({
        message: "Bonjour toto"
    })
}

export const POST = async (request : NextRequest) => {
    const body = await request.json()
    
    const postObj = await prisma.post.create({
        data: {
            title : body.title,
            content : body.content,
        }

    })
    return NextResponse.json(postObj)
}