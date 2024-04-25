import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TaskList from '../tasks/list/TaskList';
import Step1 from '../tasks/steps/Step1';

import Profile1 from '../profile/Pofile1';
import MyTabBar from './MyTabBar';

const Tab = createBottomTabNavigator();

const MyBottomTab: React.FC = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="create" component={Step1} />
      <Tab.Screen name="tasks" component={TaskList} />
      <Tab.Screen name="Profile1" component={Profile1} />

    </Tab.Navigator>
  );
};

export default MyBottomTab;
