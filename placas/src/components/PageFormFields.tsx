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
import { useState } from "react";

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
  } = useFormContext();

  const FONT_TYPE = I18n.MAIN_FORM.VALUES.FONT_TYPE;
  const FONT_SIZE = I18n.MAIN_FORM.VALUES.FONT_SIZE;
  const FONT_COLOR = I18n.MAIN_FORM.VALUES.FONT_COLOR;

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

    console.log("/: ", contadorBarra);
    console.log("^", contadorCircunflexo);
    console.log(".:", contadorPonto);
    console.log("- ou ~: ", contadorTraco);
    console.log(", ou ' ou `", contadorVirgula);
    console.log("ç: ", contadorCedilha);

    return 0;
  }

  return (
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
                const value = e.target.value;
                let regex;

                if (size === "30mm" || size === "130mm") {
                  regex =
                    /^[A-Za-z0-9áéíóúÁÉÍÓÚñÑçÇâêîôûÂÊÎÔÛàèìòùÀÈÌÒÙãõÃÕ -\/\\,.^]+$/;
                } else {
                  regex = /^[0-9]+$/;
                }

                // Verifica se o valor atual corresponde à expressão regular
                if (value === "" || regex.test(value.slice())) {
                  console.log(contarUnidades(value.toUpperCase()));
                  setLetters(value.toUpperCase());
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
                        value={FONT_TYPE.TYPE_2.VALUE}
                      >
                        {FONT_TYPE.TYPE_2.VALUE}
                      </SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem
                        key={FONT_TYPE.TYPE_1.KEY}
                        value={FONT_TYPE.TYPE_1.VALUE}
                      >
                        {FONT_TYPE.TYPE_1.VALUE}
                      </SelectItem>
                      <SelectItem
                        key={FONT_TYPE.TYPE_2.KEY}
                        value={FONT_TYPE.TYPE_2.VALUE}
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
  );
};
