import { Request } from "express";
import {IUser} from "../interfaces/IUser";

export interface AuthenticatedRequest extends Request {
    user?: IUser;
}