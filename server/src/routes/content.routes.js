import { Router } from "express";
import { getContent } from "../controllers/content.controller.js";

const router = Router();

router.get("/content", getContent);

export default router;
