import React,{useEffect} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import MyButton from "../../components/MyButton";

import DatabaseConnection from '../../database/database'
const db = DatabaseConnection.getConnection();


const Insumos = ({navigation}) => {

    useEffect(() => {
        db.transaction( (txn) => {
          txn.executeSql(
           "SELECT name FROM sqlite_master WHERE type='table' AND name='insumo'",
            [],
             (tx, res) =>{
              console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS insumo', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS insumo(id INTEGER PRIMARY KEY, nombre VARCHAR(40), cantidad INTEGER)',
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
                  title="Alta Insumo"
                  btnColor="green"
                  btnIcon="plus"
                  customPress={() => navigation.navigate('AltaInsumo')}
                />
                <MyButton
                  title="Lista Insumos"
                  btnColor="blue"
                  btnIcon="list-alt"
                  customPress={() => navigation.navigate("ListarInsumo")}
                />                                      
              </ScrollView>
            </View>
          </View>
          </View>
          </SafeAreaView>
    )

}
export default Insumos;

