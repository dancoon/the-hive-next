import { ServiceSchema } from "@/app/lib/schema/pricing";
import prisma from "@/prisma/client";
import { existsSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { MEDIA_ROOT } from "@/app/lib/constants";
import { upload } from "@/app/lib/serverutils";
import slugify from "slugify";

export const GET = async (request: NextRequest) => {
  const services = await prisma.service.findMany();
  return NextResponse.json({ results: services });
};

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const body = Array.from(formData.entries()).reduce((prev, curr) => {
      const [key, value] = curr;
      if (key === "image") {
        return prev;
      }
      return { ...prev, [key]: value };
    }, {});
    console.log(body);
    const uploader = await upload({ uploadTo: "/upload/services/", formData });
    const image = await uploader.single("image");

    const data = { image, ...body };
    const validation = await ServiceSchema.safeParseAsync(data);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }
    const service = await prisma.service.create({
      data: {
        slug: slugify(validation.data.title, { lower: true, trim: true }),
        ...validation.data,
      },
    });
    return NextResponse.json({ service });
  } catch (error: any) {
    return NextResponse.json({ detail: error.message }, { status: 500 });
  }
};
