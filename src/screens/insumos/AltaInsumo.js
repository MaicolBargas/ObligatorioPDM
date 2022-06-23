import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert,StyleSheet, TouchableOpacity, TextInput,Text} from "react-native";


import DatabaseConnection from "../../database/database";
const db = DatabaseConnection.getConnection();

const AltaInsumo = ({ navigation }) => {

  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');

  const clearData = () => {
    setId("");
    setNombre("");
    setCantidad("");
  };

  const altaV = () => {
    console.log("states",id, nombre, cantidad);
  
    if (!id.trim() || !nombre.trim()|| !cantidad.trim())  {
      Alert.alert("Debe ingresar todos los datos");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO insumo(id, nombre, cantidad) VALUES (?, ?, ?)`,
        [id, nombre, cantidad],
        (tx, results) => {
          console.log("results", results);        
          if (results.rowsAffected > 0) {
            clearData();
            Alert.alert(
              "Excelente",
              "Insumo dado de Alta!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("Insumos"),
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert("Error al registrar vehiculo");
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} >
        <View style={styles.mainContainer} >
              <TextInput
                placeholder="Id"
                onChangeText={setId}
                value={id}
                style={styles.textInputStyle}
              />
              <TextInput
                placeholder="Nombre"
                onChangeText={setNombre}
                value={nombre}
                style={styles.textInputStyle}
              />

              <TextInput
                style={styles.textInputStyle}               
                placeholder="Cantidad"
                onChangeText={setCantidad}
                value={cantidad}
              />

              <TouchableOpacity
            style={styles.touchableOpacityRegister}
            onPress={altaV}>
            <Text style={styles.touchableOpacityTextRegister} > Alta Insumo </Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default AltaInsumo;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },

  touchableOpacityRegister: {
    backgroundColor: 'green',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%'
  },

  touchableOpacityTextRegister: {
    color: 'black',
    fontSize: 23,
    textAlign: 'center',
    padding: 3
  },

  textInputStyle: {
    height: 50,
    width: '100%',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 7,
    marginTop: 10,
  },

});
