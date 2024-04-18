import React, { useState, useEffect, useContext } from "react";
import { LoginAuthUseCase } from "../../../Domain/useCases/auth/LoginAuth";
import { SaveUserLocalUseCase } from "../../../Domain/useCases/userLocal/SaveUserLocal";
import { useUserLocal } from "../../hooks/useUserLocal";
import { UserContext } from "../../context/UserContext";

function HomeViewModel() {
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({ email: "", password: "" });

  // const { user, getUserSession } = useUserLocal();
  const { user, saveUserSession } = useContext(UserContext);

  const onChange = (property: string, value: any) => {
    // any indica que el valor que recibirá value no se sabe si sera entero o string o cualquiera, es por eso que se usa any para indicarle que el valor puede ser cualquiera
    setValues({ ...values, [property]: value }); //los ... sirven para desestructurar a vlaues y no estar escribiendo cada uno de sus valores como values.email, vlaues.password
  };

  const login = async () => {
    if (isValidForm()) {
      const response = await LoginAuthUseCase(values.email, values.password);
      console.log("RESPONSE: " + JSON.stringify(response));
      if (!response.success) {
        setErrorMessage(response.message);
      } else {
        saveUserSession(response.data);
      }
    }
  };

  const isValidForm = (): boolean => {
    if (values.email === "") {
      setErrorMessage("Ingresa el correo electronico");
      return false;
    }
    if (values.password === "") {
      setErrorMessage("Ingresa la contraseña");
      return false;
    }
    return true;
  };

  return {
    ...values, //necesitamos retornar el valor desestructurado ya que no podemos pasar el objeto completo, asi le estamos diciendo que retornara values.email y values.password
    user,
    onChange,
    login,
    errorMessage,
  };
}

export default HomeViewModel;
