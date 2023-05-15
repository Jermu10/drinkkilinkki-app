import { Text, View, TouchableOpacity, Modal, Pressable, Alert } from "react-native";
import styleSheet from "../../styles/styleSheet";
import { useEffect, useState } from "react";
import { ref, onValue, remove } from "firebase/database";
import { database } from "../../firebaseConfig";


// List of drinks and their ingredients
export default function Drinks() {
  // State variables
  const [drinks, setDrinks] = useState([]); // Stores the list of drinks
  const [selectedDrink, setSelectedDrink] = useState(null); // Stores the currently selected drink
  const [ingredients, setIngredients] = useState([]); // Stores the ingredients of the selected drink

  // ...

  useEffect(() => {
    // Fetch the list of drinks from the database
    const drinksRef = ref(database, "drinks/");
    onValue(drinksRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const drinkList = Object.entries(data).map(([drinkId, drinkData]) => ({
          id: drinkId,
          name: Object.keys(drinkData)[0],
        }));
        setDrinks(drinkList);
      } else {
        setDrinks([]); // Set an empty array when no drinks are available
      }
    });
  }, []);

  const handleDrinkPress = (drinkId) => {
    // Handle the selection of a drink
    setSelectedDrink(drinkId);
    const drinkRef = ref(database, `drinks/${drinkId}`);
    onValue(drinkRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const drinkName = Object.keys(data)[0];
        const ingredientList = Object.entries(data[drinkName]);
        setIngredients(ingredientList);
      }
    });
  };

  const handleModalClose = () => {
    // Handle the closing of the modal and reset state
    setSelectedDrink(null);
    setIngredients([]);
  };

  const handleDeleteDrink = () => {
    if (selectedDrink) {
      Alert.alert(
        'Poista drinkki',
        'Oletko varma, että haluat poistaa drinkin?',
        [
          {
            text: 'Peruuta',
            style: 'cancel',
          },
          {
            text: 'Poista',
            onPress: () => {
              const drinkRef = ref(database, `drinks/${selectedDrink}`);
              remove(drinkRef)
                .then(() => {
                  console.log(`Drink "${selectedDrink}" deleted.`);
                })
                .catch((error) => {
                  console.log(`Error deleting drink: ${error.message}`);
                })
                .finally(() => {
                  setSelectedDrink(null);
                  setIngredients([]);
                });
            },
            style: 'destructive',
          },
        ],
        { cancelable: false }
      );
    }
  };

  // Retrieve the selected drink object from the drinks array
  const selectedDrinkObj = drinks.find((drink) => drink.id === selectedDrink);

  return (
    <View style={styleSheet.drinkList}>
      {drinks.length > 0 ? (
        drinks.map((drink) => (
          <TouchableOpacity
            key={drink.id}
            onPress={() => handleDrinkPress(drink.id)}
          >
            <Text style={styleSheet.drinkListDrinkItem}>{drink.name}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styleSheet.noDrinksText}>No drinks added</Text>
      )}

      <Modal visible={selectedDrink !== null} animationType="slide">
        <View style={styleSheet.drinkModalContent}>
          <Text style={styleSheet.headerText}>{selectedDrinkObj?.name}</Text>
          <Text>Ainesosat:</Text>
          {ingredients.map(([ingredientName, ingredientValue], index) => (
            <Text key={index}>
              {ingredientName}: {ingredientValue}
            </Text>
          ))}

          <Pressable style={styleSheet.buttonDelete} onPress={handleDeleteDrink}>
            <Text style={styleSheet.buttonText}>Poista drinkki</Text>
          </Pressable>
          <Pressable style={styleSheet.button} onPress={handleModalClose}>
            <Text style={styleSheet.buttonText}>Sulje</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}
