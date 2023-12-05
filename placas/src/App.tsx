import "./App.css";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

import { Separator } from "./components/ui/separator";
import { I18n } from "./assets/resources";
import { PageFormFields } from "./components/PageFormFields";
import { useEffect, useState } from "react";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
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

function App() {
  const [letters, setLetters] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [shippingCost, setShippingCost] = useState<number>(15);
  const [position, setPosition] = useState([51.505, -0.09]);

  useEffect(() => {
    // Check if the browser supports geolocation
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);

          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  }, []);

  useEffect(() => {
    // ignore the whitespaces
    const lettersWithoutSpaces = letters.replace(/\s/g, "");
    // get the letters quantity
    const lettersQuantity = lettersWithoutSpaces.length;
    // get the total value
    const total = lettersQuantity * 6.9;

    setQuantity(total);

    // get the shipping cost
    const _shippingCost = calculateFrete(lettersQuantity);
    setShippingCost(_shippingCost);

    // get the total value
    setTotal(total + _shippingCost);
  }, [letters]);

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
            <PageFormFields letters={letters} setLetters={setLetters} />
            <Card>
              <CardHeader>
                <CardTitle>{I18n.MAIN_FORM.LABELS.VISUALIZATION}</CardTitle>
              </CardHeader>

              <Separator />
              <CardContent className="flex flex-1 w-full h-full min-h-[250px] justify-center items-center break-words gap-6">
                <Textarea
                  disabled
                  value={letters}
                  className="flex flex-1 flex-shrink min-h-[300px] h-auto break-words max-w-[886px] text-center font-bold text-6xl cursor-default"
                />
              </CardContent>
            </Card>
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex flex-1 w-full h-14">
                {I18n.MAIN_FORM.ACTIONS.MAKE_ORDER}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Exemplo de pedido</AlertDialogTitle>
                <AlertDialogDescription>
                  {/* shows the informations about the order */}
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row justify-between">
                      <Label className="text-sm">
                        {I18n.MAIN_FORM.CARDS.SHIPPING_COST.TITLE}
                      </Label>
                      <span className="text-sm">
                        {formatMoney(shippingCost)}
                      </span>
                    </div>
                    <div className="flex flex-row justify-between">
                      <Label className="text-sm">
                        {I18n.MAIN_FORM.CARDS.TOTAL.TITLE}
                      </Label>
                      <span className="text-sm">
                        {formatMoney(total + shippingCost)}
                      </span>
                    </div>
                    {/* the letters */}
                    <div className="flex flex-row justify-between">
                      <Label className="text-sm">{"Letras selecionadas"}</Label>
                      <span className="text-sm">{letters}</span>
                    </div>
                    {/* the address */}
                    <div className="flex flex-row justify-between">
                      <Label className="text-sm">{"Coordenadas"}</Label>
                      <span className="text-sm">
                        <p>{`${position[0]}, ${position[1]}`}</p>
                      </span>
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Fechar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </main>
  );
}

export default App;
