import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import useViewModel from "./ViewModel";
import { useNavigation } from "@react-navigation/native";
import { MyColors } from "../../../theme/Apptheme";
import { Icon } from "react-native-elements";
import { RoundedButton } from "../../../components/RoundedButton";
import { RootStackParamList } from "../../../navigator/MainStackNavigator";

export const ProfileInfoScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { removeUserSession, user } = useViewModel();

  useEffect(() => {
    if (user?.id === "") {
      navigation.replace("HomeScreen");
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../../assets/chef.jpg")}
        style={styles.imgBackground}
      />
      <TouchableOpacity
        onPress={() => {
          removeUserSession();
        }}
        style={styles.logout}
      >
        <Icon
          type="material-community"
          name="power"
          color={"white"}
          size={40}
        />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        {user?.image !== "" && (
          <Image source={{ uri: user?.image }} style={styles.logoImage} />
        )}
      </View>
      <View style={styles.form}>
        <View style={styles.viewUser}>
          <Icon
            type="material-community"
            color={MyColors.primary}
            name="account"
            size={30}
          />
          <View style={{ justifyContent: "center", left: 10 }}>
            <Text>
              {user?.name} {user?.lastname}
            </Text>
            <Text style={{ color: MyColors.secondary, fontSize: 12 }}>
              Nombre del usuario
            </Text>
          </View>
        </View>
        <View style={styles.viewUser}>
          <Icon
            type="material-community"
            color={MyColors.primary}
            name="email"
            size={30}
          />
          <View style={{ justifyContent: "center", left: 10 }}>
            <Text>{user?.email}</Text>
            <Text style={{ color: MyColors.secondary, fontSize: 12 }}>
              Correo electrónico
            </Text>
          </View>
        </View>
        <View style={styles.viewUser}>
          <Icon
            type="material-community"
            color={MyColors.primary}
            name="phone"
            size={30}
          />
          <View style={{ justifyContent: "center", left: 10 }}>
            <Text>{user?.phone}</Text>
            <Text style={{ color: MyColors.secondary, fontSize: 12 }}>
              Telefono
            </Text>
          </View>
        </View>
        <RoundedButton
          onPress={() => {
            navigation.navigate("ProfileUpdateScreen", { user: user! });
          }}
          title="ACTUALIZAR INFORMACIÓN"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  imgBackground: {
    width: "100%",
    height: "100%",
    opacity: 0.7,
    bottom: "30%",
  },
  form: {
    width: "100%",
    height: "42%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
  },
  formText: {
    fontWeight: "bold",
    fontSize: 16,
  },

  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "20%",
  },
  logoImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 1,
  },
  logoText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
  },
  viewUser: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  logout: {
    position: "absolute",
    top: 30,
    right: 15,
  },
});
