import { StyleSheet, View, Image, TextInput, KeyboardType } from "react-native";
import React from "react";
import { MyColors } from "../theme/Apptheme";

interface Props {
  image: any;
  placeholder: string;
  value: string;
  keyboardType: KeyboardType;
  secureTextEntry?: boolean; //con ? indicamos que secureTextEntry es opcional, osea que no es necesario que esté
  property: string;
  editable?: boolean;
  onChangeText: (property: string, value: any) => void; //con void decimos que onChange no retornará nada
}

export default function CustomInput({
  image,
  placeholder,
  value,
  keyboardType,
  secureTextEntry = false,
  property,
  editable = true,
  onChangeText,
}: Props) {
  return (
    <View style={styles.formInput}>
      <Image source={image} style={styles.formIcon} />
      <TextInput
        placeholder={placeholder}
        style={styles.formTextInput}
        keyboardType={keyboardType}
        value={value}
        onChangeText={(text) => onChangeText(property, text)}
        secureTextEntry={secureTextEntry}
        editable={editable}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formInput: {
    flexDirection: "row",
    marginTop: 30,
  },
  formIcon: {
    width: 25,
    height: 25,
    marginTop: 5,
  },
  formTextInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: MyColors.secondary,
    marginLeft: 15,
  },
});
