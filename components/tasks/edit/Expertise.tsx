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
import config from "../../../config";
import Task from "../taskDetails/TaskInterface";

type Step2Props = {
  navigation: any;
  route: RouteProp<any, any>;
};

const Expertise: React.FC<Step2Props> = ({ navigation, route }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      expertise: "",
    },
  });

  const onSubmit = () => {
    navigation.navigate('step3');
  };

  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <Text style={styles.heading}>Edit:</Text>
        <Text
          style={{ marginBottom: 10, alignSelf: "flex-start", paddingTop: 10 }}
        >
          Skills & Expertise
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{ required: "Expertise is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Expertise"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="expertise"
        />
        {errors.expertise && (
          <Text style={styles.errorText}>Expertise is required.</Text>
        )}

        {/* <MultiSelect
          style={styles.input}
          placeholderStyle={styles.placeholderStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Skills"
          searchPlaceholder="Search..."
          onChange={(item) => {}}
        /> */}
      </View>

      <View style={styles.button}>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text style={styles.text}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={{ position: "absolute", bottom: 40, left: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate("step1")}>
          <Text style={styles.textt}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 15,
  },
});

export default Expertise;
