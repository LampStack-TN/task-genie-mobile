import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <StatusBar style="auto" />
      <Link style={styles.link} href="/profile">
        {" "}
        go to profile{" "}
      </Link>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#75a5a6",
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    fontWeight: "bold",
    color: "#4749b1",
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#ad6997",
    flexDirection: "row",
  },
});
