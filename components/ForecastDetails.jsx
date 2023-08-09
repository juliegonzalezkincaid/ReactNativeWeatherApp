import { View, Text } from "react-native";


export default function ForecastDetails({route}){
    
return (
       <View>
        <Text>{JSON.stringify(route.params)}</Text>
       <Text>{route.params.name} {route.params.temperature} </Text>
       </View>
)}
