import TaskDetails from "../tasks/client/taskDetails/TaskDetails";
import MyTabs from "../tasks/client/edit/MyTabs";
import UserTaskList from "../tasks/client/userTaskList/Index";
import TaskStepsIndex from "../tasks/client/form";
import Home from "../home/Index";
import ProfileDetails from "../profile/ProfileDetails"

import Profile from "../profile/Profile";
import search from '../tasks/client/search/search'

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
      <Stack.Screen name="AddTask" component={TaskStepsIndex} />
      <Stack.Screen name="TaskDetails" component={TaskDetails} />
      <Stack.Screen name="MyTabs" component={MyTabs} />
      <Stack.Screen name="MyTasks" component={UserTaskList} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Search" component={search} />
    </Stack.Navigator>
  );
};

export default UserNavigator;
