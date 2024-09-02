import { Router } from "express";
import { updateHoursController, getInternsById } from "../controllers/internController";

const router = Router();

router.route('/:intern_id').put(updateHoursController);
router.route('/:intern_id').get(getInternsById);

export default router;