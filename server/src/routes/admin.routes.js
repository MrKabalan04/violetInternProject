import { Router } from "express";
import {
  createResource,
  deleteResource,
  getAdminContent,
  listResource,
  updateResource,
  updateSingleton,
  uploadImage,
} from "../controllers/admin.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.use(requireAuth);

router.get("/content", getAdminContent);
router.put("/content/:key", updateSingleton);
router.post("/uploads", upload.single("image"), uploadImage);

router.get("/:resource", listResource);
router.post("/:resource", createResource);
router.put("/:resource/:id", updateResource);
router.delete("/:resource/:id", deleteResource);

export default router;
