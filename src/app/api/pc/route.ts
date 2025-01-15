import { prisma } from "@/tools/prisma"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
    try {
      const allPCs = await prisma.pC.findMany(
        {include:{
            mb:true,
            ram:true
        }}
      );
  
      return NextResponse.json(allPCs, { status: 200 });
    } catch (error: any) {
      console.error("Erreur lors de la récupération des PCs :", error);
      return NextResponse.json(
        {
          error: "Impossible de récupérer les PCs.",
          details: error.message || "Erreur inconnue",
        },
        { status: 500 }
      );
    }
  };

export const POST = async (request: NextRequest) => {
    try {
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
    } catch (error) {
        console.error("Erreur lors de la création du PC :", error);
        return NextResponse.json(
            { error: "Impossible de créer le PC.", details: error},
            { status: 500 }
        );
    }
};
