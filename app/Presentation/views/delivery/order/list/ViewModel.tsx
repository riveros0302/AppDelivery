import React, { useState, useContext, useEffect } from "react";

import { OrderContext } from "../../../../context/OrderContext";
import { UserContext } from "../../../../context/UserContext";

const DeliveryOrderListViewModel = () => {
  //const [orders, setOrders] = useState<Order[]>([]);
  const {
    ordersPayed,
    ordersDispatched,
    ordersOnTheWay,
    ordersDelivery,
    getOrdersByDeliveryAndStatus,
  } = useContext(OrderContext);
  const { user } = useContext(UserContext);

  const getOrders = async (idDelivery: string, status: string) => {
    const result = await getOrdersByDeliveryAndStatus(idDelivery, status);
    // setOrders(result);
    console.log("ORDENES: " + JSON.stringify(result, null, 3)); //null, 3 servira para mostrar el resultado en formato json igual que en postman
    //el 3 es para la tabulacion, se puede cambiar
  };

  return {
    getOrders,
    ordersPayed,
    ordersDispatched,
    ordersOnTheWay,
    ordersDelivery,
    user,
  };
};

export default DeliveryOrderListViewModel;
