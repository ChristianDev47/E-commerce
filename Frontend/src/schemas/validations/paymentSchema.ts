import { z } from "zod";

// Función para el algoritmo de Luhn
const luhnCheck = (num: string): boolean => {
  const arr = (num + "")
    .split("")
    .reverse()
    .map((x) => parseInt(x));
  const lastDigit = arr.splice(0, 1)[0];
  let sum = arr.reduce(
    (acc, val, i) =>
      i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val),
    0
  );
  sum += lastDigit;
  return sum % 10 === 0;
};

// Esquema de validación para el número de tarjeta
const cardSchema = z.string().refine(
  (value) => {
    const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const mastercardRegex = /^5[1-5][0-9]{14}$|^2[2-7][0-9]{14}$/;
    const discoverRegex =
      /^6(?:011|5[0-9]{2})[0-9]{12}$|^64[4-9][0-9]{13}$|^622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[01][0-9]|92[0-5])[0-9]{10}$/;
    const amexRegex = /^3[47][0-9]{13}$/;

    const isValidPattern =
      visaRegex.test(value) ||
      mastercardRegex.test(value) ||
      discoverRegex.test(value) ||
      amexRegex.test(value);
    return isValidPattern && luhnCheck(value);
  },
  {
    message: "Número de tarjeta no válido",
  }
);

// Esquema de validación para el CVV/CVC
const amexRegex = /^3[47][0-9]{13}$/;
const cvvSchema = z
  .string()
  .min(1, "El cvc/cvv es requerido.")
  .refine(
    (value) => {
      if (amexRegex.test(value)) {
        return value.length === 4;
      } else {
        return value.length === 3;
      }
    },
    {
      message: "CVV/CVC no válido",
    }
  );

const monthSchema = z.string().regex(/^0[1-9]$|1[0-2]$/);
const yearSchema = z.string().regex(/^[2-9]\d{3}$/);

const dueDateSchema = z
  .object({
    month: monthSchema,
    year: yearSchema,
  })
  .refine(
    (data) => {
      const fechaActual = new Date();
      const año = parseInt(data.year, 10);
      const mes = parseInt(data.month, 10);
      return new Date(año, mes - 1) > fechaActual;
    },
    {
      message:
        "La fecha de vencimiento de su tarheta debe ser mayor a la fecha actual",
    }
  );

// Esquema completo para validar tarjeta, fecha de vencimiento y CVV/CVC
export const creditCardSchema = z.object({
  name: z.string().min(1, "El nombre es requerido."),
  card_number: cardSchema,
  due_date: dueDateSchema,
  cvc: cvvSchema,
});
