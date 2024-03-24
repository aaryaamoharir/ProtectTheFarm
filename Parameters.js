import React from 'react';
import { useState } from "react";
import Button from './Button';
import App from './App'
import './Style.css'; // Import your CSS file

const apiKey = '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';
const url = 'https://api.openai.com/v1/chat/completions';

let userAmount; 

function Parameters() {
  const handleClick = () => {
    console.log(document.getElementById("Method").value);
    
    let message = "Here is the amount they are requesting: $ " + document.getElementById("Amount").value + "\n" 
                + "This is the method of payment: " + document.getElementById("Method").value + "\n" 
                + "This is how long ago it happened: " + document.getElementById("Time").value + "\n"
                + "This is the type of insurance requested: " + document.getElementById("Type").value + "\n" 
                + "These were the witnesses: " + document.getElementById("Witness").value + "\n" 
                + "This is where it happened: " + document.getElementById("Location").value + "\n"
                + "This is a brief description of what happened: " + document.getElementById("Description").value;  
    console.log(message);
    processMessagetoChatGPT(message);
  };

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
        alert(result); 
        console.log(result);
      });
  }

  return (
    <div className="gradient-background">
      <div className="custom-text">
        Input Parameters:
      </div>
      <div className="section-text">
        Input Parameters
      </div>
      <div className="small-rectangles">
        <div className="small-rectangle left">
          <div className="input-container">
          <input 
                type="text"
                placeholder='Claim Amount?'
                id='Amount'
                className='text-field-smaller'
            ></input>
            <input 
                type="text"
                placeholder='Payment Method?'
                id='Method'
                className='text-field-smaller'
            ></input>
            <input 
                type="text"
                placeholder='Time since Incident?'
                id='Time'
                className='text-field-smaller'
            ></input>
            
             </div>
        </div>
        <div className="small-rectangle right">
          <div className="input-container">
          <input 
                type="text"
                placeholder='Type of Claim?'
                id='Type'
                className='text-field-smaller'
            ></input>
            <input 
                type="text"
                placeholder='Witnesses?'
                id='Witness'
                className='text-field-smaller'
            ></input>
            <input 
                type="text"
                id="Location"
                placeholder='Your Location During?'
                className='text-field-smaller'
            ></input>
          </div>
        </div>
      </div>
      <Button 
        className='button'
        onClick={handleClick}
        >Submit
      </Button>
      <input 
        type="text"
        placeholder='50-100 Word Description'
        id='Description'
        className='description-box'
      ></input>
    </div>
  );
}

export default Parameters; 