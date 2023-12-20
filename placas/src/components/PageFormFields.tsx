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

  return (
    <div>
      <form>
        <div className="grid w-full items-center gap-4">
          <ChartsVisualization letters={letters} products={products} />

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="cep" className="text-end">
              {I18n.MAIN_FORM.LABELS.LETTERS}
            </Label>
            <Input
              id="letters"
              value={letters}
              onChange={(e) => {
                const value = e.target.value;
                const regex =
                  /^[A-Za-z0-9áéíóúÁÉÍÓÚñÑçÇâêîôûÂÊÎÔÛàèìòùÀÈÌÒÙãõÃÕ ]+$/;

                // Verifica se o valor atual corresponde à expressão regular
                if (value === "" || regex.test(value.slice())) {
                  setLetters(value.toUpperCase());
                }
              }}
              placeholder={I18n.MAIN_FORM.PLACEHOLDERS.LETTERS}
            />
          </div>

          <div className="flex  lg:flex-row md:flex-row sm:flex-col flex-col w-full gap-4">
            <div className="flex flex-col space-y-1.5 lg:w-full md:w-full">
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

            <div className="flex flex-col space-y-1.5 w-full">
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
            <div className="flex flex-col space-y-1.5 w-full">
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

            <div className="flex flex-col space-y-1.5 w-full">
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
