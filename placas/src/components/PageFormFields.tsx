import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { I18n } from "../assets/resources";
import { cepMask } from "../lib/utils";
import { ChartsVisualization } from "./ChatsVisualization";
import { useFormContext } from "../context/useFormContext";
import { useEffect, useState } from "react";
import { AlertProduct } from "./AlertProduct";
import { Product } from "../types/types";
import { AlertWeight } from "./AlertWeight";

export const PageFormFields: React.FC = () => {
  const {
    letters,
    products,
    setLetters,
    type,
    setType,
    color,
    setColor,
    size,
    setSize,
    cep,
    setCep,
    cepError,
    setCepError,
    weight,
  } = useFormContext();

  const FONT_TYPE = I18n.MAIN_FORM.VALUES.FONT_TYPE;
  const FONT_SIZE = I18n.MAIN_FORM.VALUES.FONT_SIZE;
  const FONT_COLOR = I18n.MAIN_FORM.VALUES.FONT_COLOR;

  const [open, setOpen] = useState(false);
  const [openWeight, setOpenWeight] = useState(false);
  const [img, setImg] = useState("");
  const [kits, setKits] = useState(0);

  const [productsInStock, setProductsInStock] = useState(products);

  useEffect(() => {
    setProductsInStock(products);
  }, [products]);

  useEffect(() => {
    setProductsInStock(products);
    setLetters("");
  }, [color, type, size]);

  /**
   * Check if a string is an exact match for a search term.
   * @param {string} name - The string to test.
   * @param {string} searchTerm - The search term.
   * @returns {boolean} - Whether the string is an exact match for the search term.
   *
   * @note Essa função é necessária para que o filtro funcione corretamente. Pois em alguns casos temos o valor 30mm, entretanto nos produtos temos o valor 130mm.
   */
  function isExactMatch(name: string, searchTerm: string): boolean {
    const regex = new RegExp(`\\b${searchTerm}\\b`, "i");
    return regex.test(name);
  }

  function countOccurrences(str: string, subStr: string) {
    var count = 0;
    var pos = str.indexOf(subStr);

    // Continue procurando por ocorrências do substring
    while (pos !== -1) {
      count++;
      pos = str.indexOf(subStr, pos + 1);
    }

    return count;
  }

  function contarUnidades(texto: string): number {
    // usar regex para cada caracter especial

    // variaveis contadoras para cada regex acima
    let contadorPonto = 0;
    let contadorVirgula = 0;
    let contadorTraco = 0;
    let contadorBarra = 0;
    let contadorCircunflexo = 0;
    let contadorCedilha = 0;

    contadorBarra = countOccurrences(texto, "/");
    contadorBarra = contadorBarra + countOccurrences(texto, "\\");
    contadorCircunflexo = countOccurrences(texto, "^");
    contadorCircunflexo = contadorCircunflexo + countOccurrences(texto, "Â");
    contadorCircunflexo = contadorCircunflexo + countOccurrences(texto, "Ê");
    contadorCircunflexo = contadorCircunflexo + countOccurrences(texto, "Î");
    contadorCircunflexo = contadorCircunflexo + countOccurrences(texto, "Ô");
    contadorCircunflexo = contadorCircunflexo + countOccurrences(texto, "Û");
    contadorPonto = countOccurrences(texto, ".");
    contadorTraco = countOccurrences(texto, "-");
    contadorTraco = contadorTraco + countOccurrences(texto, "Ã");
    contadorTraco = contadorTraco + countOccurrences(texto, "Õ");
    contadorVirgula = countOccurrences(texto, ",");
    contadorVirgula = contadorVirgula + countOccurrences(texto, "Á");
    contadorVirgula = contadorVirgula + countOccurrences(texto, "É");
    contadorVirgula = contadorVirgula + countOccurrences(texto, "Í");
    contadorVirgula = contadorVirgula + countOccurrences(texto, "Ó");
    contadorVirgula = contadorVirgula + countOccurrences(texto, "Ú");
    contadorVirgula = contadorVirgula + countOccurrences(texto, "À");
    contadorVirgula = contadorVirgula + countOccurrences(texto, "È");
    contadorVirgula = contadorVirgula + countOccurrences(texto, "Ì");
    contadorVirgula = contadorVirgula + countOccurrences(texto, "Ò");
    contadorVirgula = contadorVirgula + countOccurrences(texto, "Ù");
    contadorCedilha = countOccurrences(texto, "Ç");

    // 3 pontos
    // 1 acento circunflexo
    // 1 virgula
    // 1 hifen
    // 1 barra invertida
    // 1 cedilha

    // cria um vetor com a quantidade de kits para cada caractere, ordena do maior para o menor e pega o primeiro valor (maior quantidade de kits necessários)
    const kitsNeeded = [
      Math.ceil(contadorBarra / 1),
      Math.ceil(contadorCircunflexo / 1),
      Math.ceil(contadorPonto / 3),
      Math.ceil(contadorTraco / 1),
      Math.ceil(contadorVirgula / 1),
      Math.ceil(contadorCedilha / 1),
    ].sort((a, b) => b - a)[0];

    return kitsNeeded;
  }

  function searchProduct(char: string): Product {
    let productFiltered = products.filter((product) => {
      return (
        isExactMatch(product.name.pt.toLowerCase(), color.toLowerCase()) &&
        isExactMatch(product.name.pt.toLowerCase(), size.toLowerCase()) &&
        // this one can be a little tricky
        // we need to check the feminine and masculine version of the word
        (isExactMatch(
          product.name.pt.toLowerCase(),
          type.toLowerCase().slice(0, -1) + "o"
        ) ||
          isExactMatch(
            product.name.pt.toLowerCase(),
            type.toLowerCase().slice(0, -1) + "a"
          ))
      );
    });

    return productFiltered.filter((product) => {
      return compareProductName(char, product);
    })[0];
  }

  function getKits() {
    return products.filter((product) => {
      return (
        isExactMatch(product.name.pt.toLowerCase(), color.toLowerCase()) &&
        isExactMatch(
          product.name.pt.toLowerCase(),
          type.toLowerCase() === "QUADRADO" ? "130mm" : "30mm"
        ) &&
        isExactMatch(product.name.pt.toLowerCase(), "kit pontuacao")
      );
    })[0];
  }

  function compareProductName(a: string, product: Product) {
    return a === product.name.pt.split("-")[1];
  }

  function changeStock(product: Product, quantity: number) {
    // encontra o index do produto
    let index = productsInStock.findIndex(
      (_product) => _product.id === product.id
    );

    if (productsInStock[index].variants[0].weight * 1000 + weight >= 270) {
      // abre o modal de peso máximo excedido
      setOpenWeight(true);
      return false;
    }

    if (productsInStock[index].variants[0].inventory_levels[0].stock !== null) {
      // checa se o peso do produto que será adicionado ao carrinho é maior que o peso máximo permitido (270g)

      // checa se a quantidade de estoque é maior que 0
      if (
        productsInStock[index].variants[0].inventory_levels[0].stock +
          quantity >=
        0
      ) {
        // altera a quantidade de estoque
        productsInStock[index].variants[0].inventory_levels[0].stock =
          productsInStock[index].variants[0].inventory_levels[0].stock +
          quantity;

        return true;
      } else {
        // abre o modal de produto fora de estoque
        setOpen(true);
        setImg(product.images[0]?.src ?? product.name.pt);
        return false;
      }
    }

    return true;
  }

  return (
    <>
      <div>
        <form>
          <div className="grid w-full items-center gap-4">
            <ChartsVisualization letters={letters} products={products} />

            <div className="flex flex-1 flex-col space-y-1.5 w-full max-w-[236px] md:max-w-[618px] lg:max-w-full lg:w-full">
              <Label htmlFor="cep" className="text-end">
                {size === "30mm" || size === "130mm"
                  ? I18n.MAIN_FORM.LABELS.LETTERS_AND_NUMBERS
                  : I18n.MAIN_FORM.LABELS.NUMBERS}
              </Label>
              <Input
                id="letters"
                value={letters}
                onChange={(e) => {
                  const value = e.target.value.toString();
                  let regex;
                  let prod: Product;
                  let hasStock = true;

                  if (size === "30mm" || size === "130mm") {
                    regex =
                      /^[A-Za-z0-9áéíóúÁÉÍÓÚñÑçÇâêîôûÂÊÎÔÛàèìòùÀÈÌÒÙãõÃÕ -\/\\,.^]*$/;
                  } else {
                    regex = /^[0-9 -.,/\\]*$/;
                  }

                  // se for espaço ignora toda a validação de estoque
                  if (value.slice()[value.slice().length - 1] !== " ") {
                    // Verifica se o valor atual corresponde à expressão regular
                    if (!regex.test(value.slice())) {
                      if (value === "") {
                        if (
                          letters.slice()[letters.slice().length - 1] === "Ã"
                        ) {
                          prod = searchProduct("A");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Õ"
                        ) {
                          prod = searchProduct("O");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Â"
                        ) {
                          prod = searchProduct("A");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Ê"
                        ) {
                          prod = searchProduct("E");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Î"
                        ) {
                          prod = searchProduct("I");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Ô"
                        ) {
                          prod = searchProduct("O");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Û"
                        ) {
                          prod = searchProduct("U");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Á"
                        ) {
                          prod = searchProduct("A");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "É"
                        ) {
                          prod = searchProduct("E");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Í"
                        ) {
                          prod = searchProduct("I");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Ó"
                        ) {
                          prod = searchProduct("O");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Ú"
                        ) {
                          prod = searchProduct("U");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "À"
                        ) {
                          prod = searchProduct("A");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "È"
                        ) {
                          prod = searchProduct("E");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Ì"
                        ) {
                          prod = searchProduct("I");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Ò"
                        ) {
                          prod = searchProduct("O");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Ù"
                        ) {
                          prod = searchProduct("U");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Ç"
                        ) {
                          prod = searchProduct("C");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "." ||
                          letters.slice()[letters.slice().length - 1] === "/" ||
                          letters.slice()[letters.slice().length - 1] ===
                            "\\" ||
                          letters.slice()[letters.slice().length - 1] === "^" ||
                          letters.slice()[letters.slice().length - 1] === "-" ||
                          letters.slice()[letters.slice().length - 1] === ","
                        ) {
                          prod = getKits();
                        } else {
                          prod = searchProduct(
                            letters.slice()[letters.slice().length - 1]
                          );
                        }
                        // encontra o index do produto
                        let index = productsInStock.findIndex(
                          (product) => product.id === prod.id
                        );

                        // incrementa o estoque
                        if (
                          productsInStock[index].variants[0].inventory_levels[0]
                            .stock !== null
                        ) {
                          hasStock = changeStock(productsInStock[index], 1);
                        }

                        setLetters("");
                      }

                      return;
                    }

                    // Esta inserindo um caractere
                    if (value.length > letters.length) {
                      // Esta inserindo um caractere

                      // checa se é um caractere especial
                      if (
                        value.slice()[value.slice().length - 1] === "Ã" ||
                        value.slice()[value.slice().length - 1] === "Õ" ||
                        value.slice()[value.slice().length - 1] === "Â" ||
                        value.slice()[value.slice().length - 1] === "Ê" ||
                        value.slice()[value.slice().length - 1] === "Î" ||
                        value.slice()[value.slice().length - 1] === "Ô" ||
                        value.slice()[value.slice().length - 1] === "Û" ||
                        value.slice()[value.slice().length - 1] === "Á" ||
                        value.slice()[value.slice().length - 1] === "É" ||
                        value.slice()[value.slice().length - 1] === "Í" ||
                        value.slice()[value.slice().length - 1] === "Ó" ||
                        value.slice()[value.slice().length - 1] === "Ú" ||
                        value.slice()[value.slice().length - 1] === "À" ||
                        value.slice()[value.slice().length - 1] === "È" ||
                        value.slice()[value.slice().length - 1] === "Ì" ||
                        value.slice()[value.slice().length - 1] === "Ò" ||
                        value.slice()[value.slice().length - 1] === "Ù" ||
                        value.slice()[value.slice().length - 1] === "Ç" ||
                        value.slice()[value.slice().length - 1] === "." ||
                        value.slice()[value.slice().length - 1] === "/" ||
                        value.slice()[value.slice().length - 1] === "\\" ||
                        value.slice()[value.slice().length - 1] === "^" ||
                        value.slice()[value.slice().length - 1] === "-" ||
                        value.slice()[value.slice().length - 1] === ","
                      ) {
                        // verifica se precisa incrementar a qtd de kits
                        let kitsNeeded = contarUnidades(value.slice());

                        if (kitsNeeded > kits) {
                          // subtrai uma unidade na qtd de kits disponíveis
                          hasStock = changeStock(getKits(), -1);
                        } else if (kitsNeeded < kits) {
                          // acrescenta uma unidade na qtd de kits disponíveis
                          // não sei se vai acontecer isso, mas só pra garantir
                          hasStock = changeStock(getKits(), 1);
                        }

                        if (hasStock) {
                          setKits(kitsNeeded);
                        }

                        // verifica qual caractere especial é pra subtrair uma unidade a letra base
                        if (value.slice()[value.slice().length - 1] === "Ã") {
                          prod = searchProduct("A");
                        } else if (
                          value.slice()[value.slice().length - 1] === "Õ"
                        ) {
                          prod = searchProduct("O");
                        } else if (
                          value.slice()[value.slice().length - 1] === "Â"
                        ) {
                          prod = searchProduct("A");
                        } else if (
                          value.slice()[value.slice().length - 1] === "Ê"
                        ) {
                          prod = searchProduct("E");
                        } else if (
                          value.slice()[value.slice().length - 1] === "Î"
                        ) {
                          prod = searchProduct("I");
                        } else if (
                          value.slice()[value.slice().length - 1] === "Ô"
                        ) {
                          prod = searchProduct("O");
                        } else if (
                          value.slice()[value.slice().length - 1] === "Û"
                        ) {
                          prod = searchProduct("U");
                        } else if (
                          value.slice()[value.slice().length - 1] === "Á"
                        ) {
                          prod = searchProduct("A");
                        } else if (
                          value.slice()[value.slice().length - 1] === "É"
                        ) {
                          prod = searchProduct("E");
                        } else if (
                          value.slice()[value.slice().length - 1] === "Í"
                        ) {
                          prod = searchProduct("I");
                        } else if (
                          value.slice()[value.slice().length - 1] === "Ó"
                        ) {
                          prod = searchProduct("O");
                        } else if (
                          value.slice()[value.slice().length - 1] === "Ú"
                        ) {
                          prod = searchProduct("U");
                        } else if (
                          value.slice()[value.slice().length - 1] === "À"
                        ) {
                          prod = searchProduct("A");
                        } else if (
                          value.slice()[value.slice().length - 1] === "È"
                        ) {
                          prod = searchProduct("E");
                        } else if (
                          value.slice()[value.slice().length - 1] === "Ì"
                        ) {
                          prod = searchProduct("I");
                        } else if (
                          value.slice()[value.slice().length - 1] === "Ò"
                        ) {
                          prod = searchProduct("O");
                        } else if (
                          value.slice()[value.slice().length - 1] === "Ù"
                        ) {
                          prod = searchProduct("U");
                        } else if (
                          value.slice()[value.slice().length - 1] === "Ç"
                        ) {
                          prod = searchProduct("C");
                        } else {
                          prod = searchProduct(
                            value.slice()[value.slice().length - 1]
                          );
                        }

                        // se prod for undefined então é um caractere especial sozinho
                        // e ja foi atualizado o estoque
                        if (prod !== undefined) {
                          // encontra o index do produto
                          let index = productsInStock.findIndex(
                            (product) => product.id === prod.id
                          );

                          // decrementa o estoque
                          hasStock = changeStock(productsInStock[index], -1);
                        }
                      } else {
                        // não é um caractere especial

                        prod = searchProduct(
                          value.slice()[value.slice().length - 1]
                        );

                        // encontra o index do produto
                        let index = productsInStock.findIndex(
                          (product) => product.id === prod.id
                        );

                        // decrementa o estoque
                        hasStock = changeStock(productsInStock[index], -1);
                      }
                    } else {
                      // Esta removendo um caractere

                      // checa se é um caractere especial
                      if (
                        letters.slice()[letters.slice().length - 1] === "Ã" ||
                        letters.slice()[letters.slice().length - 1] === "Õ" ||
                        letters.slice()[letters.slice().length - 1] === "Â" ||
                        letters.slice()[letters.slice().length - 1] === "Ê" ||
                        letters.slice()[letters.slice().length - 1] === "Î" ||
                        letters.slice()[letters.slice().length - 1] === "Ô" ||
                        letters.slice()[letters.slice().length - 1] === "Û" ||
                        letters.slice()[letters.slice().length - 1] === "Á" ||
                        letters.slice()[letters.slice().length - 1] === "É" ||
                        letters.slice()[letters.slice().length - 1] === "Í" ||
                        letters.slice()[letters.slice().length - 1] === "Ó" ||
                        letters.slice()[letters.slice().length - 1] === "Ú" ||
                        letters.slice()[letters.slice().length - 1] === "À" ||
                        letters.slice()[letters.slice().length - 1] === "È" ||
                        letters.slice()[letters.slice().length - 1] === "Ì" ||
                        letters.slice()[letters.slice().length - 1] === "Ò" ||
                        letters.slice()[letters.slice().length - 1] === "Ù" ||
                        letters.slice()[letters.slice().length - 1] === "Ç" ||
                        letters.slice()[letters.slice().length - 1] === "." ||
                        letters.slice()[letters.slice().length - 1] === "/" ||
                        letters.slice()[letters.slice().length - 1] === "\\" ||
                        letters.slice()[letters.slice().length - 1] === "^" ||
                        letters.slice()[letters.slice().length - 1] === "-" ||
                        letters.slice()[letters.slice().length - 1] === ","
                      ) {
                        // verifica se precisa incrementar a qtd de kits
                        let kitsNeeded = contarUnidades(value.slice());

                        if (kitsNeeded < kits) {
                          // acrescenta uma unidade nos kits
                          hasStock = changeStock(getKits(), 1);
                        } else if (kitsNeeded > kits) {
                          // subtrai uma unidade nos kits
                          // não sei se vai acontecer isso, mas só pra garantir
                          hasStock = changeStock(getKits(), -1);
                        }

                        if (hasStock) {
                          setKits(kitsNeeded);
                        }

                        // verifica qual caractere especial é pra acrescentar uma unidade a letra base
                        if (
                          letters.slice()[letters.slice().length - 1] === "Ã"
                        ) {
                          prod = searchProduct("A");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Õ"
                        ) {
                          prod = searchProduct("O");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Â"
                        ) {
                          prod = searchProduct("A");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Ê"
                        ) {
                          prod = searchProduct("E");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Î"
                        ) {
                          prod = searchProduct("I");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Ô"
                        ) {
                          prod = searchProduct("O");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Û"
                        ) {
                          prod = searchProduct("U");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Á"
                        ) {
                          prod = searchProduct("A");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "É"
                        ) {
                          prod = searchProduct("E");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Í"
                        ) {
                          prod = searchProduct("I");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Ó"
                        ) {
                          prod = searchProduct("O");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Ú"
                        ) {
                          prod = searchProduct("U");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "À"
                        ) {
                          prod = searchProduct("A");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "È"
                        ) {
                          prod = searchProduct("E");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Ì"
                        ) {
                          prod = searchProduct("I");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Ò"
                        ) {
                          prod = searchProduct("O");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Ù"
                        ) {
                          prod = searchProduct("U");
                        } else if (
                          letters.slice()[letters.slice().length - 1] === "Ç"
                        ) {
                          prod = searchProduct("C");
                        } else {
                          prod = searchProduct(
                            letters.slice()[letters.slice().length - 1]
                          );
                        }

                        if (prod !== undefined) {
                          // encontra o index do produto
                          let index = productsInStock.findIndex(
                            (product) => product.id === prod.id
                          );

                          // incrementa o estoque
                          hasStock = changeStock(productsInStock[index], 1);
                        }
                      } else {
                        // não é um caractere especial

                        prod = searchProduct(
                          letters.slice()[letters.slice().length - 1]
                        );

                        // encontra o index do produto
                        let index = productsInStock.findIndex(
                          (product) => product.id === prod.id
                        );

                        // incrementa o estoque
                        hasStock = changeStock(productsInStock[index], 1);
                      }
                    }

                    if (hasStock) {
                      setLetters(value.toUpperCase());
                    }
                  }
                }}
                placeholder={I18n.MAIN_FORM.PLACEHOLDERS.LETTERS}
              />
            </div>

            <div className="flex flex-1 lg:flex-row md:flex-row sm:flex-col flex-col w-full gap-4">
              <div className="flex flex-col space-y-1.5 w-full max-w-[236px] md:max-w-[618px] lg:w-full">
                <Label htmlFor="fontType" className="text-end">
                  {I18n.MAIN_FORM.LABELS.FONT_TYPE}
                </Label>
                <Select
                  onValueChange={(e) => {
                    setType(e);
                  }}
                  defaultValue={type}
                >
                  <SelectTrigger id="fontType'">
                    <SelectValue
                      placeholder={I18n.MAIN_FORM.PLACEHOLDERS.FONT_TYPE}
                    />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {size === "30mm" ? (
                      <>
                        <SelectItem
                          key={FONT_TYPE.TYPE_2.KEY}
                          value={FONT_TYPE.TYPE_2.KEY}
                        >
                          {FONT_TYPE.TYPE_2.VALUE}
                        </SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem
                          key={FONT_TYPE.TYPE_1.KEY}
                          value={FONT_TYPE.TYPE_1.KEY}
                        >
                          {FONT_TYPE.TYPE_1.VALUE}
                        </SelectItem>
                        <SelectItem
                          key={FONT_TYPE.TYPE_2.KEY}
                          value={FONT_TYPE.TYPE_2.KEY}
                        >
                          {FONT_TYPE.TYPE_2.VALUE}
                        </SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5 w-full max-w-[236px] md:max-w-[618px] lg:w-full">
                <Label htmlFor="fontType" className="text-end">
                  {I18n.MAIN_FORM.LABELS.FONT_SIZE}
                </Label>
                <Select
                  onValueChange={(e) => {
                    setSize(e);
                  }}
                  defaultValue={size}
                >
                  <SelectTrigger id="fontSize'">
                    <SelectValue
                      placeholder={I18n.MAIN_FORM.PLACEHOLDERS.FONT_SIZE}
                    />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {Object.values(FONT_SIZE).map((item) => (
                      <SelectItem key={item.KEY} value={item.VALUE}>
                        {item.VALUE}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col w-full gap-4">
              <div className="flex flex-col space-y-1.5 w-full max-w-[236px] md:max-w-[618px] lg:w-full">
                <Label htmlFor="fontType" className="text-end">
                  {I18n.MAIN_FORM.LABELS.FONT_COLOR}
                </Label>
                <Select
                  onValueChange={(e) => {
                    setColor(e);
                  }}
                  defaultValue={color}
                >
                  <SelectTrigger id="fontColor">
                    <SelectValue
                      placeholder={I18n.MAIN_FORM.PLACEHOLDERS.FONT_COLOR}
                    />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {Object.values(FONT_COLOR).map((item) => (
                      <SelectItem key={item.KEY} value={item.VALUE}>
                        {item.VALUE}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5 w-full max-w-[236px] md:max-w-[618px] lg:w-full">
                <Label htmlFor="cep" className="text-end">
                  {I18n.MAIN_FORM.LABELS.ZIP_CODE}
                </Label>
                <Input
                  id="cep"
                  value={cep}
                  className={`${cepError ? "border-red-500" : ""}`}
                  onChange={(e) => {
                    setCep(cepMask(e.target.value) ?? "");

                    // validate the cep
                    if (cepMask(e.target.value) !== null) {
                      if (cepMask(e.target.value)?.length === 9) {
                        setCepError("");
                      } else {
                        setCepError("CEP inválido");
                      }
                    }
                  }}
                  placeholder={I18n.MAIN_FORM.PLACEHOLDERS.ZIP_CODE}
                />
                {cepError !== "" && (
                  <div className="col-span-4 text-red-500 text-sm mt-1">
                    {cepError}
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
      <AlertProduct open={open} setOpen={setOpen} img={img} />
      <AlertWeight open={openWeight} setOpen={setOpenWeight} />
    </>
  );
};
