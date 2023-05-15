import Drinks from "./Drinks";
import styleSheet from "../../styles/styleSheet";
import { Text, View } from "react-native";
import AddDrink from "./AddDrink";

export default function DrinkPage() {
    
    return (
        <View style={styleSheet.drinks}>
        <Text style={styleSheet.headerText}>Drinkit!</Text>
        <Drinks />
        <AddDrink />
        </View>
    )
};
