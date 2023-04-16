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

Aloitan navigaatio kansiosta johon luon Navigation.js Tässä lista kirjastoista, mitä ainakin pitäisi ladata:

    @react-navigation/native
    npx expo install react-native-screens react-native-safe-area-context // 'npx expo' command line interface provides a way to install dependencies  specific to Expo projects.
    @react-navigation/bottom-tabs
    @expo/vector-icons


# Ongelmat / Tuntemukset

## 1 - Projektin luonti ongelmat. Aikaa kului 1h

Meillä on ollut nyt paljon Dockerista opetusta ja ajattelin, että se olisi hauska ottaa tähän mukaan. No se ei sitten ihan toimikkaan, kun expo-cli pitäisi ladata sinne konttiin ja siltikään emulaattorit eivät toimineet jne. Joten jätin sen pienen väännön jälkeen pois projektista. Tämän takia yksinkertaisen projektin aloittamiseen kesti aikaa tunti.
