import { prisma } from "@/tools/prisma";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request : NextRequest, {params : {id}}: {params : {id:string}}) => {
    const posts = await prisma.pC.findUnique({
        where : {
            id : parseInt(id)
        },
        include:{
            ram:true,
            mb:true
        }
    })
    return NextResponse.json(posts)
}

export const DELETE = async (request: NextRequest, { params: { id } }: { params: { id: string } }) => {
    try {
        const deletedPost = await prisma.pC.delete({
            where: {
                id: parseInt(id),
            },
        });

        return NextResponse.json({ message: "Élément supprimé avec succès", deletedPost }, { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        return NextResponse.json({ error: "Erreur lors de la suppression de l'élément" }, { status: 500 });
    }
};

export const PUT = async (
    request: NextRequest,
    { params: { id } }: { params: { id: string } }
  ) => {
    try {
      const body = await request.json();
      const { mb, ramIds } = body;
  
      // Validation des données reçues
      if (!mb || !Array.isArray(ramIds)) {
        return NextResponse.json(
          { error: "mb et ramIds sont requis et ramIds doit être un tableau." },
          { status: 400 }
        );
      }
  
      const updatedPC = await prisma.pC.update({
        where: { id: parseInt(id) },
        data: {
          mb: { connect: { id: mb } },
          ram: {
            connect: body.ramIds.map((id: number) => { return { id }; }) },
        },
        include: {
          mb: true,
          ram: true
        },
      });
  
      return NextResponse.json(updatedPC, { status: 200 });
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour du PC :", error);
      return NextResponse.json(
        {
          error: "Impossible de mettre à jour le PC.",
          details: error.message || "Erreur inconnue",
        },
        { status: 500 }
      );
    }
  };