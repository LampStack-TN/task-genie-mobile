import TaskDetails from "../client/tasks/taskDetails/TaskDetails";
import MyTabs from "../client/tasks/edit/MyTabs";
import UserTaskList from "../client/tasks/userTaskList/Index";
import TaskStepsIndex from "../client/tasks/form";
import Home from "../client/home/Index";
import ProfileDetails from "../client/ProfileDetails"

import Profile from "../professional/profile/Profile";
import search from '../professional/tasks/search/search'

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
