import { ImagePickerAsset } from "expo-image-picker";
import { User } from "../../Domain/entities/User";
import { UserRepository } from "../../Domain/repositories/UserRepository";
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery";
import { AxiosError } from "axios";
import {
  ApiDelivery,
  ApiDeliveryForImage,
} from "../sources/remote/api/ApiDelivery";
import mime from "mime";

export class UserRepositoryImpl implements UserRepository {
  async getDeliveryMen(): Promise<User[]> {
    try {
      const response = await ApiDelivery.get<User[]>("/users/findDeliveryMen");
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + e);
      return Promise.resolve([]);
    }
  }

  async update(user: User): Promise<ResponseApiDelivery> {
    try {
      const response = await ApiDelivery.put<ResponseApiDelivery>(
        "/users/updateWithoutImage",
        user
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
    user: User,
    file: ImagePickerAsset
  ): Promise<ResponseApiDelivery> {
    try {
      let data = new FormData();

      data.append("image", {
        uri: file.uri,
        type: mime.getType(file.uri)!,
        name: file.uri.split("/").pop(),
      } as any);

      data.append("user", JSON.stringify(user));

      const response = await ApiDeliveryForImage.put<ResponseApiDelivery>(
        "/users/update",
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
}
