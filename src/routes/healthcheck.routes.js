import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controllers.js";

const router = Router();

router.route('/').get(healthCheck);
// router.route('/test').get(healthCheck);
// router.route('/healthcheck').get(healthCheck);

export default router;