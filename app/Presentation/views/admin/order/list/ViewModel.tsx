import React, { useState, useContext } from "react";

import { OrderContext } from "../../../../context/OrderContext";

const AdminOrderListViewModel = () => {
  //const [orders, setOrders] = useState<Order[]>([]);
  const {
    ordersPayed,
    ordersDispatched,
    ordersOnTheWay,
    ordersDelivery,
    getOrdersByStatus,
  } = useContext(OrderContext);

  const getOrders = async (status: string) => {
    const result = await getOrdersByStatus(status);
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
  };
};

export default AdminOrderListViewModel;
