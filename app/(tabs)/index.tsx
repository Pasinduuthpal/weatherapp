import { Image, StyleSheet, Platform , View, Dimensions } from 'react-native';


import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
const { width, height } = Dimensions.get('window');

// Function to determine whether it's day or night
const isDayTime = () => {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18; // Assuming day time is from 6 AM to 6 PM
};

export default function HomeScreen() {

  const backgroundImage = isDayTime()
    ? require('../../assets/images/day.jpg')
    : require('../../assets/images/night.jpg'); 


  return (
    
        <Image
          source={require('../../assets/images/day.jpg')}
          style={styles.reactLogo}
        />
  
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    width: width,
    height: height,
    position: 'absolute',
    resizeMode: 'cover',
  },
}

);
