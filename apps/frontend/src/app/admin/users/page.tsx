import { PrismaClient } from "database";
import UserClient from "./UserClient";

async function getUsers() {
  const prisma = new PrismaClient();

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
