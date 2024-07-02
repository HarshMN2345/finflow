import { View, Text ,StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Link, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/build/Ionicons'
import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo'

enum SignInType {
    Phone,
    Email,
    Google,
  }
  
const login = () => {
    
    const router=useRouter();
    const {signIn}=useSignIn();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const onSignIn = async (type: SignInType) => {
      if (type === SignInType.Phone) {
        try {
          const fullnumber = `${countryCode}${phoneNumber}`;
  
          const { supportedFirstFactors } = await signIn!.create({
            identifier: fullnumber,
          });
          const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
            return factor.strategy === 'phone_code';
          });
  
          const { phoneNumberId } = firstPhoneFactor;
  
          await signIn!.prepareFirstFactor({
            strategy: 'phone_code',
            phoneNumberId,
          });
  
          router.push({
            pathname: '/verify/[phone]',
            params: { phone: fullnumber, signin: 'true' },
          });
        } catch (err) {
          console.log('error', JSON.stringify(err, null, 2));
          if (isClerkAPIResponseError(err)) {
            if (err.errors[0].code === 'form_identifier_not_found') {
              Alert.alert('Error', err.errors[0].message);
            }
          }
        }
      }
    };

  return (
    <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome back</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter the phone number associated with your account
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input1}
            placeholder="Country code"
            placeholderTextColor={Colors.gray}
            value={countryCode}
          />
          <TextInput
            style={[styles.input2, { flex: 1 }]}
            placeholder="Mobile number"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            phoneNumber !== '' ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ]}
          onPress={() => onSignIn(SignInType.Phone)}>
          <Text style={defaultStyles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View
            style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray }}
          />
          <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
          <View
            style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray }}
          />
        </View>
        <TouchableOpacity
           onPress={() => onSignIn(SignInType.Email)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: 'row',
              gap: 16,
              marginTop: 20,
              backgroundColor: '#fff',
            },
          ]}>
          <Ionicons name="mail" size={24} color={'#000'} />
          <Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with email </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Google)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: 'row',
              gap: 16,
              marginTop: 20,
              backgroundColor: '#fff',
            },
          ]}>
          <Ionicons name="logo-google" size={24} color={'#000'} />
          <Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with email </Text>
        </TouchableOpacity>
      </View>
  )
}
const styles = StyleSheet.create({
    inputContainer: {
      marginVertical: 40,
      flexDirection: 'row',
    },
    input1: {
      backgroundColor: Colors.lightGray,
      padding: 20,
      width:80,
      borderRadius: 16,
      fontSize: 18,
      marginRight: 10,
    },
    input2: {
        backgroundColor: Colors.lightGray,
        padding: 20,
        borderRadius: 16,
        fontSize: 18,
        marginRight: 10,
      },
    enabled: {
      backgroundColor: Colors.primary,
    },
    disabled: {
      backgroundColor: Colors.primaryMuted,
    },
  });

export default login