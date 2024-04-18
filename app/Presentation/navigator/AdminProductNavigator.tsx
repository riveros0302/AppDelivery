import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminProductListScreen from "../views/admin/product/list/ProductList";
import { Category } from "../../Domain/entities/Category";
import { StackScreenProps } from "@react-navigation/stack";
import { CategoryStackParamList } from "./AdminCategoryNavigator";
import AdminProductCreateScreen from "../views/admin/product/create/ProductCreate";
import { Icon } from "react-native-elements";
import { MyColors } from "../theme/Apptheme";
import { ProductProvider } from "../context/ProductContext";
import AdminProductUpdateScreen from "../views/admin/product/update/ProductUpdate";
import { Product } from "../../Domain/entities/Product";

export type ProductStackParamList = {
  AdminProductListScreen: { category: Category };
  AdminProductCreateScreen: { category: Category };
  AdminProductUpdateScreen: { category: Category; product: Product };
};

const Stack = createNativeStackNavigator<ProductStackParamList>();
interface Props
  extends StackScreenProps<CategoryStackParamList, "AdminProductNavigator"> {}

export default function AdminProductNavigator({ navigation, route }: Props) {
  return (
    <ProductState>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="AdminProductListScreen"
          component={AdminProductListScreen}
          initialParams={{ category: route.params.category }}
          options={({ route, navigation }) => ({
            title: "Productos",
            headerShown: true,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("AdminProductCreateScreen")}
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
          name="AdminProductCreateScreen"
          component={AdminProductCreateScreen}
          initialParams={{ category: route.params.category }}
          options={{ headerShown: true, title: "Nuevo Producto" }}
        />

        <Stack.Screen
          name="AdminProductUpdateScreen"
          component={AdminProductUpdateScreen}
          options={{ headerShown: true, title: "Actualizar Producto" }}
        />
      </Stack.Navigator>
    </ProductState>
  );
}

const ProductState = ({ children }: any) => {
  return <ProductProvider>{children}</ProductProvider>;
};
