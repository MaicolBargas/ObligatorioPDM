import React, { useState,useEffect } from "react";
import {Picker, Item, View,Text } from "react-native";


import DatabaseConnection from "../database/database";
const db = DatabaseConnection.getConnection();

const DropDownRepuestos = ({selected}) =>{
  
    const [items, setItems] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT nombre FROM repuesto',
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
            {
           var {nombre} = results.rows.item(i)
           var element = {id: nombre, label: nombre}
           temp.push(element)
           setItems(temp);
        }
          }
        );
   
      });
    }, []);

    return (
        <Picker           
         style={{ height: 30, width: 150 }}
         onValueChange={(selectedValue) => { 
            setSelectedValue(selectedValue);
            selected(selectedValue);
            }}
        >
        {items.map((items) => {
          return  <Picker.Item key={items.id} value={items.label} label={items.label} />;
        })}
      </Picker>

      );
    
}
export default DropDownRepuestos;  
  


