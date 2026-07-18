document.addEventListener("DOMContentLoaded", () => {
  // --- FEATURE 1: DYNAMIC TYPING EFFECT ---
  // --- FEATURE 3: DARK / LIGHT MODE TOGGLE ---
  const themeToggleBtn = document.getElementById("theme-toggle");
  const toggleIcon = themeToggleBtn.querySelector("i");

  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    // Swap icon between Sun and Moon
    if (document.body.classList.contains("light-mode")) {
      toggleIcon.classList.remove("fa-sun");
      toggleIcon.classList.add("fa-moon");
    } else {
      toggleIcon.classList.remove("fa-moon");
      toggleIcon.classList.add("fa-sun");
    }
  });
  const words = [
    "Full-Stack Web Developer.",
    "Computer Science Student.",
    "Problem Solver.",
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingTarget = document.getElementById("typing-text");

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      // Remove character
      typingTarget.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Add character
      typingTarget.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    // Speed control
    let typeSpeed = isDeleting ? 50 : 100;

    // Logic switches
    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at the end of a word
      typeSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      // Move to next word
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  // Start typing if target element exists
  if (typingTarget) typeEffect();

  // --- FEATURE 2: SCROLL COMPONENT FADE-IN (Intersection Observer) ---
  const sectionsToAnimate = document.querySelectorAll(
    ".education-card, .certifications-card, .skills-card, .deployed-card, .project-card",
  );

  const observerOptions = {
    root: null,
    threshold: 0.1, // Trigger when 10% of the card is visible
    rootMargin: "0px 0px -50px 0px",
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target); // Stop tracking once animated
      }
    });
  }, observerOptions);

  sectionsToAnimate.forEach((section) => {
    section.classList.add("hide-initial"); // Add starting hidden state
    sectionObserver.observe(section);
  });
});
