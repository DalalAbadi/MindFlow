const axios = require('axios');

const url = 'https://eastus.customvoice.api.speech.microsoft.com/api/texttospeech/3.1-preview1/batchsynthesis';
const apiKey = '7990a019a6fc4ada9cfb59c9c54d2bad';

const headers = {
  'Ocp-Apim-Subscription-Key': apiKey,
  'Content-Type': 'application/json',
};

const data = {
  displayName: 'batch synthesis sample',
  description: 'my ssml test',
  textType: 'SSML',
  inputs: [
    {
      text:
        "<speak version='1.0' xml:lang='en-US'><voice xml:lang='en-US' xml:gender='Female' name='en-US-JennyNeural'>The rainbow has seven colors.</voice></speak>",
    },
  ],
  properties: {
    outputFormat: 'riff-24khz-16bit-mono-pcm',
    wordBoundaryEnabled: false,
    sentenceBoundaryEnabled: false,
    concatenateResult: false,
    decompressOutputFiles: false,
  },
};

axios.post(url, data, { headers })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
