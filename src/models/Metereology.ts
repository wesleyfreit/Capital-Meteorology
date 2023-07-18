import { z } from 'zod';

interface Metereology {
  CAPITAL: string;
  TMIN18: string;
  TMAX18: string;
}

export const metereologyArraySchema = z.array(
  z.object({
    CAPITAL: z.string(),
    TMIN18: z.string(),
    TMAX18: z.string(),
  }),
);

export const metereologyObjectSchema = z.object({
  capital: z.string(),
  date: z.string(),
});

export const capitalsNames = (metereologies: Metereology[]) => {
  return metereologies.map((metereology) => {
    return { capital: metereology.CAPITAL };
  });
};

export const metereologiesModel = (metereologies: Metereology[]) => {
  return metereologies.map((metereology) => {
    return {
      capital: metereology.CAPITAL,
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
    if (metereology.CAPITAL == capital) {
      object.capital = metereology.CAPITAL;
      object.tempMin =
        metereology.TMIN18 == '*' ? 'Sem Dados' : metereology.TMIN18.replace('*', '').concat('°C');
      object.tempMax =
        metereology.TMAX18 == '*' ? 'Sem Dados' : metereology.TMAX18.replace('*', '').concat('°C');
    }
  });

  return object;
};
