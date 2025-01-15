import { prisma } from "@/tools/prisma";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request : NextRequest, {params : {id}}: {params : {id:string}}) => {
    const posts = await prisma.rAM.findUnique({
        where : {
            id : parseInt(id)
        }
    })
    return NextResponse.json(posts)
}

export const PUT = async (request: NextRequest, { params: { id } }: { params: { id: string } }) => {
    try {
        const body = await request.json();
        const updatedPost = await prisma.rAM.update({
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

export const DELETE = async (request: NextRequest, { params: { id } }: { params: { id: string } }) => {
    try {
        const deletedPost = await prisma.rAM.delete({
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
