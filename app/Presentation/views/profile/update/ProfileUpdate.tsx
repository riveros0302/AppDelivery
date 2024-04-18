import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-elements";
import { MyColors, MyStyles } from "../../../../Presentation/theme/Apptheme";
import useViewModel from "./ViewModel";
import CustomInput from "../../../components/CustomInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ModalPickImage from "../../../components/ModalPickImage";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigator/MainStackNavigator";

interface Props
  extends StackScreenProps<RootStackParamList, "ProfileUpdateScreen"> {}

export const ProfileUpdateScreen = ({ navigation, route }: Props) => {
  const { user } = route.params;
  const {
    name,
    lastname,
    phone,
    errorMesage,
    onChange,
    update,
    pickImage,
    image,
    takePhoto,
    loading,
    successMessage,
  } = useViewModel(user);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (errorMesage != "") {
      ToastAndroid.show(errorMesage, ToastAndroid.LONG);
    }
  }, [errorMesage]);

  useEffect(() => {
    if (successMessage != "") {
      ToastAndroid.show(successMessage, ToastAndroid.LONG);
    }
  }, [successMessage]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../../assets/chef.jpg")}
        style={styles.imgBackground}
      />
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {image === "" ? (
            <Image source={{ uri: user?.image }} style={styles.logoImage} />
          ) : (
            <Image source={{ uri: image }} style={styles.logoImage} />
          )}
        </TouchableOpacity>

        <Text style={styles.logoText}>SELECCIONA UNA IMAGEN</Text>
      </View>
      <View style={styles.form}>
        <KeyboardAwareScrollView>
          <Text style={styles.formText}>ACTUALIZAR</Text>
          <CustomInput
            image={require("../../../../../assets/user.png")}
            placeholder="Nombres"
            keyboardType="default"
            property="name"
            value={name}
            onChangeText={onChange}
          />
          <CustomInput
            image={require("../../../../../assets/my_user.png")}
            placeholder="Apellidos"
            keyboardType="default"
            property="lastname"
            value={lastname}
            onChangeText={onChange}
          />

          <CustomInput
            image={require("../../../../../assets/phone.png")}
            placeholder="Telefono"
            keyboardType="phone-pad"
            property="phone"
            value={phone}
            onChangeText={onChange}
          />

          <Button
            title="CONFIRMAR"
            onPress={update}
            buttonStyle={styles.containerBtn}
            titleStyle={styles.titleBtn}
          />
        </KeyboardAwareScrollView>
      </View>
      <ModalPickImage
        openGallery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
      />
      {loading && (
        <ActivityIndicator
          style={MyStyles.loading}
          size="large"
          color={MyColors.primary}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    height: "50%",
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
    top: "8%",
    alignItems: "center",
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
