import { Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import Button from "./Button";
import React from "react";

interface Props {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => any;
  confirmColor?: string;
  message: string;
}

const Confirmation = ({
  modalVisible,
  setModalVisible,
  onConfirm,
  confirmColor,
  message,
}: Props) => {
  return (
    <Modal
      style={{ alignItems: "center" }}
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={modalVisible}
    >
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}></Text>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.modalClose}>✕</Text>
          </Pressable>
        </View>
        <View style={styles.modalBody}>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.buttonRow}>
            <Button
              size="sm"
              style="bare"
              label="Cancel"
              color="#4e4e4e"
              callback={() => setModalVisible(!modalVisible)}
            />
            <Button
              size="sm"
              style="fill"
              label="Confirm"
              color={confirmColor || "#31780c"}
              callback={() => {
                onConfirm();
                setModalVisible(!modalVisible);
              }}
            />

            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>No</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonConfirm]}
              onPress={() => {
                onConfirm();
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Yes</Text>
            </Pressable> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    borderRadius: 8,
    maxHeight: "90%",
    width: "auto",
  },
  modalHeader: {
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e2e2e2",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "500",
    textAlign: "left",
  },
  modalClose: {
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 4,
    color: "#6e6e6e",
  },
  modalBody: {
    paddingVertical: 16,
    paddingHorizontal: 22,
    alignItems: "stretch",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 12,
  },
  modalText: {
    textAlign: "center",
    color: "#4e4e4e",
    fontSize: 18,
    fontWeight: "500",
  },
});
