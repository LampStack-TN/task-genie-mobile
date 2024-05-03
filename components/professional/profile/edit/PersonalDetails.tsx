import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ApiClient } from "../../../../utils/api";
import Button from "../../../ui/Button";

export default function PersonalDetails({ navigation, route }) {
  const { user } = route.params;

  const { control, handleSubmit } = useForm({
    defaultValues: {
      fullName: user.fullName,
      birthdate: user.birthdate,
      phone: user.phone,
      adress: user.adress,
      city: user.city,
      email: user.email,
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.stepContainer}>
        <Text style={[styles.heading]}>Edit Personal Informations</Text>
      </View>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>Fullname</Text>
              <TextInput
                placeholder="FullName"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            </View>
          )}
          name="fullName"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>Birthdate</Text>
              <TextInput
                placeholder="BirthDate"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            </View>
          )}
          name="birthdate"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>City</Text>
              <TextInput
                placeholder="City"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            </View>
          )}
          name="city"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                placeholder="Address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            </View>
          )}
          name="adress"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                placeholder="Phone"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            </View>
          )}
          name="phone"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                placeholder="email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            </View>
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
        <Button label="Submit" style="fill" callback={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
    backgroundColor: "#fff",
  },
  stepContainer: {
    alignSelf: "flex-start",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0C3178",
    alignSelf: "flex-start",
    paddingTop: 10,
    marginBottom: 22,
  },
  inputContainer: {
    marginVertical: 11,
    width: "100%",
    flex: 1,
    gap: 28,
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
    elevation: 1,
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
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
