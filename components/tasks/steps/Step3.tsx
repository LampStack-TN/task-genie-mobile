import * as React from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";


export default function Step3({navigation}) {

  const [Date, setDate] = React.useState("");
  const [Between, setBetween] = React.useState("");
  const [And, setAnd] = React.useState("");
  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <Text style={styles.heading}>Step 3</Text>
        <Text
          style={{ marginBottom: 10, alignSelf: "flex-start", paddingTop: 10 }}
        >
          Time & Date
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Time & Date"
          onChangeText={(text) => setDate(text)}
          value={Date}
          style={styles.input}
        />

        <TextInput
          placeholder="Between"
          onChangeText={(text) => setBetween(text)}
          value={Between}
          style={styles.input}
        />
        <TextInput
          placeholder="And"
          onChangeText={(text) => setAnd(text)}
          value={And}
          style={styles.input}
        />
      </View>
      <View style={styles.button2}>
        <Pressable onPress={()=>navigation.navigate("Home")}>
          <Text style={[styles.text, { color: "white" }]}>Finish</Text>
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
        <Pressable  onPress={()=>navigation.navigate("Step2")}>
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
  },
  text: {
    paddingVertical: 4 * 2,
    paddingHorizontal: 20,
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#0C3178",
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
  //   button: {
  //     position: "absolute",
  //     bottom: 40,
  //     right: 20,
  //     alignItems: "center",
  //     justifyContent: "center",
  //     borderRadius: 50,
  //     borderColor: "#0C3178",
  //     borderWidth: 2,
  //     elevation: 3,
  //     backgroundColor: "#fff",
  //     overflow: "hidden",
  //   },
  button2: {
    position: "absolute",
    bottom: 40,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: "#0C3178",
    overflow: "hidden",
  },
});
