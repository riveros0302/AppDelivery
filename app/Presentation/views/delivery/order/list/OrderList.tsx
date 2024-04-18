import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import { TabBar, TabView } from "react-native-tab-view";
import { OrderListItem } from "./Item";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AdminOrderStackParamList } from "../../../../navigator/AdminOrderStackNavigator";
import { DeliveryOrderStackParamList } from "../../../../navigator/DeliveryOrderStackNavigator";

interface Props {
  status: string;
}
const OrderListView = ({ status }: Props) => {
  const {
    getOrders,
    ordersPayed,
    ordersDispatched,
    ordersOnTheWay,
    ordersDelivery,
    user,
  } = useViewModel();
  const navigation =
    useNavigation<
      StackNavigationProp<
        DeliveryOrderStackParamList,
        "DeliveryOrderListScreen"
      >
    >();

  useEffect(() => {
    getOrders(user?.id!, status);
  }, [user]);

  return (
    <View>
      <FlatList
        data={
          status === "DESPACHADO"
            ? ordersDispatched
            : status === "EN CAMINO"
            ? ordersOnTheWay
            : status === "ENTREGADO"
            ? ordersDelivery
            : []
        }
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <OrderListItem order={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

const renderScene = ({ route }: any) => {
  switch (route.key) {
    case "second":
      return <OrderListView status="DESPACHADO" />;
    case "third":
      return <OrderListView status="EN CAMINO" />;
    case "fourth":
      return <OrderListView status="ENTREGADO" />;
    default:
      return <OrderListView status="DESPACHADO" />;
  }
};

export default function DeliveryOrderListScreen() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "second", title: "DESPACHADO" },
    { key: "third", title: "EN CAMINO" },
    { key: "fourth", title: "ENTREGADO" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "#e2e2e2" }}
          scrollEnabled={true}
          style={{
            paddingTop: 30,
            backgroundColor: "white",
            height: 70,
            alignItems: "center",
            justifyContent: "center",
          }}
          activeColor="black"
          inactiveColor="grey"
        />
      )}
    />
  );
}
