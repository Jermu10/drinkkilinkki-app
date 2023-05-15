import Navigation from './navigation/Navigation';
import { ImageBackground, Text, View } from 'react-native';
import styleSheet from './styles/styleSheet';



export default function App() {

  return (
    <View style={styleSheet.backgroundImage}>
    <Navigation />
    </View>
  );
}

