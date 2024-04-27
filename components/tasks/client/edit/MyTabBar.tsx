import { Animated, View, TouchableOpacity } from "react-native";

const MyTabBar = ({ state, descriptors, navigation, position }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        paddingVertical: 10,
      }}
    >
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

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              borderRadius: 3,
              backgroundColor: isFocused ? "#0C3178" : "#F0F8FF",
              paddingVertical: 12,
              paddingHorizontal: 16,
              marginHorizontal: 1,
              justifyContent: "center",
              alignItems: "center",
              elevation: isFocused ? 4 : 0,
            }}
          >
            <Animated.Text
              style={{
                opacity,
                color: isFocused ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MyTabBar;
