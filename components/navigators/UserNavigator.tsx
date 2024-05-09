import TaskDetails from "../client/tasks/taskDetails/TaskDetails";
import MyTabs from "../client/tasks/edit/MyTabs";
import UserTaskList from "../client/tasks/userTaskList/Index";
import TaskStepsIndex from "../client/tasks/form";
import Home from "../client/home/Index";
import ProfileDetails from "../client/ProfileDetails";
import MyHiredServices from "../professional/services/MyHiredServices";
import Profile from "../professional/profile/Profile";
import search from "../professional/tasks/search/search";
import ServicesList from "../professional/services/ServicesList";
import React from "react";
import ConversationList from "../chat/conversation-list/Index";
import Conversation from "../chat/conversation/Index";
const UserNavigator = ({ Stack }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="MyTasks"
    >
      <Stack.Screen name="AddTask" component={TaskStepsIndex} />
      <Stack.Screen name="TaskDetails" component={TaskDetails} />
      <Stack.Screen name="MyTabs" component={MyTabs} />
      <Stack.Screen name="MyTasks" component={UserTaskList} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
      <Stack.Screen name="ServicesList" component={ServicesList} />
      <Stack.Screen name="ConversationList" component={ConversationList} />
      <Stack.Screen name="Conversation" component={Conversation} />
      <Stack.Screen name="MyHiredServices" component={MyHiredServices}/> 
    </Stack.Navigator>
  );
};

export default UserNavigator;
