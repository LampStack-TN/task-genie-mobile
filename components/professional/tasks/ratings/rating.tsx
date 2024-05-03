import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useForm, Controller } from 'react-hook-form';
import { ApiClient } from '../../../../utils/api';
import RatingFormData from '../../../../types/rating';
// import AsyncStorage from "@react-native-async-storage/async-storage";
const Ratings: React.FC = ({result}: any) => {
  const { control, handleSubmit, formState: { errors } } = useForm<RatingFormData>();

  const handleRate = async (formData: RatingFormData) => {
    try {
        // const token =  AsyncStorage.getItem('token')
      const { rating } = formData;
      if (!rating) {
        console.error('Please select a rating');
        return;
      }
      const response = await ApiClient().post('/rating/rate', {
        rate: rating,
        clientId: 10001,
        professionalId: 10007,
        //still hardCoded 
      })
      if (result) {
        result(response.data);
      }
      if (response.status === 201) {
        console.log('Rating submitted successfully');
      } else {
        console.error('Failed to submit rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Rating
            showRating
            onFinishRating={(rating) => onChange(rating)}
            style={{ paddingVertical: 10 }}
            startingValue={0}
          />
        )}
        name="rating"
        defaultValue={0}
      />
      {errors.rating && <Text style={styles.error}>Please select a rating</Text>}
      <TouchableOpacity
          style={styles.applyButton}
          onPress={handleSubmit(handleRate)}
        >
          <Text style={styles.applyButtonText}>submit</Text>
        </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  }, 
  applyButton: {
    backgroundColor: "#2454addf" ,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default Ratings;
