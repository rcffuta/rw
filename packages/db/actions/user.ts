import { prisma } from "../client";
import bcrypt from "bcryptjs";

export async function createUser(data: any) {
    const existingEmail = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingEmail) {
      throw new Error("Email is already in use");
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username: data.username },
    });

    if (existingUsername) {
      throw new Error("Username is already taken");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        isAdmin: data.isAdmin ?? false,
        username: data.username,
        phoneNumber: data.phoneNumber,
      },
    });
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

export async function isAdminUser(id: number) {
  const user = await prisma.user.findUnique({ where: { id } });
  return user?.isAdmin ?? false;
}

export async function getAdmins() {
  return await prisma.user.findMany({
    where: { isAdmin: true },
  });
}

export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
}