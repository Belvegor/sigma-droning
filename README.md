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

## Wysyłka formularza na e-mail — OSTATNI KROK (2 min)
Zapytania mają trafiać na **igor_socha@yahoo.com**. Żeby maile docierały automatycznie
(bez własnego serwera), formularz korzysta z [Formspree](https://formspree.io) — darmowe,
działa z Yahoo. Trzeba jednorazowo założyć formularz i wkleić jego identyfikator:

1. Wejdź na https://formspree.io i załóż darmowe konto.
2. **New form** → jako adres docelowy podaj `igor_socha@yahoo.com`.
3. Potwierdź adres klikając link w mailu od Formspree (przyjdzie na Yahoo).
4. Formspree pokaże endpoint: `https://formspree.io/f/xxxxxxxx`.
5. Otwórz `site/main.js` i wklej go na górze:

```js
var FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxxx';
```

Gotowe — od tej chwili każde wysłane zapytanie przychodzi mailem na igor_socha@yahoo.com.
Jeśli klient poda e-mail w polu kontaktu, ustawiany jest jako *reply-to*, więc odpowiadasz
jednym kliknięciem. Formularz ma też ukryty honeypot (`_gotcha`) ograniczający spam.

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
