import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import { ApiClient } from "../../../utils/api";
import Profile from "./Profile";
import Skills from "./Skills";
import Info from "./Info";
import Documents from "./Documents";

const Stack = createNativeStackNavigator();

const ProfileIndex = () => {
  const [user, setUser] = useState(null);
  const [dummy, setDummy] = useState(false);

  const userProfile = async () => {
    try {
      const { data } = await ApiClient().get("profile/getProfile");
      setUser(data);
    } catch (error) {
      console.log(error);
      alert("Let's create you Profile");
    }
  };
  useEffect(() => {
    userProfile();
  }, [dummy]);

  return user?.profile ? (
    <Profile {...{ user }} />
  ) : (
    <Stack.Navigator>
      <Stack.Screen name="Info" component={Info} initialParams={{ setDummy }} />
      <Stack.Screen name="Skills" component={Skills} />
      <Stack.Screen name="Documents" component={Documents} />
    </Stack.Navigator>
  );
};

export default ProfileIndex;
