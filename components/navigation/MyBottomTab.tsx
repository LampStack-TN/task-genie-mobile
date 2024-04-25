import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TaskList from '../tasks/list/TaskList';
import Step1 from '../tasks/steps/Step1';
import Register from '../auth/register/register';
import Login from '../auth/Login';
import MyTabBar from './MyTabBar';

const Tab = createBottomTabNavigator();

const MyBottomTab: React.FC = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="tasks" component={TaskList} />
      <Tab.Screen name="create" component={Step1} />
      <Tab.Screen name="Register" component={Register} />
      <Tab.Screen name="Login" component={Login} />
    </Tab.Navigator>
  );
};

export default MyBottomTab;
