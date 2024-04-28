import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

const RoleForm = () => {
  const [role, setRole] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I'm Here To:</Text>

      <Pressable onPress={() => setRole("client")}>
        <View
          style={[styles.inputView, role == "client" ? styles.selected : null]}
        >
          <Text
            style={[
              styles.inputText,
              role == "client" ? styles.selectedText : undefined,
            ]}
          >
            To Hire For Tasks
          </Text>
        </View>
      </Pressable>

      <Pressable onPress={() => setRole("professional")}>
        <View
          style={[
            styles.inputView,
            role == "professional" ? styles.selected : null,
          ]}
        >
          <Text
            style={[
              styles.inputText,
              role == "professional" ? styles.selectedText : undefined,
            ]}
          >
            To Find Jobs
          </Text>
        </View>
      </Pressable>
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
