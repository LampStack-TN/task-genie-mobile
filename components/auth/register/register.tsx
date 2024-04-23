import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Pressable,
} from "react-native";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "../../UI/Button";
import { useSelector, useDispatch } from "react-redux";
import { appendData } from "./registerSlice";

const Register = ({ navigation }) => {
  // Loader State
  const [loading, setLoading] = useState(false);

  useSelector((state: any) => state.registerData);
  const dispatch = useDispatch();

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
    dispatch(appendData(data));
    navigation.navigate("basicInfos");
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.back}>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
          <Text style={styles.title}>Register</Text>
        </View>
        <View style={styles.section}>
          <Controller
            control={control}
            rules={{
              required: true,
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
          {errors.email && (
            <Text style={{ color: "#f01010" }}>Email is required.</Text>
          )}

          <Controller
            control={control}
            rules={{
              minLength: 8,
              required: true,
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
          {errors.password && (
            <Text style={{ color: "#f01010" }}>Invalid Password.</Text>
          )}
          <Button
            label="Register"
            style="fill"
            callback={handleSubmit(onSubmit)}
          />
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

export default Register;

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
  back: {
    position: "absolute",
    top: 32,
    left: 16,
  },
  backText: {
    fontSize: 18,
  },
  title: {
    textAlign: "center",
    fontSize: 36,
    fontWeight: "bold",
    color: "#0C3178",
  },
  input: {
    backgroundColor: "#fff",
    height: 60,
    paddingHorizontal: 22,
    borderRadius: 30,
    borderColor: "#e5e5e5",
    borderWidth: 1,
    fontSize: 14,
    elevation: 3,
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
