import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import axios from "axios";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

import config from "../../../config";

const Stack = createNativeStackNavigator();

export type Task = {
  id?: number;
  title?: string;
  description?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  dueDated?: string;
  urgency?: string;
  clientId?: number;
};

const Index = () => {
  const [task, setTask] = useState<Task>({ clientId: 1 });

  const create = async () => {
    try {
      const result = await axios.post<Task>(`${config.apiUrl}/task/add/`, task);
      console.log(result);
      setTask(task);
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Step1">
          <Stack.Screen name="Step1" component={Step1} />
          <Stack.Screen name="Step2" component={Step2} />
          <Stack.Screen name="Step3" component={Step3} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default Index;
