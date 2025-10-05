import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";
import { shouldBeAmin } from "../middleware/authMiddleware";

const router: Router = Router();

router.post("/", shouldBeAmin, createProduct);
router.put("/:id", shouldBeAmin, updateProduct);
router.delete("/:id", shouldBeAmin, deleteProduct);
router.get("/:id", getProduct);
router.get("/", getProducts);

export default router;
