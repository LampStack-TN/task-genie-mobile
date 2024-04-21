import * as React from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Step1({ navigation }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("");
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <Text style={styles.heading}>Step 1</Text>
        <Text
          style={{ marginBottom: 10, alignSelf: "flex-start", paddingTop: 10 }}
        >
          Basic Job Description
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Title"
          onChangeText={(text) => setTitle(text)}
          value={title}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          value={description}
          style={[styles.input, styles.largeInput]}
          multiline={true}
          numberOfLines={4}
        />
        <TextInput
          placeholder="Location"
          onChangeText={(text) => setLocation(text)}
          value={location}
          style={styles.input}
        />
      </View>
      <View style={styles.button1}>
        <Pressable onPress={() => router.push({ pathname: "/Step2" })}>
          <Text style={styles.text}>Next</Text>
        </Pressable>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 40,
          left: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable
          onPress={() => {
            router.push({ pathname: "/" });
          }}
        >
          <Text style={styles.textt}>Back</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  stepContainer: {
    alignSelf: "flex-start",
    marginBottom: 20,
    paddingTop: 10,
  },
  heading: {
    paddingTop: 60,
    fontSize: 30,
    fontWeight: "bold",
    color: "#0C3178",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 300,
  },
  input: {
    height: 50,
    width: 350,
    margin: 12,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 20,
  },
  largeInput: {
    height: 120,
  },
  text: {
    color: "#0C3178",
    paddingVertical: 4 * 2,
    paddingHorizontal: 20,
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
  textt: {
    paddingVertical: 4 * 2,
    paddingHorizontal: 20,
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#0C3178",
  },
  button1: {
    position: "absolute",
    bottom: 40,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderColor: "#0C3178",
    borderWidth: 2,
    elevation: 3,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  // button2: {
  //   position: "absolute",
  //   bottom: 40,
  //   left: 20,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderWidth: 2,
  //   borderRadius: 50,
  //   elevation: 3,
  //   backgroundColor: "#0C3178",
  //   overflow: "hidden",
  // },
});
