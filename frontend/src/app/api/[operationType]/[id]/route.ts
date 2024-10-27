import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth/next";

export async function PATCH(req: Request, { params }: { params: { id: string; operation: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { label, amount, category } = body;
    const id = parseInt(params.id, 10);

    let updatedItem;

    if (params.operation === "incomes") {
      updatedItem = await prisma.income.update({
        where: { id },
        data: { label, amount, category },
      });
    } else if (params.operation === "expenses") {
      updatedItem = await prisma.expense.update({
        where: { id },
        data: { label, amount, category },
      });
    } else {
      return NextResponse.json({ message: "Invalid operation type" }, { status: 400 });
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: `Error updating ${params.operation}` }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string; operation: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
  }

  try {
    const id = parseInt(params.id, 10);

    let deletedItem;

    if (params.operation === "incomes") {
      deletedItem = await prisma.income.delete({
        where: { id },
      });
    } else if (params.operation === "expenses") {
      deletedItem = await prisma.expense.delete({
        where: { id },
      });
    } else {
      return NextResponse.json({ message: "Invalid operation type" }, { status: 400 });
    }

    return NextResponse.json(deletedItem);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: `Error deleting ${params.operation}` }, { status: 500 });
  }
}
