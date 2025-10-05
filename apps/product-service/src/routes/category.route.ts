import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controller";
import { shouldBeAmin } from "../middleware/authMiddleware";

const router: Router = Router();

router.post("/", shouldBeAmin, createCategory);
router.put("/:id", shouldBeAmin, updateCategory);
router.delete("/:id", shouldBeAmin, deleteCategory);
router.get("/", getCategories);

export default router;
