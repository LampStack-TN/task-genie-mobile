import * as React from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { MultiSelect } from 'react-native-element-dropdown';
import { useRouter } from "expo-router";

export default function Step2() {
  const router = useRouter();
  const [Expertise, setExpertise] = React.useState("");
  const [Skill, setSkill] = React.useState([]);

  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <Text style={styles.heading}>Step 2</Text>
        <Text style={{ marginBottom: 10, alignSelf: "flex-start", paddingTop: 10 }}>Skills & Expertise</Text>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Expertise"
          onChangeText={(text) => setExpertise(text)}
          value={Expertise}
          style={styles.input}
        />
        
        <MultiSelect
          style={[styles.input,{ height: 50,
            backgroundColor: 'transparent',
            borderBottomColor: 'gray',
            borderBottomWidth: 0.5,}]} 
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Skills"
          searchPlaceholder="Search..."
          value={Skill}
          onChange={item => {
            setSkill(item);
          }}
          // SkillStyle={styles.SkillStyle}
        />
      </View>
      
      <View style={styles.button}>
        <Pressable onPress={() => {router.push({ pathname: "/Step3" })}}>
          <Text style={styles.text}>Next</Text>
        </Pressable>
      </View>
      
      <View style={{ position: "absolute", bottom: 40, left: 20 }}>
        <Pressable onPress={() => router.push({ pathname: "/Step1" })}>
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
    paddingEnd: 50,
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
  button: {
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
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  selectedStyle: {
    borderRadius: 12,
  },
});
