import MetereologyController from "./controllers/MetereologyController";
import { Router, Request, Response } from "express";

const router = Router();
const time = new MetereologyController();

router.get('/', (req: Request, res: Response) => res.redirect('/metereology'));
router.get('/metereology', time.list);
router.post('/metereology', time.find);

export default router; 