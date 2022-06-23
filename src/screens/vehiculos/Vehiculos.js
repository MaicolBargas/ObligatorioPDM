import React,{useEffect} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import MyButton from "../../components/MyButton";

import DatabaseConnection from '../../database/database'
const db = DatabaseConnection.getConnection();


const Vehiculos = ({navigation}) => {

    useEffect(() => {
        db.transaction( (txn) => {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='vehiculo'",
            [],
             (tx, res) =>{
              console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS vehiculo', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS vehiculo( matricula VARCHAR(7) primary key, marca VARCHAR(40), color VARCHAR(20), serialMotor VARCHAR(40))',
                  []
                );
              }
            }
          );
        });
      }, []);

    return(
        <SafeAreaView>
        <View >
          <View>
            <View >
              <ScrollView>
                <MyButton
                  title="Alta Vehiculos"
                  btnColor="green"
                  btnIcon="plus"
                  customPress={() => navigation.navigate('AltaVehiculo')}
                />
                <MyButton
                  title="Lista Vehiculos"
                  btnColor="blue"
                  btnIcon="list-alt"
                  customPress={() => navigation.navigate("ListarVehiculo")}
                />                                      
              </ScrollView>
            </View>
          </View>
          </View>
          </SafeAreaView>
    )

}
export default Vehiculos;

