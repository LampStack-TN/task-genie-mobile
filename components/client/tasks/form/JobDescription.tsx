import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTask } from "../../../../redux/slices/TaskSlice";
import Button from "../../../ui/Button";

export default function JobDescription({ navigation }) {
  // Select task state from Redux store
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      location: "",
    },
  });

  //method dispatch action to update task state
  const onSubmit = (data) => {
    dispatch(addTask(data));
    navigation.navigate("Step2");
  };

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
        <Controller
          control={control}
          rules={{
            required: { value: true, message: "Title is required" },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Title"
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="title"
        />
        {errors.title && (
          <Text style={{ color: "#f01010" }}>{errors.title.message}</Text>
        )}

        <Controller
          control={control}
          rules={{
            required: { value: true, message: "Description is required" },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Description"
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="description"
        />
        {errors.description && (
          <Text style={{ color: "#f01010" }}>{errors.description.message}</Text>
        )}

        <Controller
          control={control}
          rules={{
            required: { value: true, message: "Location is required" },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Location"
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="location"
        />
        {errors.location && (
          <Text style={{ color: "#f01010" }}>{errors.location.message}</Text>
        )}
      </View>

      <View style={styles.footer}>
        <Button
          label="Back"
          style="bare"
          callback={() => navigation.goBack()}
        />
        <Button
          label="Next"
          style="outline"
          callback={handleSubmit(onSubmit)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 40,
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
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
