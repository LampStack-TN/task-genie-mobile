
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ApiClient } from "../../../utils/api";
import Button from "../../ui/Button";

export default function PersonalDetails({ navigation, route }) {
  const { Data} = route.params;

  const { control, handleSubmit } = useForm({
    defaultValues: {
      fullName: Data.fullName,
      birthdate: Data.birthdate,
      phone: Data.phone,
      adress: Data.adress,
      email: Data.email,
    },
  });

  const updateUserInfo = async (data: any) => {
    try {
      const response = await ApiClient().put("auth/updateUser/", data);
      console.log(response);
      navigation.navigate("Profile");
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = (data: any) => {
    updateUserInfo(data);
  };
  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <Text
          style={[
            styles.heading,
            { marginBottom: 10, alignSelf: "flex-start", paddingTop: 10 },
          ]}
        >
          Edit Personal Details
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="FullName"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="fullName"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="BirthDate"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="birthdate"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Adress"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="adress"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Phone"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="phone"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="email"
        />
      </View>
      <View style={styles.footer}>
        <Button
          label="Back"
          style="bare"
          callback={() => navigation.goBack()}
        />
        <Button
          label="Submit"
          style="outline"
          callback={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
}

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
  heading: {
    paddingTop: 60,
    fontSize: 20,
    fontWeight: "bold",
    color: "#0C3178",
  },
  inputContainer: {
    width: "100%",
    flex: 2,
    alignItems: "center",
    gap: 15,
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
  footer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 22,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
