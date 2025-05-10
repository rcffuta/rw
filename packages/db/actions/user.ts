import { prisma } from "../client";

export async function createUser(data: {
  email: string;
  password: string;
  name: string;
}) {
    // TODO: Hash password
  return await prisma.user.create({ data });
}

export async function getUserById(id: number) {
  return await prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function getAllUsers() {
  return await prisma.user.findMany();
}

export async function updateUser(id: number, data: Partial<{ email: string; password: string; name: string; }>) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}

export async function deleteUser(id: number) {
  return await prisma.user.delete({ where: { id } });
}
