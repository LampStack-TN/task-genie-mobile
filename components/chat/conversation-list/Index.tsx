import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ApiClient } from "../../../utils/api";

const ConversationList = ({ navigation }) => {
  const [conversations, setConversations] = useState(null);

  const getConversations = async () => {
    try {
      const { data } = await ApiClient().get("/chat/conversation");
      setConversations(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  return (
    <View style={styles.container}>
      {conversations?.map((item) => (
        <Pressable
          key={item.id}
          onPress={() => {
            navigation.navigate("Conversation", { id: item.id });
          }}
        >
          {({ pressed }) => (
            <View
              style={[
                styles.profile,
                pressed && { backgroundColor: "#f0f0f0" },
              ]}
            >
              <Image
                source={{
                  uri: item.participants[0].user.avatar,
                }}
                style={styles.profilePhoto}
              />
              <View>
                <Text style={styles.profileName}>
                  {item.participants[0].user.fullName}
                </Text>
                <Text style={styles.message}>{item.messages[0].content}</Text>
              </View>
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
};

export default ConversationList;

const styles = StyleSheet.create({
  container: {
    padding: 22,
    overflow: "hidden",
    flex: 1,
    backgroundColor: "#fff",
    gap: 8,
  },
  profile: {
    // alignItems: "center",
    flexDirection: "row",
    gap: 12,
    padding: 5,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderColor: "#c5c5c5",
  },
  profilePhoto: {
    backgroundColor: "#669",
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#F58D6180",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "500",
    color: "#2e2e2e",
  },
  message: {
    fontSize: 14,
    // fontWeight: "40",
    color: "#4e4e4e",
  },
});
