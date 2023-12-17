import axios from "axios";
import { ProductListResponseDTO } from "../types/types";

export async function getProduct(): Promise<ProductListResponseDTO> {
  const { data } = await axios.get(
    "https://letra-shop.vercel.app/products",
    {}
  );

  return data;
}
