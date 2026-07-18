document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const toggleIcon = themeToggleBtn.querySelector("i");
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    // light and dark mode
    if (document.body.classList.contains("light-mode")) {
      toggleIcon.classList.remove("fa-sun");
      toggleIcon.classList.add("fa-moon");
    } else {
      toggleIcon.classList.remove("fa-moon");
      toggleIcon.classList.add("fa-sun");
    }
  });
  const words = ["Full-Stack Web Developer.", "Computer Science Student."];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingTarget = document.getElementById("typing-text");

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingTarget.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingTarget.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }
    let typeSpeed = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }
    setTimeout(typeEffect, typeSpeed);
  }
  if (typingTarget) typeEffect();
  const sectionsToAnimate = document.querySelectorAll(
    ".education-card, .certifications-card, .skills-card, .deployed-card, .project-card",
  );
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };
  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  sectionsToAnimate.forEach((section) => {
    section.classList.add("hide-initial");
    sectionObserver.observe(section);
  });
});
