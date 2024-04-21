import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <StatusBar style="auto" />
      <Link style={styles.link} href="components/profile/profile">
        go to profile
      </Link>
      <Link style={styles.link} href="/components/auth/register">
        register
      </Link>
      <Link style={styles.link} href="components/tasks/steps/Step1">
        {" "}
        Step 1{" "}
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
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    fontWeight: "bold",
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    elevation: 3,
    backgroundColor: "#0C3178",
    overflow: "hidden",
    padding: 15,
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#ad6997",
    flexDirection: "row",
  },
});
