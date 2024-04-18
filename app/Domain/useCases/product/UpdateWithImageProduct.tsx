import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";

const { updateWithImage } = new ProductRepositoryImpl();

import React from "react";
import { Product } from "../../entities/Product";
import * as ImagePicker from "expo-image-picker";

export const UpdateWithImageProductUseCase = async (
  product: Product,
  files: ImagePicker.ImagePickerAsset[]
) => {
  return await updateWithImage(product, files);
};
