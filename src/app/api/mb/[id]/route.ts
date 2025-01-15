import { prisma } from "@/tools/prisma";
import { NextRequest, NextResponse } from "next/server"

type Params = {
    params: Promise<{id: string}>
  }

export const GET = async (_ : NextRequest, { params }: Params) => {
    const {id} = await params
    const posts = await prisma.mB.findUnique({
        where : {
            id : parseInt(id)
        }
    })
    return NextResponse.json(posts)
}

export const PUT = async (request : NextRequest, { params }: Params) => {
    const {id} = await params
    try {
        const body = await request.json();
        const updatedPost = await prisma.mB.update({
            where: {
                id: parseInt(id),
            },
            data: body,
        });
        return NextResponse.json(updatedPost, { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        return NextResponse.json({ error: "Erreur lors de la mise à jour de l'élément" }, { status: 500 });
    }
};

export const DELETE = async (_ : NextRequest, { params }: Params) => {
    const {id} = await params
    try {
        const deletedPost = await prisma.mB.delete({
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
