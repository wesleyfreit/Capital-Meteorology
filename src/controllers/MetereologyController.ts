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
    const date = dayjs(new Date()).format('YYYY[-]MM[-]DD');
    const request = await axios.get(api.concat(date));
    const metereologies = metereologyArraySchema.parse(request.data);
    
    res.render('home', {
      date: dayjs(date).format('DD[ de ]MMMM[, ]YYYY'),
      metereologies: metereologiesModel(metereologies),
    });
  }
  public async find(req: Request, res: Response) {
    const body = metereologyObjectSchema.parse(req.body);
    const request = await axios.get(api.concat(body.date));
    const metereologies = metereologyArraySchema.parse(request.data);

    res.render('result', {
      metereology: metereologyModel(metereologies, body.capital),
      metereologies: metereologiesModel(metereologies),
    });
  }
}
