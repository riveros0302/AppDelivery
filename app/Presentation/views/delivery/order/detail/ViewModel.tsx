import React, { useContext, useEffect, useState } from "react";
import { Order } from "../../../../../Domain/entities/Order";
import { GetDeliveryMenUserUseCase } from "../../../../../Domain/useCases/user/GetDeliveryMenUser";
import { User } from "../../../../../Domain/entities/User";
import { OrderContext } from "../../../../context/OrderContext";

interface DropDownProps {
  label: string;
  value: string;
}

const AdminOrderDetailViewModel = (order: Order) => {
  const [total, setTotal] = useState(0);
  const [deliveryMen, setDeliveryMen] = useState<User[]>([]);
  const [responseMessage, setResponseMessage] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<DropDownProps[]>([]);
  const { updateToOnTheWay } = useContext(OrderContext);

  const updateToOnTheWayorder = async () => {
    const result = await updateToOnTheWay(order);
    setResponseMessage(result.message);
  };

  const getTotal = () => {
    order.products.forEach((p) => {
      setTotal(total + p.price * p.quantity!);
    });
  };

  return {
    total,
    deliveryMen,
    getTotal,
    open,
    value,
    items,
    setOpen,
    setValue,
    setItems,
    responseMessage,
    updateToOnTheWayorder,
  };
};

export default AdminOrderDetailViewModel;
