import { Image, StyleSheet, Platform , View, Dimensions,Text,ImageBackground,ActivityIndicator,TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


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

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = (async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const apiKey = 'c9e5f9c9bbeb12fcfcee082daff2a77c'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&units=metric`;

    const response = await axios.get(apiUrl);
    setWeatherData(response.data);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    setLoading(false);
  }
})
fetchWeatherData();
  },[]);
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }if (!weatherData) {
    return (
      <View style={styles.errorContainer}>
        <Text>Failed to load weather data</Text>
      </View>
    );
  }
  const backgroundColor = isDayTime()
  ? require('../../assets/images/day.jpg')
  : require('../../assets/images/night.jpg'); 

  const { main, weather, wind, name } = weatherData;
  
   return(
    <ImageBackground source={backgroundColor} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
        <View style={styles.headerButtonsone}>
        <TouchableOpacity style={styles.headerLeft}>
              <Ionicons name="menu" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerLeft}>
              <Ionicons name="refresh" size={24} color="white" />
            </TouchableOpacity>
         </View>
         <View style={styles.locationContainerTag}>
          <Ionicons name="location" size={24} color="white"  />
          <Text style={styles.location}>{name.toUpperCase()}</Text>
          </View>
          <Text style={styles.date}>{new Date().toLocaleString()}</Text>
          <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="star" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}
              onPress={() => navigator.navigate}>
              <Ionicons name="search" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.mainInfo}>
          <View style={styles.tempAndIconContainer}>
            <Text style={styles.temperature}>{Math.round(main.temp)}°</Text>
            <View style={styles.weatherIcon}>
              <Image source={{ uri: `https://openweathermap.org/img/w/${weather[0].icon}.png` }} style={styles.icon} />
            </View>
          </View>
          <Text style={styles.weatherDescription}>{weather[0].description.toUpperCase()}</Text>
        </View>
        <View style={styles.containerstyle}>
          <View style={styles.detail}>
          <Image />
          <Image source={ require('../../assets/images/temp.jpeg') } style={styles.image} />
            <Text style={styles.detailLabel}>Max Temp</Text>
            <Text style={styles.detailValue}>{Math.round(main.temp_max)}°C</Text>
          </View>
          <View style={styles.detail}>
          <Image source={ require('../../assets/images/humidity.png') } style={styles.image} />
          <Text style={styles.detailLabel}>Humidity</Text>
            <Text style={styles.detailValue}>{main.humidity}%</Text>
          </View>
          <View style={styles.detail}>
          <Image source={ require('../../assets/images/wind.png') } style={styles.image} />
          <Text style={styles.detailLabel}>Wind</Text>
          <Text style={styles.detailValue}>{wind.speed} m/s</Text>
          </View>
        </View>

        <View style={styles.containerstyle}>
          <View style={styles.detail}>
          <Image />
          <Image source={ require('../../assets/images/temp.jpeg') } style={styles.image} />
            <Text style={styles.detailLabel}>Max Temp</Text>
            <Text style={styles.detailValue}>{Math.round(main.temp_max)}°C</Text>
          </View>
          <View style={styles.detail}>
          <Image source={ require('../../assets/images/humidity.png') } style={styles.image} />
          <Text style={styles.detailLabel}>Humidity</Text>
            <Text style={styles.detailValue}>{main.humidity}%</Text>
          </View>
          <View style={styles.detail}>
          <Image source={ require('../../assets/images/wind.png') } style={styles.image} />
          <Text style={styles.detailLabel}>Wind</Text>
          <Text style={styles.detailValue}>{wind.speed} m/s</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
   );
}

const styles = StyleSheet.create({
  containerstyle: {
    marginTop:10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    marginTop:10,
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
    marginTop: -30,
    marginBottom: 10,
    color: 'white',
  },
  temperature: {
    color: 'white',
    fontSize: 120,
  },
  weatherIcon: {
    // marginVertical: 10,
  },
  icon: {
    marginTop:40,
    marginLeft:-40,
    width: 100,
    height: 100,
    justifyContent: 'space-around'
  }, 
  image: {
    marginTop:10,
    width: 30,
    height: 30,
    justifyContent: 'space-around'
  },
  weatherDescription: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginTop:-20,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor:'#fff',
    margin:20,
    marginBottom: 20,
  },
  detail: {
    alignItems: 'center',
  },
  detailValue: {
    fontSize: 18,
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
  headerButtons: { 
    position: 'absolute',
    marginLeft:30,
    top: 10,
    right: 10,
    flexDirection: 'row',
  },
  headerButtonsone: { 
    position: 'absolute',
    marginLeft:10,
    top: 1,
    left: -40,
    flexDirection: 'row',
  },
  headerButton: { 
    marginLeft: 25,
  },
  tempAndIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }, 
   headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginTop: 15,
    marginLeft: 16,
  },
  refreshIcon: {
    marginLeft: 10,
  },
  refreshButton: {
    marginLeft: 10,
  },
  locationContainerTag: {
    marginTop:40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
}

);
