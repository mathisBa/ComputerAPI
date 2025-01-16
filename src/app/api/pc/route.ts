import { prisma } from "@/tools/prisma"
import { NextRequest, NextResponse } from "next/server"
import { authMiddleware } from "@/tools/authMiddleware"

export const GET = async (request: NextRequest) => {
    const authResponse = await authMiddleware(request);
    if (authResponse.status === 401) {
      return authResponse;
    }
      const allPCs = await prisma.pC.findMany(
        {include:{
            mb:true,
            ram:true
        }}
      );
  
      return NextResponse.json(allPCs, { status: 200 });
    
  };

export const POST = async (request: NextRequest) => {
        const body = await request.json();

        // Validation des données
        if (!body.mb || !Array.isArray(body.ramIds)) {
            return NextResponse.json(
                { error: "mb et ramIds sont requis et ramIds doit être un tableau." },
                { status: 400 }
            );
        }

        const newPC = await prisma.pC.create({
            data: {
                mb: {connect : {id : body.mb}},
                ram: { connect: body.ramIds.map((id: number) => { return { id }; }) },
            }
        });

        return NextResponse.json(newPC, { status: 201 });
    
};
