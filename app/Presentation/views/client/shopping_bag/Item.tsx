import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Product } from "../../../../Domain/entities/Product";

interface Props {
  product: Product;
  addItem: (product: Product) => void;
  substractItem: (product: Product) => void;
  deleteItem: (product: Product) => void;
}

export default function ShoppingBagItem({
  product,
  addItem,
  deleteItem,
  substractItem,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image1 }} style={styles.image} />
      </View>
      <View style={styles.productInfo}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>${product.quantity! * product.price}</Text>
        </View>

        <View style={styles.productAction}>
          <View style={styles.action}>
            <TouchableOpacity
              onPress={() => substractItem(product)}
              style={styles.actionLess}
            >
              <Text style={styles.actionText}>-</Text>
            </TouchableOpacity>
            <View style={styles.quantity}>
              <Text style={styles.actionText}>{product.quantity}</Text>
            </View>
            <TouchableOpacity
              onPress={() => addItem(product)}
              style={styles.actionAdd}
            >
              <Text style={styles.actionText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => deleteItem(product)}>
            <Image
              source={require("../../../../../assets/trash.png")}
              style={styles.deleteItem}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 7,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 15,
  },
  imageContainer: {},
  title: {
    color: "black",
    fontSize: 14,
    marginLeft: 15,
    flex: 1,
  },
  price: {
    marginRight: 40,
    fontWeight: "bold",
  },
  productInfo: {
    flex: 1,
  },
  actionLess: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "center",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  quantity: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignSelf: "center",
  },
  actionAdd: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  actionText: {
    color: "black",
    fontSize: 15,
  },
  productAction: {
    flexDirection: "row",
    marginLeft: 15,
    marginTop: 5,
    marginRight: 45,
  },
  action: {
    flexDirection: "row",
    flex: 1,
  },
  deleteItem: {
    width: 25,
    height: 25,
  },
});
