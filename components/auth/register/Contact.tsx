import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import { appendData } from "../../../redux/slices/registerSlice";
import Button from "../../ui/Button";

import cities from "../../../data/cities.json";

import SearchableDropdown from "react-native-searchable-dropdown";
import axios from "axios";
import config from "../../../config";
import * as Location from "expo-location";

import { MaterialIcons } from "@expo/vector-icons";

const Contact = ({ navigation }) => {
  
  //location
  const [currentLocation, setCurrentLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
      console.log(location);
      setLoadingLocation(false);
    };
    getLocation();
  }, []);

  const reverseGeocode = async () => {
    if (currentLocation) {
      const { coords } = currentLocation;
      const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
        longitude: coords.longitude,
        latitude: coords.latitude,
      });
      setAddress(reverseGeocodedAddress);
    }
  };

  useEffect(() => {
    setValue(
      "address",
      address
        ? `${address[0]?.name},${address[0]?.region}, ${address[0]?.country}`
        : ""
    );
  }, [address]);

  //
  // Loader State
  const [loading, setLoading] = useState(false);
  const [drop, setDrop] = useState("");

  const registerData = useSelector((state: any) => state.registerData);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      phone: "",
      city: "",
      address: "",
      zipcode: "",
    },
  });

  const sumbitRegister = async (registerData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${config.apiUrl}/auth/register`,
        registerData
      );
      setLoading(true);
      navigation.navigate("Home");
    } catch (error) {
      setLoading(false);
      alert("Server Error");
      console.error(error);
    }
  };

  const onSubmit = (data) => {
    dispatch(appendData(data));
    sumbitRegister({ ...registerData, avatar: "avatar.jpg" });
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Register</Text>
          <Text style={styles.subTitle}>Contact & Location</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.inputView}>
            <Controller
              control={control}
              rules={
                {
                  // required: { value: true, message: "Phone is required" },
                }
              }
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  inputMode="numeric"
                  placeholder="Fullname"
                  value={value}
                  style={styles.input}
                />
              )}
              name="phone"
            />
          </View>
          {errors.phone && (
            <Text style={{ color: "#f01010" }}>{errors.phone.message}</Text>
          )}
          <View style={styles.inputView}>
            <Controller
              control={control}
              rules={
                {
                  // required: { value: true, message: "Fullname is required" },
                }
              }
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  placeholder="Address"
                  value={value}
                  style={{ ...styles.input, flex: 1 }}
                />
              )}
              name="address"
            />
            {loadingLocation ? (
              <ActivityIndicator
                size="small"
                color="#0C3178"
                style={styles.loader}
              />
            ) : (
              <Pressable
                onPress={() => {
                  reverseGeocode();
                }}
              >
                <View style={styles.inputIcon}>
                  <MaterialIcons name="gps-fixed" size={26} color="#F54D6180" />
                </View>
              </Pressable>
            )}
          </View>
          {errors.address && (
            <Text style={{ color: "#f01010" }}>{errors.address.message}</Text>
          )}
          <View style={{ flexDirection: "row", gap: 18 }}>
            <View style={[styles.inputView, { flex: 4 }]}>
              <Controller
                control={control}
                rules={{
                  required: { value: true, message: "Zip Code is required" },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onChangeText={onChange}
                    placeholder="Zipcode"
                    value={value}
                    style={styles.input}
                  />
                )}
                name="zipcode"
              />
            </View>
            <View style={[{ flex: 7 }]}>
              <Controller
                control={control}
                rules={{
                  required: { value: true, message: "City is required" },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <SearchableDropdown
                    onItemSelect={(item) => {
                      onChange(item.name);
                      setDrop(item.name);
                    }}
                    itemStyle={styles.dropItem}
                    itemTextStyle={{ color: "#222" }}
                    itemsContainerStyle={styles.dropList}
                    items={cities}
                    resetValue={false}
                    textInputProps={{
                      placeholder: "Governorates",
                      underlineColorAndroid: "transparent",
                      style: [styles.inputView, styles.input],
                      value: drop,
                      onPressIn: () => setDrop(""),
                      onTextChange: (text) => setDrop(text),
                    }}
                    listProps={{
                      nestedScrollEnabled: true,
                    }}
                  />
                )}
                name="city"
              />
            </View>
          </View>
          <View style={{ flex: 1, gap: 18, flexDirection: "row" }}>
            <View style={{ flex: 5 }}>
              {errors.zipcode && (
                <Text style={{ color: "#f01010" }}>
                  {errors.zipcode.message}
                </Text>
              )}
            </View>
            <View style={{ flex: 5 }}>
              {errors.city && (
                <Text style={{ color: "#f01010" }}>{errors.city.message}</Text>
              )}
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
            label="Finish"
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

export default Contact;

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
  inputIcon: {
    position: "absolute",
    right: 7,
    transform: [{ translateY: -40 }],
  },
  dummyImg: {
    width: 180,
    height: 180,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 90,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderWidth: 5,
    alignSelf: "center",
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
  dropItem: {
    padding: 20,
    borderColor: "#e5e5e5",
    borderBottomWidth: 1,
    borderRadius: 5,
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
  loader: {
    position: "absolute",
    right: 10,
    top: 15,
  },
});
