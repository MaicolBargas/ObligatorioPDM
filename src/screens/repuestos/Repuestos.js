import React,{useEffect} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import MyButton from "../../components/MyButton";

import DatabaseConnection from '../../database/database'
const db = DatabaseConnection.getConnection();


const Repuestos = ({navigation}) => {

    useEffect(() => {
        db.transaction( (txn) => {
          txn.executeSql(
           "SELECT name FROM sqlite_master WHERE type='table' AND name='repuesto'",
            [],
             (tx, res) =>{
              console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS repuesto', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS repuesto(id INTEGER PRIMARY KEY, nombre VARCHAR(40), cantidad INTEGER)',
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
                  title="Alta Repuesto"
                  btnColor="green"
                  btnIcon="plus"
                  customPress={() => navigation.navigate('AltaRepuesto')}
                />
                <MyButton
                  title="Lista Repuestos"
                  btnColor="blue"
                  btnIcon="list-alt"
                  customPress={() => navigation.navigate("ListarRepuesto")}
                />                                      
              </ScrollView>
            </View>
          </View>
          </View>
          </SafeAreaView>
    )

}
export default Repuestos;

