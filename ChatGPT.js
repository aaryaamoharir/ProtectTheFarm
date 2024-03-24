import { useState } from "react";

const apiKey = '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';
const url = 'https://api.openai.com/v1/chat/completions';

function ChatGPT() {

  const [inputText, setInputText] = useState('');

  // Function to handle input changes and update inputText state
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // Function to handle form submission (if needed)
  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log("Input Text:", inputText);
    processMessagetoChatGPT(inputText)
  };

  
  async function processMessagetoChatGPT(message) {
      /*let apiMessages = message.map(() => {
        let role = "user";
        if(message.sender === "ChatGPT") {
          role = "assistant";
        } else {
          role = "user";
        }
        return { role: role, content: message } //may have to see how video created the message (has sender and message property)
      })*/

      const systemMessage = {
        role: "system",
        content: "You are a renowned insurance fraud investigator. You are an expert in anomaly detection and pattern recognition in past insurance fraud cases. Based on your expertise, you must assign a percentage likelihood that the information provided is insurance fraud and give three reasons why you believe so"

      }

      const apiRequestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [
          systemMessage,
          {role: "user", "content": message}
        ]
      }
      await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + apiKey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      }).then((data) => {
        return data.json();
      }).then((data) => {
        let result = data.choices[0].message.content;
        console.log(result);
        let percentage = result.split('\n')[0];
        console.log(percentage);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
      className="text-field"
      type="text"
      id="textInput"
      value={inputText}
      onChange={handleInputChange}
       />
      <button type="submit">Submit</button>
      <p>Entered Text: {inputText}</p>
    </form>
  )
}

export default ChatGPT;
