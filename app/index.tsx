import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const bgImage = require('../assets/images/bg.jpg');

export default function LoginScreen() {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = (data: any) => {
    console.log('Login Success:', data);
    router.replace('/home'); 
  };

  return (
    <ImageBackground source={bgImage} resizeMode="cover" style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.header}>Greetings!</Text>
        <Text style={styles.subHeader}>Ready to get started? Log in to continue your journey.</Text>
        
        <Controller
          control={control}
          rules={{ required: 'Email is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput 
              style={styles.input} 
              onChangeText={onChange} 
              value={value} 
              placeholder="Email Address"
              placeholderTextColor="#000000"
              autoCapitalize="none"
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

        <View style={styles.buttonContainer}>
          <Button title="Sign In" onPress={handleSubmit(onSubmit)} color="#b630eb" />
        </View>

        <Pressable onPress={() => router.push('/register')} style={styles.link}>
          <Text style={styles.linkText}>New here? Create an account</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  overlay: { 
    flex: 1, 
    padding: 30, 
    justifyContent: 'center' 
  },
  header: { fontSize: 32, fontWeight: 'bold', color: '#f584ff', fontFamily: 'MyCustomFont', justifyContent: 'center' },
  subHeader: { fontSize: 16, color: '#f584ff', marginBottom: 30, fontWeight: '500', fontFamily: 'MyCustomFont' },
  input: { 
    borderWidth: 1, 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 15, 
    fontSize: 16, 
    backgroundColor: '#f584ff' 
  },
  buttonContainer: { marginTop: 10, borderRadius: 10, overflow: 'hidden' },
  link: { marginTop: 20, alignItems: 'center' },
  linkText: { color: '#f584ff', fontWeight: '700' }
});