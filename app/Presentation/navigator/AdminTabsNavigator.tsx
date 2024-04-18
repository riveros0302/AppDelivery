import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminCategoryListScreen from "../views/admin/category/list/CategoryList";
import AdminOrderListScreen from "../views/admin/order/list/OrderList";
import { ProfileInfoScreen } from "../views/profile/info/ProfileInfo";
import { Icon, Image } from "react-native-elements";
import { MyColors } from "../theme/Apptheme";
import { TouchableOpacity } from "react-native";
import AdminCategoryNavigator from "./AdminCategoryNavigator";
import AdminOrderStackNavigator from "./AdminOrderStackNavigator";

const Tab = createBottomTabNavigator();

export const AdminTabsNavigator = () => {
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
        name="AdminCategoryNavigator"
        component={AdminCategoryNavigator}
        options={({ route, navigation }) => ({
          headerShown: false,
          title: "Categorías",
          tabBarLabel: "Categorías",
          headerRight: () => (
            <TouchableOpacity
              style={{ right: 10 }}
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
      <Tab.Screen
        name="AdminOrderStackNavigator"
        component={AdminOrderStackNavigator}
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
    case "AdminOrderStackNavigator":
      iconName = "shopping-outline";
      break;
    case "AdminCategoryNavigator":
      iconName = "format-list-bulleted";
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
