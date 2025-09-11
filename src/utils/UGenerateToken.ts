import jwt from 'jsonwebtoken';

// Sebaiknya simpan kunci rahasia ini di file .env untuk keamanan
const JWT_SECRET = process.env.JWT_SECRET || "rahasia bet";

export function UGenerateToken(payload: object): string {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h', // Token akan kedaluwarsa dalam 1 jam
  });
  return token;
}