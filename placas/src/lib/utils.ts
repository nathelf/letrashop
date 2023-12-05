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
