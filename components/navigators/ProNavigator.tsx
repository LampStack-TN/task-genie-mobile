import { Text, View } from "react-native";
import ProfileIndex from "../profile/ProfileIndex";
import NearbyJobsScreen from "../tasks/professional/applyingTasks/NearbyJobsScreen";
import AppliedTasks from "../tasks/professional/applyingTasks/AppliedTasks";
import TaskList from "../tasks/professional/list/TaskList";
import Tabs from "../profile/edit/Tabs";
import Home from "../professional/home/ProIndex";
import proDetails from "../tasks/professional/proDetails/proDetails";
import ServicesList from "../professional/services/ServicesList";
import MyServices from "../professional/services/MyServices";
import ProIndex from "../professional/form/ProIndex";
const ProNavigator = ({ Stack }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Soon"
    >
      <Stack.Screen name="Soon" component={ProHome} />
      <Stack.Screen name="AddService" component={ProIndex} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ServicesList" component={ServicesList} />
      <Stack.Screen name="My Services" component={MyServices} />
      <Stack.Screen name="Tasks" component={NearbyJobsScreen} />
      <Stack.Screen name="ProfileIndex" component={ProfileIndex} />
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="ProDetails" component={proDetails} />
    </Stack.Navigator>
  );
};

export default ProNavigator;

const ProHome = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Text
          style={{
            color: "#F58D61",
            fontSize: 40,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Professionls!..
        </Text>
        <Text
          style={{
            color: "#0C3178",
            fontSize: 40,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Coming Soon...
        </Text>
        <Text
          style={{
            color: "#4e4e4e",
            fontSize: 22,
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          Click Here And Reload App To Logout.
        </Text>
      </View>
    </View>
  );
};
