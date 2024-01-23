import {
  FC,
  ReactElement,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getProduct } from "../lib/request";
import { Product, ProductList, ViaCepResponseDTO } from "../types/types";

type FormContextData = {
  letters: string;
  setLetters: React.Dispatch<React.SetStateAction<string>>;
  products: ProductList;
  cep: string;
  setCep: React.Dispatch<React.SetStateAction<string>>;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  size: string;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  shippingCost: number;
  setShippingCost: React.Dispatch<React.SetStateAction<number>>;
  chart: ProductList;
  setChart: React.Dispatch<React.SetStateAction<ProductList>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  weight: number;
  setWeight: React.Dispatch<React.SetStateAction<number>>;
  setAddress: React.Dispatch<React.SetStateAction<ViaCepResponseDTO>>;
  address: ViaCepResponseDTO;
  cepError: string;
  setCepError: React.Dispatch<React.SetStateAction<string>>;
  kitAccentuation: ProductList;
  setKitAccentuation: React.Dispatch<React.SetStateAction<ProductList>>;
  setSubtotal: React.Dispatch<React.SetStateAction<number>>;
  subtotal: number;
};

const FormContext = createContext({} as FormContextData);

const FormProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [letters, setLetters] = useState<string>("");
  const [products, setProducts] = useState<ProductList>([]);
  const [cep, setCep] = useState<string>("");
  const [color, setColor] = useState<string>("Preto");
  const [size, setSize] = useState<string>("130mm");
  const [type, setType] = useState<string>("REDONDO");
  const [quantity, setQuantity] = useState<number>(0);
  // O total inicial é o frete fixo de R$ 15,00 + o valor de uma letra (R$ 6,90)
  const [total, setTotal] = useState<number>(15 + 27.6);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");

  const [subtotal, setSubtotal] = useState<number>(0);

  const [cepError, setCepError] = useState<string>("");

  // endereço obtido da viaCEP
  const [address, setAddress] = useState<ViaCepResponseDTO>({
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    localidade: "",
    uf: "",
    ibge: "",
    gia: "",
    ddd: "",
    siafi: "",
  });

  const [weight, setWeight] = useState<number>(0);

  const [chart, setChart] = useState<ProductList>([]);
  const [kitAccentuation, setKitAccentuation] = useState<ProductList>([]);

  useEffect(() => {
    getProduct().then((response) => {
      setProducts(response);
    });
  }, []);

  useEffect(() => {
    // ignora todos os espaços em branco
    let lettersFiltered = letters.replace(/\s/g, "");
    setQuantity(lettersFiltered.length);

    setWeight(0);

    chart.map((product) => {
      if (product.id !== -1 && product.id !== -2) {
        setWeight(
          (prev) => prev + parseFloat(product.variants[0].weight) * 1000
        );
      }
    });

    let t = 0;
    if (lettersFiltered.length > 0) {
      chart.map((letter) => {
        if (letter.id !== -1 && letter.id !== -2) {
          t += parseFloat(letter.variants[0].price) ?? 6.9;
        }
      });
    }

    // if (kitAccentuation.length > 0) {
    //   kitAccentuation.map((product) => {
    //     if (product.id !== -1 && product.id !== -2) {
    //       t += parseFloat(product.variants[0].price) ?? 6.9;
    //     }
    //   });

    //   // setSubtotal(t);
    // }

    setSubtotal(t);

    setTotal(t + shippingCost);
  }, [chart]);

  useEffect(() => {
    setTotal(subtotal + shippingCost);
  }, [shippingCost]);

  const contextValue = {
    letters,
    setLetters,
    products,
    cep,
    setCep,
    color,
    setColor,
    size,
    setSize,
    type,
    setType,
    quantity,
    setQuantity,
    total,
    setTotal,
    shippingCost,
    setShippingCost,
    chart,
    setChart,
    city,
    setCity,
    state,
    setState,
    weight,
    setWeight,
    address,
    setAddress,
    cepError,
    setCepError,
    kitAccentuation,
    setKitAccentuation,
    subtotal,
    setSubtotal,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

export { FormProvider, FormContext };
