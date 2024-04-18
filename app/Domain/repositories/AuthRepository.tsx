import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { User } from "../entities/User";
import * as ImagePicker from "expo-image-picker";

export interface AuthRepository {
  register(user: User): Promise<ResponseApiDelivery>;
  login(email: string, password: string): Promise<ResponseApiDelivery>;
  registerWithImage(
    user: User,
    file: ImagePicker.ImagePickerAsset
  ): Promise<ResponseApiDelivery>;
}
