import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Button from "../UI/Button";

const Login = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);

    // navigation.navigate("basicInfos");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sign In</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.inputView}>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                message: "Invalid Email",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={onChange}
                placeholder="Fullname"
                value={value}
                style={styles.input}
              />
            )}
            name="email"
          />
        </View>
        {errors.email && (
          <Text style={{ color: "#f01010" }}>{errors.email.message}</Text>
        )}

        <View style={styles.inputView}>
          <Controller
            control={control}
            rules={{
              minLength: {
                value: 8,
                message: "Must be at least 8 characters",
              },
              required: { value: true, message: "Password is required" },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={onChange}
                placeholder="Fullname"
                value={value}
                style={styles.input}
              />
            )}
            name="password"
          />
        </View>
        {errors.password && (
          <Text style={{ color: "#f01010" }}>{errors.password.message}</Text>
        )}

        <Button
          label="Register"
          style="fill"
          callback={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    display: "flex",
    flex: 1,
    margin: 10,
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 25,
  },
  // footer: {
  //   flexDirection: "row",
  //   backgroundColor: "#fff",
  //   paddingHorizontal: 22,
  //   paddingVertical: 25,
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "space-between",
  // },
  section: {
    backgroundColor: "#fff",
    flex: 3,
    gap: 15,
    height: 50,
    marginTop: 30,
    paddingHorizontal: 11,
  },
  title: {
    textAlign: "center",
    fontSize: 36,
    fontWeight: "bold",
    color: "#0C3178",
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
  input: {
    fontSize: 14,
  },
});
