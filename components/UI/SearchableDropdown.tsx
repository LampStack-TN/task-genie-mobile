import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";

const SearchableDropdown = ({
  textInputProps,
  style,
  onItemSelect,
  itemStyle,
  itemTextStyle,
  itemsContainerStyle,
  items,
}) => {
  const [query, setQuery] = useState("");
  const [item, setItem] = useState({});
  const [drop, setDrop] = useState(false);

  return (
    <View style={[style, { paddingHorizontal: 0 }]}>
      <TextInput
        onFocus={() => {
          setQuery("");
          setDrop(true);
        }}
        onBlur={() => {
          setDrop(false);
          setQuery(item.name || "");
        }}
        onChangeText={setQuery}
        value={query}
        {...textInputProps}
      ></TextInput>
      {drop && (
        <ScrollView style={itemsContainerStyle}>
          {items
            .filter((item) =>
              item.name.toUpperCase().includes(query.toUpperCase())
            )
            .map((item) => (
              <Pressable
                onPress={() => {
                  setItem(item);
                  Keyboard.dismiss();
                  onItemSelect(item);
                }}
              >
                {({ pressed }) => (
                  <View
                    style={[
                      itemStyle,
                      pressed ? { backgroundColor: "#c5c5c5" } : {},
                    ]}
                  >
                    <Text style={itemTextStyle}>{item.name}</Text>
                  </View>
                )}
              </Pressable>
            ))}
        </ScrollView>
      )}
    </View>
  );
};

export default SearchableDropdown;

const styles = StyleSheet.create({});
