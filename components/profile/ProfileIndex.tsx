import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import Profile from "./Profile";
import Skills from "./Skills";
import Info from "./Info";
import { ApiClient } from "../../utils/api";

const Stack = createNativeStackNavigator();

const ProfileIndex = () => {
  const [profile, setProfile] = useState(null);
  const [data, setdata] = useState([]);

  const userProfile = async () => {
    try {
      const {
        data,
        data: { profile },
      } = await ApiClient().get("profile/getProfile");
      setProfile(profile);
      setdata(data);
    } catch (error) {
      console.log(error);
      alert("Let's create you Profile");
    }
  };
  useEffect(() => {
    userProfile();
  }, []);

  return profile ? (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile "
        component={Profile}
        initialParams={{ Data: data, profile: profile }}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen name="Skills" component={Skills} />
    </Stack.Navigator>
  );
};

export default ProfileIndex;
