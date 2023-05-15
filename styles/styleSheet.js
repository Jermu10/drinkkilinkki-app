import { StyleSheet } from "react-native";



export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        justifyContent: 'center',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      },
      drinks: {
        flex: 1,
        backgroundColor: '#3233',
        alignItems: 'center',
        justifyContent: 'center',
        },
        headerText: {
          fontSize: 34,
          fontWeight: 'bold',
          textTransform: 'uppercase',
          color: '#187bcd',
          textShadowColor: 'rgba(0, 0, 0, 0.5)',
          textShadowOffset: { width: 2, height: 2 },
          textShadowRadius: 4,
          letterSpacing: 2,
          lineHeight: 32,
          padding: 40,
        },


        drinkModalContent: {
          flex: 1,
          backgroundColor: '#3233',
          alignItems: 'center',
          justifyContent: 'center',
        },



        drinkList:{
          padding: 30,
        },
        drinkListDrinkItem:{
          fontWeight: 'bold',
          padding: 3,
        },




        loadingText: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#333333',
          marginTop: 10, 
          alignSelf: 'center',
        },
        button: {
          backgroundColor: '#4CAF50',
          borderRadius: 15,
          paddingVertical: 20,
          paddingHorizontal: 28,
          alignSelf: 'center',
          width: 175,
          marginVertical: 15,
        },
        buttonDelete:{
          backgroundColor: '#FF0000',
          borderRadius: 15,
          paddingVertical: 20,
          paddingHorizontal: 28,
          alignSelf: 'center',
          width: 175,
          marginVertical: 15,
        },
        buttonText: {
          color: '#FFFFFF',
          fontSize: 12,
          fontWeight: 'bold',
          textTransform: 'uppercase',
          alignSelf: 'center',
        },
        input: {
          backgroundColor: '#FFFFFF',
          borderRadius: 15,
          paddingVertical: 20,
          paddingHorizontal: 28,
          marginVertical: 15,
        },
        
 
        

        askAi: {
          flex: 1,
          backgroundColor: '#3233',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          
          },

        aiAnswer: {
          padding: 45,
          alignItems: 'center',
          justifyContent: 'center',
        },
        


        addDrinkModalContent: {
        flex: 1,
        backgroundColor: '#3233',
        alignItems: 'center',
        justifyContent: 'center',

      },
      addDrinkModalInputContainer: {
        width: '50%',
        padding: 5,
        marginTop: 10,
      },
     
    });

