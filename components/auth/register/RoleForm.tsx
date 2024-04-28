import { StyleSheet, Text, View } from "react-native";
import React from "react";

const RoleForm = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>I'm Here To:</Text>
      <View style={[styles.inputView, styles.selected]}>
        <Text style={[styles.inputText, styles.selectedText]}>
          To Hire For Tasks
        </Text>
      </View>
      <View style={[styles.inputView]}>
        <Text style={[styles.inputText]}>To Find Jobs</Text>
      </View>
    </View>
  );
};

export default RoleForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  inputView: {
    backgroundColor: "#fff",
    height: 80,
    paddingHorizontal: 22,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#0C3178",
    borderRadius: 40,
    justifyContent: "center",
    elevation: 2,
  },
  selected: {
    backgroundColor: "#FEF9F7",
    borderWidth: 4,
    borderColor: "#F58D61",
  },
  inputText: {
    fontSize: 32,
    fontWeight: "500",
    color: "#6e6e6e",
  },
  selectedText: {
    fontWeight: "600",
    color: "#4e4e4e",
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#0C3178",
  },
});
