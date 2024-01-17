import { ProductList } from "../types/types";
import { I18n } from "../assets/resources";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import { useFormContext } from "../context/useFormContext";

import { ColorPickerDialog } from "./ColorPickerDialog";
import { Skeleton } from "./ui/skelleton";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type ChartsVisualizationProps = {
  products: ProductList;
  letters: string;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  update: boolean;
  // colorBackground: string;
};

export const ChartsVisualization: React.FC<ChartsVisualizationProps> = ({
  products,
  letters,
  setUpdate,
  update,
  // colorBackground,
}) => {
  const FONT_COLOR = I18n.MAIN_FORM.VALUES.FONT_COLOR;

  const {
    color,
    chart,
    setChart,
    setLetters,
    size,
    type,
    setKitAccentuation,
    setColor,
  } = useFormContext();
  const [colorBackground, setColorBackGround] = useState("#E0E0E0");

  const [kits, setKits] = useState(0);

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

    setKits(kitsNeeded);

    return kitsNeeded;
  }

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

  function addLettersChart() {
    let productsFiltered = products.filter((product) => {
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

    let copyProducts = products;

    let productsSelected: ProductList = [];

    [...letters].map((letter, index) => {
      if (letter !== " " && letter !== "\n") {
        productsFiltered.map((product) => {
          if (letter === product.name.pt.split("-")[1]) {
            productsSelected.push(product);
          } else if (letter === "Ã" && product.name.pt.split("-")[1] === "A") {
            productsSelected.push(product);
          } else if (letter === "Õ" && product.name.pt.split("-")[1] === "O") {
            productsSelected.push(product);
          } else if (letter === "Á" && product.name.pt.split("-")[1] === "A") {
            productsSelected.push(product);
          } else if (letter === "É" && product.name.pt.split("-")[1] === "E") {
            productsSelected.push(product);
          } else if (letter === "Í" && product.name.pt.split("-")[1] === "I") {
            productsSelected.push(product);
          } else if (letter === "Ó" && product.name.pt.split("-")[1] === "O") {
            productsSelected.push(product);
          } else if (letter === "Ú" && product.name.pt.split("-")[1] === "U") {
            productsSelected.push(product);
          } else if (letter === "À" && product.name.pt.split("-")[1] === "A") {
            productsSelected.push(product);
          } else if (letter === "È" && product.name.pt.split("-")[1] === "E") {
            productsSelected.push(product);
          } else if (letter === "Ì" && product.name.pt.split("-")[1] === "I") {
            productsSelected.push(product);
          } else if (letter === "Ò" && product.name.pt.split("-")[1] === "O") {
            productsSelected.push(product);
          } else if (letter === "Ù" && product.name.pt.split("-")[1] === "U") {
            productsSelected.push(product);
          } else if (letter === "Â" && product.name.pt.split("-")[1] === "A") {
            productsSelected.push(product);
          } else if (letter === "Ê" && product.name.pt.split("-")[1] === "E") {
            productsSelected.push(product);
          } else if (letter === "Î" && product.name.pt.split("-")[1] === "I") {
            productsSelected.push(product);
          } else if (letter === "Ô" && product.name.pt.split("-")[1] === "O") {
            productsSelected.push(product);
          } else if (letter === "Û" && product.name.pt.split("-")[1] === "U") {
            productsSelected.push(product);
          } else if (letter === "Ç" && product.name.pt.split("-")[1] === "C") {
            productsSelected.push(product);
          } else if (letter === "Ç" && product.name.pt.split("-")[1] === "C") {
            productsSelected.push(product);
          } else if (letter === "Ç" && product.name.pt.split("-")[1] === "C") {
            productsSelected.push(product);
          } else if (letter === "Ç" && product.name.pt.split("-")[1] === "C") {
            productsSelected.push(product);
          }
        });
      } else {
        if (letter === " ") {
          productsSelected.push({
            id: -1,
            name: { pt: " " },
            description: { pt: " " },
            handle: { pt: " " },
            attributes: [],
            published: true,
            free_shipping: true,
            requires_shipping: true,
            canonical_url: "",
            video_url: null,
            seo_title: { pt: null },
            seo_description: { pt: null },
            brand: null,
            created_at: "",
            updated_at: "",
            variants: [],
            tags: "",
            images: [],
            categories: [],
          });
        } else {
          productsSelected.push({
            id: -2,
            name: { pt: "break-line" },
            description: { pt: "break-line" },
            handle: { pt: "break-line" },
            attributes: [],
            published: true,
            free_shipping: true,
            requires_shipping: true,
            canonical_url: "",
            video_url: null,
            seo_title: { pt: null },
            seo_description: { pt: null },
            brand: null,
            created_at: "",
            updated_at: "",
            variants: [],
            tags: "",
            images: [],
            categories: [],
          });
        }
      }
    });

    let kits = contarUnidades(letters);

    let kit = products.filter((product) => {
      return (
        isExactMatch(product.name.pt.toLowerCase(), color.toLowerCase()) &&
        isExactMatch(
          product.name.pt.toLowerCase(),
          type.toLowerCase() === "QUADRADO" ? "130mm" : "30mm"
        ) &&
        isExactMatch(product.name.pt.toLowerCase(), "kit pontuacao")
      );
    })[0];

    for (let index = 0; index < kits; index++) {
      // add the kits to the chart
      productsSelected.push(kit);
    }

    setChart(productsSelected);

    return;
  }

  useEffect(() => {
    addLettersChart();
    // setUpdate(!update);
  }, [letters, color, size]);

  useEffect(() => {
    if (update) {
      addLettersChart();
      setUpdate(!update);
    }
  }, [update]);

  useEffect(() => {
    let productsFiltered = [
      products.filter((product) => {
        return (
          isExactMatch(product.name.pt.toLowerCase(), color.toLowerCase()) &&
          isExactMatch(
            product.name.pt.toLowerCase(),
            type.toLowerCase() === "QUADRADO" ? "130mm" : "30mm"
          ) &&
          isExactMatch(product.name.pt.toLowerCase(), "kit pontuacao")
        );
      })[0],
    ];

    if (kits !== 0) {
      // check if the number of kits is already correct
      let _kits = [];

      for (let index = 0; index < kits; index++) {
        _kits.push(productsFiltered);
      }

      setKitAccentuation(_kits);
    } else {
      setKitAccentuation([]);
    }
  }, [kits, color, type]);

  useEffect(() => {
    setLetters("520");
  }, [products]);

  let lines = 0;

  return (
    <Card className="w-full max-w-full md:max-w-[618px] lg:max-w-full lg:w-full h-auto">
      <CardHeader className="flex flex-1 items-center gap-8 flex-col md:flex-row lg:flex-row p-2 justify-between">
        {/* <CardTitle>{I18n.MAIN_FORM.LABELS.VISUALIZATION}</CardTitle> */}
        <ColorPickerDialog
          color={colorBackground}
          setColor={setColorBackGround}
        />
        <div className="flex flex-1 flex-col xl:flex-row lg:flex-row md:flex-row sm:flex-col gap-4 items-center justify-end">
          <Label
            htmlFor="fontType"
            className="text-end w-full flex-grow min-w-[200px]"
          >
            {I18n.MAIN_FORM.LABELS.FONT_COLOR}
          </Label>
          <Select
            onValueChange={(e) => {
              setColor(e);
            }}
            defaultValue={color}
          >
            <SelectTrigger id="fontColor" className="w-full min-w-[200px]">
              <SelectValue
                placeholder={I18n.MAIN_FORM.PLACEHOLDERS.FONT_COLOR}
                className="w-full max-w-[200px]"
              />
            </SelectTrigger>
            <SelectContent position="popper" className="w-full min-w-[200px]">
              {Object.values(FONT_COLOR).map((item) => (
                <SelectItem key={item.KEY} value={item.VALUE}>
                  {item.VALUE}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <Separator />
      {/* break-words  */}
      <CardContent
        className="flex flex-1 w-full whitespace-pre-wrap max-w-[804px] h-full min-h-[120px] justify-center items-center content-center gap-6 p-2"
        style={{ background: colorBackground }}
      >
        {/* */}
        <div className="flex overflow-auto flex-wrap break-words flex-row whitespace-pre-wrap w-full h-full justify-center items-center content-center p-4">
          {products?.length === 0 ? (
            <Skeleton className="flex flex-wrap flex-1 max-w-[804px] min-h-[120px] h-full w-full bg-slate-500" />
          ) : chart?.length > 0 ? (
            chart?.map((product, index) => {
              if (product?.id === -1) {
                return (
                  <div
                    key={index}
                    className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] lg:w-[90px] lg:h-[90px] p-1 flex justify-center items-center"
                  >
                    <span className="text-2xl"> </span>
                  </div>
                );
              } else if (product?.id === -2) {
                return (
                  <div
                    key={index}
                    className="w-full h-[40px] md:h-[60px] lg:h-[90px] p-1 flex justify-center items-center"
                    style={{ margin: "10px 0" }}
                  >
                    <span className="text-2xl"> </span>
                  </div>
                );
              } else if (!product.name.pt.toLowerCase().includes("kit")) {
                return (
                  <img
                    key={index}
                    src={product?.images[0]?.src ?? ""}
                    alt={product?.name?.pt}
                    className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] lg:w-[90px] lg:h-[90px] p-1"
                  />
                );
              }
            })
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};
