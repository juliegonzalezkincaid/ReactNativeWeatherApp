import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';//hooks
import { useNavigation } from '@react-navigation/native';//is a hook which gives access to the navigation object.
import * as Location from 'expo-location';//Functions from the expo-location package to get device's location.
import { getGridPoint, getForecastData } from '../Requests/weather.requests';//Custom functions to get weather data

export default function ForcastList() {

    const navigation = useNavigation();
    // Similar to useHistory allows for navigating between different screens.
    const [forecast, setForecast] = useState([
        //forecast: Holds the weather forecast data. It’s initialized with a default array.
        {
            temperature: 80,
            name: 'Mostly Sunny',
            number: 1,
        },
        {
            temperature: 91,
            name: 'Sunny',
            number: 2,
        }
    ]);
    const [location, setLocation] =useState();
    //location: Holds the current device's location data.
    useEffect(() => {getLocation();
        //Calls the getLocation function to get the device’s location.
}, [])
    const getLocation = async () => {
       // gets the device's location.It first requests permission from the user to access the location.
        let { status }= await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('permission not granted')
            return ;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
    }
    useEffect(() => {if(location && location.coords) {
        //Executed whenever the location state variable changes.If the location variable has a valid value, it calls the getWeatherData function.
        getWeatherData();}

    },
    [location]
    );

    const getWeatherData = async () => {
        let forecastUrl = await getGridPoint(location);
        //First, it gets the forecast URL by passing the location to getGridPoint
        let forecastData = await getForecastData(forecastUrl);
        setForecast(forecastData);
        //Then, it fetches the forecast data using getForecastData and sets it to the forecast state variable.
    }
// 
    return(
        <View style={{height:'100%'}}>
            <Text>{JSON.stringify(location)}</Text>
            {/* Similar to .map to display data */}
            <FlatList
                data={forecast}
                //The data for the list comes from the forecast state variable
                renderItem={({item}) => (
                    <TouchableOpacity//For each item in the forecast array, a TouchableOpacity (a wrapper for making views respond properly to touches) is rendered
                    
                    style={{padding: 20, borderColor: 'gray',borderBottomWidth:1}}
                    onPress={() => {
                        console.log('You pressed a button')
                    }
                    }
                    >
                    <Text>{item.name} {item.temperature}</Text>
                    </TouchableOpacity>
                )}
                style={{ width:'100%'}}
            
            />
        </View>
    )
}