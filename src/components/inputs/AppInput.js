import React from 'react';
import { TextInput, StyleSheet, Text } from 'react-native';
import BaseInput from './BaseInput';


showError = (label, errors) => {
  let errorText = null;
  let isError = false;
  const inputField = label.replace(' ', '').toLowerCase();

  errors.forEach(error => {
    if(error.field.toLowerCase() === inputField){
      isError = true
      errorText = (
        <Text style={styles.inputTextErrorColor}>
        {error.message.replace(/['"]+/g, '')}
      </Text>
      );
    }
  });

  return {
    errorText,
    isError
  }
}

 
  const AppInput = (props)  => {
    const { label, style, showLabel, errors, ...rest } = props;
    const { isError, errorText } = showError(label, errors);

    return (
        <BaseInput
          label={label} 
          showLabel={showLabel}
        >
          <TextInput
            {...rest}
            autoCapitalize="none"
            style={[
              styles.textInput,
              style,
              isError ? styles.inputBorderErrorColor : '',
            ]}
            />
            {errorText}
        </BaseInput>
      )
}


 const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderBottomWidth: 1,
    marginTop: 10,
    fontSize: 18,
    borderRadius: 4,
    color: '#000',
    borderColor: '#1c262f', 
  },
  inputBorderErrorColor: {
    borderColor: 'red', 
  },
  inputTextErrorColor: {
    color: 'red',
    fontSize: 12
  }
 })

export default AppInput;
