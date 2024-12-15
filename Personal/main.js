document.addEventListener("DOMContentLoaded", () => {
    // Toggle navigation menu for mobile view
    const logo = document.querySelector('.logo');
    const nav = document.querySelector('nav');
    
    logo.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Smooth scroll to sections
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(link.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Parallax effect for the home image
    const homeImg = document.querySelector('.home-img img');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        homeImg.style.transform = `translateY(${scrollY * 0.3}px)`;
    });

    // Add glowing effect to the button on hover
    const btnBox = document.querySelector('.btn-box');
    btnBox.addEventListener('mouseover', () => {
        btnBox.style.boxShadow = '0 0 50px #f7bf16';
    });
    btnBox.addEventListener('mouseout', () => {
        btnBox.style.boxShadow = '0 0 25px #f7bf16';
    });

    // Typing effect for the dynamic words
    const words = ["Front-End Web Developer", "Back-End Web Developer", "Web Designer", "Full-Stack Web Developer"];
    let wordIndex = 0;
    let charIndex = 0;
    const dynamicWords = document.querySelector('.text-content .words');

    function typeWord() {
        if (charIndex < words[wordIndex].length) {
            dynamicWords.textContent += words[wordIndex][charIndex];
            charIndex++;
            setTimeout(typeWord, 150);
        } else {
            setTimeout(deleteWord, 2000);
        }
    }

    function deleteWord() {
        if (charIndex > 0) {
            dynamicWords.textContent = words[wordIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(deleteWord, 100);
        } else {
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeWord, 500);
        }
    }

    typeWord();

    // Enhanced Scroll Animation and Nav Highlighting
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Set active nav link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });

                // Animate skill bars if in skills section
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }

                // Hide previous section and show current section
                sections.forEach(section => {
                    if (section !== entry.target) {
                        section.style.opacity = '0';
                        section.style.transform = 'translateY(50px)';
                    }
                });
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Set home as active on initial load
    window.addEventListener('load', () => {
        navLinks.forEach(link => link.classList.remove('active'));
        const homeLink = document.querySelector('nav a[href="#home"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        section.style.opacity = '0'; // Start hidden
    });

    // Skill Bars Animation
    function animateSkillBars() {
        const skillFills = document.querySelectorAll('.skill-fill');
        skillFills.forEach(fill => {
            const targetWidth = fill.textContent;
            fill.style.width = '0%';
            
            setTimeout(() => {
                fill.style.width = targetWidth;
            }, 200);
        });
    }

    // Reset skill bars when out of view
    const skillsSection = document.querySelector('#skills');
    const resetObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                const skillFills = document.querySelectorAll('.skill-fill');
                skillFills.forEach(fill => {
                    fill.style.width = '0%';
                });
            }
        });
    }, { threshold: 0 });

    if (skillsSection) {
        resetObserver.observe(skillsSection);
    }

    // Social icons animation
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach((icon) => {
        icon.addEventListener('mouseover', () => {
            icon.style.transform = 'translateY(-10px) scale(1.5)';
        });

        icon.addEventListener('mouseout', () => {
            icon.style.transform = 'translateY(0) scale(1)';
        });
    });
    

    // Random glowing background effect
    const body = document.body;
    function randomBackgroundGlow() {
        const colors = ['#f7bf16', '#ff5733', '#33ff57', '#3357ff', '#a733ff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        body.style.boxShadow = `0 0 100px ${randomColor}`;
        setTimeout(randomBackgroundGlow, 2000);
    }
    randomBackgroundGlow();
    
});