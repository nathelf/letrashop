import "./App.css";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

import logo from "./assets/resources/logo.png";

import { I18n } from "./assets/resources";
import { PageFormFields } from "./components/PageFormFields";
import { useEffect, useState } from "react";
import { CardItem } from "./components/CardItem";
import { formatMoney, shippingRates } from "./lib/utils";

import { useFormContext } from "./context/useFormContext";
import axios from "axios";
import { CheckoutModal } from "./components/CheckoutModal/CheckoutModal";
import { Button } from "./components/ui/button";
import { toast } from "./components/ui/use-toast";

function App() {
  const {
    total,
    quantity,
    shippingCost,
    setShippingCost,
    cep,
    setCep,
    city,
    setCity,
    state,
    setState,
    weight,
    setAddress,
    setCepError,
    cepError,
    chart,
    kitAccentuation,
    subtotal,
  } = useFormContext();

  const [erro, setErro] = useState("");
  const [open, setOpen] = useState(false);

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

      setCep(enderecoObtido.postcode);
    } catch (error) {
      setErro("Erro ao obter endereço: " + error.message);
    }
  };

  const getCep = async () => {
    // Usando o ViaCEP para obter informações adicionais do endereço

    if (cep?.length <= 8) {
      return;
    }

    if (cep !== undefined) {
      await axios
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          setAddress(response.data);
          setCity(response.data.localidade);
          setState(response.data.uf);
        });
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

  const calculateFrete = async () => {
    if (weight <= 300) {
      if (state === "PR") {
        setShippingCost(shippingRates["mini"].prices.E3.price);
        return;
      } else if (state === "SP" || state === "RJ" || state === "RS") {
        if (shippingRates["mini"].prices.N1.cities.includes(city)) {
          setShippingCost(shippingRates["mini"].prices.N1.price);
          return;
        } else {
          setShippingCost(shippingRates["mini"].prices.I1.price);
          return;
        }
      } else if (state === "MG" || state === "MS" || state === "RJ") {
        if (shippingRates["mini"].prices.N2.cities.includes(city)) {
          setShippingCost(shippingRates["mini"].prices.N2.price);
          return;
        } else {
          setShippingCost(shippingRates["mini"].prices.I2.price);
          return;
        }
      } else if (state === "DF" || state === "ES" || state === "MT") {
        if (shippingRates["mini"].prices.N3.cities.includes(city)) {
          setShippingCost(shippingRates["mini"].prices.N3.price);
          return;
        } else {
          setShippingCost(shippingRates["mini"].prices.I3.price);
          return;
        }
      } else {
        if (shippingRates["mini"].prices.N4.cities.includes(city)) {
          setShippingCost(shippingRates["mini"].prices.N4.price);
          return;
        } else {
          setShippingCost(shippingRates["mini"].prices.I4.price);
          return;
        }
      }
    } else {
      if (state === "PR") {
        if (weight <= 500) {
          setShippingCost(shippingRates["pac"].prices.E3["500"]);
          return;
        } else if (weight <= 1000) {
          setShippingCost(shippingRates["pac"].prices.E3["1000"]);
          return;
        } else if (weight <= 2000) {
          setShippingCost(shippingRates["pac"].prices.E3["2000"]);
          return;
        } else if (weight <= 3000) {
          setShippingCost(shippingRates["pac"].prices.E3["3000"]);
          return;
        } else if (weight <= 4000) {
          setShippingCost(shippingRates["pac"].prices.E3["4000"]);
          return;
        } else if (weight <= 5000) {
          setShippingCost(shippingRates["pac"].prices.E3["5000"]);
          return;
        } else if (weight <= 6000) {
          setShippingCost(shippingRates["pac"].prices.E3["6000"]);
          return;
        } else if (weight <= 7000) {
          setShippingCost(shippingRates["pac"].prices.E3["7000"]);
          return;
        } else if (weight <= 8000) {
          setShippingCost(shippingRates["pac"].prices.E3["8000"]);
          return;
        } else if (weight <= 9000) {
          setShippingCost(shippingRates["pac"].prices.E3["9000"]);
          return;
        } else if (weight <= 10000) {
          setShippingCost(shippingRates["pac"].prices.E3["10000"]);
          return;
        }
      }
    }
  };

  useEffect(() => {
    if (cep?.length <= 8) {
      setShippingCost(0);
      return;
    }
    getCep();
  }, [cep]);

  useEffect(() => {
    if (cep?.length <= 8 || state === "" || weight === 0 || city === "") {
      setShippingCost(0);
      return;
    }

    calculateFrete();
  }, [weight, state, city]);

  return (
    <main className="flex items-center justify-center w-full h-full overflow-x-auto">
      <Card className="w-full max-w-full sm:max-w-full md:max-w-[700px] lg:max-w-[886px] xl:max-w-[886px] mx-auto p-4">
        <CardHeader className={"flex flex-1 justify-center items-center"}>
          <CardTitle className={"flex flex-1 font-bold text-5xl"}>
            {/* {I18n.MAIN_FORM.TITLE} */}
            <img src={logo} alt="Logo" className="w-[200px] h-[50px]" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-1 w-full flex-col gap-6">
            <PageFormFields />
          </div>
        </CardContent>
        <div className="flex flex-1 p-6 flex-col gap-2">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full max-w-[978px] mx-auto">
            <CardItem
              text={I18n.MAIN_FORM.CARDS.UNIT_PRICE.VALUE}
              title={I18n.MAIN_FORM.CARDS.UNIT_PRICE.TITLE}
              observation={I18n.MAIN_FORM.CARDS.UNIT_PRICE.DESCRIPTION}
            />
            <CardItem
              title={I18n.MAIN_FORM.CARDS.SUBTOTAL.TITLE}
              text={formatMoney(subtotal)}
              observation={I18n.MAIN_FORM.CARDS.SUBTOTAL.DESCRIPTION}
            />
            <CardItem
              title={I18n.MAIN_FORM.CARDS.SHIPPING_COST.TITLE}
              text={formatMoney(shippingCost)}
              observation={I18n.MAIN_FORM.CARDS.SHIPPING_COST.DESCRIPTION}
            />
            <CardItem
              title={I18n.MAIN_FORM.CARDS.TOTAL.TITLE}
              text={formatMoney(quantity === 0 ? 0 : total)}
              observation={I18n.MAIN_FORM.CARDS.TOTAL.DESCRIPTION}
            />
          </div>

          <div className="grid gap-4">
            <CardItem
              title={"Peso total"}
              text={`${weight ?? 0} gramas`}
              observation={"Peso aproximado do pedido"}
            />
            <CardItem
              title={"Kits de acentuação"}
              text={`${kitAccentuation?.length ?? 0} kit(s)`}
              observation={"Kit(s) utilizados para acentuação e pontuação"}
            />
          </div>
        </div>
        <CardFooter className="flex justify-center">
          <Button
            className="flex flex-1 w-full h-14"
            onClick={(e) => {
              if (cep === "") {
                setCepError("CEP é obrigatório");
                return;
              }

              if (cep !== "") {
                setCepError("");
              }

              if (cep.length !== 9) {
                setCepError("CEP inválido");
                return;
              }

              if (chart.length === 0) {
                toast({
                  variant: "destructive",
                  title: "Carrinho vazio",
                  description:
                    "Adicione itens ao carrinho para realizar o pedido",
                });
                return;
              }

              setOpen(true);
            }}
          >
            {"Realizar pedido"}
          </Button>
          <CheckoutModal open={open} setOpen={setOpen} />
        </CardFooter>
      </Card>
    </main>
  );
}

export default App;
