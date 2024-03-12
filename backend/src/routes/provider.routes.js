import { Router } from "express";
import {
  registerProvider,
  getCurrentProvider,
  updateServiceRatingAndReview,
  getAllServiceProviders,
} from "../controllers/provider.controller.js";
import { verifyJWT, verifyJWTProvider } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/registerProvider").post(registerProvider);
router.route("/current-provider").get(verifyJWTProvider, getCurrentProvider);
router.route("/create-new-review").put(verifyJWT, updateServiceRatingAndReview);
router.route("/serviceProvider").get(getAllServiceProviders);

export default router;