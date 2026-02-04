
import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  setupScrollAnimations();
  setupModal();
});

function setupTabs() {
  const tabs = document.querySelectorAll('.depth-tab');
  const contents = document.querySelectorAll('.depth-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and contents
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      // Add active class to clicked tab
      tab.classList.add('active');

      // Find and activate corresponding content
      const targetId = tab.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

function setupScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: Stop observing once visible if we don't want it to toggle
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll('.section, .hero-content');
  sections.forEach(section => {
    section.classList.add('section'); // Ensure they have base class if missed
    observer.observe(section);
  });
}

function setupModal() {
  const modal = document.getElementById('early-access-modal');
  const closeBtn = document.querySelector('.modal-close');
  const reaForm = document.getElementById('rea-form');
  const reaEmail = document.getElementById('rea-email');
  const reaMessage = document.getElementById('rea-message');

  // Open Modal
  // Assuming "Request early access" buttons trigger this.
  // We'll target the Hero button specifically, but can be generic if needed.
  const openBtns = document.querySelectorAll('.btn-primary');
  openBtns.forEach(btn => {
    if (btn.textContent.includes('Request early access') || btn.textContent.includes('Start your journey free')) {
      btn.addEventListener('click', (e) => {
        // Prevent default if it's inside a form or anchor? It's a button.
        modal.classList.remove('hidden');
      });
    }
  });

  // Close Modal
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    resetForm();
  });

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      resetForm();
    }
  });

  // Form Submit
  reaForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = reaEmail.value;

    if (!email) return;

    // Loading state could be added here

    try {
      const { data, error } = await supabase
        .from('rea_users')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique violation
          showMessage('You are already on the list!', 'error');
        } else {
          console.error('Supabase error:', error);
          showMessage('Something went wrong. Please try again.', 'error');
        }
      } else {
        showMessage('You have been added to the waitlist!', 'success');
        reaForm.reset();
        setTimeout(() => {
          modal.classList.add('hidden');
          resetForm();
        }, 2000);
      }
    } catch (err) {
      console.error('Request error:', err);
      showMessage('Network error. Please try again.', 'error');
    }
  });

  function showMessage(text, type) {
    reaMessage.textContent = text;
    reaMessage.className = `message ${type}`;
    reaMessage.classList.remove('hidden');
  }

  function resetForm() {
    reaMessage.classList.add('hidden');
    reaMessage.textContent = '';
    reaForm.reset();
  }
}
