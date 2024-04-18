import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { MyColors } from "../../../../theme/Apptheme";
import { StackNavigationProp } from "@react-navigation/stack";
import { Category } from "../../../../../Domain/entities/Category";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";

interface Props {
  category: Category;
  height: number;
  width: number;
  navigation: StackNavigationProp<
    ClientStackParamList,
    "ClientCategoryListScreen",
    undefined
  >;
}

export default function ClientCategoryItem({
  category,
  height,
  width,
  navigation,
}: Props) {
  console.log("RECIBE IMAGENES: " + category.image);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ClientProductListScreen", {
          idCategory: category.id!,
        });
      }}
      style={{ ...styles.touch, height: height, width: width }}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: category.image }} style={styles.img} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{category.name}</Text>
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
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 18,
  },
  titleContainer: {
    height: 70,
    backgroundColor: "white",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    elevation: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  title: {
    color: "black",
    fontSize: 25,
  },
});
