import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const Documents = ({ control, errors }) => {
  const [cinRecto, setCinRecto] = useState(null);
  const [cinVerso, setCinVerso] = useState(null);
  const [officialDoc, setOfficialDoc] = useState(null);

  const handlePickCin = async () => {
    let {
      assets: [asset],
    } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });
    if (asset) {
      const { uri, base64, mimeType } = asset;
      const buffer = "data:" + mimeType + ";base64," + base64;

      setCinRecto(uri);
      // setValue("avatar", buffer);
    }
  };
  const handlePickcin = async () => {
    let {
      assets: [asset],
    } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });
    if (asset) {
      const { uri, base64, mimeType } = asset;
      const buffer = "data:" + mimeType + ";base64," + base64;

      setCinVerso(uri);
      // setValue("avatar", buffer);
    }
  };
  const handlePickDoc = async () => {
    let {
      assets: [asset],
    } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });
    if (asset) {
      const { uri, base64, mimeType } = asset;
      const buffer = "data:" + mimeType + ";base64," + base64;

      setOfficialDoc(uri);
      // setValue("avatar", buffer);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Profile Verification</Text>
          <Text style={styles.subTitle}>Upload Official Documents</Text>
        </View>
        <View style={styles.imagePickerRow}>
          <View style={styles.imagePickerContainer}>
            <Pressable onPress={handlePickCin}>
              <Text style={styles.inputLabel}>Select CIN Recto</Text>
              {cinRecto && (
                <Image source={{ uri: cinRecto }} style={styles.image} />
              )}
            </Pressable>
          </View>
          <View style={styles.imagePickerContainer}>
            <Pressable onPress={handlePickcin}>
              <Text style={styles.inputLabel}>Select CIN Verso</Text>
              {cinVerso && (
                <Image source={{ uri: cinVerso }} style={styles.image} />
              )}
            </Pressable>
          </View>
        </View>

        <View style={styles.imagePickerContainer}>
          <Pressable onPress={handlePickDoc}>
            <Text style={styles.inputLabel}>Select Official Document</Text>
            {officialDoc && (
              <Image source={{ uri: officialDoc }} style={styles.image} />
            )}
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 18,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: "center",
    paddingLeft: 5,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#0C3178",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "400",
    color: "#6e6e6e",
  },
  imagePickerContainer: {
    flex: 1,
    marginVertical: 20,
    marginRight: 10,
  },
  image: {
    width: 180,
    height: 180,
    marginTop: 10,
  },
  imagePickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputLabel: {
    fontSize: 16,
    color: "#6e6e6e",
    textAlign: "center",
    marginTop: 10,
  },
});

export default Documents;
