import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const step3 = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      timeDate: '',
      minPrice: '',
      maxPrice: '',
    },
  });

  const onSubmit = (data) => {
    // Handle your data submission here
    console.log(data);
    navigation.navigate('step1');
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <Text style={styles.heading}>Edit :</Text>
        <Text style={{ marginBottom: 10, alignSelf: 'flex-start', paddingTop: 10 }}>Time & Date</Text>
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{ required: 'Time & Date is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Time & Date"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="timeDate"
        />
        {errors.timeDate && <Text style={styles.errorText}>Time & Date is required.</Text>}

        <Controller
          control={control}
          rules={{ required: 'Min Price is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="minPrice"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="minPrice"
        />
        {errors.minPrice && <Text style={styles.errorText}>Min Price is required.</Text>}

        <Controller
          control={control}
          rules={{ required: 'Max Price is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="maxPrice"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="maxPrice"
        />
        {errors.maxPrice && <Text style={styles.errorText}>Max Price is required.</Text>}
      </View>
      <View style={styles.button2}>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text style={[styles.text, { color: 'white' }]}>Finish</Text>
        </TouchableOpacity>
      </View>
      <View style={{ position: 'absolute', bottom: 40, left: 20, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('step2')}>
          <Text style={styles.textt}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
    const styles = StyleSheet.create({
      errorText: {
        color: 'red',
        alignSelf: 'flex-start',
        marginLeft: 15,
      },
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "#fff",
      },
      stepContainer: {
        alignSelf: "flex-start",
        marginBottom: 20,
        paddingTop: 10,
      },
      heading: {
        paddingTop: 60,
        fontSize: 30,
        fontWeight: "bold",
        color: "#0C3178",
      },
      inputContainer: {
        width: "100%",
        alignItems: "center",
        flex: 3,
        gap: 15,
        justifyContent: "center",
        paddingHorizontal: 11,
        marginBottom: 300,
      },
      input: {
        backgroundColor: "#fff",
        height: 60,
        width: 350,
        paddingHorizontal: 22,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#e5e5e5",
        marginBottom: 20,
        fontSize: 14,
        elevation: 3,
      },
      text: {
        paddingVertical: 4 * 2,
        paddingHorizontal: 20,
        fontSize: 20,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "#0C3178",
      },
      textt: {
        paddingVertical: 4 * 2,
        paddingHorizontal: 20,
        fontSize: 20,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "#0C3178",
      },
      button2: {
        position: "absolute",
        bottom: 40,
        right: 20,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderRadius: 50,
        elevation: 3,
        backgroundColor: "#0C3178",
        overflow: "hidden",
      },
    });

export default step3

