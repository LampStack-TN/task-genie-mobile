import React, { useState } from "react";
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
import { ApiClient } from "../../../../utils/api";
import Button from "../../../ui/Button";
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
  { label: "Immediate", value: "Immediate" },
  { label: "Urgent", value: "Urgent" },
  { label: "Soon", value: "Soon" },
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
        <View style={styles.stepContainer}>
          <Text style={styles.heading}>Step 3</Text>
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
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: " Date is required" },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <TextInput
                  editable={false}
                  placeholder="Date & Time"
                  value={value}
                  style={[
                    styles.input,
                    { color: "#4e4e4e", fontWeight: "600" },
                  ]}
                />
              </View>
            )}
            name="dueDate"
          />
          <View style={[styles.inputIcon, { zIndex: 999 }]}>
            <Pressable onPress={() => setShowDatePicker(true)}>
              <Ionicons name="calendar-clear" size={24} color="#F58D6180" />
            </Pressable>
          </View>
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
                containerStyle={{borderRadius: 30}}
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
    gap: 15,
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
  inputIcon: {
    position: "absolute",
    top: 17,
    right: 35,
  },
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
