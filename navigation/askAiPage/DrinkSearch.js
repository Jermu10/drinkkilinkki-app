import React, { useState } from "react";
import { View, Text, TextInput, Button, Pressable } from "react-native";
import styleSheet from "../../styles/styleSheet";
import { API_KEY } from "@env";

export const DrinkSearch = () => {
  const [ingredients, setIngredients] = useState("");
  const [drinks, setDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);

    // Prepare the request options for API call
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY,
      },
      body: JSON.stringify({
        prompt: `Voitko kertoa näistä raaka-aineista jonkun drinkin ja kertoa sen nimen sekä ohjeen tehdä sen: ${ingredients}. Sinulla on käytössä nämä raaka-aineet joita ei ole kuitenkaan pakko käyttää: sitruunamehua, limemehua, sokerisiirappia, jäitä, sooda.`,
        max_tokens: 250,
      }),
    };

    // Make the API call to OpenAI
    try {
      const response = await fetch(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        requestOptions
      );
      const data = await response.json();
      console.log("API Response:", data);

      // Extract the generated drinks from the API response
      const generatedDrinks = data.choices.map((choice) => choice.text.trim());
      console.log("Generated Drinks:", generatedDrinks);

      // Update the drinks state with the generated drinks
      setDrinks(generatedDrinks);
    } catch (error) {
      console.log("API Request Error:", error);
    }

    setIsLoading(false);
    setIngredients(""); // Reset the ingredients input field
  };

  return (
    <View>
      <TextInput
        style={styleSheet.input}
        value={ingredients}
        onChangeText={(text) => setIngredients(text)}
        placeholder="Kerro raaka-aineesi"
      />
      <Pressable style={styleSheet.button} onPress={handleSearch}>
        <Text style={styleSheet.buttonText}>Luo drinkki</Text>
      </Pressable>
      {isLoading ? (
        <Text style={styleSheet.loadingText}>Luodaan...</Text>
      ) : (
        <View style={styleSheet.aiAnswer}>
          {drinks.map((drink, index) => (
            <Text key={index}>{drink}</Text>
          ))}
        </View>
      )}
    </View>
  );
};
