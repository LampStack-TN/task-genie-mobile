import React from "react";
import { View, Text, Image, StyleSheet, StatusBar } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import Button from "../UI/Button";
const Profile = ({ profile, Data }) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1, padding: 25, borderRadius: 100 }}>
          <Image
            source={{
              uri: "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg",
            }}
            style={{ width: 140, height: 140, borderRadius: 100 }}
          />
        </View>
        <View style={{ flex: 2, alignItems: "flex-start" }}>
          <Text style={styles.title}> {Data.fullName}</Text>

          <Text style={styles.subTitle}>{profile.jobTitle}</Text>
          <View style={styles.cityContainer}>
            <FontAwesome6 name="location-pin" size={22} color="#6e6e6e" />
            <Text style={{ fontSize: 20 }}>{Data.city}</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 2 }}>
        <MaterialIcons
          name="email"
          size={24}
          color="#6e6e6e"
          style={{ position: "absolute" }}
        />
        <Text style={styles.email}>{Data.email}</Text>
        <Text style={styles.bio}>{profile.bio}</Text>
      </View>
      <View style={styles.button}>
        <Button label={"Edit"} style="outline" callback={() => {}}></Button>
      </View>
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEF2EC",
    display: "flex",
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingBottom: 30,
  },
  title: {
    textAlign: "right",
    fontSize: 25,
    fontWeight: "bold",
    color: "#0C3178",
    right: 50,
    marginStart: 50,
    marginBottom: 10,
    marginTop: 25,
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "400",
    color: "#e6e6e",
    paddingLeft: 50,
  },
  text: {
    justifyContent: "center",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "400",
    color: "2e2e2e",
  },
  bio: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "400",
    color: "#2e2e2e",
  },
  cityContainer: {
    flexDirection: "row",
    textAlign: "right",
    paddingLeft: 50,

    fontWeight: "400",
    color: "#e6e6e",
  },
  email: {
    fontSize: 18,
    left: 30,
    fontWeight: "400",
    marginBottom: 20,
    color: "#e6e6e",
  },
  button: {
    flexDirection: "row",

    paddingHorizontal: 22,
    left: 250,
    justifyContent: "space-between",
  },
});
