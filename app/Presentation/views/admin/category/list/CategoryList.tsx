import { FlatList, StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import AdminCategoryListItem from "./Item";

export default function AdminCategoryListScreen() {
  const { categories, getCategories, deleteCategory, responseMessage } =
    useViewModel();

  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  return (
    <View style={{ backgroundColor: "white" }}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <AdminCategoryListItem category={item} remove={deleteCategory} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
