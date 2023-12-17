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
import { useState } from "react";
import { cepMask } from "../lib/utils";
import { ChartsVisualization } from "./ChatsVisualization";
import { ProductList } from "../types/types";
import { useFormContext } from "../context/useFormContext";

export const PageFormFields: React.FC = () => {
  const {
    letters,
    total,
    quantity,
    shippingCost,
    products,
    setLetters,
    setType,
    type,
    setColor,
    size,
    setSize,
  } = useFormContext();

  const FONT_TYPE = I18n.MAIN_FORM.VALUES.FONT_TYPE;
  const FONT_SIZE = I18n.MAIN_FORM.VALUES.FONT_SIZE;
  const FONT_COLOR = I18n.MAIN_FORM.VALUES.FONT_COLOR;

  const [cep, setCep] = useState("");

  return (
    <div>
      <form>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="fontType">{I18n.MAIN_FORM.LABELS.FONT_TYPE}</Label>
            <Select
              onValueChange={(e) => {
                setType(e);
              }}
            >
              <SelectTrigger id="fontType'">
                <SelectValue
                  placeholder={I18n.MAIN_FORM.PLACEHOLDERS.FONT_TYPE}
                />
              </SelectTrigger>
              <SelectContent position="popper">
                {Object.values(FONT_TYPE).map((item) => (
                  <SelectItem key={item.KEY} value={item.VALUE}>
                    {item.VALUE}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="fontType">{I18n.MAIN_FORM.LABELS.FONT_SIZE}</Label>
            <Select
              onValueChange={(e) => {
                setSize(e);
              }}
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

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="fontType">{I18n.MAIN_FORM.LABELS.FONT_COLOR}</Label>
            <Select
              onValueChange={(e) => {
                setColor(e);
              }}
              defaultValue={FONT_COLOR.COLOR_1.VALUE}
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

          <ChartsVisualization letters={letters} products={products} />

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="cep">{I18n.MAIN_FORM.LABELS.LETTERS}</Label>
            <Input
              id="letters"
              value={letters}
              onChange={(e) => {
                setLetters(e.target.value);
              }}
              placeholder={I18n.MAIN_FORM.PLACEHOLDERS.LETTERS}
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="cep">{I18n.MAIN_FORM.LABELS.ZIP_CODE}</Label>
            <Input
              id="cep"
              value={cep}
              onChange={(e) => {
                setCep(cepMask(e.target.value) ?? "");
              }}
              placeholder={I18n.MAIN_FORM.PLACEHOLDERS.ZIP_CODE}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
