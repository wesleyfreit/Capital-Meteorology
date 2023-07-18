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
      const date = dayjs(new Date()).format('YYYY[-]MM[-]DD');
      const request = await axios.get(api.concat(date));
      const metereologies = metereologyArraySchema.parse(request.data);
      res.render('home', {
        date: dayjs(date).format('DD[ de ]MMMM[, ]YYYY'),
        metereologies: metereologiesModel(metereologies),
      });
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
  }
  public async find(req: Request, res: Response) {
    try {
      const body = metereologyObjectSchema.parse(req.query);
      const request = await axios.get(api.concat(body.date));
      const metereologies = metereologyArraySchema.parse(request.data);
      res.locals.capital = body.capital;
      res.locals.date = body.date;
      res.render('result', {
        metereology: metereologyModel(metereologies, body.capital),
      });
    } catch (error: any) {
      if (error.errors) {
        error.errors[0].code == 'too_small' && res.sendStatus(400)
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
