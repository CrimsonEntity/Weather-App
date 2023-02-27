import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Constants from 'expo-constants'
import WeatherInfo from './WeatherInfo'
import * as Location from 'expo-location';

const API_KEYS = '0f4ea5e381897849acd9798ed79a3efa'

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    //add a function to fetch the weather data
    const fetchWeatherData = async (latitude, longitude) => {
        try {
            setLoaded(false);
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEYS}&units=metric`);
            if(response.status == 200){
                const data = await response.json();
                setWeatherData(data);
            }
            else {
                setWeatherData(null);
            }
            setLoaded(true);

        } catch(error) {
            Alert.alert('Error', error.message);
        }
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    useEffect(() => {
        if (location) {
            fetchWeatherData(location.coords.latitude, location.coords.longitude);
        }
    }, [location]);

    // if the data is not loaded or there's an error, show a loading message
    if (!loaded || errorMsg) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color='black' />
                {errorMsg && <Text>{errorMsg}</Text>}
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    Clima
                </Text>
            </View>
            <WeatherInfo weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
        </View>
    )
}

export default Weather

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: Constants.statusBarHeight,
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#000000',
        height: 80,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
    }
  });