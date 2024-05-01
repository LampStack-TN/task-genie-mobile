import { Animated, View, StyleSheet, Pressable } from "react-native";

function MyTab({ state, descriptors, navigation, position }) {
  return (
    <View style={styles.navContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.navItem, isFocused && styles.navItemSelected]}
          >
            <Animated.Text
              style={[styles.navText, isFocused && styles.navTextSelected]}
            >
              {label}
            </Animated.Text>
          </Pressable>
        );
      })}
    </View>
  );
}
export default MyTab;
const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  navItem: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: false ? 4 : 0,
    paddingTop: 15,
    paddingBottom: 5 + 10,
  },
  navItemSelected: {
    paddingBottom: 0 + 10,
    borderBottomWidth: 5,
    borderColor: "#F58D61",
  },
  navText: {
    color: "#6e6e6e",
  },
  navTextSelected: {
    color: "#4e4e4e",
    fontWeight: "600",
  },
});
