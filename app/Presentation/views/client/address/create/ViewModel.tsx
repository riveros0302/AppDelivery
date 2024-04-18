import React, { useState, useContext, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { CategoryContext } from "../../../../context/CategoryContext";
import { CreateAddressUseCase } from "../../../../../Domain/useCases/address/CreateAddress";
import { UserContext } from "../../../../context/UserContext";

export default function ClientAddressCreateViewModel() {
  const [values, setValues] = useState({
    address: "",
    neighborhood: "",
    refPoint: "",
    lat: 0.0,
    lng: 0.0,
    id_user: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, saveUserSession, getUserSession } = useContext(UserContext);

  useEffect(() => {
    if (user.id != "") {
      onChange("id_user", user.id);
    }
  }, [user]);

  const onChange = (property: string, value: any) => {
    // any indica que el valor que recibirá value no se sabe si sera entero o string o cualquiera, es por eso que se usa any para indicarle que el valor puede ser cualquiera
    setValues({ ...values, [property]: value }); //los ... sirven para desestructurar a vlaues y no estar escribiendo cada uno de sus valores como values.email, vlaues.password
  };

  const onChangeRefPoint = (refPoint: string, lat: number, lng: number) => {
    setValues({ ...values, refPoint: refPoint, lat: lat, lng: lng }); //los ... sirven para desestructurar a vlaues y no estar escribiendo cada uno de sus valores como values.email, vlaues.password
  };

  const createAddress = async () => {
    setLoading(true);
    const response = await CreateAddressUseCase(values);
    setLoading(false);
    setResponseMessage(response.message);
    if (response.success) {
      resetForm();
      user.address = values;
      user.address.id = response.data;
      await saveUserSession(user);
      getUserSession();
    }
  };

  const resetForm = () => {
    setValues({
      address: "",
      neighborhood: "",
      refPoint: "",
      lat: 0.0,
      lng: 0.0,
      id_user: user.id!,
    });
  };

  return {
    ...values,
    onChange,
    onChangeRefPoint,
    loading,
    responseMessage,
    createAddress,
  };
}
