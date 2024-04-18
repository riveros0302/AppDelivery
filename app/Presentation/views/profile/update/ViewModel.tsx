import React, { useContext, useState } from "react";
import { ApiDelivery } from "../../../../Data/sources/remote/api/ApiDelivery";
import * as ImagePicker from "expo-image-picker";
import { SaveUserLocalUseCase } from "../../../../Domain/useCases/userLocal/SaveUserLocal";
import { useUserLocal } from "../../../hooks/useUserLocal";
import { UpdateUserUseCase } from "../../../../Domain/useCases/user/UpdateUser";
import { UpdateWithImageUserUseCase } from "../../../../Domain/useCases/user/UpdateWithImageUser";
import { User } from "../../../../Domain/entities/User";
import { ResponseApiDelivery } from "../../../../Data/sources/remote/models/ResponseApiDelivery";
import { UserContext } from "../../../context/UserContext";

function ProfileUpdateViewModel(user: User) {
  const [values, setValues] = useState(user);
  const [errorMesage, setErrorMesage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
  const [loading, setLoading] = useState(false);
  const { getUserSession } = useUserLocal();
  const { saveUserSession } = useContext(UserContext);

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

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const onChangeInfoUpdate = (
    name: string,
    lastname: string,
    phone: string
  ) => {
    setValues({ ...values, name, lastname, phone });
  };

  const isValidForm = (): boolean => {
    if (values.name === "") {
      setErrorMesage("Ingresa tu nombre");
      return false;
    }
    if (values.lastname === "") {
      setErrorMesage("Ingresa tu apellido");
      return false;
    }

    if (values.phone === "") {
      setErrorMesage("Ingresa tu numero de telefono");
      return false;
    }

    return true;
  };

  const update = async () => {
    if (isValidForm()) {
      setLoading(true);
      //const response = await RegisterAuthUseCase(values);
      let response = {} as ResponseApiDelivery;

      if (values.image?.includes("https://")) {
        response = await UpdateUserUseCase(values);
      } else {
        response = await UpdateWithImageUserUseCase(values, file!);
      }

      setLoading(false);
      console.log("RESULT: " + JSON.stringify(response));

      if (response.success) {
        saveUserSession(response.data);
        setSuccessMessage(response.message);
      } else {
        setErrorMesage(response.message);
      }
    }
  };

  return {
    ...values,
    onChange,
    user,
    update,
    errorMesage,
    pickImage,
    takePhoto,
    loading,
    onChangeInfoUpdate,
    successMessage,
  };
}

export default ProfileUpdateViewModel;
