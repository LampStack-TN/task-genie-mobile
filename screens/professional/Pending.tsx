import { View, Text } from "react-native";

const Pending = () => {
  return (
    <View
      style={{
        padding: 22,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Text
          style={{
            color: "#F58D61",
            fontSize: 40,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Task Genie!..
        </Text>
        <Text
          style={{
            color: "#0C3178",
            fontSize: 32,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Account Pending...
        </Text>
        <Text
          style={{
            marginTop: 16,
            color: "#4e4e4e",
            fontSize: 24,
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          Your profile is being reviewed. Please wait until your verification is
          complete.
        </Text>
      </View>
    </View>
  );
};

export default Pending;
