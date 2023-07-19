import meteorologyController from './controllers/MeteorologyController';
import { Router, Request, Response } from 'express';
import { setLocals } from './middlewares/setLocals';

const router = Router();
const time = new meteorologyController();

router.use(setLocals);

router.get('/', (req: Request, res: Response) => res.redirect('/meteorologies'));
router.get('/meteorologies', time.list);
router.get('/meteorology', time.find);

export default router;
