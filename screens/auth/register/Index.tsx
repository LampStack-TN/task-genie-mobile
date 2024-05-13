import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./register";
import BasicInfos from "./BasicInfos";
import Contact from "./Contact";

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="register"
    >
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="basicInfos" component={BasicInfos} />
      <Stack.Screen name="contact" component={Contact} />
    </Stack.Navigator>
  );
};

export default Index;
