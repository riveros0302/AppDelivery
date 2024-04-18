import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { CreateCategoryUseCase } from "../../../../../Domain/useCases/category/CreateCategory";
import { CategoryContext } from "../../../../context/CategoryContext";

export default function AdminCategoryCreateViewModel() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
  const [loading, setLoading] = useState(false);
  const { create } = useContext(CategoryContext);

  const onChange = (property: string, value: any) => {
    // any indica que el valor que recibirá value no se sabe si sera entero o string o cualquiera, es por eso que se usa any para indicarle que el valor puede ser cualquiera
    setValues({ ...values, [property]: value }); //los ... sirven para desestructurar a vlaues y no estar escribiendo cada uno de sus valores como values.email, vlaues.password
  };

  const createCategory = async () => {
    setLoading(true);
    const response = await create(values, file!);
    setLoading(false);
    setResponseMessage(response.message);
    resetForm();
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

  const resetForm = () => {
    setValues({
      name: "",
      description: "",
      image: "",
    });
  };

  return {
    ...values,
    onChange,
    pickImage,
    takePhoto,
    loading,
    responseMessage,
    createCategory,
  };
}
