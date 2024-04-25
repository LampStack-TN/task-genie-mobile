import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import SearchableDropdown from "react-native-searchable-dropdown";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { appendData } from "../auth/register/registerSlice";

import Button from "../UI/Button";
import skills from "../../data/skills.json";

const Profile2 = ({ navigation }) => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  // Loader State
  const [loading, setLoading] = useState(false);

  const registerData = useSelector((state: any) => state.registerData);

  const dispatch = useDispatch();
  console.log(registerData, "hhh");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      skills: "",
    },
  });

  // const onSubmit = (data) => {
  //   dispatch(appendData(data));
  //   sumbitRegister({ ...registerData, avatar: "avatar.jpg", role: "client" });
  // };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subTitle}>Skills</Text>
        </View>
        <View style={styles.section}>
          <View style={[{ flex: 7 }]}>
            <Controller
              control={control}
              rules={{
                required: { value: true, message: "skills  is required" },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <SearchableDropdown
                  onItemSelect={(item) => onChange(item.name)}
                  itemStyle={styles.dropItem}
                  itemTextStyle={{ color: "#222" }}
                  itemsContainerStyle={styles.dropList}
                  items={skills}
                  resetValue={false}
                  textInputProps={{
                    placeholder: "Skills",
                    underlineColorAndroid: "transparent",
                    style: [styles.inputView, styles.input],
                    value: value,
                    // onTextChange: (text) => alert(text),
                  }}
                  listProps={{
                    nestedScrollEnabled: true,
                  }}
                />
              )}
              name="skills"
            />
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          label="Back"
          style="bare"
          callback={() => navigation.goBack()}
        />
        <Button
          label="Next"
          style="fill"
          callback={() => navigation.navigate}
        />
      </View>
    </>
  );
};

export default Profile2;

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
  dropItem: {
    padding: 20,
    borderColor: "#e5e5e5",
    borderBottomWidth: 1,
    borderRadius: 5,
  },

  dropList: {
    position: "absolute",
    width: "100%",
    maxHeight: 250,
    overflow: "hidden",
    top: "100%",
    zIndex: 1,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "#e5e5e5",
    padding: 10,
  },
});
