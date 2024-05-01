import { Image, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { ApiClient } from "../../../utils/api";
import { useSelector } from "react-redux";

const Conversation = ({ route, navigation }) => {
  const [conversation, setConversation] = useState(null);
  const { id } = route.params;
  const user = useSelector((state: any) => state.user);

  const getConversation = async () => {
    try {
      const { data } = await ApiClient().get(`/chat/conversation/${id}`);
      setConversation(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConversation();
  }, []);

  return (
    <View style={styles.container}>
      {conversation?.messages.map((item, i) => (
        <View key={i} style={item.isMine ? styles.myMessage : styles.message}>
          <Image
            source={{
              uri: conversation.participants[0].user.avatar,
            }}
            style={styles.profilePhoto}
          />
          <View style={item.isMine ? styles.myChatBubble : styles.chatBubble}>
            <Text
              style={[
                { fontSize: 18, fontWeight: "400" },
                item.isMine ? { color: "#fff" } : { color: "#2e2e2e" },
              ]}
            >
              {item.content}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    overflow: "hidden",
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column-reverse",
    gap: 12,
  },
  message: {
    gap: 6,
    flexDirection: "row",
    maxWidth: "80%",
    alignSelf: "flex-start",
  },
  myMessage: {
    gap: 6,
    flexDirection: "row-reverse",
    maxWidth: "80%",
    alignSelf: "flex-end",
  },
  chatBubble: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderBottomLeftRadius: 2,
    backgroundColor: "#f0f0f0",
  },
  myChatBubble: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderBottomRightRadius: 2,
    backgroundColor: "#0C3178",
  },
  profilePhoto: {
    backgroundColor: "#669",
    width: 40,
    height: 40,
    borderRadius: 30,
    borderWidth: 1,
    alignSelf: "flex-end",
    borderColor: "#F58D6180",
  },
});
