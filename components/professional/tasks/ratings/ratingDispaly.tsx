import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';
import { ApiClient } from '../../../../utils/api';

const RatingDisplay: React.FC = () => {
  const [averageRating, setAverageRating] = useState(0);
  console.log(averageRating)

  useEffect(() => {
    fetchAverageRating();
  }, []);

  const fetchAverageRating = async () => {
    try {
      const {data} = await ApiClient().get('/rating/getRate');
      setAverageRating(data.clientAverageRating);
    } catch (error) {
      console.error('average rating:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Rating
        showRating
        type="star"
        fractions={1}
        startingValue={averageRating}
        imageSize={30}
        readonly
        style={{ paddingVertical: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default RatingDisplay;
