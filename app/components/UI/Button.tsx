import { View, Text, Pressable, StyleSheet } from "react-native";

const Button = ({ label, style }) => {
  return (
    <View style={[styles.button]}>
      <Pressable onPress={() => console.log("pressed", label)}>
        <Text style={styles.text}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default Button;
const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "#0C3178",
    borderWidth: 1,
    elevation: 2,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  text: {
    color: "#0C3178",
    width: 110,
    height: 50,
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "500",
    letterSpacing: 0.25,
    textAlign: 'center', // Centers text horizontally
    textAlignVertical: 'center', // Centers text vertically
  },
});
