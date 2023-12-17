import { ProductList } from "../types/types";
import { I18n } from "../assets/resources";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import { useFormContext } from "../context/useFormContext";

import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex } from "@uiw/color-convert";
import { ColorPickerDialog } from "./ColorPickerDialog";

type ChartsVisualizationProps = {
  products: ProductList;
  letters: string;
};

export const ChartsVisualization: React.FC<ChartsVisualizationProps> = ({
  products,
  letters,
}) => {
  const { color, chart, setChart } = useFormContext();
  const [colorBackground, setColorBackGround] = useState("#FFF");

  useEffect(() => {
    // find the products that contains 'ouro espelhado'

    let productsFiltered = products.filter((product) => {
      return product.name.pt.toLowerCase().includes(color.toLowerCase());
    });

    let productsSelected: ProductList = [];
    [...letters].map((letter, index) => {
      productsFiltered.map((product) => {
        if (letter === product.name.pt.split("-")[1]) {
          productsSelected.push(product);
        }
      });
    });

    setChart(productsSelected);
  }, [letters, color]);

  return (
    <Card>
      <CardHeader className="flex-1 flex-row items-center gap-4">
        <CardTitle>{I18n.MAIN_FORM.LABELS.VISUALIZATION}</CardTitle>
        <ColorPickerDialog
          color={colorBackground}
          setColor={setColorBackGround}
        />
      </CardHeader>

      <Separator />
      <CardContent className="flex flex-1 max-w-[800px] h-full min-h-[250px] justify-center items-center break-words gap-6">
        <div className="flex flex-wrap">
          {chart.length > 0
            ? chart.map((product, index) => {
                return (
                  <img
                    key={index}
                    src={product.images[0].src}
                    alt={product.name.pt}
                    className="w-[60px] h-[60px] p-1"
                  />
                );
              })
            : null}
        </div>
      </CardContent>
    </Card>
  );
};
