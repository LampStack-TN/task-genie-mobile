import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Menu from './Menu';
import Step1 from '../tasks/steps/Step1';

import Profile1 from '../profile/Info';
import MyTabBar from './MyTabBar';

const Tab = createBottomTabNavigator();

const MyBottomTab: React.FC = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="create" component={Step1} />
      <Tab.Screen name="Menu" component={Menu} />
      <Tab.Screen name="Profile1" component={Profile1} />

    </Tab.Navigator>
  );
};

export default MyBottomTab;
