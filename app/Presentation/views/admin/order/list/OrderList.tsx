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
  } = useViewModel();
  const navigation =
    useNavigation<
      StackNavigationProp<AdminOrderStackParamList, "AdminOrderListScreen">
    >();

  useEffect(() => {
    getOrders(status);
  }, []);

  return (
    <View>
      <FlatList
        data={
          status === "PAGADO"
            ? ordersPayed
            : status === "DESPACHADO"
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
    case "first":
      return <OrderListView status="PAGADO" />;
    case "second":
      return <OrderListView status="DESPACHADO" />;
    case "third":
      return <OrderListView status="EN CAMINO" />;
    case "fourth":
      return <OrderListView status="ENTREGADO" />;
    default:
      return <OrderListView status="PAGADO" />;
  }
};

export default function AdminOrderListScreen() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "PAGADO" },
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

const styles = StyleSheet.create({});
