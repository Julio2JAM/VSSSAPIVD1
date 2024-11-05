import { User } from "./models/userModel";
import express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}