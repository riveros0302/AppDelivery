import { FlatList, StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import AddressListItem from "./Item";
import { RoundedButton } from "../../../../components/RoundedButton";

export default function ClientAddressListScreen() {
  const {
    address,
    getAddress,
    checked,
    changeRadioValue,
    createOrder,
    responseMessage,
  } = useViewModel();

  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={address}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <AddressListItem
            address={item}
            checked={checked}
            changeRadioValue={changeRadioValue}
          />
        )}
      />

      <View
        style={{ width: "100%", paddingHorizontal: 20, paddingVertical: 20 }}
      >
        <RoundedButton title="CONTINUAR" onPress={() => createOrder()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
