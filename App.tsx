import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { CategoryProvider } from "./app/Presentation/context/CategoryContext";
import MainStackNavigator from "./app/Presentation/navigator/MainStackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}

const ContextState = ({ children }: any) => {
  return <CategoryProvider>{children}</CategoryProvider>;
};
