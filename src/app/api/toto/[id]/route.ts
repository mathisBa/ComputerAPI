import { prisma } from "@/tools/prisma";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request : NextRequest, {params : {id}}: {params : {id:string}}) => {
    const posts = await prisma.post.findUnique({
        where : {
            id : parseInt(id)
        },
        include: {
            author:true
        }
    })
    return NextResponse.json(posts)
}

