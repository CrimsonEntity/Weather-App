import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions } from 'react-native'
import React from 'react'


const WeatherInfo = ({weatherData, fetchWeatherData}) => {
    const {
        name,
        visibility,
        weather: [{icon, description}],
        main: {temp, humidity, feels_like},
        wind: {speed},
        sys: {sunrise, sunset},
    } = weatherData


    return(
        <SafeAreaView style={styles.conteiner}>
            <View style={{alignItems:'center'}}>
                <Text style={styles.title}>
                    {name}
                </Text>
            </View>
            <View style={styles.logo}>
                <Image 
                    style={styles.largeIcon}
                    source={{uri: `http://openweathermap.org/img/wn/${icon}.png`}}
                />
                <Text style={styles.currentTemp}>
                    {temp}°C
                </Text>
            </View>
            <Text style={styles.description}>
                {description}
            </Text>
            <View style={styles.extraInfo}>
                <View style={styles.info}>
                    <Image 
                        style={styles.smallIcon}
                        source={require('../assets/thermometer.png')}
                    />
                    <Text style={styles.infoText}>
                    {feels_like}°C
                    </Text>
                    <Text style={styles.infoText}>
                    Sensación
                    </Text>
                </View>
                <View style={styles.info}>
                    <Image 
                        style={styles.smallIcon}
                        source={require('../assets/humidity.png')}
                    />
                    <Text style={styles.infoText}>
                    {humidity}%
                    </Text>
                    <Text style={styles.infoText}>
                    Humedad
                    </Text>
                </View>
            </View>
            <View style={styles.extraInfo}>
                <View style={styles.info}>
                    <Image 
                        style={styles.smallIcon}
                        source={require('../assets/visibility.png')}
                    />
                    <Text style={styles.infoText}>
                    {visibility} m2
                    </Text>
                    <Text style={styles.infoText}>
                    Visibilidad
                    </Text>
                </View>
                <View style={styles.info}>
                    <Image 
                        style={styles.smallIcon}
                        source={require('../assets/wind.png')}
                    />
                    <Text style={styles.infoText}>
                    {speed} m/s
                    </Text>
                    <Text style={styles.infoText}>
                    Velocidad de viento
                    </Text>
                </View>
            </View>
            <View style={styles.extraInfo}>
                <View style={styles.info}>
                    <Image 
                        style={styles.smallIcon}
                        source={require('../assets/sunrise.png')}
                    />
                    <Text style={styles.infoText}>
                    {new Date(sunrise*1000).toLocaleString()}
                    </Text>
                    <Text style={styles.infoText}>
                    Amanecer
                    </Text>
                </View>
                <View style={styles.info}>
                    <Image 
                        style={styles.smallIcon}
                        source={require('../assets/sunset.png')}
                    />
                    <Text style={styles.infoText}>
                    {new Date(sunset*1000).toLocaleString()}
                    </Text>
                    <Text style={styles.infoText}>
                    Atardecer
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default WeatherInfo

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        marginTop:15
    },
    title : {
        width: '100%',
        textAlign:'center',
        fontSize: 26,
        fontWeight:'bold',
        color: '#000000',
        marginTop:9,
    },
    logo: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    largeIcon: {
        width:160,
        height: 160,
    },
    currentTemp: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign:'center'
    },
    description: {
        textAlign:'center',
        fontSize:24,
        fontWeight:'bold',
        marginBottom:10,
    },
    extraInfo: {
        flexDirection:'row',
        justifyContent: 'space-around',
        padding:7,
    },
    info:{
        width:Dimensions.get('screen').width/2.5,
        padding:10,
        justifyContent:'center',
    },
    smallIcon: {
        height:50,
        width:50,
        borderRadius:40/2,
        marginLeft:50,
    },
    infoText: {
        textAlign:'center',
        fontSize:18,
    }
})