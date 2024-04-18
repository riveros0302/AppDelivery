import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ClientOrderListScreen from "../views/client/order/list/OrderList";
import { ProfileInfoScreen } from "../views/profile/info/ProfileInfo";
import { Icon } from "react-native-elements";
import { MyColors } from "../theme/Apptheme";
import { ClientStackNavigator } from "./ClientStackNavigator";

const Tab = createBottomTabNavigator();

export const ClientTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
        tabBarInactiveTintColor: MyColors.secondary,
        tabBarActiveTintColor: MyColors.primary,
      })}
    >
      <Tab.Screen
        name="ClientStackNavigato"
        component={ClientStackNavigator}
        options={{
          title: "Categorias",
          tabBarLabel: "Categorias",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ClientOrderListScreen"
        component={ClientOrderListScreen}
        options={{
          title: "Mis Pedidos",
          tabBarLabel: "Mis Pedidos",
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
    case "ClientOrderListScreen":
      iconName = "shopping-outline";
      break;
    case "ClientStackNavigato":
      iconName = "format-list-bulleted";
      break;

    default:
      break;
  }
  return (
    <Icon
      type="material-community"
      name={`${iconName}`}
      size={22}
      color={color}
    />
  );
}
