import MetereologyController from "./controllers/MetereologyController";
import { Router, Request, Response } from "express";
import { setLocals } from "./middlewares/setLocals";

const router = Router();
const time = new MetereologyController();

router.use(setLocals);

router.get('/', (req: Request, res: Response) => res.redirect('/metereologies'));
router.get('/metereologies', time.list);
router.get('/metereology', time.find);

export default router; 