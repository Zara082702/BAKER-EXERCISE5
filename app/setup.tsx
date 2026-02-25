import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Button, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const bgImage = require('../assets/images/bg.jpg');

export default function SetupScreen() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null); 
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { firstName: '', lastName: '' }
  });

  
  const pickImage = async () => {
    
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Needed', 'We need access to your gallery to upload a photo!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true, 
      aspect: [1, 1], 
      quality: 1,
    });

    if (!result.canceled) {
      
      setImage(result.assets[0].uri);
    }
  };

  const onCompleteSetup = (data: any) => {
    router.replace({
      pathname: '/home',
      params: { 
        firstName: data.firstName, 
        lastName: data.lastName, 
        profilePhoto: image 
      },
    }); 
  };

  return (
    <ImageBackground source={bgImage} resizeMode="cover" style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>SET UP YOUR ACCOUNT</Text>
        <Text style={styles.subHeader}>Tell Us About Yourself! </Text>

        <TouchableOpacity style={styles.photoContainer} onPress={pickImage}>
          <View style={styles.photoCircle}>
            {image ? (
              <Image source={{ uri: image }} style={styles.profileImage} />
            ) : (
              <Text style={styles.photoText}>Add Photo</Text>
            )}
          </View>
        </TouchableOpacity>

        <Text style={styles.label}>First Name</Text>
        <Controller
          control={control}
          rules={{ required: 'First name is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput 
              style={styles.input} 
              onChangeText={onChange} 
              value={value} 
              placeholder="" 
              placeholderTextColor="#000000" 
            />
          )}
          name="firstName"
        />

        <Text style={styles.label}>Last Name</Text>
        <Controller
          control={control}
          rules={{ required: 'Last name is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput 
              style={styles.input} 
              onChangeText={onChange} 
              value={value} 
              placeholder="" 
              placeholderTextColor="#000000" 
            />
          )}
          name="lastName"
        />

        <View style={styles.buttonWrapper}>
          <Button title="Complete Setup" onPress={handleSubmit(onCompleteSetup)} color="#9f50a7" />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  container: { flex: 1, padding: 25, justifyContent: 'center' },
  header: { 
    fontFamily: 'MyCustomFont', 
    fontSize: 32, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: '#fa89cf',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10 
  },
  subHeader: { 
    fontFamily: 'MyCustomFont', 
    fontSize: 16, 
    color: '#fa89cf', 
    textAlign: 'center', 
    marginBottom: 30 
  },
  photoContainer: { alignItems: 'center', marginBottom: 30 },
  photoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 2,
    borderColor: '#bb498f',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', 
  },
  profileImage: { width: '100%', height: '100%' }, 
  photoText: { 
    fontFamily: 'MyCustomFont', 
    fontSize: 14, 
    color: '#a05ba7', 
    fontWeight: 'bold' 
  },
  label: { 
    fontFamily: 'MyCustomFont', 
    fontSize: 14, 
    fontWeight: '600', 
    marginBottom: 5, 
    color: '#a05ba7' 
  },
  input: { 
    fontFamily: 'MyCustomFont', 
    borderWidth: 1, 
    borderColor: '#ddd', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 15, 
    backgroundColor: '#fff', 
    fontSize: 16 
  },
  buttonWrapper: { marginTop: 10, borderRadius: 12, overflow: 'hidden' }
});