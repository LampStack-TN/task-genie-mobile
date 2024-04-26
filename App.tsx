// In App.js in a new project
import {
  View,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterIndex from "./components/auth/register/Index";
import TaskDetails from "./components/taskDetails/TaskDetails";
import TaskList from "./components/tasks/list/TaskList";
import MyBottomTab from "./components/navigation/MyBottomTab";
import store from "./store";
import { Provider } from "react-redux";
import MyTabs from "./components/editTask/MyTabs";
import MyTasksPosted from "./components/tasks/MyLists/MyTasksPosted";
import TaskStepsIndex from "./components/tasks/steps";
import Login from "./components/auth/Login";
import NearbyJobsScreen from "./components/findJob/applyingTasks/NearbyJobsScreen";
import AppliedTasks from "./components/findJob/applyingTasks/AppliedTasks";
import { useLayoutEffect, useState } from "react";
import { ApiClient } from "./api";
import ProfileIndex from "./components/profile/ProfileIndex";
import BottomNav from "./components/UI/BottomNav";
import Menu from "./components/navigation/Menu";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

function App() {
  const [user, setUser] = useState(null);
  const [dummy, setDummy] = useState(false);

  const verifyToken = async () => {
    try {
      const { data } = await ApiClient().get("auth/verify-token");
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error);
      await AsyncStorage.removeItem("token");
      alert(error.message);
    }
  };

  useLayoutEffect(() => {
    verifyToken();
  }, [dummy]);

  return (
    <Provider store={store}>
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
                  <Stack.Screen name="Home" component={Menu} />
                  <Stack.Screen name="Step1" component={TaskStepsIndex} />
                  <Stack.Screen name="TaskDetails" component={TaskDetails} />
                  <Stack.Screen name="TaskList" component={TaskList} />
                  <Stack.Screen name="MyTabs" component={MyTabs} />
                  <Stack.Screen name="MyBottomTab" component={MyBottomTab} />
                  <Stack.Screen name="Tasks" component={NearbyJobsScreen} />
                  <Stack.Screen name="AppliedJobs" component={AppliedTasks} />
                  <Stack.Screen name="ProfileIndex" component={ProfileIndex} />
                  <Stack.Screen name="MyTasks" component={MyTasksPosted} />
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
              <Stack.Screen name="Home" component={Menu} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </KeyboardAvoidingView>
    </Provider>
  );
}

export default App;
