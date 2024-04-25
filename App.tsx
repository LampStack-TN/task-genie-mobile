// In App.js in a new project
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterIndex from "./components/auth/register/Index";
import TaskDetails from "./components/taskDetails/TaskDetails";
import TaskList from "./components/tasks/list/TaskList";
import MyBottomTab from "./components/navigation/MyBottomTab";
import store from "./store";
import { Provider } from "react-redux";

import MyTabs from "./components/editTask/MyTabs";

import TaskStepsIndex from "./components/tasks/steps";
import Login from "./components/auth/Login";
import NearbyJobsScreen from "./components/findJob/applyingTasks/NearbyJobsScreen";
import AppliedTasks from "./components/findJob/applyingTasks/AppliedTasks";
import { useLayoutEffect, useState } from "react";
import { ApiClient } from "./api";
import ProfileIndex from "./components/profile/ProfileIndex"

function HomeScreen({ navigation, route }) {
  // const task = useSelector((state: any) => state.task);
  // console.log(task,'hhh');

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        gap: 5,
        justifyContent: "center",
      }}
    >
      <Text>Home Screen</Text>
      <Button
        title="Go to Step1"
        onPress={() => navigation.navigate("Step1")}
      />
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
      <Button
        title="Sign In"
        color={"black"}
        onPress={() => navigation.navigate("login")}
      />
      <Button
        title="TaskDetails"
        onPress={() => navigation.navigate("TaskDetails", { taskId: 3 })}
      />
      <Button
        title="TaskList"
        onPress={() => navigation.navigate("TaskList")}
      />
      <Button title="MyTabs" onPress={() => navigation.navigate("MyTabs")} />
      <Button title="MyTabs" onPress={() => navigation.navigate("MyTabs")} />
      <Button title="Tasks" onPress={() => navigation.navigate("Tasks")} />
      <Button
        title="AppliedJobs"
        onPress={() => navigation.navigate("AppliedJobs")}
      />
      <Button
        title="start"
        onPress={() => navigation.navigate("MyBottomTab")}
      />
      <Button title="Profile" onPress={() => navigation.navigate("ProfileIndex")} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  const [user, setUser] = useState(null);

  const verifyToken = async () => {
    try {
      const { data } = await ApiClient().get("auth/verify-token");
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  useLayoutEffect(() => {
    verifyToken();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {user ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Home"
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Step1" component={TaskStepsIndex} />
            <Stack.Screen name="TaskDetails" component={TaskDetails} />
            <Stack.Screen name="TaskList" component={TaskList} />
            <Stack.Screen name="MyTabs" component={MyTabs} />
            <Stack.Screen name="MyBottomTab" component={MyBottomTab} />
            <Stack.Screen name="Tasks" component={NearbyJobsScreen} />
            <Stack.Screen name="AppliedJobs" component={AppliedTasks} />
            <Stack.Screen name="ProfileIndex" component={ProfileIndex} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="login"
          >
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="Register" component={RegisterIndex} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
