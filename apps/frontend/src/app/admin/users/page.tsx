import prisma from '@/lib/prisma';
import { PrismaClient } from "database";
import UserClient from "./UserClient";

async function getUsers() {


  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export default async function AdminUsers() {
  const users = await getUsers();

  return (
    <div className="animate-fade-in">
      <UserClient users={users} />
    </div>
  );
}
