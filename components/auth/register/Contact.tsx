import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Button from "../../UI/Button";

const Contact = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Register</Text>
          <Text style={styles.subTitle}>Contact & Location</Text>
        </View>
        <View style={styles.section}>
          <TextInput
            placeholder="Phone"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="City"
            value={city}
            onChangeText={(text) => setCity(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.footer}>
          <Button
            label="Back"
            style="bare"
            callback={() => navigation.goBack()}
          />
          <Button label="Finish" style="fill" callback={() => alert('Done')} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    display: "flex",
    flex: 1,
    margin: 10,
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    alignItems: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: "center",
    paddingLeft: 10,
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 22,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  section: {
    // backgroundColor: "#f0f0f0",
    gap: 15,
    flex: 1,
    // borderWidth: 2,
    marginTop: 30,
    paddingHorizontal: 11,
    paddingVertical: 11,
  },
  back: {
    position: "absolute",
    top: 32,
    left: 16,
    fontSize: 18,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#0C3178",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "400",
    color: "#6e6e6e",
  },
  input: {
    backgroundColor: "#fff",
    height: 60,
    paddingHorizontal: 22,
    borderRadius: 30,
    borderColor: "#e5e5e5",
    borderWidth: 1,
    fontSize: 14,
    elevation: 3,
  },
  spinner: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  dummyImg: {
    width: 180,
    height: 180,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 90,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderWidth: 5,
    alignSelf: "center",
  },
});
