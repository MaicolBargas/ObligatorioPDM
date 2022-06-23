import React, { useState, useEffect, useIsFocused } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert, Text, TouchableOpacity } from "react-native";

import DatabaseConnection from "../../database/database";
const db = DatabaseConnection.getConnection();

const ListarVehiculo = ({navigation}) => {

    const [items, setItems] = useState([]);
    const [empty, setEmpty] = useState([]);

    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM vehiculo',
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setItems(temp);
   
            if (results.rows.length >= 1) {
              setEmpty(false);
            } else {
              setEmpty(true)
            }
   
          }
        );
   
      });
    }, []);
   
    const listViewItemSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: '#000'
          }}
        />
      );
    };
   
    const emptyMSG = (status) => {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
   
          <Text style={{ fontSize: 25, textAlign: 'center' }}>
            No hay datos ingresados en la base de datos.
            </Text>
   
        </View>
      );
    }
   
    const navigateToEditScreen = (matricula, marca, color, serialMotor) => {
   
      navigation.navigate('ModificarVehiculo', {
        matricula: matricula,
        marca: marca,
        color: color,
        serialMotor: serialMotor
      });
    }
   
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {empty ? emptyMSG(empty) :
   
            <FlatList
              data={items}
              ItemSeparatorComponent={listViewItemSeparator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                <View key={item.matricula} style={{ padding: 20 }}>
                  <TouchableOpacity onPress={() => navigateToEditScreen(item.matricula, item.marca, item.color, item.serialMotor)} >
                    <Text> Matricula: {item.matricula} </Text>
                    <Text> Marca: {item.marca} </Text>
                    <Text> Color : {item.color} </Text>
                    <Text> SerialMotor: {item.serialMotor} </Text>
                  </TouchableOpacity>
                </View>
              }
            />
          }
        </View>
      </SafeAreaView>
   
    );
};

export default ListarVehiculo;



