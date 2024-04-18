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
import { CategoryStackParamList } from "../../../../navigator/AdminCategoryNavigator";

interface Props
  extends StackScreenProps<
    CategoryStackParamList,
    "AdminCategoryUpdateScreen"
  > {}

export default function AdminCategoryUpdateScreen({
  navigation,
  route,
}: Props) {
  const { category } = route.params;
  const {
    name,
    description,
    image,
    onChange,
    responseMessage,
    loading,
    pickImage,
    takePhoto,
    updateCategory,
  } = useViewModel(category);
  const [modalVisible, setModalVisible] = useState(false);

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
        {image === "" ? (
          <Image
            source={require("../../../../../../assets/image_new.png")}
            style={styles.img}
          />
        ) : (
          <Image source={{ uri: image }} style={styles.img} />
        )}
      </TouchableOpacity>
      <View style={styles.form}>
        <CustomInput
          placeholder="Nombre de la categoría"
          image={require("../../../../../../assets/categories.png")}
          keyboardType="default"
          value={name}
          onChangeText={onChange}
          property="name"
        />
        <CustomInput
          placeholder="Descripción"
          image={require("../../../../../../assets/description.png")}
          keyboardType="default"
          value={description}
          onChangeText={onChange}
          property="description"
        />
      </View>

      <View style={styles.buttonCont}>
        <RoundedButton title="ACTUALIZAR CATEGORIA" onPress={updateCategory} />
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
