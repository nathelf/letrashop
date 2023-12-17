import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

import Colorful from "@uiw/react-color-colorful";

type ColorPickerDialogProps = {
  color: string;
  setColor: React.Dispatch<string>;
};

export const ColorPickerDialog: React.FC<ColorPickerDialogProps> = ({
  color,
  setColor,
}) => {
  const [newColor, setNewColor] = useState("#FFF");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="flex gap-1">
          <span
            className="block w-6 h-6 rounded-full shadow-md"
            style={{ background: color }}
          ></span>
          {"Definir cor"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="items-center">
          <AlertDialogTitle>{"Selecione uma cor de fundo"}</AlertDialogTitle>
          <AlertDialogDescription>
            <Colorful
              color={newColor}
              onChange={(color) => {
                setNewColor(color.hexa);
              }}
              disableAlpha
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{"Cancelar"}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setColor(newColor);
            }}
          >
            {"Selecionar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
