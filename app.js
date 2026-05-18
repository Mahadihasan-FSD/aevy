import { db } from './firebase-config.js';
import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

function showPopup(message, type = "success") {

  const popup = document.createElement("div");

  popup.className = `popup ${type}`;

  popup.innerHTML = `
    <div class="popup-content">

      <span class="popup-icon">
        ${type === "success" ? "✓" : "✕"}
      </span>

      <div class="popup-text">

        <h3>
          ${type === "success"
            ? "Message Delivered"
            : "Delivery Failed"}
        </h3>

        <p>${message}</p>

      </div>

    </div>
  `;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add("show");
  }, 10);

  setTimeout(() => {

    popup.classList.remove("show");

    setTimeout(() => {
      popup.remove();
    }, 400);

  }, 4000);
}

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('contactForm');

  if (!form) return;

  form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const submitBtn = form.querySelector('button');
    const originalText = submitBtn.textContent;

    if (!email || !message) {

      showPopup(
        "Please fill in all required fields.",
        "error"
      );

      return;
    }

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {

      await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          message
        })
      });

      showPopup(
        "Your message has been sent successfully. Our team will contact you shortly."
      );

      form.reset();

    } catch (err) {

      showPopup(
        "Something went wrong. Please try again later.",
        "error"
      );

    } finally {

      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

    }

  });

});

if (typeof lucide !== 'undefined' && lucide.createIcons) {
  lucide.createIcons();
}

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = matchMedia('(pointer: coarse)').matches;

const sections = document.querySelectorAll('.cinema-section');
const cards = document.querySelectorAll('.card');
const revealElements = document.querySelectorAll('.reveal');

const sectionObserver = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }

  });

}, {
  threshold: 0.2,
  rootMargin: '0px 0px -10% 0px'
});

sections.forEach(section => sectionObserver.observe(section));

const cardObserver = new IntersectionObserver((entries) => {

  entries.forEach(e => {

    if (e.isIntersecting)
      e.target.classList.add('in-view');

  });

}, {
  threshold: 0.2,
  rootMargin: '0px 0px -5% 0px'
});

cards.forEach(card => cardObserver.observe(card));

revealElements.forEach(el => {

  const obs = new IntersectionObserver((entries) => {

    entries.forEach(e => {

      if (e.isIntersecting)
        e.target.classList.add('show');

    });

  }, {
    threshold: 0.15
  });

  obs.observe(el);

});

if (!prefersReduced) {

  const heroBg = document.getElementById('heroBg');

  const fogEls = [
    document.getElementById('fog1'),
    document.getElementById('fog2'),
    document.getElementById('fog3')
  ];

  let mouse = {
    x: 0.5,
    y: 0.5
  };

  let ticking = false;

  const updateParallax = () => {

    const y = window.scrollY;

    const h = window.innerHeight;

    const progress = Math.min(
      1,
      y / (document.body.scrollHeight - h)
    );

    if (heroBg)
      heroBg.style.transform =
        `translate3d(0, ${y * 0.05}px, 0)
         scale(${1 + progress * 0.02})`;

    fogEls.forEach((fog, i) => {

      if (fog) {

        const dx =
          (mouse.x - 0.5) * 28 * (i + 1) * 0.6;

        const dy =
          (mouse.y - 0.5) * 22 +
          y * (0.03 + i * 0.008);

        fog.style.transform =
          `translate3d(${dx}px, ${dy}px, 0)`;

        fog.style.opacity = 0.28;

      }

    });

    ticking = false;

  };

  window.addEventListener('scroll', () => {

    if (!ticking) {

      ticking = true;

      requestAnimationFrame(updateParallax);

    }

  }, {
    passive: true
  });

  window.addEventListener('mousemove', (e) => {

    if (!isTouch) {

      mouse.x = e.clientX / innerWidth;
      mouse.y = e.clientY / innerHeight;

      updateParallax();

    }

  });

  updateParallax();

} else {

  document.querySelectorAll(
    '.cinema-section, .card, .reveal'
  ).forEach(el => {

    el.classList.add(
      'revealed',
      'in-view',
      'show'
    );

  });

}

const splitTitle = (el) => {

  if (!el) return;

  const text = el.textContent.trim();

  el.innerHTML =
    `<span class="split-line">
       <span>${text}</span>
     </span>`;

};

splitTitle(document.getElementById('heroTitle'));

const contactForm = document.querySelector('.newsletter-form');

if (contactForm) {

  contactForm.addEventListener('submit', () => {

    const btn = contactForm.querySelector('button');

    btn.innerHTML = 'Sending...';

    btn.disabled = true;

  });

}
