import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

import Task from "../../../../types/TaskInterface";
import { ApiClient } from "../../../../utils/api";



const JobDescription: React.FC= ({ navigation, route }:any) => {
  const api = ApiClient();
  const { taskId } = route.params;
  const [task, setTask] = useState<Task | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: {
      title: "",
      description: "",
      location: "",
    },
  });

  const onSubmit = async (data: Task) => {
    try {
      await handleEdit(data);
      navigation.navigate("Home");
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
          Basic Job Description
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="title"
        />
        {errors.title && (
          <Text style={styles.errorText}>Title is required.</Text>
        )}

        <Controller
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Description"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={[styles.input, styles.largeInput]}
              multiline={true}
              numberOfLines={4}
            />
          )}
          name="description"
        />
        {errors.description && (
          <Text style={styles.errorText}>Description is required.</Text>
        )}

        <Controller
          control={control}
          rules={{ required: "Location is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Location"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="location"
        />
        {errors.location && (
          <Text style={styles.errorText}>Location is required.</Text>
        )}
      </View>

      <View style={styles.button1}>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text style={styles.text}>Submit</Text>
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
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.textt}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JobDescription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
    backgroundColor: "#fff",
  },
  stepContainer: {
    alignSelf: "flex-start",
    marginBottom: 20,
    paddingTop: 1,
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 15,
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
});
