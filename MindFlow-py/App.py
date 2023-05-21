from flask import Flask, request, send_from_directory,render_template_string
import azure.cognitiveservices.speech as speechsdk
import os
import openai



app = Flask(__name__)

content = [
    {
        'title': 'Mindfulness and Meditation',
        'description': 'Mindfulness and meditation are essential practices in our fast-paced world. They cultivate self-awareness and unlock inner peace, improving well-being and reducing stress.',
    },
    {
        'title': 'Benefits of Meditation',
        'description': 'Meditation unlocks inner peace, enhances focus, and fosters resilience. It promotes emotional well-being and helps individuals navigate life\'s challenges with greater ease.',
    },
    {
        'title': 'Personalized Mindfulness Experience',
        'description': 'MindFlow addresses key challenges faced by individuals seeking personalized meditation experiences:',
        'points': [
            'Limited Options: Many struggle to find tailored meditations amidst a sea of generic content.',
            'Busy Lifestyles: Busy schedules make it difficult to prioritize regular meditation and find convenient resources.',
            'Customization Gap: Existing solutions lack customization options to align with individual preferences and goals.',
        ],
    },
    {
        'title': 'Arabic Meditation Experiences',
        'description': 'MindFlow also addresses challenges faced by individuals seeking Arabic meditation experiences:',
        'points': [
            'Limited Content: Many struggle to find Arabic meditation content.',
            'Low Quality: Available content is often below average at best.',
        ],
    },
]


app = Flask(__name__)

@app.route('/')
def home():
    return render_template_string(template, content=content)

@app.route('/start', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        name = request.form['name']
        feeling = request.form['feeling']
        duration = request.form['duration']
        language = request.form['language']

        if language == "1":
            language_ch = "English"
            
      
        elif language == "2":
            language_ch = "Arabic"
           
        openai.api_key = "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"
        fullContent = f"Generate a guided meditation script for {name}. It's a video with these two variables for duration/focus area: {duration} minutes / focus on relaxation for {feeling} in {language_ch} language and get the response generated by this language."
        
        completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": fullContent}])
        content = completion.choices[0].message["content"] 
        audio_file_path = synthesize_speech(content, language)
        path = audio_file_path
        
        return f'''
            <!DOCTYPE html>
            <html>
            <head>
                <title>Meditation App - Result</title>
                <style>
                    body {{
                        background-color: #F1F5F8;
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        text-align: center;
                    }}

                    .container {{
                        background-color: #ffffff;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
                        max-width: 400px;
                    }}

                    .form-item {{
                        margin-bottom: 20px;
                        text-align: left;
                    }}

                    label {{
                        color: #333333;
                        font-weight: bold;
                        display: block;
                        margin-bottom: 5px;
                    }}

                    textarea,
                    select,
                    input[type="text"] {{
                        width: 100%;
                        padding: 10px;
                        border-radius: 5px;
                        border: 1px solid #cccccc;
                    }}

                    .submit-button-container {{
                        display: flex;
                        justify-content: center;
                    }}

                    input[type="submit"] {{
                        background-color: #2E86C1;
                        color: #ffffff;
                        padding: 10px 20px;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-weight: bold;
                    }}

                    input[type="submit"]:hover {{
                        background-color: #1B4F72;
                    }}
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Thank you, {name}!</h1>
                    <p>Today, you feel: {feeling}</p>
                    <p>You have selected a meditation duration of {duration} minutes.</p>
                    <p>Here is your customized audio meditation. We hope it helps you.</p>
                    <audio controls>
                        <source src="{path}" type="audio/wav" />
                    </audio>
                </div>
            </body>
            </html>
        '''
    
    return '''
        <!DOCTYPE html>
        <html>
        <head>
            <title>Meditation App</title>
            <style>
                body {
                    background-color: #F1F5F8;
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    text-align: center;
                }

                .container {
                    background-color: #ffffff;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
                    max-width: 400px;
                }

                .form-item {
                    margin-bottom: 20px;
                    text-align: left;
                }

                label {
                    color: #333333;
                    font-weight: bold;
                    display: block;
                    margin-bottom: 5px;
                }

                textarea,
                select,
                input[type="text"] {
                    width: 100%;
                    padding: 10px;
                    border-radius: 5px;
                    border: 1px solid #cccccc;
                }

                .submit-button-container {
                    display: flex;
                    justify-content: center;
                }

                input[type="submit"] {
                    background-color: #2E86C1;
                    color: #ffffff;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                }

                input[type="submit"]:hover {
                    background-color: #1B4F72;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to the Meditation App</h1>
                <form method="POST">
                    <div class="form-item">
                        <label for="name">Your Name:</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-item">
                        <label for="feeling">How do you feel today?</label>
                        <textarea id="feeling" name="feeling" rows="4" required></textarea>
                    </div>
                    <div class="form-item">
                        <label for="duration">Select meditation duration:</label>
                        <select id="duration" name="duration" required>
                            <option value="1">1 minute</option>
                            <option value="5">5 minutes</option>
                            <option value="10">10 minutes</option>
                            <option value="15">15 minutes</option>
                            <option value="20">20 minutes</option>
                        </select>
                    </div>
                    <div class="form-item">
                        <label for="language">Select language:</label>
                        <select id="language" name="language" required>
                            <option value="1">English</option>
                            <option value="2">Arabic</option>
                        </select>
                    </div>
                    <div class="submit-button-container">
                        <input type="submit" value="Start Meditation">
                    </div>
                </form>
            </div>
        </body>
        </html>
    '''

@app.route('/audio/<filename>')
def serve_audio(filename):
    return send_from_directory('audio', filename)

def synthesize_speech(textFromUser, language_choice):
    speech_config = speechsdk.SpeechConfig(subscription='af3a8208367b4346a762e206aee7fa84', region='eastus')
    audio_config = speechsdk.audio.AudioOutputConfig(use_default_speaker=True)

    if language_choice == "1":
        speech_config.speech_synthesis_voice_name = 'en-US-JennyNeural'
      
    elif language_choice == "2":
        speech_config.speech_synthesis_voice_name = 'ar-OM-AyshaNeural'
    speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)

    # Get text from the console and synthesize to the default speaker.
    
    text = textFromUser

    
    filename = "speech"

    speech_synthesis_result = speech_synthesizer.speak_text_async(text).get()

    if speech_synthesis_result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
        print("Speech synthesized for text [{}]".format(text))

        output_file = "./audio/"+filename + ".wav"  # specify the path and file name for the output audio file

        # with open(output_file, "wb") as audio_file:
        with open(output_file, "wb") as audio_file:
            audio_file.write(speech_synthesis_result.audio_data)
        # output_file.write(speech_synthesis_result.audio_data)
        # print(f"Audio file saved to: {output_file}")
        return output_file 

    elif speech_synthesis_result.reason == speechsdk.ResultReason.Canceled:
        cancellation_details = speech_synthesis_result.cancellation_details
        print("Speech synthesis canceled: {}".format(cancellation_details.reason))
        if cancellation_details.reason == speechsdk.CancellationReason.Error:
            if cancellation_details.error_details:
                print("Error details: {}".format(cancellation_details.error_details))
                print("Did you set the speech resource key and region values?")

    else:
        print("Speech synthesis failed.")

if __name__ == '__main__':
    app.run(debug=True)
template = '''
<!DOCTYPE html>

<html>
<head>
    <title>MindFlow</title>
    <style>
        body {
            background-color: #FFFFFF;
            font-family: 'Montserrat', sans-serif;
        }

        h1 {
            font-family: 'Times New Roman', serif;
            text-align: center;
            color: #155724;
        }

        h2 {
            font-family: 'Times New Roman', serif;
            text-align: center;
            color: #155724;
        }

        .tab-container {
            width: 30%;
            margin: 0 auto;
        }

        .tab {
            display: block;
            background-color: #ddead1;
            color: #155724;
            padding: 10px;
            margin-bottom: 5px;
            cursor: pointer;
            text-align: center;
        }

        .start-button-container {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ddead1;
            color: #155724;
            padding: 10px;
            cursor: pointer;
            width: 200px;
            margin: 20px auto;
        }

        .tab.active {
            background-color: #155724;
            color: #FFFFFF;
        }

        .content {
            margin: 20px auto;
            max-width: 600px;
            color: #555555;
            display: none;
        }

        ul {
            list-style: disc;
            margin-left: 20px;
            color: #555555;
        }

        .logo {
            text-align: center;
            margin-bottom: 20px;
        }

        .logo img {
            width: 200px;
        }
    </style>
    <script>
        function showTab(tabIndex) {
            var tabs = document.getElementsByClassName("tab");
            var contents = document.getElementsByClassName("content");

            for (var i = 0; i < tabs.length; i++) {
                tabs[i].classList.remove("active");
                contents[i].style.display = "none";
            }

            tabs[tabIndex].classList.add("active");
            contents[tabIndex].style.display = "block";
        }
    </script>
</head>
<body>
    <div class="logo">
        <img src="{{ url_for('static', filename='logo.png') }}" alt="MindFlow Logo">
    </div>
    <h1>Welcome to MindFlow</h1>
    <p style="text-align: center;">MindFlow is an app designed to help you explore mindfulness and meditation, providing personalized experiences and Arabic meditation content.</p>
    <div class="tab-container">
        {% for item in content %}
            {% set index = loop.index0 %}
            <div class="tab" onclick="showTab({{ index }})">{{ item['title'] }}</div>
        {% endfor %}
    </div>
    <div class="content">
        <h2>{{ content[0]['title'] }}</h2>
        <p>{{ content[0]['description'] }}</p>
    </div>
    <div class="content">
        <h2>{{ content[1]['title'] }}</h2>
        <p>{{ content[1]['description'] }}</p>
    </div>
    <div class="content">
        <h2>{{ content[2]['title'] }}</h2>
        <p>{{ content[2]['description'] }}</p>
        {% if content[2].get('points') %}
            <ul>
                {% for point in content[2]['points'] %}
                    <li>{{ point }}</li>
                {% endfor %}
            </ul>
        {% endif %}
    </div>
    <div class="content">
        <h2>{{ content[3]['title'] }}</h2>
        <p>{{ content[3]['description'] }}</p>
        {% if content[3].get('points') %}
            <ul>
                {% for point in content[3]['points'] %}
                    <li>{{ point }}</li>
                {% endfor %}
            </ul>
        {% endif %}
    </div>
    <div class="start-button-container">
        <a href="/start" class="button">Start</a>
    </div>
</body>
</html>


'''