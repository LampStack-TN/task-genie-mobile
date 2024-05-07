import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { ApiClient } from "../../utils/api";
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import gradient from "../../assets/images/double-gradient.png";
import ProfileUser from "../../types/ProfileUser";
import Button from "../ui/Button";
const ProfileDetails = ({ route }) => {
  const { userId } = route.params;
  const [profile, setProfile] = useState<ProfileUser>({});
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await ApiClient().get(
          `profile/getOneProfile/${userId}`
        );
        setProfile(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [userId]);

  const skills = [
    { id: 200, name: "Carpentry" },
    {
      id: 201,
      name: "Electrical Work",
    },
    {
      id: 204,
      name: "Dog Training",
    },
    {
      id: 205,
      name: "Cat Grooming",
    },
    {
      id: 206,
      name: "Coaching",
    },
  ];

  return (
    <ImageBackground
      source={gradient}
      resizeMode="cover"
      imageStyle={{ opacity: 0.6 }}
      style={styles.container}
    >
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
          <Text style={styles.title}>{profile?.fullName}</Text>
          <Text style={styles.subTitle}>{profile.profile?.jobTitle}</Text>
          <View style={styles.cityContainer}>
            <Entypo name="location-pin" size={24} color="#6e6e6e" />
            <Text style={{ fontSize: 20, color: "#4e4e4e" }}>
              {profile.city}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 20, margin: 5 }}>
        <View style={{ marginVertical: 10 }}>
          <View style={styles.contact}>
            <MaterialIcons name="phone" size={24} color="#F58D61" />
            <Text style={[styles.contactText]}>+216 25 363 845</Text>
          </View>
          <View style={styles.contact}>
            <MaterialIcons name="email" size={24} color="#F58D61" />
            <Text style={styles.contactText}>{profile?.email}</Text>
          </View>
        </View>
        <View style={styles.bio}>
          <Text style={styles.bioText}>{profile.profile?.bio}</Text>
        </View>
        <View style={styles.skillContainer}>
          {skills.map((skill, index) => (
            <View key={index} style={styles.skillPill}>
              <Text key={index} style={styles.skillText}>
                {skill.name}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.actions}>
          <Button
            size="sm"
            style="fill"
            label={
              <>
                Send a Message{"  "}
                <FontAwesome
                  name="send"
                  size={18}
                  color="#fff"
                  style={{ margin: 10 }}
                />
              </>
            }
            color="#31780c"
            callback={() => null}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    paddingBottom: 30,
    backgroundColor: "#fff",
  },
  header: { flexDirection: "row", paddingVertical: 20 },
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
    marginVertical: 10,
  },
  bioText: {
    fontSize: 18,
    textAlign: "left",
    fontWeight: "400",
    color: "#4e4e4e",
  },
  cityContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    textAlign: "left",
    fontWeight: "400",
    color: "#6e6e6e",
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  contactText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#4e4e4e",
    verticalAlign: "middle",
  },
  button: {
    alignSelf: "flex-end",
    marginTop: 20,
  },
  avatar: { flex: 1, borderRadius: 70 },
  avatarImg: {
    width: 140,
    height: 140,
    borderRadius: 100,
    alignSelf: "center",
    borderWidth: 3,
    borderColor: "#F58D6150",
  },
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  skillPill: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#6e6e6e",
    backgroundColor: "#f8f8f8",
    verticalAlign: "middle",
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    margin: 5,
  },
  skillText: {
    verticalAlign: "middle",
    textAlign: "center",
    color: "#0C3178",
    fontSize: 14,
  },
  actions: {
    alignItems: "flex-end",
  },
});

export default ProfileDetails;
