import { prisma } from "@/tools/prisma"
import { NextRequest, NextResponse } from "next/server"

export const GET = async () => {
    const getObj = await prisma.mB.findMany()
    return NextResponse.json(getObj)
}

export const POST = async (request : NextRequest) => {
    const body = await request.json()
    
    const postObj = await prisma.mB.create({
        data: {
            brand : body.brand
        }
    })
    return NextResponse.json(postObj)
}