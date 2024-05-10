import { Text, View } from "react-native";
import ProfileIndex from "../professional/profile/ProfileIndex";
import TaskList from "../professional/tasks/applyingTasks/TaskList";
import Tabs from "../professional/profile/edit/Tabs";
import Home from "../professional/home/ProIndex";
import FavouriteTasksList from "../professional/tasks/favouriteTasks/FavouriteTasksList";
import proDetails from "../professional/tasks/proDetails";
import MyServices from "../professional/services/MyServices";
import ProIndex from "../professional/form/ProIndex";
import ServiceDetails from "../professional/serviceDetails/ServiceDetails";
import AppliedTasks from "../professional/tasks/applyingTasks/AppliedTasks";
import ConversationList from "../chat/conversation-list/Index";
import Conversation from "../chat/conversation/Index";
import Profile from "../professional/profile/Profile";
const ProNavigator = ({ Stack }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="task-list"
    >
      <Stack.Screen name="AddService" component={ProIndex} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MyServices" component={MyServices} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
      <Stack.Screen name="task-list" component={TaskList} />
      <Stack.Screen name="ProfileIndex" component={Profile} />
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="FavouriteTasksList" component={FavouriteTasksList} />
      <Stack.Screen name="ProDetails" component={proDetails} />
      <Stack.Screen name="AppliedJobs" component={AppliedTasks} />
      <Stack.Screen name="ConversationList" component={ConversationList} />
      <Stack.Screen name="Conversation" component={Conversation} />
    </Stack.Navigator>
  );
};

export default ProNavigator;

