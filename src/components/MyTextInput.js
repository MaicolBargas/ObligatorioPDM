import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const MyTextInput = (props) => {
    
    return(
        <View>
        <TextInput
          underlineColorAndroid="transparent"
          maxLength={props.maxLength}
          minLength={props.minLength}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          placeholderTextColor="grey"
          keyboardType={props.keyboardType}
          secureTextEntry={props.secureTextEntry}
          returnKeyType={props.returnKeyType}
          numberOfLines={props.numberOfLines}
          multiline={props.multiline}
          onSubmitEditing={props.onSubmitEditing}
          blurOnSubmit={false}
          value={props.value}
          defaultValue={props.defaultValue}
        />
      </View>
    )
}

export default MyTextInput;