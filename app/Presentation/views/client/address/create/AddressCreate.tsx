import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { Image } from "react-native-elements";
import React, { useState, useEffect } from "react";
import CustomInput from "../../../../components/CustomInput";
import useViewModel from "./ViewModel";
import { RoundedButton } from "../../../../components/RoundedButton";
import ModalPickImage from "../../../../components/ModalPickImage";
import { MyColors, MyStyles } from "../../../../theme/Apptheme";
import { StackScreenProps } from "@react-navigation/stack";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientAddressCreateScreen"> {}

export default function ClientAddressCreateScreen({
  navigation,
  route,
}: Props) {
  const {
    address,
    neighborhood,
    refPoint,
    onChange,
    onChangeRefPoint,
    responseMessage,
    loading,
    createAddress,
  } = useViewModel();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (route.params?.refPoint) {
      onChangeRefPoint(
        route.params?.refPoint,
        route.params?.latitude,
        route.params?.longitude
      );
    }
  }, [route.params?.refPoint]);

  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imgContainer}
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={require("../../../../../../assets/map.png")}
          style={styles.img}
        />
      </TouchableOpacity>
      <View style={styles.form}>
        <CustomInput
          placeholder="Nombre de la dirección"
          image={require("../../../../../../assets/categories.png")}
          keyboardType="default"
          value={address}
          onChangeText={onChange}
          property="address"
        />
        <CustomInput
          placeholder="Calle"
          image={require("../../../../../../assets/description.png")}
          keyboardType="default"
          value={neighborhood}
          onChangeText={onChange}
          property="neighborhood"
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("ClientAddressMapScreen")}
        >
          <CustomInput
            placeholder="Punto de referencia"
            image={require("../../../../../../assets/description.png")}
            keyboardType="default"
            value={refPoint}
            onChangeText={onChange}
            property="refPoint"
            editable={false}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonCont}>
        <RoundedButton title="CREAR DIRECCIÓN" onPress={createAddress} />
      </View>

      {loading && (
        <ActivityIndicator
          style={MyStyles.loading}
          size="large"
          color={MyColors.primary}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  imgContainer: {
    paddingTop: 50,
  },
  form: {
    backgroundColor: "white",
    height: "60%",
    width: "100%",
    borderRadius: 40,
    paddingHorizontal: 30,
    position: "absolute",
    bottom: 0,
  },
  buttonCont: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },
});
