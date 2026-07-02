/* SIGMA Droning — nawigacja mobilna + formularz wyceny */
(function () {
  'use strict';

  /* =====================================================================
     KONFIGURACJA WYSYŁKI FORMULARZA
     ---------------------------------------------------------------------
     Aby zapytania trafiały na e-mail, wklej poniżej endpoint z Formspree.
     Krok po kroku:
       1. Wejdź na https://formspree.io i załóż darmowe konto.
       2. Kliknij "New form", jako adres docelowy podaj: igor_socha@yahoo.com
       3. Potwierdź adres w mailu, który przyjdzie z Formspree.
       4. Formspree pokaże endpoint w formacie:  https://formspree.io/f/xxxxxxxx
       5. Skopiuj go i wklej poniżej w FORM_ENDPOINT (zamiast pustego stringa).
     Dopóki FORM_ENDPOINT jest pusty, formularz działa awaryjnie przez mailto
     (otwiera program pocztowy z gotową treścią) — ale to wymaga skonfigurowanej
     poczty u odwiedzającego, więc docelowo ustaw Formspree.
     ===================================================================== */
  var FORM_ENDPOINT = 'https://formspree.io/f/mojopdjq'; // np. 'https://formspree.io/f/xxxxxxxx'
  var TARGET_EMAIL = 'igor_socha@yahoo.com';

  /* ===== menu mobilne ===== */
  var toggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('mobile-menu');

  function closeMenu() {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    var open = menu.hidden;
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 860) closeMenu();
  });

  /* ===== formularz wyceny ===== */
  var form = document.getElementById('quote-form');
  var success = document.getElementById('form-success');
  var resetBtn = document.getElementById('form-reset');
  var submitBtn = form.querySelector('.btn-submit');
  var disclaimer = form.querySelector('.form-disclaimer');

  var nameInput = document.getElementById('f-name');
  var contactInput = document.getElementById('f-contact');
  var errName = document.getElementById('err-name');
  var errContact = document.getElementById('err-contact');

  var touched = false;

  function validate() {
    var nameOk = nameInput.value.trim().length > 0;
    var contactOk = contactInput.value.trim().length > 0;
    if (touched) {
      errName.hidden = nameOk;
      errContact.hidden = contactOk;
    }
    return nameOk && contactOk;
  }

  nameInput.addEventListener('input', validate);
  contactInput.addEventListener('input', validate);

  function showSuccess() {
    form.hidden = true;
    success.hidden = false;
  }

  function showSendError() {
    disclaimer.textContent =
      'Nie udało się wysłać formularza. Napisz bezpośrednio na ' + TARGET_EMAIL +
      ' lub zadzwoń: +48 509 642 366.';
    disclaimer.style.color = '#d84a4a';
  }

  function collect() {
    return {
      name: nameInput.value.trim(),
      contact: contactInput.value.trim(),
      service: document.getElementById('f-service').value,
      location: document.getElementById('f-location').value.trim(),
      message: document.getElementById('f-message').value.trim(),
    };
  }

  function looksLikeEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  /* Wysyłka przez Formspree (JSON). Odpowiedź trafi na TARGET_EMAIL,
     a jako reply-to ustawiamy kontakt klienta, jeśli podał e-mail. */
  function sendViaFormspree(data) {
    var payload = {
      name: data.name,
      contact: data.contact,
      service: data.service,
      location: data.location || '—',
      message: data.message || '—',
      _subject: 'Zapytanie o wycenę — ' + data.service + ' (' + data.name + ')',
    };
    if (looksLikeEmail(data.contact)) payload.email = data.contact;

    return fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
    });
  }

  /* Fallback bez backendu — otwiera program pocztowy z gotową treścią. */
  function sendViaMailto(data) {
    var body =
      'Imię i nazwisko: ' + data.name + '\n' +
      'Kontakt: ' + data.contact + '\n' +
      'Rodzaj usługi: ' + data.service + '\n' +
      'Lokalizacja: ' + (data.location || '—') + '\n\n' +
      'Opis projektu:\n' + (data.message || '—');
    window.location.href =
      'mailto:' + TARGET_EMAIL +
      '?subject=' + encodeURIComponent('Zapytanie o wycenę — ' + data.service) +
      '&body=' + encodeURIComponent(body);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    touched = true;
    if (!validate()) return;

    var data = collect();

    if (FORM_ENDPOINT) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wysyłam…';
      sendViaFormspree(data)
        .then(showSuccess)
        .catch(showSendError)
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Wyślij zapytanie o wycenę';
        });
    } else {
      // brak endpointu: awaryjnie mailto
      sendViaMailto(data);
      showSuccess();
    }
  });

  resetBtn.addEventListener('click', function () {
    form.reset();
    touched = false;
    errName.hidden = true;
    errContact.hidden = true;
    success.hidden = true;
    form.hidden = false;
    disclaimer.textContent = 'Wysyłając formularz akceptujesz kontakt w sprawie wyceny.';
    disclaimer.style.color = '';
  });
})();
