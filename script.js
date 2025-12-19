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
    // Smooth scrolling with Active Link update
    const navLinks = document.querySelectorAll('.navbar a');
    let isManualScrolling = false;
    let scrollTimeout;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;

            e.preventDefault();

            // Set manual scrolling flag
            isManualScrolling = true;
            clearTimeout(scrollTimeout);
            // Re-enable auto-detection after 1 second (enough for smooth scroll)
            scrollTimeout = setTimeout(() => {
                isManualScrolling = false;
            }, 1000);

            // Explicitly handle Home to go to top
            if (targetId === "#home") {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Offset for fixed navbar
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }

            // Manually set active class on click for immediate feedback
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Active Link Highlighter on Scroll
    const sections = document.querySelectorAll('section, header');

    function highlightNavigation() {
        if (isManualScrolling) return;

        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.body.offsetHeight;

        // 1. Bottom of page check (Priority)
        // If we are very close to the bottom, force the last section (Contact)
        if (scrollPosition + windowHeight >= docHeight - 50) {
            navLinks.forEach(link => link.classList.remove('active'));
            const contactLink = document.querySelector('.navbar a[href="#contact"]');
            if (contactLink) contactLink.classList.add('active');
            return;
        }

        // 2. Center-screen check
        // Find the section that occupies the middle of the viewport
        const middleOfViewport = scrollPosition + (windowHeight / 2);

        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                sectionTop <= middleOfViewport &&
                (sectionTop + sectionHeight) > middleOfViewport
            ) {
                current = section.getAttribute('id');
            }
        });

        if (current) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.navbar a[href="#${current}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }

    // Run on scroll
    window.addEventListener('scroll', highlightNavigation);
    // Run once on load to set initial state
    highlightNavigation();

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
