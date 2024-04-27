import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "react-native-element-dropdown";
import { addTask } from "../../../../redux/slices/TaskSlice";
import { ApiClient } from "../../../../api";

export type Task = {
  id?: number;
  title?: string;
  description?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  dueDate?: string;
  urgency?: string;
  clientId?: number;
};
const data = [
  { label: "high", value: "high" },
  { label: "low", value: "low" },
  { label: "medium", value: "medium" },
];
export default function DateTime({ navigation }) {
  const task = useSelector((state: any) => state.task);
  const dispatch = useDispatch();

  const [dueDate, setdueDate] = useState("");
  const [minPrice, setminPrice] = useState("");
  const [maxPrice, setmaxPrice] = useState("");
  const [urgency, setUrgency] = useState("");

  const UpdateTask = (field, value) => {
    dispatch(addTask({ [field]: value }));
  };

  const create: any = async () => {
    try {
      const { data } = await ApiClient().post(`/task/add/`, task);
      // console.log(data, "jet");
      navigation.navigate("TaskDetails", { taskId: data.id });
    } catch (error) {
      console.log(error);
    }
  };

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
          onChangeText={(text) => {
            setdueDate(text), UpdateTask("dueDate", text);
          }}
          value={dueDate}
          style={styles.input}
        />

        <TextInput
          placeholder="minPrice"
          onChangeText={(text) => {
            setminPrice(text), UpdateTask("minPrice", text);
          }}
          value={minPrice}
          style={styles.input}
        />
        <TextInput
          placeholder="maxPrice"
          onChangeText={(text) => {
            setmaxPrice(text), UpdateTask("maxPrice", text);
          }}
          value={maxPrice}
          style={styles.input}
        />
        <Dropdown
          placeholder="Urgency"
          labelField="label"
          valueField="value"
          data={data}
          onChange={(item) => {
            setUrgency(item.value);
            UpdateTask("urgency", item.value);
          }}
          value={urgency}
          style={[styles.input]}
        />
      </View>
      <View style={styles.button2}>
        <Pressable onPress={create}>
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
        <Pressable onPress={() => navigation.navigate("Step2")}>
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
    flex: 3,
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
