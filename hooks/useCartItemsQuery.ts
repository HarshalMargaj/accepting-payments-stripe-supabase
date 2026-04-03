"use client";

import { getCartItems } from "@/lib/getCartItems";
import { useQuery } from "@tanstack/react-query";
import { Prisma } from "@/app/generated/prisma/client";

type Cart = Prisma.CartGetPayload<{
  include: {
    cartItems: {
      include: {
        product: true;
      };
    };
  };
}>;

export const useCartItemsQuery = () => {
  return useQuery<Cart>({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
    staleTime: 5 * 60 * 1000,
  });
};
