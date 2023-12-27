import { ProductList } from "../types/types";
import { I18n } from "../assets/resources";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import { useFormContext } from "../context/useFormContext";

import { ColorPickerDialog } from "./ColorPickerDialog";

type ChartsVisualizationProps = {
  products: ProductList;
  letters: string;
};

export const ChartsVisualization: React.FC<ChartsVisualizationProps> = ({
  products,
  letters,
}) => {
  const { color, chart, setChart, setLetters, size } = useFormContext();
  const [colorBackground, setColorBackGround] = useState("#E0E0E0");

  useEffect(() => {
    let productsFiltered = products.filter((product) => {
      return (
        product.name.pt.toLowerCase().includes(color.toLowerCase()) &&
        product.name.pt.toLowerCase().includes(size.toLowerCase())
      );
    });

    let productsSelected: ProductList = [];

    [...letters].map((letter, index) => {
      if (letter !== " ") {
        productsFiltered.map((product) => {
          if (letter === product.name.pt.split("-")[1]) {
            productsSelected.push(product);
          }
        });
      } else {
        productsSelected.push({
          id: -1,
          name: { pt: " " },
          description: { pt: " " },
          handle: { pt: " " },
          attributes: [],
          published: true,
          free_shipping: true,
          requires_shipping: true,
          canonical_url: "",
          video_url: null,
          seo_title: { pt: null },
          seo_description: { pt: null },
          brand: null,
          created_at: "",
          updated_at: "",
          variants: [],
          tags: "",
          images: [],
          categories: [],
        });
      }
    });

    console.log(productsSelected);

    setChart(productsSelected);
  }, [letters, color, size]);

  useEffect(() => {
    setTimeout(() => {
      setLetters("520");
    }, 1500);
  }, []);

  return (
    <Card className="w-full max-w-[236px] md:max-w-[618px] lg:max-w-full lg:w-full h-auto">
      <CardHeader className="flex flex-1 items-center gap-2 flex-col md:flex-row lg:flex-row p-2">
        {/* <CardTitle>{I18n.MAIN_FORM.LABELS.VISUALIZATION}</CardTitle> */}
        <ColorPickerDialog
          color={colorBackground}
          setColor={setColorBackGround}
        />
      </CardHeader>

      <Separator />
      <CardContent
        className="flex flex-1 max-w-[800px] h-full min-h-[120px] justify-center items-center content-center break-words gap-6 p-6"
        style={{ background: colorBackground }}
      >
        <div className="flex flex-wrap flex-row justify-center items-center content-center">
          {chart.length > 0
            ? chart.map((product, index) => {
                if (product.id === -1) {
                  return (
                    <div
                      key={index}
                      className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] lg:w-[90px] lg:h-[90px] p-1 flex justify-center items-center"
                    >
                      <span className="text-2xl"> </span>
                    </div>
                  );
                } else {
                  return (
                    <img
                      key={index}
                      src={product.images[0].src}
                      alt={product.name.pt}
                      className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] lg:w-[90px] lg:h-[90px] p-1"
                    />
                  );
                }
              })
            : null}
        </div>
      </CardContent>
    </Card>
  );
};
