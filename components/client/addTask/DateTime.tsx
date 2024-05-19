import { useState } from "react";
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
import { ApiClient } from "../../../utils/api";
import Button from "../../ui/Button";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

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
  { label: "High", value: "high" },
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
];
export default function DateTime({ navigation }) {
  //
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (event: any, date: any) => {
    if (date) {
      setSelectedDate(date);
      setShowDatePicker(false);
      const formattedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      setValue("dueDate", formattedDate);
    }
  };
  //
  const task = useSelector((state: any) => state.task);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dueDate: "",
      minPrice: "",
      maxPrice: "",
      urgency: "",
    },
  });

  const create: any = async (data) => {
    console.log(task);

    try {
      const { data: postedTask } = await ApiClient().post(`/task/add/`, {
        ...task,
        ...data,
      });
      navigation.navigate("TaskDetails", { taskId: postedTask.id });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data) => {
    create(data);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Step 3</Text>
          <Text
            style={{
              marginBottom: 10,
              alignSelf: "flex-start",
              paddingTop: 10,
            }}
          >
            Time & Date
          </Text>
        </View>
        <View style={styles.section}>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: " Date is required" },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputView}>
                <Text style={styles.inputLabel}>Due Date</Text>
                <TextInput
                  editable={false}
                  placeholder="-- / -- / ----"
                  value={value}
                  style={[
                    styles.input,
                    { color: "#4e4e4e", fontWeight: "600" },
                  ]}
                />
                <View style={styles.inputIcon}>
                  <Pressable onPress={() => setShowDatePicker(true)}>
                    <Ionicons
                      name="calendar-clear"
                      size={24}
                      color="#F58D6180"
                    />
                  </Pressable>
                </View>
              </View>
            )}
            name="dueDate"
          />
          {errors.dueDate && (
            <Text style={{ color: "#f01010" }}>{errors.dueDate.message}</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: { value: true, message: "Minimum Price is required" },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputView}>
                <Text style={styles.inputLabel}>Minimum Price</Text>
                <TextInput
                inputMode="decimal"
                  placeholder="-- TND"
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                />
              </View>
            )}
            name="minPrice"
          />
          {errors.minPrice && (
            <Text style={{ color: "#f01010" }}>{errors.minPrice.message}</Text>
          )}
          <Controller
            control={control}
            rules={
              {
                // required: { value: true, message: "maxPrice is required" },
              }
            }
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputView}>
                <Text style={styles.inputLabel}>Maximum Price (Optional)</Text>
                <TextInput
                inputMode="decimal"
                  placeholder="-- TND"
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                />
              </View>
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
              <View style={styles.inputView}>
                <Text style={styles.inputLabel}>Urgency</Text>
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
                  containerStyle={{ borderRadius: 30 }}
                />
              </View>
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
          <Button
            label="Finish"
            style="fill"
            callback={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
      {showDatePicker && (
        <Pressable
          onPress={() => setShowDatePicker(false)}
          style={styles.dateContainer}
        >
          <View style={styles.date}>
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="inline"
              onChange={handleDateChange}
            />
          </View>
        </Pressable>
      )}
    </>
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
    alignItems: "center",
    elevation: 3,
    flexDirection: "row",
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
    flex: 1,
    fontSize: 14,
  },
  inputIcon: {},
  dateContainer: {
    backgroundColor: "#00000080",
    position: "absolute",
    width: "100%",
    zIndex: 999,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  date: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 22,
  },
});
