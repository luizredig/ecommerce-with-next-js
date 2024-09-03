import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: any, { params }: { params: { slug: string } }) {
  const { slug } = params;

  const product = await prismaClient.product.findFirst({
    where: {
      slug,
    },
  });

  return NextResponse.json({ status: 200, data: product });
}
