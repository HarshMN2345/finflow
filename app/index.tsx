import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAssets } from 'expo-asset'
import { Video } from 'expo-av'
import { Link } from 'expo-router'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'

export enum ResizeMode { 
  /** 
   * Fit within component bounds while preserving aspect ratio. 
   */ 
  CONTAIN = 'contain', 
  /** 
   * Fill component bounds while preserving aspect ratio. 
   */ 
  COVER = 'cover', 
  /** 
   * Stretch to fill component bounds. 
   */ 
  STRETCH = 'stretch', 
} 


const Page = () => {
    const [assets]=useAssets([require('@/assets/videos/intro.mp4')])
  return (
    <View style={styles.container}>
        {assets&&(
            <Video resizeMode={ResizeMode.COVER} isLooping isMuted shouldPlay
            source={{uri:assets[0].uri}}
            style={styles.video}
          />
        )}
        <View style={{marginTop:80,padding:20}}>
            <Text style={styles.header}>Welcome to FinFlow</Text>
            <Text style={{fontSize:20,color:'white',padding:'auto'}}>The best way for seamless trading and financial empowerment</Text>
        </View>
        <View style={styles.button}>
        <Link
          href={'/login'}
          style={[defaultStyles.pillButton, { flex: 1, backgroundColor: Colors.dark }]}
          asChild>
          <TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Log in</Text>
          </TouchableOpacity>
        </Link>
        <Link
          href={'/signup'}
          style={[defaultStyles.pillButton, { flex: 1, backgroundColor: '#fff' }]}
          asChild>
          <TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: '500' }}>Sign up</Text>
          </TouchableOpacity>
        </Link>
        </View>
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-between',
    },
    video:{
        width:'100%',
        height:'100%',
        position:'absolute'
    },
    header:{
        fontSize:40,
        fontWeight:'700',
        color:'white'
    },
    button:{
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 60,
        paddingHorizontal: 20,
    },
})

export default Page