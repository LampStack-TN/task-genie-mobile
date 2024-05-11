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
import Button from "../../../ui/Button";
import { ApiClient } from "../../../../utils/api";
import { Controller } from "react-hook-form";

const Documents = ({ handleSubmit, setValue, control, errors }) => {
  const [cinRecto, setCinRecto] = useState(null);
  const [cinVerso, setCinVerso] = useState(null);
  const [officialDoc, setOfficialDoc] = useState(null);

  const CreateProfile = async (data: any) => {
    try {
      console.log(data);

      const { data: user } = await ApiClient().post(
        "profile/createProfile/",
        data
      );
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = (data: any) => {
    console.log(data);
    CreateProfile(data);
  };

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
      setValue("cinRecto", buffer);
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
      setValue("cinVerso", buffer);
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
      setValue("officialDoc", buffer);
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
              <Image
                source={{
                  uri:
                    cinRecto ||
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Carte_d%27identit%C3%A9_tunisienne_recto2.jpg/800px-Carte_d%27identit%C3%A9_tunisienne_recto2.jpg",
                }}
                style={styles.image}
              />
            </Pressable>
            <Controller
              control={control}
              rules={{
                required: { value: true, message: "CIN Recto required" },
              }}
              render={() => null}
              name="cinRecto"
            />
            {errors.cinRecto && (
              <Text style={{ color: "#f01010" }}>
                {errors.cinRecto.message}
              </Text>
            )}
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
      <Button label="Next" style="fill" callback={handleSubmit(onSubmit)} />
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
    width: 100,
    height: 64,
    borderRadius: 8,
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
