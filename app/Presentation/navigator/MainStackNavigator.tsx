import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { User } from "../../Domain/entities/User";
import { Category } from "../../Domain/entities/Category";
import { UserProvider } from "../context/UserContext";

import HomeScreen from "../../../app/Presentation/views/home/Home";
import RolesScreen from "../../../app/Presentation/views/roles/Roles";
import { RegisterScreen } from "../../../app/Presentation/views/register/Register";
import { AdminTabsNavigator } from "../../../app/Presentation/navigator/AdminTabsNavigator";
import { ClientTabsNavigator } from "../../../app/Presentation/navigator/ClientTabsNavigator";
import { ProfileInfoScreen } from "../../../app/Presentation/views/profile/info/ProfileInfo";
import { ProfileUpdateScreen } from "../../../app/Presentation/views/profile/update/ProfileUpdate";
import AdminCategoryCreateScreen from "../../../app/Presentation/views/admin/category/create/CategoryCreate";
import AdminCategoryUpdateScreen from "../../../app/Presentation/views/admin/category/update/CategoryUpdate";
import { DeliveryTabsNavigator } from "./DeliveryTabsNavigator";

export type RootStackParamList = {
  HomeScreen: undefined;
  RegisterScreen: undefined;
  RolesScreen: undefined;
  AdminTabsNavigator: undefined;
  ClientTabsNavigator: undefined;
  DeliveryTabsNavigator: undefined;
  ProfileUpdateScreen: { user: User };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainStackNavigator() {
  return (
    <UserState>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: true, title: "Registro" }}
        />
        <Stack.Screen
          name="RolesScreen"
          component={RolesScreen}
          options={{ headerShown: true, title: "Selecciona un rol" }}
        />
        <Stack.Screen
          name="AdminTabsNavigator"
          component={AdminTabsNavigator}
        />
        <Stack.Screen
          name="ClientTabsNavigator"
          component={ClientTabsNavigator}
        />
        <Stack.Screen
          name="DeliveryTabsNavigator"
          component={DeliveryTabsNavigator}
        />
        <Stack.Screen
          name="ProfileUpdateScreen"
          component={ProfileUpdateScreen}
          options={{ headerShown: true, title: "Actualizar usuario" }}
        />
      </Stack.Navigator>
    </UserState>
  );
}

const UserState = ({ children }: any) => {
  return <UserProvider>{children}</UserProvider>;
};
