import { View, Text, StyleSheet, StatusBar, TextInput } from "react-native";
import React from "react";

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
        <TextInput passwordRules="" secureTextEntry={true} placeholder="Password" style={styles.input} />
      </View>
      <View style={styles.footer}></View>
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
  footer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 25,
    flex: 1,
  },
  section: {
    backgroundColor: "#fff",
    flex: 3,
    justifyContent: "center",
    gap: 15,
    height: 50,
  },
  back: {
    flex: 0,
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
    borderWidth: 2,
    fontSize: 14,
    shadowColor: "#000",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 5 },
  },
});
