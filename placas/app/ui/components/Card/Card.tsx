"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card as CardChad,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Card() {
  return (
    <CardChad className="w-[350px]">
      <CardHeader>
        <CardTitle>Exemplo de titulo de um card</CardTitle>
        <CardDescription>Exemplo de subtitulo de um card</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" placeholder="Exemplo de placeholder" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="op">Opções</Label>
              <Select>
                <SelectTrigger id="op">
                  <SelectValue placeholder="Selecione alguma coisa" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="1">Op. 1</SelectItem>
                  <SelectItem value="2">Op. 2</SelectItem>
                  <SelectItem value="3">Op. 3</SelectItem>
                  <SelectItem value="4">Op. 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button>Confirmar</Button>
      </CardFooter>
    </CardChad>
  );
}
