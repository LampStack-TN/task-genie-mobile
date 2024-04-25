import React from 'react';
import { View, Text, Image } from 'react-native';

const Profile = ({ profile,Data }) => {
  // Access properties of the profile object
  
  return (
    <View style={{ alignItems: 'center' }}>
      {/* Display avatar
      <Image source={{ uri: avatar }} style={{ width: 150, height: 150, borderRadius: 75 }} /> */}

      {/* Display basic profile information */}
      <Text>Name: {Data.fullName}</Text>
      <Text>Email: {Data.email}</Text>
      <Text>City: {Data.city}</Text>
      <Text>Address: {Data.address}</Text>

      {/* Display profile specific information */}
      <Text>Job Title: {profile.jobTitle}</Text>
      <Text>Bio: {profile.bio}</Text>
    </View>
  );
};

export default Profile;
