import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../components/MyButton";


const Home = ({navigation}) => {

  return (
    <SafeAreaView>
      <View >
        <View>
          <View >
            <ScrollView>
              <MyButton
                title="Vehiculos"
                btnColor="blue"
                btnIcon="car"
                customPress={() => navigation.navigate("Vehiculos")}
              />
              <MyButton
                title="Usuarios"
                btnColor="green"
                btnIcon="user"
                customPress={() => navigation.navigate("Usuarios")}
              />
              <MyButton
                title="Insumos"
                btnColor="pink"
                btnIcon="fire"
                customPress={() => navigation.navigate("Insumos")}
              />
              <MyButton
                title="Repuestos"
                btnColor="pink"
                btnIcon="wrench"
                customPress={() => navigation.navigate("Repuestos")}
              />
              <MyButton
                title="Reparacion"
                btnColor="skyblue"
                btnIcon="gears"
                customPress={() => navigation.navigate("Reparacion")}
              />                                          
            </ScrollView>
          </View>
        </View>
        </View>
        </SafeAreaView>

)};

export default Home;
