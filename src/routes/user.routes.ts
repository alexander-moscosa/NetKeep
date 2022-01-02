import { Router } from 'express';
import { getAll } from "../controllers/user.controller";

const router: Router = Router();

router.get('/get_all', getAll);

export default router;