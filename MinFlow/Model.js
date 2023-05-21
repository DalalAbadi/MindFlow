// import React, { useState } from 'react';
// import { View, Text, TextInput, Button } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Video from 'react-native-video';

// const Model = () => {
//   const [selectedTime, setSelectedTime] = useState(new Date());
//   const [showTimePicker, setShowTimePicker] = useState(false);
//   const [textInputValue, setTextInputValue] = useState('');
//   const [videoUrl, setVideoUrl] = useState('');

//   const handleTimeChange = (event, selected) => {
//     setShowTimePicker(false);
//     if (selected) {
//       setSelectedTime(selected);
//     }
//   };

//   const handleVideoUrlChange = () => {
//     // Assume you have a method to validate the video URL
//     const isValidUrl = validateVideoUrl(videoUrl);
//     if (isValidUrl) {
//       // Play the video
//     } else {
//       // Show an error message
//     }
//   };

//   return (
//     <View>
//       <Text>Please select a time:</Text>
//       <Button title="Select Time" onPress={() => setShowTimePicker(true)} />
//       {showTimePicker && (
//         <DateTimePicker
//           value={selectedTime}
//           mode="time"
//           is24Hour={true}
//           display="default"
//           onChange={handleTimeChange}
//         />
//       )}

//       <Text>Please enter some text:</Text>
//       <TextInput
//         value={textInputValue}
//         onChangeText={text => setTextInputValue(text)}
//         placeholder="Enter text here"
//       />

//       <Text>Please enter a video URL:</Text>
//       <TextInput
//         value={videoUrl}
//         onChangeText={url => setVideoUrl(url)}
//         placeholder="Enter video URL here"
//       />
//       <Button title="Play Video" onPress={handleVideoUrlChange} />

//       {videoUrl !== '' && (
//         <Video
//           source={{ uri: videoUrl }}
//           style={{ width: 300, height: 200 }}
//           controls={true}
//         />
//       )}
//     </View>
//   );
// };

// export default Model;