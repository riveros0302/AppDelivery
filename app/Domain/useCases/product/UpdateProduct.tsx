import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";

const { update } = new ProductRepositoryImpl();

import React from "react";
import { Product } from "../../entities/Product";

export const UpdateProductUseCase = async (product: Product) => {
  return await update(product);
};
