import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { ApiClient } from "../../utils/api";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import io from "socket.io-client";
import gradient from "../../assets/images/double-gradient.png";
import config from "../../config";

const Conversation = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const [participant, setParticipant] = useState(null);
  const [content, setContent] = useState("");
  const { id } = route.params;
  const user = useSelector((state: any) => state.user);

  // Connect to Socket.IO server
  const socket = io(config.baseUrl);

  const getConversation = async () => {
    try {
      const {
        data: {
          participants: [{ user }],
          messages,
        },
      } = await ApiClient().get(`/chat/conversation/${id}`);
      setMessages(messages);
      setParticipant(user);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    if (content) {
      try {
        const message = {
          conversationId: id,
          content,
        };
        const { data } = await ApiClient().post(`/chat/message`, message);
        setContent("");
        // setMessages([{ ...data, isMine: true }, ...messages]);
        socket.emit("sendMessage", { ...message, senderId: user.id });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getConversation();

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("joinConversation", id);
    });

    socket.on("message", (message) => {
      console.log(message);
      setMessages((messages) => [
        { ...message, isMine: message.senderId == user.id },
        ...messages,
      ]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ImageBackground
      source={gradient}
      resizeMode="cover"
      imageStyle={{
        opacity: 0.7,
        // transform: [{ rotateZ: "90deg" }],
      }}
      style={styles.container}
    >
      <Pressable>
        {({ pressed }) => (
          <View
            style={[styles.profile, pressed && { backgroundColor: "#f0f0f0" }]}
          >
            <Image
              source={{
                uri: participant?.avatar,
              }}
              style={styles.profilePhoto}
            />
            <View>
              <Text style={styles.profileName}>{participant?.fullName}</Text>
            </View>
          </View>
        )}
      </Pressable>
      <View style={styles.chatContainer}>
        {messages?.map((item, i) => (
          <View key={i} style={item.isMine ? styles.myMessage : styles.message}>
            <Image
              source={{
                uri: participant?.avatar,
              }}
              style={styles.chatPhoto}
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
      <View style={styles.inputView}>
        <TextInput
          multiline
          onChangeText={setContent}
          placeholder="Message..."
          value={content}
          style={styles.input}
        />

        <Pressable onPress={sendMessage} style={styles.inputIcon}>
          <Ionicons name="send" size={32} color="#0C3178" />
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    flex: 1,
    backgroundColor: "#fff",
  },
  chatContainer: {
    overflow: "hidden",
    padding: 14,
    flex: 1,
    flexDirection: "column-reverse",
    gap: 12,
    marginVertical: 12,
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
    padding: 16,
    flexShrink: 1,
    borderRadius: 16,
    borderBottomLeftRadius: 2,
    backgroundColor: "#f8f8f8",
    borderWidth: 0.5,
    borderColor: "#c5c5c5",
  },
  myChatBubble: {
    flexShrink: 1,
    padding: 16,
    borderRadius: 16,
    borderBottomRightRadius: 2,
    backgroundColor: "#0C3178",
  },
  chatPhoto: {
    backgroundColor: "#669",
    width: 40,
    height: 40,
    borderRadius: 30,
    borderWidth: 1,
    alignSelf: "flex-end",
    borderColor: "#F58D6180",
  },
  inputView: {
    margin: 14,
    backgroundColor: "#fff",
    minHeight: 60,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 30,
    borderColor: "#e5e5e5",
    borderWidth: 1,
    fontSize: 14,
    alignItems: "center",
    elevation: 1,
    flexDirection: "row",
    gap: 12,
  },
  input: {
    fontSize: 14,
    flex: 1,
    flexWrap: "wrap",
  },
  inputIcon: {},
  profile: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    padding: 14,
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
    color: "#0C3178",
  },
});
