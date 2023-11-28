"use client";
import Image from "next/image";
import { Card } from "./ui/components/Card/Card";
import { Metadata } from "next";
import { Button } from "./ui/components/Button/Button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card />
      <Button />
    </main>
  );
}

// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: "Placas",
//     description: "Sinalize tudo",
//   };
// }
