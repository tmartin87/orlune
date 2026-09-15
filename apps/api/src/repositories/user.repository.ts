import { prisma } from "../db/prisma.js";

type CreateUserData = {
  name: string;
  email: string;
  passwordHash: string;
};

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(data: CreateUserData) {
  return prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}