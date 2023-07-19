import { z } from 'zod';

interface ResponseSchema {
  CAPITAL: string;
  TMIN18: string;
  TMAX18: string;
}

interface meteorology {
  capital: string;
  tempMin: string;
  tempMax: string;
}

export const meteorologyArraySchema = z.array(
  z.object({
    CAPITAL: z.string(),
    TMIN18: z.string(),
    TMAX18: z.string(),
  }),
);

export const meteorologyObjectSchema = z.object({
  capital: z.string().min(1),
  date: z.string().min(1),
});

export const meteorologiesModel = (meteorologies: ResponseSchema[]) => {
  return meteorologies.map((meteorology) => {
    return {
      capital: meteorology.CAPITAL.replace('AO', 'ÃO')
        .replace('LEM', 'LÉM')
        .replace('SILIA', 'SÍLIA')
        .replace('ANIA', 'ÂNIA')
        .replace('IABA', 'IABÁ')
        .replace('APA', 'APÁ')
        .replace('TORIA', 'TÓRIA')
        .replace('OPO', 'ÓPO')
        .replace('UIS', 'UÍS'),
      tempMin:
        meteorology.TMIN18 == '*' ? 'Sem Dados' : meteorology.TMIN18.replace('*', '').concat('°C'),
      tempMax:
        meteorology.TMAX18 == '*' ? 'Sem Dados' : meteorology.TMAX18.replace('*', '').concat('°C'),
    };
  });
};

export const meteorologyModel = (meteorologies: meteorology[], capital: string) => {
  const object = {
    capital: '',
    tempMin: '',
    tempMax: '',
  };
  meteorologies.map((meteorology) => {
    if (meteorology.capital == capital) {
      object.capital = meteorology.capital;
      object.tempMin = meteorology.tempMin;
      object.tempMax = meteorology.tempMax;
    }
  });

  return object;
};
