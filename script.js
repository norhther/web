document.addEventListener('DOMContentLoaded', function () {
    // Array with texts to type in the typewriter
    var dataText = ["Senior Data Scientist", "GenAI Specialist", "ML Engineer", "AI Developer"];

    // Typewriter Effect
    const typingElement = document.querySelector("#typing");
    const cursor = document.createElement('span');
    cursor.className = 'blinking-cursor';
    cursor.innerHTML = '|';

    // Ensure properly placed: remove existing, add span for text + cursor
    if (typingElement) {
        typingElement.innerHTML = '&nbsp;'; // Initialize with non-breaking space
        typingElement.parentNode.insertBefore(cursor, typingElement.nextSibling);
    }

    function typeWriter(text, i, fnCallback) {
        if (!typingElement) return;
        if (i < text.length) {
            typingElement.textContent = text.substring(0, i + 1);
            setTimeout(() => typeWriter(text, i + 1, fnCallback), 100);
        } else if (typeof fnCallback === 'function') {
            setTimeout(fnCallback, 700);
        }
    }

    function deleteWriter(text, i, fnCallback) {
        if (!typingElement) return;
        if (i >= 0) {
            // If empty, set to non-breaking space to hold height
            const newText = text.substring(0, i);
            typingElement.innerHTML = newText.length > 0 ? newText : '&nbsp;';
            setTimeout(() => deleteWriter(text, i - 1, fnCallback), 50);
        } else if (typeof fnCallback === 'function') {
            fnCallback();
        }
    }

    function startTextAnimation(i) {
        if (typeof dataText[i] === 'undefined') {
            setTimeout(() => startTextAnimation(0), 500);
        } else {
            typeWriter(dataText[i], 0, () => {
                setTimeout(() => {
                    deleteWriter(dataText[i], dataText[i].length, () => {
                        startTextAnimation(i + 1);
                    });
                }, 1000);
            });
        }
    }

    // Initialize Typewriter
    const typeElement = document.querySelector("#typing");
    if (typeElement) {
        startTextAnimation(0);
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Animation Observer (Resilient)
    // Only add 'hidden' class if JS is running
    const animatedSections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.1
    });

    animatedSections.forEach((el) => {
        el.classList.add('hidden'); // Add hidden class via JS
        observer.observe(el);
    });

});
