# Drinkkilinkki-app päiväkirja


## 1 - Projektin luonti 

### Aloitin luomalla projektin luomalla projektin 'lopputyö' kansioon
  
    npm install -g expo-cli // Jos ei ole expo-cli vielä valmiiksi koneessa
    npx create-expo-app drinkkilinkkiapp
    expo start // Kokeillaan heti saadaanko sovellus pyörimään

Saatiin!    

![Screenshot 2023-04-16 at 23 58 38](https://user-images.githubusercontent.com/104775534/232342382-7dfe9f4f-4bbb-4195-b81f-47bf081b53f8.png)

### Pushataan projekti Githubiin

    git init
    git add .
    git commit -m'first commit
    git branch -M main
    git remote add origin https://github.com/Jermu10/drinkkilinkki-app.git
    git push -u origin main
    
    
    
    
    
## 2 - Valmiiden komponenttien siivoaminen ja navigaation luominen

- Aloitetaan poistamalla 'assets' kansio, jossa kuvia, mitä ei tarvita.
- Siivotaan App.js sivulta kaikki koodi pois.

Ajattelin tehdä jokaisen sivun omaan kansioon, jonka sisällä on sen sivun kaikki asiat (komponentit, funktiot ja testit jne.)

### Aloitan navigaatio kansiosta johon luon Navigation.js Tässä lista kirjastoista, mitä ainakin pitäisi ladata:

    @react-navigation/native
    npx expo install react-native-screens react-native-safe-area-context // 'npx expo' command line interface provides a way to install dependencies  specific to Expo projects.
    @react-navigation/bottom-tabs
    @expo/vector-icons

## 3 - Firebase Realtime Database

- Luodaan projekti sivulla Firebasen sivulla
- Luodaan Firebase Realtime Database 
  - The Firebase Realtime Database is a cloud-hosted database. Data is stored as JSON and synchronized in realtime to every connected client. When you build cross-platform apps with our Apple platforms, Android, and JavaScript SDKs, all of your clients share one Realtime Database instance and automatically receive updates with the newest data. - https://firebase.google.com/docs/database

### Tuodaan database projektiin

Loin koulun ohjeiden mukaan firebaseConfig.js tiedoston ja sieltä exporttasin getDatabase(app):n toiseen tiedostoon.
Loin tiedoston Drink.js, jossa käytän hookkia missä fetchaan kaikki drinkit databasesta.

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
    
Tämän jälkeen halusin, kun drinkkiä painaa, se aukeaa ja näyttää drinkin ainesosat. Tähän käytin Modal nimistä componenttia.
"The Modal component is a basic way to present content above an enclosing view." - https://reactnative.dev/docs/modal. Modalin sisään tein myös "Poista drinkki" napin ja tottakai "Sulje" napin, joka sulki drinkin esittelyn. 

Tässä funktio, joka ottaa painettavan drinkin tiedost ja avaa sen Modal komponentissa (alempana).

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
    
    <Modal visible={selectedDrink !== null} animationType="slide">
        <View style={styleSheet.drinkModalContent}>
          <Text style={styleSheet.headerText}>{selectedDrinkObj?.name}</Text>
          <Text>Ainesosat:</Text>
          {ingredients.map(([ingredientName, ingredientValue], index) => (
            <Text key={index}>
              {ingredientName}: {ingredientValue}
            </Text>
          ))}
      </Modal>
      
## Nappulat

  Huomasin projektin alkuvaiheessa, että React Nativen omat Button komponentit olivat vaikeita liikuttaa ja muokata, joten otin käyttöön Pressable nimisen komponentin. "Pressable is a Core Component wrapper that can detect various stages of press interactions on any of its defined children." - https://reactnative.dev/docs/pressable
  
Tässä esimerkki Drink.js handleDeleteDrink funktiosta ja Pressable:sta (koodissa myös Alert, ennen drinkin poistoa):

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
    
              <Pressable style={styleSheet.buttonDelete} onPress={handleDeleteDrink}>
            <Text style={styleSheet.buttonText}>Poista drinkki</Text>
          </Pressable>
          
## 4 - Luo drinkki sivu

  Halusin myös, että sovelluksella pystyy luomaan drinkin. Tein aika samantyyppisen Modalia käyttävän ratkaisun, jossa lisätään aineosia ja niiden määriä drinkkiin yksikerrallaan. Loin kaksi funktiota handleAddIngredient, joka lisää aineosia ja niiden määriä ja sitten handleAddDrink joka lisää lisätyt ainekset sekä drinkin nimen tietokantaan.
  
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
    
    
![Screenshot 2023-05-15 at 20 30 22](https://github.com/Jermu10/drinkkilinkki-app/assets/104775534/24e5c102-c501-429b-9a4f-c2d50c70d17e)


## 5 -  Kysy chatGtp:ltä

  Halusin jotenkin kokeilla OpenAi api käyttöä ja päätin toteuttaa sen tekemällä sivun, jolle kerrotaan mitä ainesosia kaapista löytyy ja se vastaa kertomalla reseptin ja ohjeet sen tekemiseen. 
  
Aloitin hakemalla API_KEY:n OpenAi sivuilta. Loin DrinkSearch.js komponentin, jossa Luodaan requestOptions muuttuja mihin laitetaan kaikki asetukset kuten: API_KEY, max_tokens joka määrittää vastauksen maximi mitan ja promt mikä on tekstiä tekoälylle mihin itse kirjoitin ohjeet mitä haluan sen tekevän. 

Tässä koodi, joka pyytää OpenAilta vastausta ja ottaa sen hookkiin:

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

## .env tiedoston luonti

Koska OpenAi api on maksullinen, niin on tärkeä salata API_KEY. Tähän käytin dotenv:iä, "Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology." - https://www.npmjs.com/package/dotenv. Laitoin API_KEY urlin .env tiedostoon ja lisäsin babel.config.js tiedostoon asetukset, jolla pystyn helposti vain importtaamaan API_KEY:n: 

        plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
    
## 6 - styleSheet

Itselle vähän mystisempi aihepiiri vielä, jota toki paljon oppi matkanvarrella. Loin styles kansion sisään styleSheet.js, missä voi kaikkia visuaalisia asioita muokata. Esimerkkinä sivun otsikko (html) ja sen tyyli (styleSheet):

    <Text style={styleSheet.headerText}>Drinkit!</Text>
     
       export default StyleSheet.create({
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
       });
       
## 7 - Julkaisu

En julkaise kuin itselleni, koska maksullinen api sovelluksessa. Buildasin eas.json ja muokkasin sen toimimaan ios simulaattorilla. Tämän jälkeen buildasin projektin ja sitten ei tarvinnut kun Y:tä painaa ja sovellus oli asennettu simulaattorilleni.

# Ongelmat / Tuntemukset

## 1 - Projektin luonti ongelmat. Aikaa kului 1h

Meillä on ollut nyt paljon Dockerista opetusta ja ajattelin, että se olisi hauska ottaa tähän mukaan. No se ei sitten ihan toimikkaan, kun expo-cli pitäisi ladata sinne konttiin ja siltikään emulaattorit eivät toimineet jne. Joten jätin sen pienen väännön jälkeen pois projektista. Tämän takia yksinkertaisen projektin aloittamiseen kesti aikaa tunti.

## 2 - Navigaatio fiilikset

Hirveästi eri paketteja pitää asentaa. Muuten meni ihan kivuttomasti. 

## 3 - Database fiilikset

Piti aluksi tehdä ihan kunnon tietokanta serverille, mutta se osottautui liian vaikeaksi ja aikaa vieväksi, joten päädyin Firebase:en, mikä oli selkeä asentaa ja ymmärtää. Modalin luominen oli yllättävän helppoa ja mielestäni hyvä tapa avata drinkin tiedot.

## 4 - Luo drinkki fiilikset
 
Ongelmia aineosien lisäämisessä drinkkiin ja sitten drinkin lisääminen (otti vain yhden ainesosan). Tämä jäi vähän epämyellyttäväksi käyttää, koska pitää aina muistaa lisätä ensiksi raaka-aine drinkkiin ennenkun tallentaa drinkin.

## 5 - Tekoäly fiilikset

Huomasin, että vastaukset vähän heikkoja suomeksi (kielioppi virheitä), joten sovellus olisi ehkä kannattanut luoda englanniksi. 
Myös, ehkä sovelluksen ymmärrys promtiin on heikompi, koska kielenä suomi

## 6 - styleSheet fiilikset

Tähän meni lopussa enemmän aikaa, kun osasin odottaa, mutta paljon oppi mitä kaikkea tarvitsee käyttää, jos haluaa asioita liikuttaa.
Kuvan lisääminen taustakuvaksi osottautui lopulta liian vaikeaksi, mutta varmaan olisi ollut helppo asia.

## 7 - Julkaisu

https://docs.expo.dev/build-reference/simulators/ Tämän avulla suht yksinkertainen proseduuri.
  


