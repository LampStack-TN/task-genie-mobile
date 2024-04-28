import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Dropdown } from "react-native-element-dropdown";
import { addTask } from "../../../../redux/slices/TaskSlice";
import { ApiClient } from "../../../../utils/api";
import Button from "../../../ui/Button";

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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dueDate: "",
      minPrice: "",
      maxPrice: "",
      urgency: "",
    },
  });

  const create: any = async () => {
    console.log(task);

    try {
      const { data } = await ApiClient().post(`/task/add/`, task);
      // console.log(data, "jet");
      navigation.navigate("TaskDetails", { taskId: data.id });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data) => {
    dispatch(addTask(data));
    create();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.stepContainer}>
        <Text style={styles.heading}>Step 3</Text>
        <Text
          style={{ marginBottom: 10, alignSelf: "flex-start", paddingTop: 10 }}
        >
          Time & Date
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{
            required: { value: true, message: " Date is required" },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Date & Time"
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="dueDate"
        />
        {errors.dueDate && (
          <Text style={{ color: "#f01010" }}>{errors.dueDate.message}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: { value: true, message: "MinPrice is required" },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="minPrice"
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="minPrice"
        />
        {errors.minPrice && (
          <Text style={{ color: "#f01010" }}>{errors.minPrice.message}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: { value: true, message: "maxPrice is required" },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="maxPrice"
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="maxPrice"
        />
        {errors.maxPrice && (
          <Text style={{ color: "#f01010" }}>{errors.maxPrice.message}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: { value: true, message: "Urgency is required" },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Dropdown
              placeholder="Urgency"
              labelField="label"
              valueField="value"
              data={data}
              onChange={(item) => {
                onChange(item.value);
              }}
              value={value}
              style={[styles.input]}
            />
          )}
          name="urgency"
        />
        {errors.urgency && (
          <Text style={{ color: "#f01010" }}>{errors.urgency.message}</Text>
        )}
      </View>
      <View style={styles.footer}>
        <Button
          label="Back"
          style="bare"
          callback={() => navigation.goBack()}
        />
        <Button label="Finish" style="fill" callback={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },

  stepContainer: {
    alignSelf: "flex-start",
    marginBottom: 25,
  },
  heading: {
    paddingTop: 60,
    fontSize: 40,
    fontWeight: "bold",
    color: "#0C3178",
  },
  inputContainer: {
    width: "100%",
    // alignItems: "center",
    gap: 15,
    // justifyContent: "center",
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
    marginBottom: 30,
    fontSize: 15,
    elevation: 3,
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 22,
    paddingVertical: 8,
    justifyContent: "space-between",
  },
});
