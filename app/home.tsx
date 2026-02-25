import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const bgImage = require('../assets/images/bg.jpg');

export default function HomeScreen() {
  const router = useRouter();
  const { firstName, lastName, profilePhoto } = useLocalSearchParams();

  return (
    <ImageBackground source={bgImage} resizeMode="cover" style={styles.background}>
      <View style={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Glad You’re Here, {firstName} !😉</Text>
          <Text style={styles.subText}>You’re officially part of the inner circle. Ready to set things up? 🫶🏼</Text> 
        </View>

        <View style={styles.card}>
          <View style={styles.imageWrapper}>
            {profilePhoto ? (
              <Image source={{ uri: profilePhoto as string }} style={styles.avatar} />
            ) : (
              <View style={styles.placeholder}><Text>No Photo</Text></View>
            )}
          </View>

          <Text style={styles.nameText}>{firstName} {lastName}</Text>
          <Text style={styles.badge}> </Text>
        </View>

        <TouchableOpacity 
          style={styles.logoutBtn} 
          onPress={() => router.replace('/')}
        >
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  container: { flex: 1, alignItems: 'center', padding: 25, justifyContent: 'center' },
  header: { marginBottom: 30, alignItems: 'center' },
  welcomeText: { 
    fontFamily: 'MyCustomFont', 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#f0a1fa',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 1 },
    textShadowRadius: 10
  },
  subText: { 
    fontFamily: 'MyCustomFont',
    fontSize: 16, 
    color: '#f0a1fa' 
  },
  card: { 
    width: '100%', 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 30, 
    alignItems: 'center',
    elevation: 10,
    marginBottom: 40
  },
  imageWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: '#000000',
    padding: 3,
    marginBottom: 20,
    overflow: 'hidden'
  },
  avatar: { width: '100%', height: '100%', borderRadius: 70 },
  placeholder: { flex: 1, backgroundColor: '#f0a1fa', justifyContent: 'center', alignItems: 'center' },
  nameText: { 
    fontFamily: 'MyCustomFont', 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#1a1a1a' 
  },
  badge: { 
    fontFamily: 'MyCustomFont', 
    color: '#4630EB', 
    marginTop: 5, 
    fontWeight: '700',
    backgroundColor: 'rgba(70, 48, 235, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    overflow: 'hidden',
    fontSize: 12
  },
  logoutBtn: { 
    backgroundColor: '#804476', 
    width: '100%', 
    padding: 18, 
    borderRadius: 15, 
    alignItems: 'center',
    elevation: 5
  },
  logoutBtnText: { 
    fontFamily: 'MyCustomFont', 
    color: '#ffe8fb', 
    fontSize: 18, 
    fontWeight: 'bold' 
  }
});