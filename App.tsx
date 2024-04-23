// In App.js in a new project
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useSelector, useDispatch } from "react-redux";
import Step1 from "./components/tasks/steps/Step1";
import Step2 from "./components/tasks/steps/Step2";
import Step3 from "./components/tasks/steps/Step3";
import Register from "./components/auth/register/register";




import TaskDetails from "./components/taskDetails/TaskDetails";
import TaskList from "./components/tasks/list/TaskList";
import BasicInfos from "./components/auth/register/BasicInfos";

import store from "./store";
import { Provider } from "react-redux";



import MyTabs from "./components/editTask/MyTabs";


import Index from "./components/tasks/steps";






function HomeScreen({ navigation ,route}) {
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
        title="BasicInfos"
        onPress={() => navigation.navigate("BasicInfos")}
      />
      <Button
        title="TaskDetails"
        onPress={() => navigation.navigate("TaskDetails")}
      />
      <Button
        title="TaskList"
        onPress={() => navigation.navigate("TaskList")}
      />
      <Button
        title="MyTabs"
        onPress={() => navigation.navigate("MyTabs")}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (

    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Step1" component={Index} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="BasicInfos" component={BasicInfos} />
          <Stack.Screen name="TaskDetails" component={TaskDetails} />
          <Stack.Screen name="TaskList" component={TaskList} />
          <Stack.Screen name="MyTabs" component={MyTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

 

  );
}

export default App;
