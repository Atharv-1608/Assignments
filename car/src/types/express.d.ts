import { JwtPayload } from "../middleware";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {}