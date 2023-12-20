import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @description Formata o texto para conter apenas números não sinalizados
 *
 * @param _text Texto a ser formatado
 * @returns Texto formatado
 */
const onlyUnsignedNumbers = (_text: string) => _text?.replace(/[^0-9]+/g, "");

/**
 * @description Aplica a máscara de cep a string
 *
 * @param cep Cep a ser formatado
 * @returns Cep formatado
 */
export const cepMask = (cep: string) => {
  if (cep === null || cep === undefined) return;
  cep = onlyUnsignedNumbers(cep);
  return String(cep)
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");
};

/**
 * @description Aplica a máscara de dinheiro a um número
 *
 * @param {number} value Valor a ser formatado
 * @returns {string} Valor formatado
 */
export const formatMoney = (value: number): string =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value || 0
  );

/**
 * @description Aplica a máscara de dinheiro a string
 *
 * @param {string} value Valor a ser formatado
 * @returns {string} Valor formatado
 */
export const maskInputMoney = (value: string): string => {
  if (!value) {
    return "";
  }

  return (Number(value.replace(/\D/g, "")) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const shippingRates = {
  mini: {
    max_weight: 300,
    prices: {
      E3: {
        locations: ["PR"],
        price: 11.39,
        cities: [],
      },
      N1: {
        locations: ["SP", "RJ", "RS"],
        price: 12.88,
        cities: ["São Paulo", "Rio de Janeiro", "Porto Alegre"],
      },
      N2: {
        locations: ["MG", "MS", "RJ"],
        price: 14.42,
        cities: ["Belo Horizonte", "Campo Grande", "Rio de Janeiro"],
      },
      N3: {
        locations: ["DF", "ES", "MT"],
        price: 16.1,
        cities: ["Brasília", "Vitória", "Cuiabá"],
      },
      N4: {
        locations: [
          "BA",
          "GO",
          "TO",
          "AC",
          "AL",
          "AM",
          "CE",
          "MA",
          "PA",
          "PB",
          "PE",
          "PI",
          "RN",
          "RO",
          "SE",
          "AP",
          "RR",
        ],
        price: 19.32,
        cities: [
          "Salvador",
          "Goiânia",
          "Palmas",
          "Rio Branco",
          "Maceió",
          "Manaus",
          "Fortaleza",
          "São Luís",
          "Belém",
          "João Pessoa",
          "Recife",
          "Teresina",
          "Natal",
          "Porto Velho",
          "Aracaju",
          "Macapá",
          "Boa Vista",
        ],
      },
      I1: {
        locations: ["SP", "RJ", "RS"],
        price: 14.9,
        cities: [],
      },
      I2: {
        locations: ["MG", "MS", "RJ"],
        price: 17.45,
        cities: [],
      },
      I3: {
        locations: ["DF", "ES", "MT"],
        price: 20.14,
        cities: [],
      },
      I4: {
        locations: [
          "BA",
          "GO",
          "TO",
          "AC",
          "AL",
          "AM",
          "CE",
          "MA",
          "PA",
          "PB",
          "PE",
          "PI",
          "RN",
          "RO",
          "SE",
          "AP",
          "RR",
        ],
        price: 23.37,
        cities: [],
      },
    },
  },
  pac: {
    max_weight: 10000,
    prices: {
      E3: {
        locations: ["PR"],
        "500": 15.49,
        "1000": 16.61,
        "2000": 17.48,
        "3000": 20.9,
        "4000": 22.31,
        "5000": 23.86,
        "6000": 25.16,
        "7000": 26.59,
        "8000": 27.94,
        "9000": 28.75,
        "10000": 29.33,
        additional_kg: 3.63,
        cities: [],
      },
      N1: {
        locations: ["SP", "RJ", "RS"],
        "500": 17.51,
        "1000": 18.77,
        "2000": 20.63,
        "3000": 24.65,
        "4000": 26.32,
        "5000": 28.14,
        "6000": 31.17,
        "7000": 34.42,
        "8000": 37.5,
        "9000": 39.34,
        "10000": 40.66,
        additional_kg: 5.04,
        cities: ["São Paulo", "Rio de Janeiro", "Porto Alegre"],
      },
      N2: {
        locations: ["MG", "MS", "RJ"],
        "500": 19.62,
        "1000": 21.02,
        "2000": 23.09,
        "3000": 27.6,
        "4000": 29.49,
        "5000": 31.53,
        "6000": 35.85,
        "7000": 39.6,
        "8000": 43.13,
        "9000": 45.25,
        "10000": 46.76,
        additional_kg: 5.8,
        cities: ["Belo Horizonte", "Campo Grande", "Rio de Janeiro"],
      },
      N3: {
        locations: ["DF", "ES", "MT"],
        "500": 21.9,
        "1000": 23.46,
        "2000": 25.78,
        "3000": 30.81,
        "4000": 32.91,
        "5000": 35.19,
        "6000": 40.91,
        "7000": 45.18,
        "8000": 49.22,
        "9000": 51.63,
        "10000": 53.37,
        additional_kg: 6.62,

        cities: ["Brasília", "Vitória", "Cuiabá"],
      },
      N4: {
        locations: [
          "BA",
          "GO",
          "TO",
          "AC",
          "AL",
          "AM",
          "CE",
          "MA",
          "PA",
          "PB",
          "PE",
          "PI",
          "RN",
          "RO",
          "SE",
          "AP",
          "RR",
        ],
        "500": 26.28,
        "1000": 28.15,
        "2000": 30.93,
        "3000": 36.97,
        "4000": 39.49,
        "5000": 42.23,
        "6000": 50.66,
        "7000": 55.94,
        "8000": 60.94,
        "9000": 63.92,
        "10000": 66.08,
        additional_kg: 8.19,
        cities: [
          "Salvador",
          "Goiânia",
          "Palmas",
          "Rio Branco",
          "Maceió",
          "Manaus",
          "Fortaleza",
          "São Luís",
          "Belém",
          "João Pessoa",
          "Recife",
          "Teresina",
          "Natal",
          "Porto Velho",
          "Aracaju",
          "Macapá",
          "Boa Vista",
        ],
      },
      I1: {
        locations: ["SP", "RJ", "RS"],
        "500": 20.97,
        "1000": 22.22,
        "2000": 26.37,
        "3000": 30.4,
        "4000": 38.97,
        "5000": 40.8,
        "6000": 47.28,
        "7000": 50.53,
        "8000": 65.1,
        "9000": 66.94,
        "10000": 68.26,
        additional_kg: 8.45,
      },
      I2: {
        locations: ["MG", "MS", "RJ"],
        "500": 23.33,
        "1000": 24.78,
        "2000": 29.21,
        "3000": 33.81,
        "4000": 43.49,
        "5000": 45.78,
        "6000": 53.19,
        "7000": 56.65,
        "8000": 73.01,
        "9000": 74.96,
        "10000": 76.28,
        additional_kg: 9.48,
      },
      I3: {
        locations: ["DF", "ES", "MT"],
        "500": 42.61,
        "1000": 44.16,
        "2000": 48.77,
        "3000": 53.81,
        "4000": 62.8,
        "5000": 65.09,
        "6000": 74.27,
        "7000": 78.52,
        "8000": 94.07,
        "9000": 96.49,
        "10000": 98.23,
        additional_kg: 12.17,
      },
      I14: {
        locations: [
          "BA",
          "GO",
          "TO",
          "AC",
          "AL",
          "AM",
          "CE",
          "MA",
          "PA",
          "PB",
          "PE",
          "PI",
          "RN",
          "RO",
          "SE",
          "AP",
          "RR",
        ],
        "500": 58.48,
        "1000": 60.35,
        "2000": 65.44,
        "3000": 71.47,
        "4000": 80.89,
        "5000": 83.63,
        "6000": 95.51,
        "7000": 100.79,
        "8000": 117.29,
        "9000": 120.28,
        "10000": 122.42,
        additional_kg: 15.18,
      },
    },
  },
};
