import { StyleSheet, Text, View, Modal, Alert } from "react-native";
import React, { useState } from "react";
import { RoundedButton } from "./RoundedButton";
import { MyColors } from "../theme/Apptheme";

interface Props {
  openGallery: (numberImage: number) => void;
  openCamera: (numberImage: number) => void;
  numberImage: number;
  modalUseState: boolean;
  setModalUseState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalPickMultipleImage({
  openGallery,
  openCamera,
  modalUseState,
  setModalUseState,
  numberImage,
}: Props) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalUseState}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalUseState(!modalUseState);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Selecciona una opción</Text>
            <RoundedButton
              title="Galeria"
              onPress={() => {
                openGallery(numberImage);
                setModalUseState(false);
              }}
            />
            <RoundedButton
              title="Camara"
              onPress={() => {
                openCamera(numberImage);
                setModalUseState(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "70%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: MyColors.primary,
  },
});
