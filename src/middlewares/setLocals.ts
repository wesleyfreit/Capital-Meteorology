import { Request, Response, NextFunction } from 'express';
import { metereologiesModel, metereologyArraySchema } from '../models/Metereology';
import axios from 'axios';
import dayjs from 'dayjs';
import { api } from '../api/api';

export const setLocals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const date = dayjs(new Date()).format('YYYY[-]MM[-]DD');
    const request = await axios.get(api.concat(date));
    const metereologies = metereologyArraySchema.parse(request.data);
    res.locals.METEREOLOGIES = metereologiesModel(metereologies);
    next();
  } catch (error: any) {
    switch (error.response.status) {
      case 403:
        res.sendStatus(403);
        break;
      case 404:
        res.sendStatus(404);
        break;
      default:
        res.sendStatus(500);
        break;
    }
  }
};
