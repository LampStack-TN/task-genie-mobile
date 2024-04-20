import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

const ProfileCard = () => {
  const router = useRouter();
  
  const user = {
    avatar: "https://res.cloudinary.com/ali22/image/upload/v1701834538/koss/n1l717hvjcfo4rm1rvtd.png",
    name: "ahmed guedri"
  };

  const handleNavigate = () => {
    router.push({pathname : '/'})
  }
  
  return (
    <View style={styles.container}>
      <Image  style={styles.coverPhoto} />
      <View style={styles.avatarContainer}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={handleNavigate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  coverPhoto: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    backgroundColor : '#9b5a96'
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: -75,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: 'white',
  },
  name: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 400,
    width: '90%',
    justifyContent: 'space-between',
  },
});

export default ProfileCard;
