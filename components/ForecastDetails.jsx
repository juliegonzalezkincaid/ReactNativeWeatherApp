import { View, Text } from "react-native";


export default function ForecastDetails({route}){
    
return (
       <View>
        <Text>{JSON.stringify(route.params)}</Text>
        {/*  A Text component that displays the params object from the route prop as a string.
JSON.stringify(route.params) is used to convert the params object into a string to display it.*/}
       <Text>{route.params.name} {route.params.temperature} </Text>
       </View>
)}
