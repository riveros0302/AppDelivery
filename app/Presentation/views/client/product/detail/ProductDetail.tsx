import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import useViewModel from "./ViewModel";
import { RoundedButton } from "../../../../components/RoundedButton";
import { Button, Icon } from "react-native-elements";
import { MyColors } from "../../../../theme/Apptheme";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientProductDetailScreen"> {}

export default function ClientProductDetailScreen({
  navigation,
  route,
}: Props) {
  const { product } = route.params;

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const {
    productImageList,
    addItem,
    quantity,
    price,
    removeItem,
    addToBag,
    shoppingBag,
  } = useViewModel(product);

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <Carousel
          loop={false}
          width={width}
          height={height}
          autoPlay={true}
          data={productImageList}
          autoPlayInterval={5000}
          scrollAnimationDuration={100}
          //onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.productImage} />
          )}
        />
        <View style={styles.productDetail}>
          <View style={styles.productInfo}>
            <Text style={styles.name}>{product.name}</Text>
            <View style={styles.divider} />

            <Text style={styles.descriptionTitle}>Descripción</Text>
            <Text style={styles.descriptionContent}>{product.description}</Text>
            <View style={styles.divider} />

            <Text style={styles.descriptionTitle}>Precio</Text>
            <Text style={styles.descriptionContent}>${product.price}</Text>
            <View style={styles.divider} />

            <Text style={styles.descriptionTitle}>Tu orden</Text>
            <Text style={styles.descriptionContent}>Cantidad: {quantity}</Text>
            <Text style={styles.descriptionContent}>
              Precio total: ${price}
            </Text>

            <View style={styles.divider} />
          </View>

          <View style={styles.productAction}>
            <TouchableOpacity onPress={removeItem} style={styles.actionLess}>
              <Text style={styles.actionText}>-</Text>
            </TouchableOpacity>
            <View style={styles.quantity}>
              <Text style={styles.actionText}>{quantity}</Text>
            </View>
            <TouchableOpacity onPress={addItem} style={styles.actionAdd}>
              <Text style={styles.actionText}>+</Text>
            </TouchableOpacity>

            <View style={styles.buttonAdd}>
              <RoundedButton title="AGREGAR" onPress={addToBag} />
            </View>
          </View>
        </View>
      </GestureHandlerRootView>

      <TouchableOpacity style={styles.back} onPress={() => navigation.pop()}>
        <Icon
          name="arrow-left-circle"
          type="material-community"
          size={40}
          color={MyColors.button}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  productImage: {
    width: "100%",
    height: "50%",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  productDetail: {
    position: "absolute",
    width: "100%",
    height: "55%",
    backgroundColor: "white",
    bottom: 15,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  divider: {
    height: 1,
    backgroundColor: "#f2f2f2",
    marginTop: 15,
  },
  productInfo: {
    padding: 30,
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  descriptionTitle: {
    marginTop: 10,
    fontWeight: "bold",
  },
  descriptionContent: {
    fontSize: 13,
    marginTop: 5,
  },
  productAction: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 30,
  },
  actionText: {
    color: "white",
    fontSize: 15,
  },
  actionLess: {
    backgroundColor: "#3a3a3a",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "center",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  quantity: {
    backgroundColor: "#3a3a3a",
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignSelf: "center",
  },
  actionAdd: {
    backgroundColor: "#3a3a3a",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  buttonAdd: {
    flex: 1,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  back: {
    position: "absolute",
    top: 30,
    left: 15,
  },
});
