import "./App.css";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

import { I18n } from "./assets/resources";
import { PageFormFields } from "./components/PageFormFields";
import { useEffect, useState } from "react";
import { Label } from "./components/ui/label";
import { CardItem } from "./components/CardItem";
import { formatMoney } from "./lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./components/ui/alert-dialog";

import { useFormContext } from "./context/useFormContext";

function App() {
  const [position, setPosition] = useState([51.505, -0.09]);

  const {
    letters,
    total,
    quantity,
    shippingCost,
    products,
    color,
    type,
    chart,
    size,
    cep,
  } = useFormContext();

  useEffect(() => {
    // find the products that contains 'ouro espelhado'
    const productsFiltered = products.filter((product) => {
      return product.name.pt.toLowerCase().includes("ouro espelhado");
    });
  }, [products]);

  const calculateFrete = (totalChars: number) => {
    // Exemplo: frete fixo de R$ 15,00 ou R$ 1,00 por caractere, o que for maior
    var fretePorCaractere = totalChars * 1;
    var freteFixo = 15;
    return Math.max(fretePorCaractere, freteFixo);
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-between p-24 gap-6">
      <Card className="flex flex-1 laptop:min-w-[886px] flex-col">
        <CardHeader className={"flex flex-1 justify-center items-center"}>
          <CardTitle className={"flex flex-1 font-bold text-5xl"}>
            {I18n.MAIN_FORM.TITLE}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-1 flex-nowrap flex-col gap-6">
            <PageFormFields />
          </div>
        </CardContent>
        <div className="flex flex-1 p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full max-w-[978px] justify-between">
            <CardItem
              text={I18n.MAIN_FORM.CARDS.UNIT_PRICE.VALUE}
              title={I18n.MAIN_FORM.CARDS.UNIT_PRICE.TITLE}
              observation={I18n.MAIN_FORM.CARDS.UNIT_PRICE.DESCRIPTION}
            />
            <CardItem
              title={I18n.MAIN_FORM.CARDS.SUBTOTAL.TITLE}
              text={formatMoney(quantity)}
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
        </div>
        <CardFooter className="flex justify-center">
          {/*  */}
          <Button
            className="flex flex-1 w-full h-14"
            onClick={() => {
              // make a payload with all informations and download as json
              const payload = {
                total: letters.length * 6.9,
                shippingCost,
                color,
                type,
                chart,
                size,
                cep,
              };

              const payloadJson = JSON.stringify(payload);
              const payloadBlob = new Blob([payloadJson], {
                type: "application/json",
              });
              const payloadUrl = URL.createObjectURL(payloadBlob);

              // serve the file to download

              window.open(payloadUrl);
            }}
          >
            {I18n.MAIN_FORM.ACTIONS.MAKE_ORDER}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

export default App;
