import { Request, Response } from 'express';
import axios from 'axios';
import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';
import { api } from '../api/api';

import {
  metereologyArraySchema,
  metereologyObjectSchema,
  metereologiesModel,
  metereologyModel,
} from '../models/Metereology';

dayjs.locale(ptBr);

export default class MetereologyController {
  public async list(req: Request, res: Response) {
    try {
      res.render('index', {
        date: dayjs(new Date()).format('DD[ de ]MMMM[, ]YYYY'),
        metereologies: res.locals.METEREOLOGIES,
      });
    } catch (error: any) {
      return res.sendStatus(500);
    }
  }
  public async find(req: Request, res: Response) {
    try {
      const body = metereologyObjectSchema.parse(req.query);
      const request = await axios.get(api.concat(body.date));
      const metereologies = metereologyArraySchema.parse(request.data);
      res.render('result', {
        metereology: metereologyModel(metereologiesModel(metereologies), body.capital),
      });
    } catch (error: any) {
      if (error.errors) {
        error.errors[0].code == 'too_small' && res.sendStatus(400);
      }
      if (error.response) {
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
    }
  }
}
