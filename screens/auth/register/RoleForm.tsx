import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Button from "../../../components/ui/Button";
import { setUser } from "../../../redux/slices/userSlice";
import { ApiClient } from "../../../utils/api";

const RoleForm = () => {
  const [role, setRole] = useState("");
  const dispatch = useDispatch();

  const submit = async () => {
    try {
      const { data: user } = await ApiClient().put("/auth/set-role", { role });
      dispatch(setUser(user));
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I'm Here To:</Text>

      <Pressable onPress={() => setRole("client")}>
        <View style={[styles.inputView, role == "client" && styles.selected]}>
          <Text
            style={[styles.inputText, role == "client" && styles.selectedText]}
          >
            To Hire For Tasks
          </Text>
        </View>
      </Pressable>

      <Pressable onPress={() => setRole("professional")}>
        <View
          style={[styles.inputView, role == "professional" && styles.selected]}
        >
          <Text
            style={[
              styles.inputText,
              role == "professional" && styles.selectedText,
            ]}
          >
            To Find Jobs
          </Text>
        </View>
      </Pressable>
      <View style={styles.float}>
        {role && <Button label="Submit" style="fill" callback={submit} />}
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
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
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
    color: "#4e4e4e",
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#0C3178",
  },
  float: {
    position: "absolute",
    right: 0,
    bottom: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 22,
    paddingVertical: 8,
  },
});
