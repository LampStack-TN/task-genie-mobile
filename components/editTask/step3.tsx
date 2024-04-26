import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { RouteProp } from "@react-navigation/native";
import axios from "axios";
import Task from "../taskDetails/TaskInterface";
import config from "../../config";
import { ApiClient } from "../../api";
type RootStackParamList = {
  step3: { taskId: string };
};

type Step3RouteProp = RouteProp<RootStackParamList, "step3">;

type Step3Props = {
  navigation: any;
  route: Step3RouteProp;
};

const step3: React.FC<Step3Props> = ({ navigation, route }) => {
  const api = ApiClient()
  const { taskId } = route.params;
  const [task, setTask] = useState<Task | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: {
      minPrice: 0,
      maxPrice: 0,
    },
  });

  const onSubmit = async (data: Task) => {
    try {
      await handleEdit(data);
      navigation.navigate("MyBottomTab");
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };
  const handleEdit = async (updatedTask: Task) => {
    try {
      const { data } = await api.put(`/task/update/${taskId}`, updatedTask);
      setTask(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <Text style={styles.heading}>Edit :</Text>
        <Text
          style={{ marginBottom: 10, alignSelf: "flex-start", paddingTop: 10 }}
        >
          Price
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{ required: "Min Price is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="minPrice"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value.toString()}
              style={styles.input}
            />
          )}
          name="minPrice"
        />
        {errors.minPrice && (
          <Text style={styles.errorText}>Min Price is required.</Text>
        )}

        <Controller
          control={control}
          rules={{ required: "Max Price is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="maxPrice"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value.toString()}
              style={styles.input}
            />
          )}
          name="maxPrice"
        />
        {errors.maxPrice && (
          <Text style={styles.errorText}>Max Price is required.</Text>
        )}
      </View>
      <View style={styles.button2}>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text style={[styles.text, { color: "white" }]}>Finish</Text>
        </TouchableOpacity>
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
        <TouchableOpacity onPress={() => navigation.navigate("step1")}>
          <Text style={styles.textt}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 15,
  },
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

export default step3;
