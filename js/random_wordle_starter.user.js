// ==UserScript==
// @name        Random WORDLE Starter
// @namespace   Violentmonkey Scripts
// @match       https://www.nytimes.com/games/wordle/*
// @grant       none
// @downloadURL https://github.com/senshastic/sensha-fallen-nytgames/raw/refs/heads/main/js/random_wordle_starter.user.js
// @updateURL   https://github.com/senshastic/sensha-fallen-nytgames/raw/refs/heads/main/js/random_wordle_starter.user.js
// @icon        https://github.com/senshastic/sneshGPT/blob/main/assets/Hap.png?raw=true
// @version     1.0.0
// @author      sensha
// @description Pulls from a list of 14000 words as random starters.
// ==/UserScript==

(function() {
    'use strict';

    // URL of the valid Wordle word list
    const wordListUrl = 'https://gist.githubusercontent.com/dracos/dd0668f281e685bad51479e5acaadb93/raw/6bfa15d263d6d5b63840a8e5b64e04b382fdb079/valid-wordle-words.txt';
    let starterWord = '';

    // Function to fetch the list of words and pick a random word
    async function fetchRandomWord() {
        try {
            const response = await fetch(wordListUrl);
            const text = await response.text();
            const wordArray = text.split('\n'); // Split text by new line to get words
            starterWord = wordArray[Math.floor(Math.random() * wordArray.length)]; // Pick a random word
            createButton(); // Create the button once we have the word
        } catch (error) {
            console.error('Error fetching word list:', error);
        }
    }

    // Function to create the button once the word is ready
    function createButton() {
        // Create the button for the starter word
        let button = document.createElement("button");
        button.innerHTML = `Starter Word: ${starterWord.toUpperCase()}`;
        button.style.position = "fixed";
        button.style.bottom = "20px";
        button.style.right = "20px";
        button.style.padding = "15px";
        button.style.fontSize = "18px";
        button.style.color = "#d0b575";
        button.style.backgroundColor = "rgba(5, 5, 5, .18)";
        button.style.border = "none";
        button.style.borderRadius = "12px";
        button.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.37)";
        button.style.backdropFilter = "blur(100px) saturate(110%)";
        button.style.webkitBackdropFilter = "blur(100px)";
        button.style.transition = "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out";
        button.style.cursor = "pointer";
        button.style.zIndex = "9999";
        document.body.appendChild(button);

        // Hover effect for the button
        button.addEventListener('mouseover', function() {
            button.style.backgroundColor = "rgba(5, 5, 5, 0)";
            button.style.transform = "translateY(-4px)";
        });

        button.addEventListener('mouseout', function() {
            button.style.backgroundColor = "rgba(5, 5, 5, .18)";
            button.style.transform = "translateY(0)";
        });

        // When the button is clicked, simulate typing the word
        button.addEventListener('click', function() {
            simulateTypingWord(starterWord);
        });

        // Hide the button when the welcome screen is visible
        function toggleButtonVisibility() {
            let welcomeElement = document.querySelector('.Welcome-module_contentWelcomeContainer__UO4Ei');
            if (welcomeElement && welcomeElement.offsetParent !== null) {
                button.style.display = 'none';
            } else {
                button.style.display = 'block';
            }
        }

        // Check for visibility of the welcome screen every second
        toggleButtonVisibility();
        setInterval(toggleButtonVisibility, 1000);
    }

    // Function to simulate typing the starter word
    function simulateTypingWord(word) {
        word.split('').forEach(letter => {
            let event = new KeyboardEvent('keydown', {
                key: letter,
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(event);
        });
    }

    // Fetch the random word and create the button after the page loads
    window.addEventListener('load', fetchRandomWord);

})();