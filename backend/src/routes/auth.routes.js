import express from "express";
import { handleAuth0Login } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/login", handleAuth0Login);

export default router;
