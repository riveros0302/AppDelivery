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
import { ProductStackParamList } from "../../../../navigator/AdminProductNavigator";
import ModalPickMultipleImage from "../../../../components/ModalPickMultipleImage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Props
  extends StackScreenProps<ProductStackParamList, "AdminProductCreateScreen"> {}

export default function AdminProductCreateScreen({ navigation, route }: Props) {
  const { category } = route.params;
  const {
    name,
    description,
    image1,
    image2,
    image3,
    price,
    onChange,
    responseMessage,
    loading,
    pickImage,
    takePhoto,
    createProduct,
  } = useViewModel(category);
  const [modalVisible, setModalVisible] = useState(false);
  const [numberImage, setNumberImage] = useState(1);

  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <TouchableOpacity
          onPress={() => {
            setNumberImage(1);
            setModalVisible(true);
          }}
        >
          {image1 === "" ? (
            <Image
              source={require("../../../../../../assets/image_new.png")}
              style={styles.img}
            />
          ) : (
            <Image source={{ uri: image1 }} style={styles.img} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setNumberImage(2);
            setModalVisible(true);
          }}
        >
          {image2 === "" ? (
            <Image
              source={require("../../../../../../assets/image_new.png")}
              style={styles.img}
            />
          ) : (
            <Image source={{ uri: image2 }} style={styles.img} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setNumberImage(3);
            setModalVisible(true);
          }}
        >
          {image3 === "" ? (
            <Image
              source={require("../../../../../../assets/image_new.png")}
              style={styles.img}
            />
          ) : (
            <Image source={{ uri: image3 }} style={styles.img} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <KeyboardAwareScrollView>
          <View style={styles.categoryInfo}>
            <Image
              style={styles.imageCategory}
              source={require("../../../../../../assets/categories.png")}
            />
            <Text style={styles.textCategory}>Categoría: </Text>
            <Text>{category.name}</Text>
          </View>
          <CustomInput
            placeholder="Nombre del producto"
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
          <CustomInput
            placeholder="Precio"
            image={require("../../../../../../assets/price.png")}
            keyboardType="numeric"
            value={price.toString()}
            onChangeText={onChange}
            property="price"
          />

          <View style={styles.buttonCont}>
            <RoundedButton title="CREAR PRODUCTO" onPress={createProduct} />
          </View>
        </KeyboardAwareScrollView>
      </View>

      <ModalPickMultipleImage
        openGallery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
        numberImage={numberImage}
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
    width: 110,
    height: 110,
    resizeMode: "contain",
  },
  imgContainer: {
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  form: {
    backgroundColor: "white",
    height: "70%",
    width: "100%",
    borderRadius: 40,
    paddingHorizontal: 30,
    position: "absolute",
    bottom: 0,
  },
  buttonCont: {
    //position: "absolute",
    // bottom: 30,
    // left: 20,
    //  right: 20,
  },
  categoryInfo: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  imageCategory: {
    width: 50,
    height: 50,
  },
  textCategory: {
    marginLeft: 10,
    color: "grey",
    fontSize: 17,
    fontWeight: "bold",
  },
});
