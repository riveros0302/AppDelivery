import { Image, StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import useViewModel from "./ViewModel";
import { RoundedButton } from "../../../../components/RoundedButton";
import stylesMap from "./StyleMap";
import { StackScreenProps } from "@react-navigation/stack";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientAddressMapScreen"> {}

export default function ClientAddressMapScreen({ navigation, route }: Props) {
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
        onRegionChangeComplete={(region) =>
          onRegionChangeComplete(region.latitude, region.longitude)
        }
      />

      <Image
        source={require("../../../../../../assets/location_home.png")}
        style={styles.imgLocation}
      />

      <View style={styles.refPoint}>
        <Text style={styles.refPointText}>{name}</Text>
      </View>

      <View style={styles.buttonRefPoint}>
        <RoundedButton
          title="SELECCIONAR PUNTO"
          onPress={() => {
            navigation.navigate({
              name: "ClientAddressCreateScreen",
              merge: true,
              params: {
                refPoint: name,
                latitude: latitude,
                longitude: longitude,
              },
            });
          }}
        />
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
    width: "70%",
  },
});
