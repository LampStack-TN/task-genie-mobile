import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Menu from './Menu';
import Step1 from '../tasks/steps/Step1';

import Profile1 from '../profile/Info';
import MyTabBar from './MyTabBar';
import ProfileIndex from '../profile/ProfileIndex';
import AppliedTasks from '../findJob/applyingTasks/AppliedTasks';

const Tab = createBottomTabNavigator();

const MyBottomTab: React.FC = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Menu" component={Menu} />
      <Tab.Screen name="create" component={Step1} />
      <Tab.Screen name="Profile1" component={ProfileIndex} />
      <Tab.Screen name="AppliedJobs" component={AppliedTasks} />

    </Tab.Navigator>
  );
};

export default MyBottomTab;
