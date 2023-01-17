import axios from "axios";
import React, {useEffect, useState} from "react";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import './User.css';

var stompClient = null;

function connect() {
  const user = localStorage.getItem("user");
  var socket = new SockJS("http://127.0.0.1:8080/ws");
  stompClient = Stomp.over(socket);
  if (user) {
    stompClient.connect({}, function(frame) {
      console.log("Connected: " + frame);
      stompClient.subscribe("/all/messages/" + user, function(
        warningMessage
      ) {
        displayMess(JSON.parse(warningMessage.body), user);
      });
    });
  }
}

function displayMess(warningMessage, user) {
  console.log(warningMessage);
  var mess = document.getElementById("message");
  var p = document.createElement("p");
  mess.appendChild(p);
  p.appendChild(
    document.createTextNode(
      new Date(warningMessage.time).toDateString() +
        " " +
        "Dear user called " + user +
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

function WebSk() {



    return ( 
        <div>
                <div id="message"></div>
                <button id="connect" onClick={connect}>
                    Connect
                </button>
                <br></br>
                <button id="disconnect" onClick={() => {disconnect();}}>
                    Disconnect
                </button>
                <br></br>
            
            <label>Insert something here</label>
            <br></br>
            <input type='text' id="idk"></input>
        </div>
    )
}

export default WebSk;