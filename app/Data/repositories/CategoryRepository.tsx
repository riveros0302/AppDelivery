import { AxiosError } from "axios";
import { Category } from "../../Domain/entities/Category";
import { CategoryRepository } from "../../Domain/repositories/CategoryRepository";
import {
  ApiDelivery,
  ApiDeliveryForImage,
} from "../sources/remote/api/ApiDelivery";
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";

export class CategoryRepositoryImpl implements CategoryRepository {
  async getAll(): Promise<Category[]> {
    try {
      const response = await ApiDelivery.get<Category[]>("/categories/getAll");
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + e);

      return Promise.resolve([]);
    }
  }

  async create(
    category: Category,
    file: ImagePicker.ImagePickerAsset
  ): Promise<ResponseApiDelivery> {
    try {
      let data = new FormData();

      data.append("image", {
        uri: file.uri,
        type: mime.getType(file.uri)!,
        name: file.uri.split("/").pop(),
      } as any);

      data.append("category", JSON.stringify(category));

      const response = await ApiDeliveryForImage.post<ResponseApiDelivery>(
        "/categories/create",
        data
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + e);
      const apiError: ResponseApiDelivery = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve(apiError);
    }
  }

  async update(category: Category): Promise<ResponseApiDelivery> {
    try {
      const response = await ApiDelivery.put<ResponseApiDelivery>(
        "/categories/update",
        category
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + e);
      const apiError: ResponseApiDelivery = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve(apiError);
    }
  }

  async updateWithImage(
    category: Category,
    file: ImagePicker.ImagePickerAsset
  ): Promise<ResponseApiDelivery> {
    try {
      let data = new FormData();

      data.append("image", {
        uri: file.uri,
        type: mime.getType(file.uri)!,
        name: file.uri.split("/").pop(),
      } as any);

      data.append("category", JSON.stringify(category));

      const response = await ApiDeliveryForImage.put<ResponseApiDelivery>(
        "/categories/updateWithImage",
        data
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + e);
      const apiError: ResponseApiDelivery = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve(apiError);
    }
  }

  async remove(id: string): Promise<ResponseApiDelivery> {
    try {
      const response = await ApiDelivery.delete<ResponseApiDelivery>(
        `/categories/delete/${id}`
      );

      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + e);
      const apiError: ResponseApiDelivery = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve(apiError);
    }
  }
}
