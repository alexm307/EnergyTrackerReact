import axios from "axios";
import React, {useEffect, useState} from "react";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import './User.css';

var stompClient = null;
var user = localStorage.getItem("user");
var unreadMess = false;

function connect(userName) {
    console.log("we will connect to " + userName);
  const user = localStorage.getItem("user");
  var socket = new SockJS("http://127.0.0.1:8080/ws");
  stompClient = Stomp.over(socket);
  if (userName) {
    stompClient.connect({}, function(frame) {
      console.log("Connected for messaging: " + frame);
      stompClient.subscribe("/all/specific", function(
        message
      ) {
        unreadMess = true;
        //console.log(message);
        if (userName === JSON.parse(message.body).userTo)
            displayMess(JSON.parse(message.body), userName);
      });
    });
  }
}

function displayMess(warningMessage, userName) {
  console.log(warningMessage);
  var mess = document.getElementById("messageDiv");
  var pName = document.createElement("p");
  pName.id = "userFrom"
  var p = document.createElement("p");
  p.id = "message"
  mess.appendChild(pName);
  mess.appendChild(p);

  pName.appendChild(
    document.createTextNode(
        "From user: " + warningMessage.userFrom
    )
  );

  p.appendChild(
    document.createTextNode(
        " " +
        "Dear user called " + userName +
        ": " +
        warningMessage.text
    )
  );
}

function disconnect() {
  if (stompClient != null) {
    stompClient.disconnect();
    stompClient = null;
  }
  console.log("Disconnected");
}

function UserChat({userName}) {
    //console.log("The user we got is:" + userName);

    //const [unreadMess, setUnreadMess] = useState(false)

    const typingMessage = (e) => {
        console.log("something is typed here")
        var nr = document.getElementById("chatBox").value;
        let nrREG = new RegExp('^.{20,}$')
        var recipient = document.getElementById("userTo").value;
        if(nr!= null)
            stompClient.send('/app/application', {}, JSON.stringify({userFrom:user, userTo:recipient, text:"I am typing my response"})); ; //aici trimitem mesajul cu typing
    }

    function sendRead() {

        var recipient = "slave"//document.getElementById("userTo").value;
    
        if (unreadMess) {
            stompClient.send('/app/application', {}, JSON.stringify({userFrom:user, userTo:recipient, text:"MESSAGE HAS BEEN READ"}));   //aici se trimite mesajul de read
            unreadMess = false;
        }
    
    }

    const sendMessage = async e => {
        e.preventDefault();
        
        //aici se trimite mesajul prorpiu-zis, la admin sau user
        var message = document.getElementById("chatBox").value;
        var recipient = document.getElementById("userTo").value;

        stompClient.send('/app/application', {}, JSON.stringify({userFrom:user, userTo:recipient, text:message}))
    }

    return ( 
        <div>
            <div id="messageDiv">Chat:</div>
                <button id="connect" onClick={() => connect(userName)}>
                    Connect
                </button>
                <br></br>
                <button id="disconnect" onClick={() => {disconnect();}}>
                    Disconnect
                </button>
                <br></br>
            
            <label>Insert message here:</label>
            <br></br>
            <input onChange={(e) => typingMessage(e)} type='text' id="chatBox" onClick={sendRead()}></input>
            <br></br>
            <label>Insert user to send to:</label>
            <br></br>
            <input type='text' id="userTo"></input>
            <button onClick={sendMessage}>Send Message</button>
        </div>
    )
}

export default UserChat;