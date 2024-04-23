import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import step1 from './step1';
import step2 from './step2';
import step3 from './step3';
import MyTabBar from './MyTabBar'
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    
<Tab.Navigator tabBar={props => <MyTabBar {...props} />}
 initialRouteName="step1"
 screenOptions={{
   tabBarActiveTintColor: '#e91e63',
   tabBarLabelStyle: { fontSize: 12 },
   tabBarStyle: { backgroundColor: 'powderblue' },
 }}

>
      <Tab.Screen
        name="step1"
        component={step1}
        options={{ tabBarLabel: 'step1' }}
      />
      <Tab.Screen
        name="step2"
        component={step2}
        options={{ tabBarLabel: 'step2' }}
      />
      <Tab.Screen
        name="step3"
        component={step3}
        options={{ tabBarLabel: 'step3' }}
      />
    </Tab.Navigator>

  );
}

export default MyTabs;