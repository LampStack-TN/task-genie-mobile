import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "./TaskSlice";

export default function Step1({ navigation }) {
  // Select task state from Redux store
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  //method dispatch action to update task state
  const UpdateTask = (field, value) => {
    dispatch(addTask({ [field]: value }));
  };

  // console.log(task, 123);
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.stepContainer}>
        <Text style={styles.heading}>Step 1</Text>
        <Text
          style={{
            marginBottom: 10,
            alignSelf: "flex-start",
            paddingTop: 10,
          }}
        >
          Basic Job Description
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Title"
          onChangeText={(text) => {
            setTitle(text);
            UpdateTask("title", text);
          }}
          value={title}
          style={styles.input}
        />

        <TextInput
          placeholder="Description"
          onChangeText={(text) => {
            setDescription(text);
            UpdateTask("description", text);
          }}
          value={description}
          style={[styles.input, styles.largeInput]}
          multiline={true}
          numberOfLines={4}
        />

        <TextInput
          placeholder="Location"
          onChangeText={(text) => {
            setLocation(text), UpdateTask("location", text);
          }}
          value={location}
          style={styles.input}
        />
      </View>

      <View style={styles.footer}>
        <View>
          <Pressable
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Text style={styles.textt}>Back</Text>
          </Pressable>
        </View>

        <View style={styles.button1}>
          <Pressable onPress={() => navigation.navigate("Step2")}>
            <Text style={styles.text}>Next</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 25,
    backgroundColor: "#fff",
  },
  stepContainer: {
    alignSelf: "flex-start",
    marginBottom: 20,
    paddingTop: 1,
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
    gap: 15,
    justifyContent: "center",
    paddingHorizontal: 11,
  },
  input: {
    backgroundColor: "#fff",
    height: 60,
    width: 350,
    paddingHorizontal: 22,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    marginBottom: 20,
    fontSize: 14,
    elevation: 3,
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
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderColor: "#0C3178",
    borderWidth: 2,
    elevation: 3,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  footer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    elevation: 3,
    paddingVertical: 25,
    paddingHorizontal: 25,
    // overflow: "hidden",
  },
});
