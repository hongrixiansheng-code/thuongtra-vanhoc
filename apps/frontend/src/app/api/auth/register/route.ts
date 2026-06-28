import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";
import { PrismaClient } from "database";
import bcrypt from "bcryptjs";
import path from "path";


export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Thiếu thông tin đăng ký" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ message: "Email đã được sử dụng" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "USER"
      }
    });

    return NextResponse.json({ message: "Đăng ký thành công", userId: user.id }, { status: 201 });

  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    return NextResponse.json({ message: "Đã xảy ra lỗi hệ thống" }, { status: 500 });
  }
}
