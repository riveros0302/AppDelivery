import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminCategoryCreateScreen from "../views/admin/category/create/CategoryCreate";
import { Category } from "../../Domain/entities/Category";
import { CategoryProvider } from "../context/CategoryContext";
import AdminCategoryUpdateScreen from "../views/admin/category/update/CategoryUpdate";
import AdminCategoryListScreen from "../views/admin/category/list/CategoryList";
import { Icon } from "react-native-elements";
import { MyColors } from "../theme/Apptheme";
import AdminProductNavigator from "./AdminProductNavigator";

export type CategoryStackParamList = {
  AdminCategoryListScreen: undefined;
  AdminCategoryCreateScreen: undefined;
  AdminCategoryUpdateScreen: { category: Category };
  AdminProductNavigator: { category: Category };
};

const Stack = createNativeStackNavigator<CategoryStackParamList>();

export default function AdminCategoryNavigator() {
  return (
    <CategoryState>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="AdminCategoryListScreen"
          component={AdminCategoryListScreen}
          options={({ route, navigation }) => ({
            title: "Categorías",
            headerShown: true,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("AdminCategoryCreateScreen")}
              >
                <Icon
                  name="plus-circle"
                  type="material-community"
                  size={30}
                  color={MyColors.primary}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="AdminCategoryCreateScreen"
          component={AdminCategoryCreateScreen}
          options={{ headerShown: true, title: "Actualizar usuario" }}
        />

        <Stack.Screen
          name="AdminCategoryUpdateScreen"
          component={AdminCategoryUpdateScreen}
          options={{ headerShown: true, title: "Actualizar categoria" }}
        />

        <Stack.Screen
          name="AdminProductNavigator"
          component={AdminProductNavigator}
        />
      </Stack.Navigator>
    </CategoryState>
  );
}

const CategoryState = ({ children }: any) => {
  return <CategoryProvider>{children}</CategoryProvider>;
};
