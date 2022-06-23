import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert, Text, TouchableOpacity } from "react-native";

import DatabaseConnection from "../../database/database";
const db = DatabaseConnection.getConnection();

const ListarUsuario = ({navigation}) => {

    const [items, setItems] = useState([]);
    const [empty, setEmpty] = useState([]);

    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM usuario',
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
   
    const navigateToEditScreen = (ci, nombre, apellido, matriculaAuto) => {
   
      navigation.navigate('ModificarUsuario', {
        ci: ci,
        nombre: nombre,
        apellido: apellido,
        matriculaAuto: matriculaAuto
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
                <View key={item.ci} style={{ padding: 20 }}>
                  <TouchableOpacity onPress={() => navigateToEditScreen(item.ci.toString(), item.nombre, item.apellido, item.matriculaAuto)} >
                    <Text> C.I.: {item.ci} </Text>
                    <Text> Nombre: {item.nombre} </Text>
                    <Text> Apellido : {item.apellido} </Text>
                    <Text> Vehiculo: {item.matriculaAuto} </Text>
                  </TouchableOpacity>
                </View>
              }
            />
          }
        </View>
      </SafeAreaView>
   
    );
};

export default ListarUsuario;



