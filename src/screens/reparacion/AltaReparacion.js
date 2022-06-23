import React, { useState } from "react";
import { View, SafeAreaView, Alert,StyleSheet, TouchableOpacity, TextInput,Text} from "react-native";
import DropDownInsumos from "../../components/DropDownInsumos";
import DropDownRepuestos from "../../components/DropDownRepuestos";
import DropDownVehiculos from "../../components/DropDownVehiculos";

import DatabaseConnection from "../../database/database";
const db = DatabaseConnection.getConnection();

const AltaReparacion = ({ navigation }) => {

  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [auto, setAuto] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [costo, setCosto] = useState('');
  const [insumos,setInsumos] = useState([]);
  const [repuestos, setRepuestos] = useState([]);


  const clearData = () => {
    setId("");
    setNombre("");
    setAuto("");
    setFechaInicio("");
    setFechaFin("");
    setCosto("");
    setInsumos("");
    setRepuestos("");
  };

  const altaV = () => {
    console.log("states",id, nombre, auto, fechaInicio, fechaFin, costo, insumos, repuestos);
  
    if (!id.trim() || !nombre.trim()|| !auto.trim()|| !fechaInicio.trim()|| !fechaFin.trim() || !costo.trim()|| !insumos.trim()|| !repuestos.trim())  {
      Alert.alert("Debe ingresar todos los datos");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO reparacion (id, nombre, auto, fechaInicio, fechaFin, costo, insumos, repuestos) VALUES (?, ?, ?, ?,?, ?, ?, ?)`,
        [id, nombre, auto, fechaInicio, fechaFin, costo, insumos, repuestos],
        (tx, results) => {
          console.log("results", results);        
          if (results.rowsAffected > 0) {
            clearData();
            Alert.alert(
              "Excelente",
              "Reparacion dada de Alta!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("Reparacion"),
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert("Error al registrar Reparacion");
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
                keyboardType={'numeric'}
              />

              <TextInput
                style={styles.textInputStyle}               
                placeholder="Nombre"
                onChangeText={setNombre}
                value={nombre}
                maxLength={25}
              />

              <TextInput
                style={styles.textInputStyle}               
                placeholder="Auto"
                onChangeText={setAuto}
                value={auto}
                disabled = {true}
              />

                <DropDownVehiculos
                    selected={setAuto}
                />
                    
                <TextInput
                placeholder="Fecha Inicio"
                onChangeText={setFechaInicio}
                value={fechaInicio}
                style={styles.textInputStyle}                
                
              />

              <TextInput
                style={styles.textInputStyle}               
                placeholder="Fecha Fin"
                onChangeText={setFechaFin}
                value={fechaFin}
                
              />

              <TextInput
                placeholder="Costo"
                onChangeText={setCosto}
                value={costo}
                style={styles.textInputStyle}
                keyboardType={'numeric'}
              />

              <TextInput
                placeholder="Insumos"
                onChangeText={setInsumos}
                value={insumos}
                style={styles.textInputStyle}
                disabled = {true}
              />
                <DropDownInsumos 
                selected={setInsumos}
                />

              <TextInput
                placeholder="Repuestos"
                onChangeText={setRepuestos}
                value={repuestos}
                style={styles.textInputStyle}
              />
              <DropDownRepuestos
                selected={setRepuestos}
              />


            <TouchableOpacity
                style={styles.touchableOpacityRegister}
                onPress={altaV}>
                <Text style={styles.touchableOpacityTextRegister} > Alta Reparacion </Text>
            </TouchableOpacity>
         
        </View>
    </SafeAreaView>
  );
};

export default AltaReparacion;

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
