import { Text, View } from "react-native";
import ProfileIndex from "../components/professional/profile/ProfileIndex";
import TaskList from "../screens/professional/TaskList";
import Tabs from "../screens/professional/EditProfile";
import Home from "../components/client/Menu";
import FavouriteTasksList from "../screens/professional/FavouriteTasksList";
import proDetails from "../screens/professional/TaskDetails";
import MyServices from "../screens/professional/MyServices";
import ProIndex from "../screens/professional/AddService";
import ServiceDetails from "../screens/professional/ServiceDetails";
import AppliedTasks from "../screens/professional/AppliedTasks";
import ConversationList from "../screens/chat/ConversationList";
import Conversation from "../screens/chat/Conversation";
import Profile from "../screens/professional/Profile";
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

