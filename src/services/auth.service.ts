import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { IGlobalResponse } from "../interfaces/global.interface";
import {
  IGetAllResponse,
  ILoginResponse,
  IUpdateResponse,
} from "../interfaces/auth.interface";
import { UGenerateToken } from "../utils/jwt.utils";

const prisma = new PrismaClient();

export const SLogin = async (
  usernameOrEmail: string,
  password: string
): Promise<IGlobalResponse<ILoginResponse>> => {
  const admin = await prisma.admin.findFirst({
    where: {
      OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      isActive: true,
      deleteAt: null,
    },
  });

  if (!admin) {
    throw Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    throw Error("Invalid credentials");
  }

  const token = UGenerateToken({
    id: admin.id,
    username: admin.username,
    email: admin.email,
    name: admin.name,
  });

  return {
    status: true,
    message: "Login success",
    data: {
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        name: admin.name,
      },
    },
  };
};

export const SRegister = async (
  username: string,
  password: string,
  email: string,
  name: string
): Promise<IGlobalResponse<ILoginResponse>> => {
  const existingUser = await prisma.admin.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (existingUser) {
    throw new Error("Username atau email sudah digunakan");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.create({
    data: {
      username,
      password: hashedPassword,
      email,
      name,
      isActive: true,
      createAt: new Date(),
      updateAt: new Date(),
    },
  });

  const token = UGenerateToken({
    id: admin.id,
    username: admin.username,
    email: admin.email,
    name: admin.name,
  });

  return {
    status: true,
    message: "Register success",
    data: {
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        name: admin.name,
      },
    },
  };
};

export const SUpdate = async (
  id: number,
  username: string,
  password: string,
  email: string,
  name: string
): Promise<IGlobalResponse<IUpdateResponse>> => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.update({
    where: {
      id,
    },
    data: {
      username,
      password: hashedPassword,
      email,
      name,
      updateAt: new Date(),
    },
  });

  return {
    status: true,
    message: "Update success",
    data: {
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        name: admin.name,
      },
    },
  };
};

export const SDelete = async (
  id: number
): Promise<IGlobalResponse<IUpdateResponse>> => {
  const admin = await prisma.admin.delete({
    where: {
      id,
    },
  });

  if (!admin) {
    throw new Error("Admin not Found");
  }

  return {
    status: true,
    message: "Delete success",
  };
};

export const SSoftDelete = async (
  id: number
): Promise<IGlobalResponse<IUpdateResponse>> => {
  const admin = await prisma.admin.update({
    where: {
      id,
    },
    data: {
      isActive: false,
      deleteAt: new Date(),
    },
  });

  if (!admin) {
    throw new Error("Admin not Found");
  }

  return {
    status: true,
    message: "Delete success",
    data: {
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        name: admin.name,
      },
    },
  };
};

// Untuk Admin
export const SGetAll = async (): Promise<
  IGlobalResponse<IGetAllResponse[]>
> => {
  const admin = await prisma.admin.findMany({
    where: {
      isActive: true,
      deleteAt: null,
    },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
    },
  });

  return {
    status: true,
    message: "Get all success",
    data: admin,
  };
};

export const SGetAdmin = async (
  id: number
): Promise<IGlobalResponse<IGetAllResponse>> => {
  const admin = await prisma.admin.findFirst({
    where: {
      isActive: true,
      deleteAt: null,
      id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
    },
  });

  if (!admin) {
    throw new Error("Data Admin not found");
  }

  return {
    status: true,
    message: "Get admin success",
    data: admin,
  };
};
