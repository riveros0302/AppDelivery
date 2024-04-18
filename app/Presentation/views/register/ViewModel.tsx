import React, { useState } from "react";
import { ApiDelivery } from "../../../Data/sources/remote/api/ApiDelivery";
import { RegisterAuthUseCase } from "../../../Domain/useCases/auth/RegisterAuth";
import * as ImagePicker from "expo-image-picker";
import { RegisterWithImageAuthUseCase } from "../../../Domain/useCases/auth/RegisterWithImageAuth";
import { SaveUserLocalUseCase } from "../../../Domain/useCases/userLocal/SaveUserLocal";
import { useUserLocal } from "../../hooks/useUserLocal";

function RegisterViewModel() {
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    image: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMesage, setErrorMesage] = useState("");
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
  const { user, getUserSession } = useUserLocal();
  const [loading, setLoading] = useState(false);

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

  const isValidForm = (): boolean => {
    if (values.name === "") {
      setErrorMesage("Ingresa tu nombre");
      return false;
    }
    if (values.lastname === "") {
      setErrorMesage("Ingresa tu apellido");
      return false;
    }
    if (values.email === "") {
      setErrorMesage("Ingresa tu correo electrónico");
      return false;
    }
    if (values.phone === "") {
      setErrorMesage("Ingresa tu numero de telefono");
      return false;
    }
    if (values.password === "") {
      setErrorMesage("Ingresa una contraseña");
      return false;
    }
    if (values.confirmPassword === "") {
      setErrorMesage("Ingresa la confirmación de la contraseña");
      return false;
    }
    if (values.password !== values.confirmPassword) {
      setErrorMesage("Las contraseñas no coinciden");
      return false;
    }
    if (values.image === "") {
      setErrorMesage("Seleccione una imagen");
      return false;
    }

    return true;
  };

  const register = async () => {
    if (isValidForm()) {
      setLoading(true);
      //const response = await RegisterAuthUseCase(values);
      const response = await RegisterWithImageAuthUseCase(values, file!);
      setLoading(false);
      console.log("RESULT: " + JSON.stringify(response));

      if (response.success) {
        await SaveUserLocalUseCase(response.data);
        getUserSession();
      } else {
        setErrorMesage(response.message);
      }
    }
  };

  return {
    ...values,
    onChange,
    user,
    register,
    errorMesage,
    pickImage,
    takePhoto,
    loading,
  };
}

export default RegisterViewModel;
