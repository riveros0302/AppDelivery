import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { MyColors } from "../theme/Apptheme";

interface Props {
  title: string;
  onPress: () => void;
}

export const RoundedButton = ({ title, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.roundedButton} onPress={() => onPress()}>
      <Text style={styles.textButton}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundedButton: {
    width: "100%",
    height: 50,
    backgroundColor: MyColors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  textButton: {
    color: "white",
    // fontWeight: 'bold'
  },
});
