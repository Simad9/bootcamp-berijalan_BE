import Joi from "joi";

export interface ILoginResponse {
  token: string;
  admin: {
    id: number;
    username: string;
    email: string;
    name: string;
  };
}

export interface IUpdateResponse {
  admin: {
    id: number;
    username: string;
    email: string;
    name: string;
  };
}

export interface IGetAllResponse {
  id: number;
  username: string;
  email: string;
  name: string;
}

// Tambahin Schema Untuk Validasi Joi
export const RegisterSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(3).max(50).required(), // tambahin ini
});

export const LoginSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().required(),
});
