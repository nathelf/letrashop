import {
  FC,
  ReactElement,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getProduct } from "../lib/request";
import { ProductList } from "../types/types";

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
};

const FormContext = createContext({} as FormContextData);

const FormProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [letters, setLetters] = useState<string>("ABC-1");
  const [products, setProducts] = useState<ProductList>([]);
  const [cep, setCep] = useState<string>("");
  const [color, setColor] = useState<string>("Preto");
  const [size, setSize] = useState<string>("30mm");
  const [type, setType] = useState<string>("Clássica");
  const [quantity, setQuantity] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [shippingCost, setShippingCost] = useState<number>(15);

  const [chart, setChart] = useState<ProductList>([]);

  useEffect(() => {
    getProduct().then((response) => {
      setProducts(response);
    });
  }, []);

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
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

export { FormProvider, FormContext };
