import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTask } from "../../../redux/slices/TaskSlice";
import Button from "../../ui/Button";
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
      <View style={styles.header}>
        <Text style={styles.title}>Step 1</Text>
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

      <View style={styles.section}>
        <Controller
          control={control}
          rules={{
            required: { value: true, message: "Title is required" },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>Title</Text>
              <TextInput
                placeholder="Title"
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            </View>
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
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                placeholder="Description"
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            </View>
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
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                placeholder="Location"
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            </View>
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
    backgroundColor: "#fff",
    display: "flex",
    flexGrow: 1,
    padding: 10,
  },
  header: {
    alignItems: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: "center",
    paddingLeft: 10,
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 22,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  section: {
    // backgroundColor: "#f0f0f0",
    gap: 15,
    flex: 1,
    // borderWidth: 2,
    marginTop: 30,
    paddingHorizontal: 11,
    paddingVertical: 11,
  },
  back: {
    position: "absolute",
    top: 32,
    left: 16,
    fontSize: 18,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#0C3178",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "400",
    color: "#6e6e6e",
  },
  inputView: {
    backgroundColor: "#fff",
    height: 60,
    paddingHorizontal: 22,
    borderRadius: 30,
    borderColor: "#e5e5e5",
    borderWidth: 1,
    fontSize: 14,
    justifyContent: "center",
    elevation: 3,
  },
  inputLabel: {
    fontSize: 14,
    position: "absolute",
    top: -10,
    left: 22,
    color: "#F58D61",
    backgroundColor: "#fff",
    paddingLeft: 5,
    paddingRight: 8,
  },
  input: {
    fontSize: 14,
  },
  inputIcon: {
    position: "absolute",
    top: 9,
    right: 12,
  },
});
