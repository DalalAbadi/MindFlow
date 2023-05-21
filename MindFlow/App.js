import React, { useState } from 'react';
import { View, Text, TextInput, Button,TouchableOpacity,ScrollView } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Video from 'react-native-video';
import NumericInput from 'react-native-numeric-input';
import SoundPlayer from 'react-native-sound-player';
import RNFetchBlob from 'react-native-fetch-blob';
// import axios from 'axios';
// import { Configuration, OpenAIApi } from "openai";
// import 'react-native-url-polyfill/auto';
// import { Platform } from 'react-native';

// import Sound from 'react-native-sound';
// import RNFetchBlob from 'react-native-fetch-blob';

const App = () => {

  const [text, setText] = useState('');
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [gene, setGene] = useState('');
  const [speech, setSpeech] = useState('');
  const [videoUrl, setVideoUrl] = useState('');


 
  

  const subscriptionKey = 'af3a8208367b4346a762e206aee7fa84';
  const region = 'eastus';
  

  
  
  
  


  // 'Generate a guided meditation script for a video with these two variables for duration/focus area: 10 minutes / focus on relaxation for big soccer match'
  
//   const getAudioFromSpeech =  () => {
    
// }

const fetchSpeech = async () => {
  var text = "Hey this is Dalal"
  // const API_KEY = '7990a019a6fc4ada9cfb59c9c54d2bad'; // Replace this with your API key
  const REGION = 'eastus'; // Replace this with your region

  const headers = new Headers({
    'Content-Type': 'application/ssml+xml',
    // 'Authorization': `Bearer ${API_KEY}`,
    'Ocp-Apim-Subscription-Key':'1aa4ceaf6fd240dc954edd7aa2e1a77d',
    'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
    // 'User-Agent': 'MindFlow1'
  });

  //const body = `<speak version='1.0' xml:lang='en-US'><voice xml:lang='en-US' xml:gender='Female' name='Microsoft Server Speech Text to Speech Voice (en-US, Jessa24kRUS)'>${text}</voice></speak>`;
  const body = "<speak version='1.0' xml:lang='en-US'><voice xml:lang='en-US' xml:gender='Female' name='Microsoft Server Speech Text to Speech Voice (en-US, JennyNeural)'> ${text}</voice></speak>"
  const response = await fetch('https://eastus.tts.speech.microsoft.com/cognitiveservices/v1', {
    method: 'POST',
    headers,
    body
  });
console.log("HEEEE",response)
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }



  const audioUrl = 'https://eastus.tts.speech.microsoft.com/cognitiveservices/v1';

  // Download the audio file using react-native-fetch-blob
  const dirs = RNFetchBlob.fs.dirs;
  const filePath = `${dirs.DocumentDir}/v1.wav`;
  
  RNFetchBlob.config({
    fileCache: true,
    path: filePath,
  })
    .fetch('GET', audioUrl)
    .then(res => {
      // Play the downloaded audio file using react-native-sound-player
      SoundPlayer.playSoundFile(filePath, 'wav')
        .then(() => {
          console.log('Audio play successful');
        })
        .catch(error => {
          console.log('Audio play failed:', error);
        });
    })
    .catch(error => {
      console.log('Error downloading audio:', error);
    }); 
  
  // const audioData = await response.arrayBuffer();

  // Now you have audio data, you can play it using React Native sound player or save it to a file.
};

// fetchSpeech('Hello, world!');
  
  const fetchData = async () => {

    synthesizer.speakTextAsync(textToAudio).then(() => {
      console.log('Speech synthesized successfully!');
    }).catch((error) => {
      console.error(error);
    });
  
  
  // const configuration = new Configuration({
  //   apiKey: "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",
  // });
  // const openai = new OpenAIApi(configuration);
  
  // const completion = await openai.createChatCompletion({
  //   model: "gpt-3.5-turbo",
  //   messages: [{role: "user", content: textInputValue}],
    
  // }).catch((error) => {
  //   console.log("Error:", error);
  //   });
  // console.log(completion.data.choices[0].message);

    console.log("Response",completion.data.choices[0].message["content"])
    setSpeech(completion.data.choices[0].message["content"])
    console.log("Done!!!!!!!!");
  //   const options = {
  //     method: 'POST',
  //     url: 'https://api.cohere.ai/v1/generate',
  //     headers: {
  //       accept: 'application/json',
  //       'content-type': 'application/json',
  //       authorization: 'Bearer SPVrclYxS4WknbPvsp63qu2uVz5vr9WNJ1svqtEL'
  //     },
  //     data: {
  //       max_tokens: 200,
  //       return_likelihoods: 'NONE',
  //       truncate: 'END',
  //       model: 'command',
  //       prompt: {prompt},
  //     }
  //   };
  // console.log(options)
  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       console.log("Text", response.data["generations"][0]["text"]);
  //       setGene(response.data["generations"][0]["text"]);
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
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
        onChangeText={text => setTextInputValue(text)}
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

   
      <TouchableOpacity style={styles.button} onPress={() => fetchSpeech()}>
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