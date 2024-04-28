const dispatch = useDispatch();
import { ApiClient } from "./api";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../redux/slices/userSlice";


const checkAuthentication = async (setLoading) => {
  try {
    const { data } = await ApiClient().get("auth/verify-token");
    console.log(data);
    dispatch(setUser(data));
  } catch (error) {
    console.log(error);
    await AsyncStorage.removeItem("token");
  }
  setLoading(false);
};

export default checkAuthentication;
