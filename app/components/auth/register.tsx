import { View, Text, StyleSheet, StatusBar, TextInput } from "react-native";
import React from "react";
import Button from "../UI/Button";

const Register = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.back}>Back</Text>
        <Text style={styles.title}>Register</Text>
      </View>
      <View style={styles.section}>
        <TextInput placeholder="Fullname" style={styles.input} />
        <TextInput placeholder="Email" style={styles.input} />
        <TextInput
          passwordRules=""
          secureTextEntry={true}
          placeholder="Password"
          style={styles.input}
        />
        <Button label="Register" />
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c5c5c5",
    display: "flex",
    flex: 1,
    gap: 1,
    margin: 10,
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 25,
  },
  // footer: {
  //   flexDirection: "row",
  //   backgroundColor: "#fff",
  //   paddingHorizontal: 22,
  //   paddingVertical: 25,
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "space-between",
  // },
  section: {
    backgroundColor: "#fff",
    flex: 3,
    justifyContent: "center",
    gap: 15,
    height: 50,
  },
  back: {
    position: "absolute",
    flex: 0,
    top: 25,
    left: 12,
    fontSize: 18,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: "#0C3178",
    flexDirection: "row",
  },
  input: {
    backgroundColor: "#fff",
    height: 60,
    marginHorizontal: 11,
    paddingHorizontal: 22,
    borderRadius: 30,
    borderColor: "#e5e5e5",
    borderWidth: 1,
    fontSize: 14,
    elevation: 3,
  },
});
