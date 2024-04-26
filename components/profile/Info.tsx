import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import config from "../../config";
import { ApiClient } from "../../api";

import Button from "../UI/Button";
import axios from "axios";


const Info = ({ navigation }) => {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
     jobTitle: "",
      bio: "",
      
    },
  }); 
  const CreateProfile=async (data:any)=>{

    try{
      console.log(data,'jjj');
      
      const result= await ApiClient().post("profile/createProfile/",data)
      console.log(result,'jjj')
    navigation.navigate("Profile")
    }
    catch(error){
      console.log(error);
      
      
    }
  }
  
  const onSubmit = (data:any) => {
    CreateProfile(data);
  };
  
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subTitle}>Professional Info</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.inputView}>
            <Controller
              control={control}
              rules={{
                required: { value: true, message: "jobTitle required" },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  placeholder="Title"
                  value={value}
                  style={styles.input}
                />
              )}
              name="jobTitle"
            />
          </View>
          {errors.jobTitle&& (
            <Text style={{ color: "#f01010" }}>{errors.jobTitle.message}</Text>
          )}

          <View style={styles.inputBio}>
            <Controller
              control={control}
              rules={{
                required: { value: true, message: "Bio is required" },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  placeholder="Bio"
                  value={value}
                  style={styles.input}
                />
              )}
              name="bio"
            />
          </View>
          {errors.bio&& (
            <Text style={{ color: "#f01010" }}>{errors.bio.message}</Text>
          )}
        </View>
        <View style={styles.footer}>
          <Button
            label="Next"
            style="fill"
           callback={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    display: "flex",
    flex: 1,
    // margin: 10,
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
    paddingHorizontal: 25,
    left: 220,
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
  inputBio: {
    backgroundColor: "#fff",
    height: 150,
    paddingHorizontal: 20,
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
