
import {
    jwtVerify,
    SignJWT,
 } from "jose";


const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined");
}

const secret = new TextEncoder().encode(jwtSecret);

export async function signToken(userId: string): Promise<string> {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
}

export async function verifyToken(token: string): Promise<string> {
  const { payload } = await jwtVerify(token, secret, {
    algorithms: ["HS256"],
  });

  if (!payload.sub) {
    throw new Error("Token subject is missing");
  }

  return payload.sub;
}