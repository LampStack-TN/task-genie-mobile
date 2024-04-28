import { ApiClient } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../redux/slices/userSlice";

const checkAuthentication = async (setLoading, dispatch) => {
  try {
    const { data } = await ApiClient().get("auth/verify-token");
    dispatch(setUser(data));
  } catch (error) {
    console.log(error);
    await AsyncStorage.removeItem("token");
  }
  setLoading(false);
};

export default checkAuthentication;
