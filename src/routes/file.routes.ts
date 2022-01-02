import { Router } from "express";
import { uploadFile } from '../controllers/file.controller';
import { verifyToken } from "../middlewares/Auth";

const router: Router = Router();

router.post('/upload', verifyToken, uploadFile);

export default router;