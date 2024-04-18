import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Category } from "../../../../../Domain/entities/Category";
import { Icon, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CategoryStackParamList } from "../../../../navigator/AdminCategoryNavigator";

interface Props {
  category: Category;
  remove: (id: string) => void; //void porque no devuelve nada
}

export default function AdminCategoryListItem({ category, remove }: Props) {
  const navigation =
    useNavigation<StackNavigationProp<CategoryStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("AdminProductNavigator", { category: category })
      }
    >
      <View style={styles.container}>
        <Image source={{ uri: category.image }} style={styles.img} />
        <View style={styles.info}>
          <Text style={styles.title}>{category.name}</Text>
          <Text style={styles.desc}>{category.description}</Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AdminCategoryUpdateScreen", {
                category: category,
              })
            }
          >
            <Image
              source={require("../../../../../../assets/edit.png")}
              style={styles.update}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => remove(category.id!)}>
            <Image
              source={require("../../../../../../assets/trash.png")}
              style={styles.update}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divider} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 70,
    marginHorizontal: 20,
    marginTop: 10,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 15,
  },
  info: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    color: "black",
    fontSize: 15,
  },
  desc: {
    color: "grey",
    fontSize: 12,
    marginTop: 3,
  },
  update: {
    width: 25,
    height: 25,
    marginVertical: 2,
  },
  actionContainer: {
    marginRight: 40,
  },
  divider: {
    height: 1,
    backgroundColor: "#f2f2f2",
    flex: 1,
    marginHorizontal: 30,
  },
});
