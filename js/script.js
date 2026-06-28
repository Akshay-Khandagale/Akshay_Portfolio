/* =========================================================================
   MOBILE MENU & NAVIGATION
   ========================================================================= */
   const navMenu = document.getElementById('nav-menu');
   const navToggle = document.getElementById('nav-toggle');
   const navClose = document.getElementById('nav-close');
   
   // Open menu
   if (navToggle) {
       navToggle.addEventListener('click', () => {
           navMenu.classList.add('show-menu');
       });
   }
   
   // Close menu
   if (navClose) {
       navClose.addEventListener('click', () => {
           navMenu.classList.remove('show-menu');
       });
   }
   
   // Close menu when a nav link is clicked
   const navLinks = document.querySelectorAll('.nav-link');
   navLinks.forEach(link => {
       link.addEventListener('click', () => {
           navMenu.classList.remove('show-menu');
       });
   });
   
   /* =========================================================================
      SCROLL HEADER & SCROLL UP BUTTON
      ========================================================================= */
   const header = document.querySelector('.header');
   const scrollUpBtn = document.getElementById('scroll-up');
   
   window.addEventListener('scroll', () => {
       // Header background change
       if (window.scrollY >= 50) {
           header.classList.add('scroll-header');
       } else {
           header.classList.remove('scroll-header');
       }
   
       // Show scroll up button
       if (window.scrollY >= 350) {
           scrollUpBtn.classList.add('show-scroll');
       } else {
           scrollUpBtn.classList.remove('show-scroll');
       }
   });
   
   /* =========================================================================
      SCROLL SECTION ACTIVE LINK
      ========================================================================= */
   const sections = document.querySelectorAll('section[id]');
   
   const scrollActive = () => {
       const scrollY = window.scrollY;
   
       sections.forEach(current => {
           const sectionHeight = current.offsetHeight;
           const sectionTop = current.offsetTop - 100;
           const sectionId = current.getAttribute('id');
           const sectionsClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
   
           if(sectionsClass) {
               if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                   sectionsClass.classList.add('active');
               } else {
                   sectionsClass.classList.remove('active');
               }
           }
       });
   };
   
   window.addEventListener('scroll', scrollActive);
   
   /* =========================================================================
      TYPING ANIMATION
      ========================================================================= */
   const typingText = document.querySelector('.typing-text');
   const phrases = ["Full Stack PHP Developer", "Laravel & CodeIgniter Expert", "Web Application Builder"];
   let phraseIndex = 0;
   let charIndex = 0;
   let isDeleting = false;
   
   function typeWords() {
       const currentPhrase = phrases[phraseIndex];
       
       if (isDeleting) {
           typingText.textContent = currentPhrase.substring(0, charIndex - 1);
           charIndex--;
       } else {
           typingText.textContent = currentPhrase.substring(0, charIndex + 1);
           charIndex++;
       }
   
       let typeSpeed = 100;
   
       if (isDeleting) {
           typeSpeed /= 2;
       }
   
       if (!isDeleting && charIndex === currentPhrase.length) {
           typeSpeed = 2000; // Pause at end of word
           isDeleting = true;
       } else if (isDeleting && charIndex === 0) {
           isDeleting = false;
           phraseIndex = (phraseIndex + 1) % phrases.length;
           typeSpeed = 500; // Pause before new word starts
       }
   
       setTimeout(typeWords, typeSpeed);
   }
   
   // Start typing effect if element exists
   if(typingText) {
       document.addEventListener("DOMContentLoaded", () => {
           setTimeout(typeWords, 1000);
       });
   }
   
   /* =========================================================================
      SCROLL FADE-IN ANIMATION (Intersection Observer)
      ========================================================================= */
   const faders = document.querySelectorAll('.fade-in');
   
   const appearOptions = {
       threshold: 0.15,
       rootMargin: "0px 0px -50px 0px"
   };
   
   const appearOnScroll = new IntersectionObserver(function(entries, observer) {
       entries.forEach(entry => {
           if (!entry.isIntersecting) {
               return;
           } else {
               entry.target.classList.add('appear');
               observer.unobserve(entry.target);
               
               // If the target has animated counters, trigger them
               const counters = entry.target.querySelectorAll('.info-title');
               if (counters.length > 0) {
                   counters.forEach(counter => {
                       const updateCount = () => {
                           const target = +counter.getAttribute('data-target');
                           const count = +counter.innerText;
                           const speed = 200; // Lower is faster
                           const inc = target / speed;
   
                           if (count < target) {
                               counter.innerText = Math.ceil(count + inc);
                               setTimeout(updateCount, 20);
                           } else {
                               counter.innerText = target + (target > 5 ? "+" : ""); // Add '+' for effect
                           }
                       };
                       updateCount();
                   });
               }
           }
       });
   }, appearOptions);
   
   faders.forEach(fader => {
       appearOnScroll.observe(fader);
   });
   
   /* =========================================================================
      CONTACT FORM VALIDATION (Frontend Only)
      ========================================================================= */
   const contactForm = document.getElementById('contact-form');
   const formMessage = document.getElementById('form-message');
   
   if(contactForm) {
       contactForm.addEventListener('submit', function(e) {
           e.preventDefault();
           
           // Basic validation fields
           const name = document.getElementById('name').value.trim();
           const email = document.getElementById('email').value.trim();
           const subject = document.getElementById('subject').value.trim();
           const message = document.getElementById('message').value.trim();
   
           if(name === '' || email === '' || message === '') {
               formMessage.textContent = 'Please fill out all required fields.';
               formMessage.className = 'form-message error';
               return;
           }
           
           // Simple email pattern check
           const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
           if (!email.match(emailPattern)) {
               formMessage.textContent = 'Please enter a valid email address.';
               formMessage.className = 'form-message error';
               return;
           }
   
           // Success state simulation
           formMessage.textContent = 'Message sent successfully! (Demo)';
           formMessage.className = 'form-message success';
           contactForm.reset();
           
           setTimeout(() => {
               formMessage.textContent = '';
           }, 5000);
       });
   }
