import TaskDetails from "../tasks/client/taskDetails/TaskDetails";
import MyTabs from "../tasks/client/edit/MyTabs";
import UserTaskList from "../tasks/client/userTaskList/Index";
import TaskStepsIndex from "../tasks/client/form";
import Home from "../home/Index";

import React from "react";

const UserNavigator = ({ Stack }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Step1" component={TaskStepsIndex} />
      <Stack.Screen name="TaskDetails" component={TaskDetails} />
      <Stack.Screen name="MyTabs" component={MyTabs} />
      <Stack.Screen name="MyTasks" component={UserTaskList} />
    </Stack.Navigator>
  );
};

export default UserNavigator;
