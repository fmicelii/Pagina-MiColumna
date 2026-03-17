/* ============================================
   MICOLUMNA — JAVASCRIPT
   Menú hamburguesa, dropdowns mobile,
   navbar scroll, validación formulario
   ============================================ */

(function () {
  'use strict';

  /* ---------- NAVBAR SCROLL ---------- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* ---------- HAMBURGER MENU ---------- */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- DROPDOWNS MOBILE ---------- */
  const dropdownItems = document.querySelectorAll('.navbar__item--dropdown');
  dropdownItems.forEach((item) => {
    const trigger = item.querySelector('.navbar__link--drop');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        // Solo en mobile (menu visible por class)
        if (window.innerWidth <= 768) {
          e.preventDefault();
          item.classList.toggle('open');
        }
      });
    }
  });

  /* ---------- CERRAR MENÚ AL ELEGIR LINK ---------- */
  const navLinks = document.querySelectorAll('.navbar__dropdown a, .navbar__list > li > a:not(.navbar__link--drop)');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu) navMenu.classList.remove('open');
      if (hamburger) {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
      document.body.style.overflow = '';
    });
  });

  /* ---------- CONTACT FORM VALIDATION ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      // Limpiar errores previos
      contactForm.querySelectorAll('.field-error').forEach(el => el.remove());
      contactForm.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

      const required = contactForm.querySelectorAll('[required]');
      required.forEach((field) => {
        if (!field.value.trim()) {
          valid = false;
          field.classList.add('input-error');
          const msg = document.createElement('span');
          msg.className = 'field-error';
          msg.textContent = 'Este campo es obligatorio.';
          field.parentNode.appendChild(msg);
        }
      });

      // Validar email si fue completado
      const emailField = contactForm.querySelector('#email');
      if (emailField && emailField.value.trim()) {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(emailField.value.trim())) {
          valid = false;
          emailField.classList.add('input-error');
          const msg = document.createElement('span');
          msg.className = 'field-error';
          msg.textContent = 'Ingresá un email válido.';
          emailField.parentNode.appendChild(msg);
        }
      }

      if (valid) {
        // Construir mensaje de WhatsApp como alternativa de envío
        const nombre = contactForm.querySelector('#nombre')?.value || '';
        const telefono = contactForm.querySelector('#telefono')?.value || '';
        const especialidad = contactForm.querySelector('#especialidad')?.value || '';
        const motivo = contactForm.querySelector('#motivo')?.value || '';
        const mensaje = contactForm.querySelector('#mensaje')?.value || '';
        const interior = contactForm.querySelector('#interior')?.checked ? ' (Paciente del interior)' : '';

        const text = `Hola, me comunico desde el formulario del sitio web.\nNombre: ${nombre}\nTeléfono: ${telefono}\nEspecialidad: ${especialidad}\nMotivo: ${motivo}${interior}\nMensaje: ${mensaje}`;

        // Mostrar mensaje de éxito
        showFormSuccess(contactForm);

        // Opción: abrir WhatsApp con los datos precargados
        const waUrl = `https://wa.me/5491166563212?text=${encodeURIComponent(text)}`;
        setTimeout(() => {
          window.open(waUrl, '_blank', 'noopener,noreferrer');
        }, 1500);
      }
    });
  }

  function showFormSuccess(form) {
    const success = document.createElement('div');
    success.className = 'form-success';
    success.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
      <h3>¡Mensaje enviado!</h3>
      <p>Te vamos a redirigir a WhatsApp para confirmar tu consulta. Te respondemos dentro de las próximas 24 horas hábiles.</p>
    `;
    form.style.display = 'none';
    form.parentNode.insertBefore(success, form);
  }

  /* ---------- ADD FORM ERROR STYLES ---------- */
  const style = document.createElement('style');
  style.textContent = `
    .input-error {
      border-color: #e53e3e !important;
      box-shadow: 0 0 0 3px rgba(229,62,62,.15) !important;
    }
    .field-error {
      color: #e53e3e;
      font-size: .78rem;
      margin-top: .15rem;
    }
    .form-success {
      text-align: center;
      padding: 3rem 2rem;
      background: #fff;
      border-radius: 12px;
      border: 1px solid #dce5f0;
      box-shadow: 0 4px 24px rgba(27,79,138,.10);
    }
    .form-success svg { color: #2E9E6B; margin: 0 auto 1rem; }
    .form-success h3 { font-size: 1.4rem; color: #133a6a; margin-bottom: .5rem; }
    .form-success p { color: #5a6a7e; font-size: .95rem; }
  `;
  document.head.appendChild(style);

  /* ---------- SMOOTH ANCHOR SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
