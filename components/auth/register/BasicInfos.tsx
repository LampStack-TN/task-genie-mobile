import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { appendData } from "../../../redux/slices/registerSlice";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../ui/Button";
import { useState } from "react";
const BasicInfos = ({ navigation }: any) => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      fullName: "",
      birthdate: "",
      avatar: null,
    },
  });
  const onSubmit = (data) => {
    dispatch(appendData({ ...data }));
    navigation.navigate("contact");
  };
  const handlePickImage = async () => {
    let {
      assets: [asset],
    } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      quality: 1,
    });
    if (asset) {
      const { uri, base64, mimeType } = asset;
      const buffer = "data:" + mimeType + ";base64," + base64;

      setImage(uri);
      setValue("avatar", buffer);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Register</Text>
          <Text style={styles.subTitle}>Basic Informations</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.dummyImg}>
            <Pressable onPress={handlePickImage}>
              <Image
                style={styles.placeholder}
                source={{
                  uri:
                    image ||
                    "https://tuffexteriors.com/wp-content/uploads/2021/09/image-dummy.jpg",
                }}
              />
            </Pressable>
          </View>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: "Fullname is required" },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputView}>
                <Text style={styles.inputLabel}>Fullname</Text>
                <TextInput
                  onChangeText={onChange}
                  placeholder="Fullname"
                  value={value}
                  style={styles.input}
                />
              </View>
            )}
            name="fullName"
          />
          {errors.fullName && (
            <Text style={{ color: "#f01010" }}>{errors.fullName.message}</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: { value: true, message: "Birthdate is required" },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputView}>
                <Text style={styles.inputLabel}>Birthdate</Text>
                <TextInput
                  onChangeText={onChange}
                  placeholder="Birthdate"
                  value={value}
                  style={styles.input}
                />
                <View style={styles.inputIcon}>
                  <Ionicons name="calendar-clear" size={24} color="#F58D6180" />
                </View>
              </View>
            )}
            name="birthdate"
          />
          {errors.birthdate && (
            <Text style={{ color: "#f01010" }}>{errors.birthdate.message}</Text>
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
    </View>
  );
};
export default BasicInfos;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    display: "flex",
    flex: 1,
    margin: 10,
    marginTop: StatusBar.currentHeight || 0,
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
    backgroundColor: "#fff",
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
    right: 28,
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
  dummyImg: {
    width: 180,
    height: 180,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 90,
    overflow: "hidden",
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderWidth: 5,
    alignSelf: "center",
    marginBottom: 22,
  },

  placeholder: {
    width: 180,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
});
