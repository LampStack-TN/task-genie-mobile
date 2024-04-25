import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  StatusBar,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useForm, Controller } from "react-hook-form";
import Button from "../UI/Button";
import { useState } from "react";
import axios from "axios";
import config from "../../config";

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

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

  const sumbitLogin = async (loginData) => {
    try {
      setLoading(true);
      const {
        data: { acessToken },
      } = await axios.post(`${config.apiUrl}/auth/login`, loginData);
      setLoading(false);
      navigation.navigate("Home");
      await AsyncStorage.setItem("token", acessToken);
    } catch (error) {
      setLoading(false);
      alert("Server Error");
      console.error(error);
    }
  };

  const onSubmit = (data) => {
    sumbitLogin(data);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.title}>Sign In</Text>
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
                  placeholder="Email"
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
                  secureTextEntry={true}
                  placeholder="Password"
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

          <View style={{ marginTop: 18 }}>
            <Button
              label="Sign In"
              style="fill"
              callback={handleSubmit(onSubmit)}
            />
          </View>
          <Text
            style={{
              textAlign: "center",
              color: "#1E5BD2",
              fontSize: 18,
              paddingBottom: 22,
              marginHorizontal: 40,
              textDecorationLine: "underline",
              borderBottomWidth: 1,
              borderBottomColor: "#c4c4c4",
            }}
          >
            Forgot password?
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "#4e4e4e",
              fontSize: 18,
            }}
          >
            Don’t have an account?
          </Text>
          <View style={{ paddingHorizontal: "20%" }}>
            <Button
              label="Register"
              style="fill"
              color="#2e2e2e"
              callback={() => navigation.navigate("Register")}
            />
          </View>
        </View>
      </View>
      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="#0C3178" />
        </View>
      ) : (
        <></>
      )}
    </>
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
    justifyContent: "center",
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
  spinner: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
});
