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
import { useEffect, useState } from "react";
import { cepMask } from "../lib/utils";
import { ChartsVisualization } from "./ChatsVisualization";
import { ProductList } from "../types/types";
import { useFormContext } from "../context/useFormContext";
import axios from "axios";

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
  const [erro, setErro] = useState("");

  const obterLocalizacao = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(obterEndereco, exibirErro);
    } else {
      setErro("Geolocalização não é suportada neste navegador.");
    }
  };

  const obterEndereco = async (position) => {
    const { latitude, longitude } = position.coords;

    try {
      // Substitua 'SUA_API_DE_GEOCODIFICACAO_REVERSA' pela sua API de geocodificação reversa
      const respostaGeocodificacao = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );

      const enderecoObtido = respostaGeocodificacao.data.address;

      // Usando o ViaCEP para obter informações adicionais do endereço
      const respostaViaCEP = await axios.get(
        `https://viacep.com.br/ws/${enderecoObtido.postcode}/json/`
      );

      setCep(respostaViaCEP.data.cep);
    } catch (error) {
      setErro("Erro ao obter endereço: " + error.message);
    }
  };

  const exibirErro = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setErro("Usuário negou a solicitação de geolocalização.");
        break;
      case error.POSITION_UNAVAILABLE:
        setErro("Informações de localização indisponíveis.");
        break;
      case error.TIMEOUT:
        setErro("A solicitação para obter a localização do usuário expirou.");
        break;
      default:
        setErro("Ocorreu um erro desconhecido.");
    }

    console.log(error.code, erro);
  };

  useEffect(() => {
    obterLocalizacao();
  }, []);

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
                const value = e.target.value;
                const regex =
                  /^[A-Za-z0-9áéíóúÁÉÍÓÚñÑçÇâêîôûÂÊÎÔÛàèìòùÀÈÌÒÙãõÃÕ ]+$/;

                // Verifica se o valor atual corresponde à expressão regular
                if (value === "" || regex.test(value.slice())) {
                  setLetters(value);
                }
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
