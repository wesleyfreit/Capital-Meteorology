import { z } from 'zod';

interface ResponseSchema {
  CAPITAL: string;
  TMIN18: string;
  TMAX18: string;
}

interface Metereology {
  capital: string;
  tempMin: string;
  tempMax: string;
}

export const metereologyArraySchema = z.array(
  z.object({
    CAPITAL: z.string(),
    TMIN18: z.string(),
    TMAX18: z.string(),
  }),
);

export const metereologyObjectSchema = z.object({
  capital: z.string().min(1),
  date: z.string().min(1),
});

export const metereologiesModel = (metereologies: ResponseSchema[]) => {
  return metereologies.map((metereology) => {
    return {
      capital: metereology.CAPITAL.replace('AO', 'ÃO')
        .replace('LEM', 'LÉM')
        .replace('SILIA', 'SÍLIA')
        .replace('ANIA', 'ÂNIA')
        .replace('IABA', 'IABÁ')
        .replace('APA', 'APÁ')
        .replace('TORIA', 'TÓRIA')
        .replace('OPO', 'ÓPO')
        .replace('UIS', 'UÍS'),
      tempMin:
        metereology.TMIN18 == '*' ? 'Sem Dados' : metereology.TMIN18.replace('*', '').concat('°C'),
      tempMax:
        metereology.TMAX18 == '*' ? 'Sem Dados' : metereology.TMAX18.replace('*', '').concat('°C'),
    };
  });
};

export const metereologyModel = (metereologies: Metereology[], capital: string) => {
  const object = {
    capital: '',
    tempMin: '',
    tempMax: '',
  };
  metereologies.map((metereology) => {
    if (metereology.capital == capital) {
      object.capital = metereology.capital;
      object.tempMin = metereology.tempMin;
      object.tempMax = metereology.tempMax;
    }
  });

  return object;
};
