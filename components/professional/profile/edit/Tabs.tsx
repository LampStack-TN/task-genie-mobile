import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PersonalDetails from "./PersonalDetails";
import ProfessionalInfo from "./ProfessionalInfo";
import Security from "./Security";
import MyTab from "../../../ui/TopTabs";
import { useSelector } from "react-redux";

const Tab = createMaterialTopTabNavigator();

export default function Tabs() {
  const user = useSelector((state: any) => state.user);

  return (
    <Tab.Navigator
      initialRouteName="PersonalDetails"
      tabBar={(props) => <MyTab {...props} />}
    >
      <Tab.Screen
        name="PersonalDetails"
        component={PersonalDetails}
        initialParams={{ user }}
        options={{ tabBarLabel: "Personal Details" }}
      />
      <Tab.Screen
        name="ProfessionalInfo"
        component={ProfessionalInfo}
        initialParams={{ profile: user.profile }}
        options={{ tabBarLabel: "Professional Info" }}
      />
      <Tab.Screen
        name="Security"
        component={Security}
        options={{ tabBarLabel: "Security" }}
      />
    </Tab.Navigator>
  );
}
