// In App.js in a new project
import * as React from 'react';
import { View, Text ,Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Step1 from './components/tasks/steps/Step1';
import Step2 from './components/tasks/steps/Step2';
import Step3 from './components/tasks/steps/Step3';
import Register from './components/auth/register';
import TaskDetails from './components/taskDetails/TaskDetails';
import TaskList from './components/tasks/list/TaskList';

function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Step1"
        onPress={() => navigation.navigate('Step1')}
      />
       <Button
        title="Go to Register"
        onPress={() => navigation.navigate('Register')}
      />
       <Button
        title="Task Details"
        onPress={() => navigation.navigate('Task')}
      />
      <Button
      title='TaskList'
      onPress={()=> navigation.navigate('TaskList')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Step1" component={Step1} />
        <Stack.Screen name="Step2" component={Step2} />
        <Stack.Screen name="Step3" component={Step3} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Task" component={TaskDetails} />
        <Stack.Screen name='TaskList' component={TaskList}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;