import TaskDetails from "../tasks/client/taskDetails/TaskDetails";
import TaskList from "../tasks/professional/list/TaskList";
import MyTabs from "../tasks/client/edit/MyTabs";
import UserTaskList from "../tasks/client/userTaskList/Index";
import TaskStepsIndex from "../tasks/client/form";
import NearbyJobsScreen from "../tasks/professional/applyingTasks/NearbyJobsScreen";
import AppliedTasks from "../tasks/professional/applyingTasks/AppliedTasks";
import ProfileIndex from "../profile/ProfileIndex";
import Home from "../home/Index";
import Profile from "../profile/Profile";

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
      <Stack.Screen name="TaskList" component={TaskList} />
      <Stack.Screen name="MyTabs" component={MyTabs} />
      <Stack.Screen name="Tasks" component={NearbyJobsScreen} />
      <Stack.Screen name="AppliedJobs" component={AppliedTasks} />
      <Stack.Screen name="ProfileIndex" component={ProfileIndex} />
      <Stack.Screen name="MyTasks" component={UserTaskList} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default UserNavigator;
