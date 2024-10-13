// ==UserScript==
// @name        Configurable WORDLE Starter
// @namespace   Violentmonkey Scripts
// @match       https://www.nytimes.com/games/wordle/*
// @grant       none
// @downloadURL https://github.com/senshastic/sensha-fallen-nytgames/raw/refs/heads/main/js/configurable_wordle_starter.user.js
// @updateURL   https://github.com/senshastic/sensha-fallen-nytgames/raw/refs/heads/main/js/configurable_wordle_starter.user.js
// @icon        https://github.com/senshastic/sneshGPT/blob/main/assets/Hap.png?raw=true
// @version     1.0.0 
// @author      sensha
// @description Change to accomodate your own starterWord.
// ==/UserScript==


(function() {
    'use strict';

    // Starter word for Wordle, configurable
    let starterWord = "aisle";

    window.addEventListener('load', function() {

        // Create a button for the starter word
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

        // When the button is clicked, simulate typing the word
        button.addEventListener('click', function() {
            simulateTypingWord(starterWord);
        });

        // Toggle button visibility based on the welcome screen
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
    });
})();