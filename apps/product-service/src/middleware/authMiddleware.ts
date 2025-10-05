import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import { CustomJwtSessionClaims } from "@repo/types";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const shouldBeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = getAuth(req);
  const userId = auth.userId;

  if (!userId) {
    return res.status(401).json({ message: "Not logged in" });
  }
  req.userId = userId;

  return next();
};

export const shouldBeAmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = getAuth(req);
  const userId = auth.userId;

  if (!userId) {
    return res.status(401).json({ message: "Not logged in" });
  }

  const claims = auth.sessionClaims as CustomJwtSessionClaims;

  if (claims.metadata?.role !== "admin") {
    return res.status(403).send({ message: "Unauthorized" });
  }
  req.userId = userId;

  return next();
};
