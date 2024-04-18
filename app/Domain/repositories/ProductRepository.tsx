import { Product } from "../entities/Product";
import * as ImagePicker from "expo-image-picker";
import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";

export interface ProductRepository {
  create(
    product: Product,
    files: ImagePicker.ImagePickerAsset[]
  ): Promise<ResponseApiDelivery>;

  getProductsByCategory(idCategory: string): Promise<Product[]>;
  update(product: Product): Promise<ResponseApiDelivery>;
  updateWithImage(
    product: Product,
    files: ImagePicker.ImagePickerAsset[]
  ): Promise<ResponseApiDelivery>;
  remove(product: Product): Promise<ResponseApiDelivery>;
}
