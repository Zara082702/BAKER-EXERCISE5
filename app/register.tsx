import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';

const bgImage = require('../assets/images/bg.jpg');

export default function RegisterScreen() {
  const router = useRouter();
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { email: '', password: '', confirmPassword: '' }
  });

  const pwd = watch('password');
  const onSubmit = () => router.replace('/setup');

  return (
    <ImageBackground source={bgImage} resizeMode="cover" style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Sign Up</Text>
        <Text style={styles.subHeader}>Create an account to get started</Text>
        
        <Controller
          control={control}
          rules={{ required: 'Email is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput 
              style={styles.input} 
              onChangeText={onChange} 
              value={value} 
              placeholder="Email" 
              placeholderTextColor="#000000"
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{ required: 'Password is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput 
              style={styles.input} 
              onChangeText={onChange} 
              value={value} 
              secureTextEntry 
              placeholder="Password" 
              placeholderTextColor="#000000"
            />
          )}
          name="password"
        />

        <Controller
          control={control}
          rules={{ validate: (val) => val === pwd || "No match" }}
          render={({ field: { onChange, value } }) => (
            <TextInput 
              style={styles.input} 
              onChangeText={onChange} 
              value={value} 
              secureTextEntry 
              placeholder="Confirm Password" 
              placeholderTextColor="#000000"
            />
          )}
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>Passwords must match</Text>
        )}

        <View style={styles.buttonWrapper}>
          <Button title="Register" onPress={handleSubmit(onSubmit)} color="#ad63b4" />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  header: {
    fontFamily: 'MyCustomFont',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#f47dff',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subHeader: {
    fontFamily: 'MyCustomFont',
    fontSize: 16,
    color: '#f589ff',
    marginBottom: 30,
  },
  input: {
    fontFamily: 'MyCustomFont',
    borderWidth: 1,
    borderColor: '#f584ffs',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#c96fd1', 
    fontSize: 16,
  },
  buttonWrapper: {
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  errorText: {
    color: '#ff4d4d',
    fontFamily: 'MyCustomFont',
    marginBottom: 10,
    fontWeight: 'bold',
  },
});