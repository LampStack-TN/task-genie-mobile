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
  
  import { useSelector, useDispatch } from "react-redux";
  import { useForm, Controller } from "react-hook-form";
  import {appendData} from "../auth/register/registerSlice"
 
  import Button from "../UI/Button";

  
  
  

  
  const Profile1 = ({ navigation }) => {
    // Loader State
    const [loading, setLoading] = useState(false);
  
    const registerData = useSelector((state: any) => state.registerData);

    const dispatch = useDispatch();
   console.log(registerData,'hhh');
   
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {
        title: "",
        bio: "",
        Expertise: "",
       
       
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
            <Text style={styles.subTitle}>Professional Info</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.inputView}>
              <Controller
                control={control}
                rules={{
                  required: { value: true, message: "Title is required" },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onChangeText={onChange}
                    placeholder="Title"
                    value={value}
                    style={styles.input}
                  />
                )}
                name="title"
              />
            </View>
            {errors.title&& (
              <Text style={{ color: "#f01010" }}>{errors.title.message}</Text>
            )}
            <View style={styles.inputView}>
              <Controller
                control={control}
                rules={{
                  required: { value: true, message: "Expertise is required" },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onChangeText={onChange}
                    placeholder="Expertise"
                    value={value}
                    style={styles.input}
                  />
                )}
                name="Expertise"
              />
            </View>
            
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
                name="Expertise"
              />
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
              callback={()=>navigation.navigate("Profile2")}
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
  
  export default Profile1;
  
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
    // dummyImg: {
    //   width: 180,
    //   height: 180,
    //   backgroundColor: "rgba(0, 0, 0, 0.1)",
    //   borderRadius: 90,
    //   borderColor: "rgba(0, 0, 0, 0.3)",
    //   borderWidth: 5,
    //   alignSelf: "center",
    // },
  
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
  