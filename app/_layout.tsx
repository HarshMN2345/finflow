import React, { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import { Link, Stack } from 'expo-router';
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import 'react-native-reanimated'; // Assuming this import is correct if you need it

import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/build/Ionicons';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error('Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env');
}

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error("SecureStore set item error: ", err);
      return;
    }
  },
};

// Exporting ErrorBoundary from expo-router, assuming it's imported elsewhere
export { ErrorBoundary } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const router = useRouter();
  const segments = useSegments();
  const { isLoaded, isSignedIn } = useAuth();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Throw error if fonts fail to load
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const navigateToInitialScreen = async () => {
      if (!isLoaded) {
        return;
      }
      
      if (isSignedIn) {
        const inAuthGroup = segments[0] === "(authenticated)";
        if (!inAuthGroup) {
          await router.replace('/(authenticated)/(tabs)/home');
        }
      } else {
        await router.replace('/login');
      }
    };

    navigateToInitialScreen();
  }, [isLoaded, isSignedIn, segments]);

  if (!loaded || !isLoaded) {
    return <Text>Loading...</Text>; // Render loading indicator until fonts are loaded
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup"
        options={{
          title: '',
          headerBackTitle: '',
          headerStyle: { backgroundColor: Colors.background },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen name="help" options={{ title: 'Help', presentation: 'modal' }} />
      <Stack.Screen name="(authenticated)/(tabs)" options={{ headerShown:false}} />
      <Stack.Screen
        name="login"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Link href={'/help'} asChild>
              <TouchableOpacity>
                <Ionicons name="help-circle-outline" size={34} color={Colors.dark} />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="verify/[phone]"
        options={{
          title: '',
          headerBackTitle: '',
          headerStyle: { backgroundColor: Colors.background },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => (
  <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
    <ClerkLoaded>
      <InitialLayout />
    </ClerkLoaded>
  </ClerkProvider>
);

export default RootLayoutNav;
