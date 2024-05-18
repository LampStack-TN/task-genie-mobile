import { StyleSheet, Text, View } from "react-native";
import { FC } from "react";

interface HeaderProps {
  title: string;
  bgColor?: string;
  back?: boolean;
  children?: any;
}

const Header: FC<HeaderProps> = ({ title, bgColor, back, children }) => {
  return (
    <View style={[styles.headerContainer]}>
      {children}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#e6eaf1",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    padding: 14,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderColor: "#c5c5c5",
  },
  title: {
    fontSize: 28,
    fontWeight: "500",
    color: "#071e4a",
  },
});
