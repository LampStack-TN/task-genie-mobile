import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../../../redux/slices/TaskSlice";
import skills from "../../../data/skills.json";
export default function SkillsForm({ navigation }) {
  const dispatch = useDispatch();

  const [selectedSkills, setSelectedSkills] = useState([]);

 

  // console.log(task, 123);

  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <Text style={styles.heading}>Step 2</Text>
        <Text
          style={{ marginBottom: 10, alignSelf: "flex-start", paddingTop: 10 }}
        >
          Skills & Expertise
        </Text>
      </View>

      <View style={styles.inputContainer}>
        {/* <TextInput
          placeholder="Expertise"
          onChangeText={(text) => setExpertise(text)}
          value={Expertise}
          style={styles.input}
        /> */}

        <MultiSelect
          style={styles.input}
          placeholderStyle={styles.placeholderStyle}
          data={skills}
          labelField="name"
          valueField="id"
          placeholder="Skills"
          searchPlaceholder="Search..."
          value={selectedSkills}
          onChange={(skillId) => {
            console.log(skillId);

            setSelectedSkills(skillId);
            dispatch(addTask({ skills: skillId }));
          }}
        />
      </View>

      <View style={styles.button}>
        <Pressable
          onPress={() => {
            navigation.navigate("Step3");
          }}
        >
          <Text style={styles.text}>Next</Text>
        </Pressable>
      </View>

      <View style={{ position: "absolute", bottom: 40, left: 20 }}>
        <Pressable onPress={() => navigation.navigate("Step1")}>
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
    flex: 3,
    gap: 15,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 300,
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
    backgroundColor: "#fff",
  },
  // selectedTextStyle: {
  //   fontSize: 14,
  //   borderRadius:30,
  // },

  // inputSearchStyle: {
  //   height: 40,
  //   fontSize: 16,
  // },

  selectedStyle: {
    borderRadius: 30,
  },
});