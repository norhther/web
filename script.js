document.addEventListener('DOMContentLoaded', function () {
    // Array with texts to type in the typewriter
    var dataText = ["Senior Data Scientist", "GenAI Specialist", "ML Engineer", "AI Developer"];

    // Type one text in the typewriter, keeps calling itself until the text is finished
    function typeWriter(text, i, fnCallback) {
        if (i === 0) {
            document.querySelector("#typing").innerHTML = "&nbsp;";
        }

        if (i <= text.length) {
            document.querySelector("#typing").innerHTML = text.substring(0, i) || "&nbsp;";
            setTimeout(function () {
                typeWriter(text, i + 1, fnCallback);
            }, 100);
        } else if (typeof fnCallback === 'function') {
            setTimeout(fnCallback, 500); // Pause after finishing typing
        }
    }

    // Delete one text in the typewriter effect
    function deleteWriter(text, i, fnCallback) {
        if (i === 0) {
            document.querySelector("#typing").innerHTML = "&nbsp;";
        }

        if (i >= 0) {
            document.querySelector("#typing").innerHTML = text.substring(0, i) || "&nbsp;";
            setTimeout(function () {
                deleteWriter(text, i - 1, fnCallback);
            }, 50);
        } else if (typeof fnCallback === 'function') {
            if (fnCallback) fnCallback();
        }
    }

    // Start a typewriter animation for a text in the dataText array
    function startTextAnimation(i) {
        if (typeof dataText[i] === 'undefined') {
            // Restart the array after finishing all texts
            setTimeout(function () {
                startTextAnimation(0);
            }, 2000);
        } else {
            // Type the current text
            typeWriter(dataText[i], 0, function () {
                // After typing, wait and then delete the text
                setTimeout(function () {
                    deleteWriter(dataText[i], dataText[i].length, function () {
                        // After deletion and a one-second pause, move to the next text
                        setTimeout(function () {
                            startTextAnimation(i + 1);
                        }, 800); // 1-second pause before starting the next phrase
                    });
                }, 1500); // Wait longer before starting deletion after typing finishes
            });
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            // Compatibility for both #research and #projects if needed
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Start the text animation
    document.querySelector("#typing").innerHTML = "&nbsp;";
    setTimeout(function () {
        startTextAnimation(0);
    }, 800);

});
