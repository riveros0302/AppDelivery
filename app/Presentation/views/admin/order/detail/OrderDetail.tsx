import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { Text, View, StyleSheet, FlatList, ToastAndroid } from "react-native";
import { AdminOrderStackParamList } from "../../../../navigator/AdminOrderStackNavigator";
import { OrderDetailItem } from "./Item";
import { DateFormatter } from "../../../../utils/DateFormatter";
import { Icon } from "react-native-elements";
import { MyColors } from "../../../../theme/Apptheme";
import useViewModel from "./ViewModel";
import { RoundedButton } from "../../../../components/RoundedButton";
import DropDownPicker from "react-native-dropdown-picker";

interface Props
  extends StackScreenProps<
    AdminOrderStackParamList,
    "AdminOrderDetailScreen"
  > {}
const AdminOrderDetailScreen = ({ navigation, route }: Props) => {
  const { order } = route.params;
  const {
    total,
    getTotal,
    getDeliveryMen,
    deliveryMen,
    open,
    value,
    items,
    setOpen,
    setValue,
    setItems,
    dispatchOrder,
    responseMessage,
  } = useViewModel(order);

  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  useEffect(() => {
    if (total === 0) {
      getTotal();
    }
    getDeliveryMen();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.products}>
        <FlatList
          data={order.products}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => <OrderDetailItem product={item} />}
        />
      </View>
      <View style={styles.info}>
        <View style={styles.infoRow}>
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Fecha del pedido</Text>
            <Text style={styles.infoDescription}>
              {DateFormatter(order.timestamp!)}
            </Text>
          </View>
          <Icon type="material-community" name="timer" color={"grey"} />
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Cliente y Telefono</Text>
            <Text style={styles.infoDescription}>
              {order.client?.name} {order.client?.lastname} -{" "}
              {order.client?.phone}
            </Text>
          </View>
          <Icon type="material-community" name="account" color={"grey"} />
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Dirección de entrega</Text>
            <Text style={styles.infoDescription}>
              {order.address?.address} {order.address?.neighborhood}
            </Text>
          </View>
          <Icon type="material-community" name="map-marker" color={"grey"} />
        </View>
        {order.status === "PAGADO" ? (
          <View>
            <Text style={styles.deliverys}>REPARTIDORES DISPONIBLES</Text>

            <View style={styles.dropDown}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />
            </View>
          </View>
        ) : (
          <Text style={styles.deliverys}>
            REPARTIDOR ASIGNADO: {order.delivery?.name}
          </Text>
        )}

        <View style={styles.totalInfo}>
          <Text style={styles.total}>TOTAL: ${total}</Text>
          <View style={styles.button}>
            {order.status === "PAGADO" && (
              <RoundedButton
                title="DESPACHAR ORDEN"
                onPress={() => dispatchOrder()}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  products: {
    width: "100%",
    height: "45%",
  },
  info: {
    width: "100%",
    height: "55%",
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
  },
  infoRow: {
    flexDirection: "row",
    marginTop: 15,
  },
  infoText: {
    flex: 1,
  },
  infoTitle: {
    color: "black",
  },
  infoDescription: {
    color: "grey",
    fontSize: 13,
    marginTop: 3,
  },
  deliverys: {
    fontWeight: "bold",
    marginTop: 15,
    color: MyColors.primary,
  },
  totalInfo: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  total: {
    fontWeight: "bold",
    fontSize: 17,
  },
  button: {
    width: "50%",
  },
  dropDown: {
    marginTop: 15,
  },
});

export default AdminOrderDetailScreen;
