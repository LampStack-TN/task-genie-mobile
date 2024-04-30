import {useState,useEffect} from 'react'
import {
  Modal,
  View,
  Text,
  StyleSheet,
 
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Service } from '../../../types/Service';
import { ApiClient } from '../../../utils/api';

const MyServices = ({navigation}) => {
  const [services, setServices] = useState<Service[]>([])
  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await ApiClient().get("/service/getMyServices");
        setServices(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServices();
  }, []);
 
  return (
    <View>
      {services.map((service) => (
        <Pressable
          // onPress={() => navigation.navigate("TaskDetails", { taskId: task.id })}
        >
          <View style={styles.card}>
            <Text style={styles.title}>{service.title}</Text>
            <View style={styles.infoSection}>
              <View style={styles.info}>
                <Icon name="event" size={20} color="#FF9800" />
                <Text style={styles.infoText}>{service.availability}</Text>
              </View>
              <View style={styles.info}>
                <Icon name="place" size={20} color="#4CAF50" />
                <Text style={styles.infoText}>{service.location}</Text>
              </View>
              <View style={styles.info}>
                <Icon name="attach-money" size={20} color="#F44336" />
                <Text style={styles.infoText}>{service.price}</Text>
              </View>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
export default MyServices
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#bfbfbf",
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 20,
    color: "#0C3178",
    fontWeight: "600",
    marginBottom: 5,
  },
  infoSection: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    flexBasis: "50%",
  },
  infoText: {
    marginLeft: 5,
  },
  deleteText: {
    fontWeight: "bold",
    color: "#0C3178",
  },
  editButton: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#0C3178",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#333333",
    fontSize: 14,
    fontWeight: "bold",
  },
  applicantCount: {
    alignSelf: "flex-end",
    backgroundColor: "#1D4FAF",
    borderColor: "#052157",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  applicantText: {
    fontSize: 14,
    color: "#F2AE91",
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonConfirm: {
    backgroundColor: "#F44336",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});