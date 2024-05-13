import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Information from "../../components/professional/addService/Information"; 
import Price from "../../components/professional/addService/Price";
import Skills from "../../components/professional/addService/Skills";

const Stack = createNativeStackNavigator();

const AddService = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Step1"
    >
      <Stack.Screen name="Step1" component={Information} />
      <Stack.Screen name="Step2" component={Skills} />
      <Stack.Screen name="Step3" component={Price} />
    </Stack.Navigator>
  );
};

export default AddService;