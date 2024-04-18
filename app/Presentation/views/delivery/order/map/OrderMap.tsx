import { Image, StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import useViewModel from "./ViewModel";
import { RoundedButton } from "../../../../components/RoundedButton";
import stylesMap from "./StyleMap";
import { StackScreenProps } from "@react-navigation/stack";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { DeliveryOrderStackParamList } from "../../../../navigator/DeliveryOrderStackNavigator";
import { Icon } from "react-native-elements";

interface Props
  extends StackScreenProps<
    DeliveryOrderStackParamList,
    "DeliveryOrderMapScreen"
  > {}

export default function DeliveryOrderMapScreen({ navigation, route }: Props) {
  const { order } = route.params;
  const {
    messagePermission,
    position,
    mapRef,
    name,
    latitude,
    longitude,
    onRegionChangeComplete,
  } = useViewModel();

  useEffect(() => {
    if (messagePermission != "") {
      ToastAndroid.show(messagePermission, ToastAndroid.LONG);
    }
  }, [messagePermission]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        customMapStyle={stylesMap}
        style={{ height: "100%", width: "100%" }}
        provider={PROVIDER_GOOGLE}
      />

      <Image
        source={require("../../../../../../assets/location_home.png")}
        style={styles.imgLocation}
      />

      <View style={styles.info}>
        <View style={styles.infoRow}>
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Población</Text>
            <Text style={styles.infoDescription}>
              {order.address?.neighborhood}
            </Text>
          </View>
          <Icon type="material-community" name="map-marker" color={"grey"} />
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Dirección</Text>
            <Text style={styles.infoDescription}>{order.address?.address}</Text>
          </View>
          <Icon
            type="material-community"
            name="crosshairs-gps"
            color={"grey"}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.infoClient}>
          <Image
            source={{ uri: order.client?.image }}
            style={styles.imageClient}
          />
          <Text style={styles.nameClient}>
            {order.client?.name} {order.client?.lastname}
          </Text>
          <Image
            source={require("../../../../../../assets/phone.png")}
            style={styles.imagePhone}
          />
        </View>

        <View style={styles.buttonRefPoint}>
          <RoundedButton title="ENTREGAR PEDIDO" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  imgLocation: {
    width: 65,
    height: 65,
    justifyContent: "center",
    position: "absolute",
  },
  refPoint: {
    position: "absolute",
    backgroundColor: "#d4d4d4",
    width: "70%",
    paddingVertical: 4,
    top: 40,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  refPointText: {
    textAlign: "center",
  },
  buttonRefPoint: {
    position: "absolute",
    bottom: 40,
    width: "100%",
  },
  info: {
    backgroundColor: "white",
    height: "35%",
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 30,
    alignItems: "center",
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
  divider: {
    backgroundColor: "#f2f2f2",
    height: 1,
    width: "100%",
    marginTop: 15,
  },
  infoClient: {
    flexDirection: "row",
  },
  imageClient: {
    height: 50,
    width: 50,
    borderRadius: 15,
  },
  imagePhone: {
    height: 45,
    width: 45,
  },
  nameClient: {
    fontWeight: "bold",
    fontSize: 17,
  },
});
