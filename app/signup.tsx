import { View, Text ,StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Link, useRouter } from 'expo-router'
import { useSignUp } from '@clerk/clerk-expo'

const signup = () => {
    const onSignup=async()=>{
      const fullnumber=`${countryCode}${phoneNumber}`;
      try{
        await signUp!.create({
          phoneNumber:fullnumber,
        });
        signUp!.preparePhoneNumberVerification();
        router.push({pathname:'/verify/[phone]',params:{phone:fullnumber}})
      }catch(error){
        console.log("error signing up:"+error)
      }
    }
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const router=useRouter();
    const {signUp}=useSignUp();
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>Let's dive</Text>
      <Text style={defaultStyles.descriptionText}>To get started please enter your phone number</Text>
      <View style={styles.inputContainer}>
          <TextInput
            style={styles.input1}
            placeholder="CC"
            placeholderTextColor={Colors.gray}
            value={countryCode}
            onChangeText={setCountryCode}
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
        <Link href={'/login'} replace asChild>
          <TouchableOpacity>
            <Text style={defaultStyles.textLink}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </Link>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,phoneNumber !== '' ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ]}
          onPress={onSignup}>
          <Text style={defaultStyles.buttonText}>Sign up</Text>
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

export default signup