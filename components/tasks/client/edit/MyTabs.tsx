import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import JobDescription from "./JobDescription";
import Expertise from "./Expertise";
import DateTime from "./DateTime";
import MyTabBar from "./MyTabBar";

const Tab = createMaterialTopTabNavigator();

type MyTabsProps = {
  route: any;
};

const MyTabs: React.FC<MyTabsProps> = ({ route }) => {
  const taskId = route.params.taskId;

  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      initialRouteName="JobDescription"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: "powderblue" },
      }}
    >
      <Tab.Screen
        name="JobDescription"
        component={JobDescription}
        initialParams={{ taskId }}
        options={{ tabBarLabel: "Description" }}
      />
      <Tab.Screen
        name="Expertise"
        component={Expertise}
        initialParams={{ taskId }}
        options={{ tabBarLabel: "Skills" }}
      />
      <Tab.Screen
        name="DateTime"
        component={DateTime}
        initialParams={{ taskId }}
        options={{ tabBarLabel: "Time & Price" }}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;
