import { NextApiRequest, NextApiResponse } from "next";
import * as admin from "firebase-admin";

export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const token = req.headers.authorization?.split(" ")[1];
  let user_id: string | null = null;
  if (token) {
    const decoded = await admin.auth().verifyIdToken(token);
    if (decoded) user_id = decoded.user_id;
  }
  return { req, res, user_id };
}

export type Context = ReturnType<typeof createContext>;
