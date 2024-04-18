import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AdminOrderListScreen from "../views/admin/order/list/OrderList";
import AdminOrderDetailScreen from "../views/admin/order/detail/OrderDetail";
import { Order } from "../../Domain/entities/Order";
import { OrderProvider } from "../context/OrderContext";
import DeliveryOrderListScreen from "../views/delivery/order/list/OrderList";
import DeliveryOrderDetailScreen from "../views/delivery/order/detail/OrderDetail";
import DeliveryOrderMapScreen from "../views/delivery/order/map/OrderMap";

export type DeliveryOrderStackParamList = {
  DeliveryOrderListScreen: undefined;
  DeliveryOrderDetailScreen: { order: Order };
  DeliveryOrderMapScreen: { order: Order };
};

const Stack = createNativeStackNavigator<DeliveryOrderStackParamList>();

export default function DeliveryOrderStackNavigator() {
  return (
    <OrderStatus>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="DeliveryOrderListScreen"
          component={DeliveryOrderListScreen}
        />
        <Stack.Screen
          name="DeliveryOrderDetailScreen"
          component={DeliveryOrderDetailScreen}
          options={{ headerShown: true, title: "Detalle de la Orden" }}
        />
        <Stack.Screen
          name="DeliveryOrderMapScreen"
          component={DeliveryOrderMapScreen}
        />
      </Stack.Navigator>
    </OrderStatus>
  );
}

const OrderStatus = ({ children }: any) => {
  return <OrderProvider>{children}</OrderProvider>;
};
