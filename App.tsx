// In App.js in a new project
import {
  View,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Text,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterIndex from "./components/auth/register/Index";
import TaskDetails from "./components/tasks/client/taskDetails/TaskDetails";
import TaskList from "./components/tasks/professional/list/TaskList";
import store from "./redux/store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import MyTabs from "./components/tasks/client/edit/MyTabs";
import UserTaskList from "./components/tasks/client/userTaskList/Index";
import TaskStepsIndex from "./components/tasks/client/form";
import Login from "./components/auth/Login";
import NearbyJobsScreen from "./components/tasks/professional/applyingTasks/NearbyJobsScreen";
import AppliedTasks from "./components/tasks/professional/applyingTasks/AppliedTasks";
import { useLayoutEffect, useState } from "react";
import { ApiClient } from "./api";
import ProfileIndex from "./components/profile/ProfileIndex";
import BottomNav from "./components/ui/BottomNav";
import Home from "./components/home/Index";
import Profile from "./components/profile/Profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "./redux/slices/userSlice";

import splash from "./assets/splash.png";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

const Main = () => {
  const user = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const checkAuthentication = async () => {
    try {
      const { data } = await ApiClient().get("auth/verify-token");
      console.log(data);
      dispatch(setUser(data));
    } catch (error) {
      console.log(error);
      await AsyncStorage.removeItem("token");
    }
    setLoading(false);
  };

  useLayoutEffect(() => {
    if (!user) {
      checkAuthentication();
    }
  }, [user]);

  return loading ? (
    <ImageBackground
      source={splash}
      resizeMode="cover"
      style={{
        width: "100%",
        height: "100%", // Set the height to cover the entire container
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            color: "#fff",
            fontSize: 50,
            backgroundColor: "#00000090",
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          Temporary Loading Message
        </Text>
      </View>
    </ImageBackground>
  ) : (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <NavigationContainer>
        {user ? (
          <SafeAreaView
            style={{
              flex: 1,
              marginTop: StatusBar.currentHeight,
              backgroundColor: "#fff",
            }}
          >
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
                initialRouteName="Home"
              >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Step1" component={TaskStepsIndex} />
                <Stack.Screen name="TaskDetails" component={TaskDetails} />
                <Stack.Screen name="TaskList" component={TaskList} />
                <Stack.Screen name="MyTabs" component={MyTabs} />
                <Stack.Screen name="Tasks" component={NearbyJobsScreen} />
                <Stack.Screen name="AppliedJobs" component={AppliedTasks} />
                <Stack.Screen name="ProfileIndex" component={ProfileIndex} />
                <Stack.Screen name="MyTasks" component={UserTaskList} />
                <Stack.Screen name="Profile" component={Profile} />
              </Stack.Navigator>
            </View>
            <BottomNav />
          </SafeAreaView>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="login"
          >
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="Register" component={RegisterIndex} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
};

export default App;
