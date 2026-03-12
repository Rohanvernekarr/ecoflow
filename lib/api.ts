import { CartPayload } from "@/types";
import data from "./mockData.json";

export async function fetchCartData(): Promise<CartPayload> {

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data as CartPayload);
    }, 500);
  });
}
