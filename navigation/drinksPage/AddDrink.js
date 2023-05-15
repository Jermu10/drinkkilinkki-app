import React, { useState } from "react";
import { Text, View, TextInput, Button, Modal, Pressable } from "react-native";
import { ref, push } from "firebase/database";
import { database } from "../../firebaseConfig";
import styleSheet from "../../styles/styleSheet";

export default function AddDrink() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drinkName, setDrinkName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");

  const handleAddIngredient = () => {
    // Check if both ingredientName and ingredientAmount have values
    if (ingredientName && ingredientAmount) {
      // Create a new ingredient object
      const newIngredient = {
        name: ingredientName,
        amount: ingredientAmount,
      };

      // Add the new ingredient to the existing ingredients array
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);

      // Reset the input fields for ingredientName and ingredientAmount
      setIngredientName("");
      setIngredientAmount("");
    }
  };

  const handleAddDrink = () => {
    // Check if both drinkName and ingredients array have values
    if (drinkName && ingredients.length > 0) {
      // Get a reference to the "drinks" collection in the database
      const drinkRef = ref(database, "drinks");

      // Create a new drink object with the drinkName and ingredients
      const drinkData = {
        [drinkName]: Object.fromEntries(
          ingredients.map((ingredient) => [ingredient.name, ingredient.amount])
        ),
      };

      // Push the new drink data to the database
      push(drinkRef, drinkData);

      // Reset the input fields and close the modal
      setDrinkName("");
      setIngredients([]);
      setIsModalOpen(false);

      // Reset the input fields for ingredientName and ingredientAmount
      setIngredientName("");
      setIngredientAmount("");

      console.log(`New drink created: ${drinkName}`);
    }
  };

  return (
    <View>
      <Pressable style={styleSheet.button} onPress={() => setIsModalOpen(true)}>
        <Text style={styleSheet.buttonText}>Lisää drinkki</Text>
      </Pressable>

      <Modal visible={isModalOpen} animationType="slide">
        <View style={styleSheet.addDrinkModalContent}>
          <Text style={styleSheet.headerText}>Luo drinkki</Text>

          <View style={styleSheet.addDrinkShowDrink}>
            {ingredients.length > 0 && (
              <Text style={styleSheet.addDrinkShowDrink}>
                {drinkName} ainesosat:
              </Text>
            )}
            {ingredients.map((ingredient, index) => (
              <Text key={index}>
                {ingredient.name}: {ingredient.amount}
              </Text>
            ))}
          </View>

          <View style={styleSheet.addDrinkModalInputContainer}>
            <TextInput
              placeholder="Drinkin nimi"
              style={styleSheet.input}
              value={drinkName}
              onChangeText={(text) => setDrinkName(text)}
            />
          </View>

          <View style={styleSheet.addDrinkModalInputContainer}>
            <TextInput
              placeholder="Ainesosan nimi"
              style={styleSheet.input}
              value={ingredientName}
              onChangeText={(text) => setIngredientName(text)}
            />
          </View>

          <View style={styleSheet.addDrinkModalInputContainer}>
            <TextInput
              placeholder="Ainesosan määrä"
              style={styleSheet.input}
              value={ingredientAmount}
              onChangeText={(text) => setIngredientAmount(text)}
            />
          </View>

          <Pressable style={styleSheet.button} onPress={handleAddIngredient}>
            <Text style={styleSheet.buttonText}>Lisää ainesosa</Text>
          </Pressable>
          <Pressable style={styleSheet.button} onPress={handleAddDrink}>
            <Text style={styleSheet.buttonText}>Tallenna</Text>
          </Pressable>
          <Pressable
            style={styleSheet.button}
            onPress={() => setIsModalOpen(false)}
          >
            <Text style={styleSheet.buttonText}>Sulje</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}
