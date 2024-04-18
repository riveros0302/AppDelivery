import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileInfoScreen } from "../views/profile/info/ProfileInfo";
import { Icon } from "react-native-elements";
import { MyColors } from "../theme/Apptheme";
import DeliveryOrderStackNavigator from "./DeliveryOrderStackNavigator";

const Tab = createBottomTabNavigator();

export const DeliveryTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
        tabBarInactiveTintColor: MyColors.secondary,
        tabBarActiveTintColor: MyColors.primary,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="DeliveryOrderStackNavigator"
        component={DeliveryOrderStackNavigator}
        options={{
          title: "Pedidos",
          tabBarLabel: "Pedidos",
        }}
      />
      <Tab.Screen
        name="ProfileInfoScreen"
        component={ProfileInfoScreen}
        options={{
          title: "Perfil",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

function screenOptions(route: any, color: any) {
  let iconName;

  switch (route.name) {
    case "ProfileInfoScreen":
      iconName = "account-outline";
      break;
    case "DeliveryOrderStackNavigator":
      iconName = "shopping-outline";
      break;
    default:
      break;
  }
  return (
    <Icon
      type="material-community"
      name={`${iconName}`}
      size={25}
      color={color}
    />
  );
}
