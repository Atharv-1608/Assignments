import type { JwtPayload } from "../middleware/middleware";


declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}