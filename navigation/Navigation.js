import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Entypo } from '@expo/vector-icons';  
import styleSheet from '../styles/styleSheet';

import DrinkPage from './drinksPage/DrinkPage';
import AskAiPage from './askAiPage/AskAiPage';

function HomeScreen() {
  return (
      <DrinkPage />
  );
}

function SettingsScreen() {
  return (
    <View style={styleSheet.container}>
      <AskAiPage />
    </View>
  );
}

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Drinkit') {
      return <Entypo name="drink" size={24} color="black" />;
    } else if (route.name === 'Luo drinkki') {
      iconName = 'chatbox-sharp', color = 'black';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  }
});

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Drinkit" component={HomeScreen} />
        <Tab.Screen name="Luo drinkki" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};



export default Navigation;