import React, { useState } from 'react';
import { View, Text, TextInput, Button,TouchableOpacity,ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Video from 'react-native-video';
import NumericInput from 'react-native-numeric-input';
import axios from 'axios';
const App = () => {

  const [text, setText] = useState('');
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [gene, setGene] = useState('');
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState('');


  // 'Generate a guided meditation script for a video with these two variables for duration/focus area: 10 minutes / focus on relaxation for big soccer match'
  const fetchData = () => {
    console.log("Fetching Data")
    const options = {
      method: 'POST',
      url: 'https://api.cohere.ai/v1/generate',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer SPVrclYxS4WknbPvsp63qu2uVz5vr9WNJ1svqtEL'
      },
      data: {
        max_tokens: 200,
        return_likelihoods: 'NONE',
        truncate: 'END',
        model: 'command',
        prompt: {prompt},
      }
    };
  console.log(options)
    axios
      .request(options)
      .then(function (response) {
        console.log("Text", response.data["generations"][0]["text"]);
        setGene(response.data["generations"][0]["text"]);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  
  



  const handleTimeChange = (event, selected) => {
    setShowTimePicker(false);
    if (selected) {
      setSelectedTime(selected);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    {/* <View style={styles.container}> */}
      <Text style={styles.header}>How are you feeling today?</Text>
      <TextInput
        style={styles.textInput}
        multiline
        value={textInputValue}
        onChangeText={text => setPrompt(text)}
        placeholder="Enter your thoughts here"
      />

      <Text style={styles.label}>How long do you want your meditation session to be?</Text>
      <NumericInput
        value={0}
        onChange={value => console.log(value)}
        minValue={0}
        maxValue={60}
        totalWidth={200}
        totalHeight={40}
        iconSize={25}
        step={5}
        valueType="integer"
        rounded
        textColor="#000"
        iconStyle={{ color: 'white' }}
        rightButtonBackgroundColor="#6CC7E4"
        leftButtonBackgroundColor="#6CC7E4"
      />

      {/* <Button title="Select Time" onPress={() => setShowTimePicker(true)} />
      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )} */}

   
      <TouchableOpacity style={styles.button} onPress={() => fetchData()}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <Text style={styles.responseText}>{gene}</Text>
    </ScrollView>
  );
};

const styles = {
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  textInput: {
    height: 150,
    width: 300,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6CC7E4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  responseText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
};

export default App;