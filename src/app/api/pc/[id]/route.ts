import { prisma } from "@/tools/prisma";
import { NextRequest, NextResponse } from "next/server"

type Params = {
  params: Promise<{id: string}>
}

export const GET = async (_ : NextRequest, { params }: Params) => {
  const {id} = await params
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

export const DELETE = async (_: NextRequest, { params }: Params) => {
  const {id} = await params
      const deletedPost = await prisma.pC.delete({
          where: {
              id: parseInt(id),
          },
      });

      return NextResponse.json({ message: "Élément supprimé avec succès", deletedPost }, { status: 200 });
};

export const PUT = async (
    request: NextRequest,
    { params }: Params
  ) => {
    const {id} = await params

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
            set: body.ramIds.map((id: number) => { return { id }; }) },
        },
        include: {
          mb: true,
          ram: true
        },
      });
  
      return NextResponse.json(updatedPC, { status: 200 });
  };