// ==UserScript==
// @name        snesh_nytgames
// @namespace   Violentmonkey Scripts
// @match       https://www.nytimes.com/crosswords*
// @match       https://www.nytimes.com/game*
// @downloadURL   https://github.com/senshastic/sensha-fallen-nytgames/raw/refs/heads/main/js/snesh_nytgames.user.js
// @updateURL   https://github.com/senshastic/sensha-fallen-nytgames/raw/refs/heads/main/js/snesh_nytgames.user.js
// @grant       none
// @icon        https://github.com/senshastic/sneshGPT/blob/main/assets/Hap.png?raw=true
// @version     1.0.0
// @author      sensha
// @description 10/11/2024, 4:54:01 AM
// ==/UserScript==

(function () {
    'use strict';

    let triggerZone;

    // Function to apply acrylic effect and styling to the sidebar
    function applySidebarStyles(sidebar) {
        if (sidebar) {
            Object.assign(sidebar.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '260px',
                height: '100vh',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(25px) saturate(200%) contrast(90%)',
                webkitBackdropFilter: 'blur(25px) saturate(200%) contrast(90%)',
                color: 'white',
                zIndex: '1000',
                overflowY: 'auto',
                scrollbarWidth: 'none',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out',
                transform: 'translateX(0)',
                opacity: '1',
                pointerEvents: 'auto',
                paddingBottom: '25px',
            });

            let styleSheet = document.createElement("style");
            styleSheet.textContent = `
                #js-nav-drawer::before, #content-nav::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.1) 100%);
                    backdrop-filter: blur(15px) saturate(180%) contrast(90%);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.1);
                    pointer-events: none;
                    z-index: -1;
                }
            `;
            document.head.appendChild(styleSheet);

            createSidebarFooter(sidebar);
        }
    }

    function initializeSidebarToggle(sidebar) {
        if (!triggerZone || !document.body.contains(triggerZone)) {
            triggerZone = document.createElement('div');
            Object.assign(triggerZone.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '70px',
                height: '100vh',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                zIndex: '2001',
                pointerEvents: 'auto',
                transition: 'background-color 0.3s ease-in-out',
            });
            document.body.appendChild(triggerZone);
        }

        function updateTriggerZoneOpacity(distance) {
            let opacity = Math.max(0, (250 - distance) / 250);
            triggerZone.style.backgroundColor = `rgba(255, 255, 255, ${opacity * 0.3})`;
        }

        function handleMouseMove(e) {
            const leftEdgeDistance = e.clientX;

            let sidebarToggleButton = document.querySelector('#js-nav-burger') || document.querySelector('#menu-button');

            if (leftEdgeDistance < 70) {
                Object.assign(sidebar.style, {
                    transform: 'translateX(0)',
                    opacity: '1',
                    pointerEvents: 'auto'
                });
                triggerZone.style.display = "none";

                if (sidebarToggleButton && sidebarToggleButton.getAttribute('aria-expanded') === 'false') {
                    sidebarToggleButton.click();
                }
            } else if (leftEdgeDistance > 280) {
                Object.assign(sidebar.style, {
                    transform: 'translateX(-260px)',
                    opacity: '0',
                    pointerEvents: 'none'
                });
                triggerZone.style.display = "block";

                if (sidebarToggleButton && sidebarToggleButton.getAttribute('aria-expanded') === 'true') {
                    sidebarToggleButton.click();
                }
            }

            updateTriggerZoneOpacity(leftEdgeDistance);
        }

        document.addEventListener('mousemove', handleMouseMove);
    }

    function createSidebarFooter(sidebar) {
        const footer = document.createElement('div');
        footer.style.position = 'absolute';
        footer.style.bottom = '10px';
        footer.style.left = '15px';
        footer.style.fontSize = '9px';
        footer.style.color = 'rgba(255, 255, 255, 0.7)';
        footer.style.zIndex = '1000';

        const linkSensha = document.createElement('a');
        linkSensha.href = 'https://github.com/senshastic';
        linkSensha.innerText = 'SneshCorp. @1984. All rights reserved (to ';
        linkSensha.style.textDecoration = 'none';
        linkSensha.style.color = 'rgba(255, 255, 255, 0.7)';

        const linkFallenStar = document.createElement('a');
        linkFallenStar.href = 'https://github.com/senshastic';
        linkFallenStar.innerText = 'FallenStar';
        linkFallenStar.style.textDecoration = 'none';
        linkFallenStar.style.color = 'rgba(255, 255, 255, 0.7)';

        linkFallenStar.addEventListener('mouseenter', function() {
            linkFallenStar.href = 'https://github.com/FallenStar08';
        });

        linkFallenStar.addEventListener('mouseleave', function() {
            linkFallenStar.href = 'https://github.com/senshastic';
        });

        const endText = document.createTextNode(').');

        footer.appendChild(linkSensha);
        footer.appendChild(linkFallenStar);
        footer.appendChild(endText);

        sidebar.appendChild(footer);
    }

    function initializeSidebarObserver() {
        const observer = new MutationObserver(() => {
            let sidebar = document.querySelector('#js-nav-drawer') || document.querySelector('#content-nav');
            if (sidebar) {
                applySidebarStyles(sidebar);
                initializeSidebarToggle(sidebar);
                observer.disconnect();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    function initializeSidebar() {
        let sidebar = document.querySelector('#js-nav-drawer') || document.querySelector('#content-nav');

        if (sidebar) {
            applySidebarStyles(sidebar);
            initializeSidebarToggle(sidebar);
        } else {
            initializeSidebarObserver();
        }
    }

    function initializeSidebarToggleButtonListener() {
        document.addEventListener('click', (event) => {
            const sidebarToggleButtonOpen = event.target.matches('#js-nav-burger') || event.target.matches('#menu-button');

            if (sidebarToggleButtonOpen) {
                let sidebar = document.querySelector('#js-nav-drawer') || document.querySelector('#content-nav');
                if (sidebar) {
                    applySidebarStyles(sidebar);
                    initializeSidebarToggle(sidebar);
                }
            }
        });
    }

    initializeSidebar();
    initializeSidebarToggleButtonListener();
})();
