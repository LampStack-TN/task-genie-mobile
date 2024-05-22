import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ImageBackground,
  Pressable,
} from "react-native";

import { Dropdown } from "react-native-element-dropdown";

import { Ionicons, AntDesign } from "@expo/vector-icons";
import { ApiClient } from "../../utils/api";
import cities from "../../data/cities.json";
import City from "../../types/city";
import orange_gradient from "../../assets/images/orange_gradient.png";
import SearchProps from "../../types/searchFunc";

const Search: React.FC<SearchProps> = ({ onSearchResults }: SearchProps) => {
  const [qury, setQuery] = useState("");
  const [city, setCity] = useState("");

  const onFindJobsPress = async () => {
    try {
      const res = await ApiClient().get("/searchList/search", {
        params: {
          searchTitle: qury,
          searchLocation: city,
        },
      });
      if (onSearchResults) {
        onSearchResults(res.data);
      }
    } catch (error) {
      console.error("onFindJobsPress faileds :", error);
    }
  };
  return (
    <ImageBackground
      source={orange_gradient}
      style={styles.container}
      imageStyle={{ backgroundColor: "#fff" }}
      resizeMode="cover"
    >
      <View style={styles.inputView}>
        <TextInput
          placeholder="Job, Title, Skill, Expertise..."
          style={styles.input}
          value={qury}
          onChangeText={setQuery}
        />
        <Ionicons name="search" size={24} color="#cb6e17" />
      </View>
      <View style={[styles.inputView]}>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={[{ id: 0, name: null }, ...cities]}
          search
          maxHeight={300}
          labelField="name"
          valueField="name"
          placeholder={'Gouvernorat'}
          searchPlaceholder="Search..."
          value={city}
          // onFocus={() => setIsFocus(true)}
          // onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setCity(item.name);
          }}
        />
        <Ionicons name="location-sharp" size={24} color="#cb6e17" />
      </View>
      <Pressable onPress={onFindJobsPress} style={styles.button}>
        <Text style={styles.buttonText}>Find Jobs</Text>
      </Pressable>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 15,
    gap: 12,
  },
  inputView: {
    backgroundColor: "#fff",
    height: 60,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 30,
    borderColor: "#e5e5e5",
    borderWidth: 1,
    fontSize: 14,
    alignItems: "center",
    elevation: 1,
    flexDirection: "row",
    gap: 12,
  },
  input: {
    fontSize: 14,
    flex: 1,
    flexWrap: "wrap",
  },
  icon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#0C3178",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdown: {
    flex: 1,
    height: 50,
    borderColor: "gray",
    // borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});
export default Search;
