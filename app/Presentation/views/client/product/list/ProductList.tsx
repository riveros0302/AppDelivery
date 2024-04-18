import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import ClientProductListItem from "./Item";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientProductListScreen"> {}

export default function ClientProductListScreen({ navigation, route }: Props) {
  const { idCategory } = route.params;
  const { products, getProducts } = useViewModel();

  useEffect(() => {
    getProducts(idCategory);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <ClientProductListItem product={item} navigation={navigation} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
