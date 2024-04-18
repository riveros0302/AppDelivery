import React, { useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Category } from "../../../../../Domain/entities/Category";
import { UpdateCategoryUseCase } from "../../../../../Domain/useCases/category/UpdateCategory";
import { UpdateWithImageCategoryUseCase } from "../../../../../Domain/useCases/category/UpdateWithImageCategory";
import { ResponseApiDelivery } from "../../../../../Data/sources/remote/models/ResponseApiDelivery";
import { CategoryContext } from "../../../../context/CategoryContext";

export default function AdminCategoryUpdateViewModel(category: Category) {
  const [values, setValues] = useState(category);
  const [responseMessage, setResponseMessage] = useState("");
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
  const [loading, setLoading] = useState(false);
  const { update, updateWithImage } = useContext(CategoryContext);

  const onChange = (property: string, value: any) => {
    // any indica que el valor que recibirá value no se sabe si sera entero o string o cualquiera, es por eso que se usa any para indicarle que el valor puede ser cualquiera
    setValues({ ...values, [property]: value }); //los ... sirven para desestructurar a vlaues y no estar escribiendo cada uno de sus valores como values.email, vlaues.password
  };

  const updateCategory = async () => {
    setLoading(true);
    let response = {} as ResponseApiDelivery;
    if (values.image?.includes("https://")) {
      //actualizar sin imagen
      response = await update(values);
    } else {
      //actualizar con imagen
      response = await updateWithImage(values, file!);
    }

    setLoading(false);
    setResponseMessage(response.message);
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onChange("image", result.assets[0].uri);
      setFile(result.assets[0]);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onChange("image", result.assets[0].uri);
      setFile(result.assets[0]);
    }
  };

  return {
    ...values,
    onChange,
    pickImage,
    takePhoto,
    loading,
    responseMessage,
    updateCategory,
  };
}
