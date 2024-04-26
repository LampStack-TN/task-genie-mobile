import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import Button from "../UI/Button";
const Profile = ({ profile, Data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Image
            source={{
              uri: "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg",
            }}
            style={styles.avatarImg}
          />
        </View>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <Text style={styles.title}>{Data.fullName}</Text>
          <Text style={styles.subTitle}>{profile.jobTitle}</Text>
          <View style={styles.cityContainer}>
            <Entypo name="location-pin" size={24} color="#6e6e6e" />
            <Text style={{ fontSize: 20, color: "#4e4e4e" }}>{Data.city}</Text>
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 20, margin: 5 }}>
        <Text style={styles.email}>
          <MaterialIcons name="email" size={24} color="#6e6e6e" />
          {Data.email}
        </Text>
        <Text style={styles.bio}>{profile.bio}</Text>
        <View style={styles.button}>
          <Button
            transparent={true}
            label={"Edit"}
            style="outline"
            callback={() => {}}
          ></Button>
        </View>
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
    paddingBottom: 30,
  },
  title: {
    textAlign: "right",
    fontSize: 25,
    fontWeight: "bold",
    color: "#0C3178",
    marginBottom: 10,
    marginTop: 25,
  },
  subTitle: {
    textAlign: "right",
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "500",
    color: "#4e4e4e",
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
    textAlign: "left",
    fontWeight: "400",
    color: "#2e2e2e",
  },
  cityContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    textAlign: "left",
    fontWeight: "400",
    color: "#6e6e6e",
  },
  email: {
    fontSize: 18,
    flexDirection: "row",
    alignItems: "center",
    left: 30,
    fontWeight: "400",
    marginBottom: 20,
    color: "#e6e6e",
  },
  button: {
    alignSelf: "flex-end",
    marginTop: 50,
  },
  avatar: { flex: 1, borderRadius: 70 },
  avatarImg: {
    width: 140,
    height: 140,
    borderRadius: 100,
    alignSelf: "center",
  },
  header: { flexDirection: "row", paddingVertical: 20 },
});
