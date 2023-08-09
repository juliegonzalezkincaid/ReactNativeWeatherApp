import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { getGridPoint, getForecastData } from '../Requests/weather.requests';

export default function ForcastList() {

    const navigation = useNavigation();
    // Similar to useHistory
    const [forecast, setForecast] = useState([
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
    useEffect(() => {getLocation();
}, [])
    const getLocation = async () => {
        let { status }= await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('permission not granted')
            return ;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
    }
    useEffect(() => {if(location && location.coords) {
        getWeatherData();}

    },
    [location]
    );

    const getWeatherData = async () => {
        let forecastUrl = await getGridPoint(location);
        let forecastData = await getForecastData(forecastUrl);
        setForecast(forecastData);
    }
// 
    return(
        <View style={{height:'100%'}}>
            <Text>{JSON.stringify(location)}</Text>
            {/* Similar to .map to display data */}
            <FlatList
                data={forecast}
                renderItem={({item}) => (
                    <TouchableOpacity
                    
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