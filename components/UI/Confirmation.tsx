import { Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

const Confirmation = ({
  modalVisible,
  setModalVisible,
  onConfirm,
  message,
}) => {
  return (
    <Modal animationIn="fadeIn" isVisible={modalVisible}>
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}></Text>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.modalClose}>✕</Text>
          </Pressable>
        </View>
        <View style={{}}>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.buttonRow}>
            <Pressable
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
            </Pressable>
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
  },
  modalHeader: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 16,
    textAlign: "left",
  },
  modalClose: {
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 4,
    color: "#6e6e6e",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonConfirm: {
    backgroundColor: "#F44336",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    color: "#4e4e4e",
    fontSize: 18,
    fontWeight: "600",
  },
});
