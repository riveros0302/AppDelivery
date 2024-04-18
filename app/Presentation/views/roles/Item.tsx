import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { Rol } from "../../../Domain/entities/Rol";
import { MyColors } from "../../theme/Apptheme";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigator/MainStackNavigator";

interface Props {
  rol: Rol;
  height: number;
  width: number;
  navigation: StackNavigationProp<RootStackParamList, "RolesScreen", undefined>;
}

export default function RolesItem({ rol, height, width, navigation }: Props) {
  console.log("RECIBE IMAGENES: " + rol.image);
  return (
    <TouchableOpacity
      onPress={() => {
        console.log("NOMBRE DE ROL: " + rol.name);
        if (rol.name == "ADMIN") {
          navigation.replace("AdminTabsNavigator");
        } else if (rol.name == "CLIENTE") {
          navigation.replace("ClientTabsNavigator");
        } else if (rol.name == "REPARTIDOR") {
          navigation.replace("DeliveryTabsNavigator");
        }
      }}
      style={{ ...styles.touch, height: height, width: width }}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: rol.image }} style={styles.img} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{rol.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touch: {
    alignSelf: "center",
    paddingBottom: 20,
    paddingHorizontal: 7,
  },
  img: {
    flex: 1,
    resizeMode: "contain",
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 18,
  },
  titleContainer: {
    height: 50,
    backgroundColor: MyColors.primary,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
  },
});
