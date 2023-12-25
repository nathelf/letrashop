import axios from "axios";
import { OrderRequestDTO, ProductListResponseDTO } from "../types/types";

export async function getProduct(): Promise<ProductListResponseDTO> {
  const { data } = await axios.get(
    "https://letra-shop.vercel.app/products",
    {}
  );

  return data;
}

export async function createDraftOrder(dto: OrderRequestDTO): Promise<any> {
  const { data } = await axios.post(
    "https://letra-shop.vercel.app/create_order",
    {
      ...dto,
    }
  );

  return data;
}
