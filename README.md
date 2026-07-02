# SIGMA Droning — strona firmowa

Statyczna, jednostronicowa strona (HTML/CSS/JS, bez zależności i bez builda) zaimplementowana według handoffu `../README.md` i referencji `../SIGMA Droning.dc.html`.

## Pliki
- `index.html` — struktura strony (nav, hero, trust strip, usługi, realizacje, dlaczego SIGMA, jak to działa, wycena + kontakt, stopka)
- `styles.css` — style; wszystkie tokeny projektu jako zmienne CSS w `:root` (akcent `--accent`, promienie `--radius` itd.)
- `main.js` — menu mobilne (breakpoint 860px) + walidacja i wysyłka formularza wyceny

## Uruchomienie lokalne
Dowolny serwer statyczny, np.:

```sh
npx serve site
```

## Wysyłka formularza na e-mail — ZROBIONE ✓
`FORM_ENDPOINT` w `main.js` jest już ustawiony na `https://formspree.io/f/mojopdjq` — zapytania
z formularza trafiają na **igor_socha@yahoo.com** przez [Formspree](https://formspree.io).
Test GET na endpoint zwraca `405 Method Not Allowed` (strona Formspree, nie 404) — formularz
jest zarejestrowany; jedyny sposób na 100% pewność to wysłać testowe zgłoszenie i sprawdzić
skrzynkę. Jeśli klient poda e-mail w polu kontaktu, ustawiany jest jako *reply-to*, więc
odpowiadasz jednym kliknięciem. Formularz ma też ukryty honeypot (`_gotcha`) ograniczający spam.

Gdyby trzeba było kiedyś podmienić formularz na inny endpoint:

```js
var FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxxx';
```

**Dopóki `FORM_ENDPOINT` jest pusty**, formularz działa awaryjnie przez `mailto` — dziś to
nieaktualne, bo endpoint jest ustawiony.

**Dopóki `FORM_ENDPOINT` jest pusty**, formularz działa awaryjnie przez `mailto` (otwiera
program pocztowy odwiedzającego z gotową treścią) — to działa tylko, gdy ma skonfigurowaną
pocztę, dlatego docelowo ustaw Formspree.

> Alternatywy zamiast Formspree (ta sama zasada — wklejasz endpoint/klucz do `FORM_ENDPOINT`):
> [Web3Forms](https://web3forms.com) lub [FormSubmit](https://formsubmit.co).

## Podmiana placeholderów
- **Hero**: element `.media-hero` — docelowo wideo/zdjęcie z drona (reel 4K, proporcje 4:3)
- **Galeria**: 6 elementów `.media-gallery` w sekcji `#realizacje` — realne kadry klienta
- Emoji-ikony (🏡 🏗️ 📣 📞 ✉️) można podmienić na SVG (np. Lucide), zachowując kwadratowe tło `#e7f1fc`

## Wdrożenie
Folder `site/` można wrzucić bezpośrednio na dowolny hosting statyczny (Netlify, Cloudflare Pages, GitHub Pages, home.pl itp.) — brak kroków budowania.
