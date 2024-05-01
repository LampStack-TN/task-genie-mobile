import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { MultiSelect } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { addService } from "../../../redux/slices/serviceSlice";
import Button from "../../ui/Button";
import skills from "../../../data/skills.json";
import { ApiClient } from "../../../utils/api";
import { Service } from "../../../types/Service";

const Price = ({ navigation }) => {
  const service = useSelector((state: any) => state.service);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      availability: "",
      price:0
    },
  });

  const create: any = async (data) => {
    try {
      const { data: postedService } = await ApiClient().post(
        `/service/createService/`,
        {
          ...service,
          ...data,
        }
      );
      navigation.navigate("ServiceDetails", { serviceId: postedService.id });
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = (data) => {
    create(data);
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
          Availability & Price
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{
            required: { value: true, message: " Availability is required" },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Availability"
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="availability"
        />
        {errors.availability && (
          <Text style={{ color: "#f01010" }}>
            {errors.availability.message}
          </Text>
        )}
        <Controller
          control={control}
          rules={{
            required: { value: true, message: "Price is required" },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Price"
              onChangeText={(text) => onChange(parseInt(text, 10))}
              value={value.toString()}
              style={styles.input}
              keyboardType="numeric"
            />
          )}
          name="price"
        />
        {errors.price && (
          <Text style={{ color: "#f01010" }}>{errors.price.message}</Text>
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
};

export default Price;
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
