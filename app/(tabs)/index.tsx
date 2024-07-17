import { Image, StyleSheet, Platform , View, Dimensions,Text,ImageBackground } from 'react-native';


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

  const backgroundColor = isDayTime()
    ? require('../../assets/images/day.jpg')
    : require('../../assets/images/night.jpg'); 


  return (
    
        // <Image
        //   source={require('../../assets/images/day.jpg')}
        //   style={styles.reactLogo}
        // />
        <ImageBackground source={backgroundColor} style={styles.background}>
        <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.location}>GALLE</Text>
          <Text style={styles.date}>Wed 12 January 11:26 AM</Text>
        </View>
        <View style={styles.mainInfo}>
          <Text style={styles.temperature}>28°</Text>
          <View style={styles.weatherIcon}>
            <Image source={require('../../assets/images/weatherpics/03d.png')} style={styles.icon} />
          </View>
          <Text style={styles.weatherDescription}>SCATTERED CLOUDS</Text>
        </View>
        <View style={styles.details}>
          <View style={styles.detail}>
            <Text style={styles.detailValue}>28°C</Text>
            <Text style={styles.detailLabel}>Max Temp</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailValue}>67%</Text>
            <Text style={styles.detailLabel}>Humidity</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailValue}>2.51m/s</Text>
            <Text style={styles.detailLabel}>Wind</Text>
          </View>
        </View>
        <View style={styles.forecast}>
          <View style={styles.forecastItem}>
            <Text style={styles.forecastTime}>11:30 AM</Text>
            <Image source={require('../../assets/images/weatherpics/03d.png')} style={styles.icon} />
            <Text style={styles.forecastTemp}>28.86°C</Text>
          </View>
          <View style={styles.forecastItem}>
            <Text style={styles.forecastTime}>12:30 PM</Text>
            <Image source={require('../../assets/images/weatherpics/03d.png')} style={styles.icon} />
            <Text style={styles.forecastTemp}>28.83°C</Text>
          </View>
          <View style={styles.forecastItem}>
            <Text style={styles.forecastTime}>1:30 PM</Text>
            <Image source={require('../../assets/images/weatherpics/03d.png')} style={styles.icon} />
            <Text style={styles.forecastTemp}>28.38°C</Text>
          </View>
        </View>
      </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
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
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  location: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  date: {
    fontSize: 16,
    color: 'white',
  },
  mainInfo: {
    alignItems: 'center',
    marginBottom: 20,
    color: 'white',
  },
  temperature: {
    color: 'white',
    fontSize: 72,
    fontWeight: 'bold',
  },
  weatherIcon: {
    marginVertical: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
  weatherDescription: {
    fontSize: 18,
    color: 'white',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  detail: {
    alignItems: 'center',
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  forecast: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  forecastItem: {
    alignItems: 'center',
  },
  forecastTime: {
    fontSize: 14,
    color: '#666',
  },
  forecastTemp: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
}

);
