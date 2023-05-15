import React from 'react';
import { View, Text} from 'react-native';
import styleSheet from '../../styles/styleSheet';
import { DrinkSearch } from './DrinkSearch';





export default function askAiPage () {
  

  return (
    <View style={styleSheet.askAi}>
        <Text style={styleSheet.headerText}>Drinkin luonti</Text>
        <DrinkSearch />
    </View>
  );
};


