import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { createDraftOrder } from "../../lib/request";
import { useFormContext } from "../../context/useFormContext";
import { Product } from "../../types/types";
import { useToast } from "../ui/use-toast";

type CheckoutModalProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  open,
  setOpen,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const { chart, address, cep, shippingCost, cepError, setCepError } =
    useFormContext();

  const { toast } = useToast();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
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

            console.log(chart);
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
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Informações adicionais</DialogTitle>
          <DialogDescription>
            {
              "Para efetuar o pedido, precisamos de algumas informações adicionais para identificação e contato."
            }
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col space-y-1.5 w-full">
            <Label htmlFor="name" className="text-right">
              {"Nome"}
            </Label>
            <Input
              id="name"
              className={`col-span-3 ${nameError ? "border-red-500" : ""}`}
              placeholder="Informe seu primeiro nome"
              value={name}
              onChange={(e) => {
                // remove all special (except chars with signals) characters and numbers
                const regex = /^[a-zA-ZÀ-ÿ\s]*$/;

                const value = e.target.value;
                if (value === "" || regex.test(value.slice())) {
                  setName(value);

                  if (value !== "") {
                    setNameError("");
                  }
                }
              }}
            />
            {nameError !== "" && (
              <div className="col-span-4 text-red-500 text-sm mt-1">
                {nameError}
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-1.5 w-full">
            <Label htmlFor="lastname" className="text-right">
              {"Sobrenome"}
            </Label>
            <Input
              id="lastname"
              placeholder="Informe seu sobrenome"
              className={`col-span-3 ${lastNameError ? "border-red-500" : ""}`}
              value={lastName}
              onChange={(e) => {
                // remove all special (except chars with signals) characters and numbers
                const regex = /^[a-zA-ZÀ-ÿ\s]*$/;

                const value = e.target.value;
                if (value === "" || regex.test(value.slice())) {
                  setLastName(value);

                  if (value !== "") {
                    setLastNameError("");
                  }
                }
              }}
            />
            {lastNameError !== "" && (
              <div className="col-span-4 text-red-500 text-sm mt-1">
                {lastNameError}
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-1.5 w-full">
            <Label htmlFor="email" className="text-right">
              {"E-mail"}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com.br"
              className={`col-span-3 ${emailError ? "border-red-500" : ""}`}
              value={email}
              onChange={(e) => {
                // validate the email
                const value = e.target.value;
                const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

                if (regex.test(value.slice())) {
                  setEmailError("");
                } else {
                  setEmailError("E-mail inválido");
                }

                setEmail(value);
              }}
            />
            {emailError !== "" && (
              <div className="col-span-4 text-red-500 text-sm mt-1">
                {emailError}
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{"Voltar"}</Button>
          </DialogClose>

          <Button
            type="submit"
            onClick={async () => {
              // send the data to the backend

              // validate the data and show the errors
              if (name === "") {
                setNameError("Nome é obrigatório");
              }

              if (lastName === "") {
                setLastNameError("Sobrenome é obrigatório");
              }

              if (email === "") {
                setEmailError("E-mail é obrigatório");
              }

              if (name !== "" && lastName !== "" && email !== "") {
                // send the data to the backend
                const data = await createDraftOrder({
                  contact_email: email,
                  contact_lastname: lastName,
                  contact_name: name,
                  payment_status: "unpaid",
                  products: chart.map((product) => ({
                    product_id: product.id,
                    quantity: 1,
                    variant_id: product.variants[0].id,
                  })),
                  shipping: {
                    cost: shippingCost.toString(),
                    // check if the address has only empty strings
                    shipping_address: Object.entries(address).every(
                      ([_, value]) => value === ""
                    )
                      ? {
                          zipcode: cep,
                        }
                      : {
                          address: address.logradouro,
                          city: address.localidade,
                          province: address.uf,
                          zipcode: address.cep,
                        },
                  },
                });

                if (
                  data.checkout_url !== undefined ||
                  data.checkout_url !== ""
                ) {
                  // redirect the user to the checkout page
                  window.location.href = data.checkout_url;
                }
              }
            }}
          >
            {"Realizar pedido e continuar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
