import { ApiClient } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../redux/slices/userSlice";

const checkAuthentication = async (setLoading, dispatch) => {
  if (await AsyncStorage.getItem("token")) {
    try {
      const { data } = await ApiClient().get("auth/verify-token");
      dispatch(setUser(data));
    } catch (error) {
      // console.log(error);
    }
  }
  setLoading(false);
};

export default checkAuthentication;
