import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ToastAndroid,
} from "react-native";
import { Button } from "react-native-elements";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

import { MyColors } from "../../../Presentation/theme/Apptheme";
import useViewModel from "./ViewModel"; //usamos useViewModel para poder obtener email y password, es por eso que no estamos llmaando a HomeViewModel el cual fue que indicamos como export defaul en ViewModel.tsx
import CustomInput from "../../components/CustomInput";
import { RootStackParamList } from "../../navigator/MainStackNavigator";

interface Props extends StackScreenProps<RootStackParamList, "HomeScreen"> {}

export default function HomeScreen({ navigation }: Props) {
  const { email, password, onChange, login, errorMessage, user } =
    useViewModel();

  useEffect(() => {
    if (errorMessage !== "") {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (user?.id !== null && user?.id !== undefined && user?.id !== "") {
      if (user.roles?.length! > 1) {
        navigation.replace("RolesScreen");
      } else {
        navigation.replace("ClientTabsNavigator");
      }
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/chef.jpg")}
        style={styles.imgBackground}
      />
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../../assets/logo.png")}
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>FOOD APP</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.formText}>INGRESAR</Text>
        <CustomInput
          image={require("../../../../assets/email.png")}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          value={email}
          property="email"
          onChangeText={onChange}
        />
        <CustomInput
          image={require("../../../../assets/password.png")}
          placeholder="Contraseña"
          keyboardType="default"
          value={password}
          property="password"
          onChangeText={onChange}
          secureTextEntry={true}
        />

        <Button
          title="ENTRAR"
          onPress={login}
          buttonStyle={styles.containerBtn}
          titleStyle={styles.titleBtn}
        />

        <View style={styles.containerRegister}>
          <Text>Aun no tienes cuenta?</Text>
          <Text
            style={styles.textRegister}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            {" "}
            Registrate
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  imgBackground: {
    width: "100%",
    height: "100%",
    opacity: 0.7,
    bottom: "30%",
  },
  form: {
    width: "100%",
    height: "40%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
  },
  formText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  formTextInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: MyColors.secondary,
    marginLeft: 15,
  },
  formInput: {
    flexDirection: "row",
    marginTop: 30,
  },
  formIcon: {
    width: 25,
    height: 25,
    marginTop: 5,
  },
  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "15%",
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  logoText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
  },
  containerBtn: {
    backgroundColor: MyColors.primary,
    marginTop: 20,
    borderRadius: 20,
    height: 50,
  },
  titleBtn: {
    color: "white",
  },
  containerRegister: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  textRegister: {
    fontStyle: "italic",
    color: MyColors.primary,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: MyColors.primary,
  },
});
