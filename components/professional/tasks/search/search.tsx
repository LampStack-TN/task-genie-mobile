import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ImageBackground,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { ApiClient } from "../../../../utils/api";
import cities from "../../../../data/cities.json";
import City from "../../../../types/city";
import orange_gradient from "../../../../assets/images/orange_gradient.png";
import SearchProps from "../../../../types/searchFunc";

const Search: React.FC<SearchProps> = ({ onSearchResults }: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const onFindJobsPress = async () => {
    try {
      const res = await ApiClient().get("/task/search", {
        params: {
          searchTitle: searchQuery,
          searchLocation: selectedCity,
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
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="search" size={24} color="#cb6e17" />
      </View>
      <View style={[styles.inputView]}>
        <Picker
          selectedValue={selectedCity}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}
          placeholder="Governorate..."
        >
          <Picker.Item
            label="Governorate..."
            value=""
            style={{ color: "#c5c5c5" }}
          />
          {cities.map((city: City) => (
            <Picker.Item key={city.id} label={city.name} value={city.name} />
          ))}
        </Picker>
        <Ionicons
          name="location-sharp"
          size={24}
          color="#cb6e17"
          style={styles.icon}
        />
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
  picker: {
    flex: 1,
    color: "#cb6e17",
  },
});
export default Search;
