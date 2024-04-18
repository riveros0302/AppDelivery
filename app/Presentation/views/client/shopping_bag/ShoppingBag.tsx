import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import useViewModel from "./ViewModel";
import ShoppingBagItem from "./Item";
import { RoundedButton } from "../../../components/RoundedButton";
import { StackScreenProps } from "@react-navigation/stack";
import { ClientStackParamList } from "../../../navigator/ClientStackNavigator";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientShoppingBagScreen"> {}

export default function ClientShoppingBagScreen({ navigation, route }: Props) {
  const { shoppingBag, total, addItem, subtractItem, deleteItem } =
    useViewModel();
  return (
    <View style={styles.container}>
      <FlatList
        data={shoppingBag}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <ShoppingBagItem
            product={item}
            addItem={addItem}
            substractItem={subtractItem}
            deleteItem={deleteItem}
          />
        )}
      />

      <View style={styles.totalToPay}>
        <View style={styles.totalInfo}>
          <Text style={styles.totalText}>Total</Text>
          <Text>${total}</Text>
        </View>

        <View style={styles.buttonAdd}>
          <RoundedButton
            title="CONFIRMAR ORDEN"
            onPress={() => navigation.navigate("ClientAddressListScreen")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  totalToPay: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#f2f2f2",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 17,
  },
  totalInfo: {
    alignItems: "center",
  },
  buttonAdd: {
    width: "50%",
  },
});
