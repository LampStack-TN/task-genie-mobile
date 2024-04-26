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
import store from "./redux/store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import MyTabs from "./components/editTask/MyTabs";
import MyTasksPosted from "./components/tasks/MyLists/MyTasksPosted";
import TaskStepsIndex from "./components/tasks/steps";
import Login from "./components/auth/Login";
import NearbyJobsScreen from "./components/findJob/applyingTasks/NearbyJobsScreen";
import AppliedTasks from "./components/findJob/applyingTasks/AppliedTasks";
import { useLayoutEffect } from "react";
import { ApiClient } from "./api";
import ProfileIndex from "./components/profile/ProfileIndex";
import BottomNav from "./components/UI/BottomNav";
import Menu from "./components/navigation/Menu";
import Profile from "./components/profile/Profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "./redux/slices/userSlice";

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
  };

  useLayoutEffect(() => {
    if (!user) {
      checkAuthentication();
    }
  }, [user]);

  return (
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
