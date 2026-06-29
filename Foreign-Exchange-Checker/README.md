# Frontend Mentor - FX Checker solution

This is a solution to the [FX Checker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/foreign-exchange-currency-converter). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [AI Collaboration](#ai-collaboration)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users are able to:

#### Converter
- Enter an amount to send and see it convert in real time as they type.
- Pick "send" and "receive" currencies from a searchable currency picker.
- See the live exchange rate for the active pair (e.g., `1 USD = 0.8530 EUR`).
- Swap the send and receive currencies with the click of a button.
- Toggle favorites for the active pair and log explicit conversions to their history.

#### Currency picker
- Search the full list of available currencies by code or name.
- Render dynamic layouts separating "Popular" from "Other currencies" using clear flag assets.

#### Live markets ticker
- View a scrolling ticker of popular currency pairs featuring dynamic rate feeds.

#### Rate history
- View an interactive data chart mapping changes across multi-interval historical timelines (1D to 5Y).

#### Compare
- Run multi-currency matrix scans showing what a base amount is worth across 8 target currencies simultaneously using automated API calculations.

#### Favorites
- Pin or unpin target pairs via a centralized tracking array (`favoritesDataMock`) across multiple panels seamlessly.

#### Conversion log
- Append precise snapshots of active calculations directly to a chronological timeline queue.
- Clear the log registry completely or target single instances for removal.

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [solution URL](https://your-solution-url.com)
- Live Site URL: [live site URL](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS Custom Properties & Grid/Flexbox layouts
- Mobile-first responsive workflow
- Vanilla JavaScript (ES6+)
- Asynchronous API Stream handling
- Frankfurter API Engine integration

### What I learned

This challenge reinforced clean DOM state management, asynchronous sequencing, and the importance of precise element selections. Key breakthroughs included:

1. **Defensive DOM Target Selections**
   Targeting list structural roots (e.g., `.comparison-list`) instead of individual dynamic rows (`.comparison-row`) ensures that clearing out inner contents using JavaScript doesn't accidentally wipe out the entry targets entirely.

2. **Parsing Localized Layout Elements Safely**
   Ensuring precise selector definitions when reading string snapshots from elements containing formatting characters:
   ```js
   // Cleaning up formatting commas to parse clean numerical coordinates safely
   const targetAmountText = outputField.textContent.replace(/,/g, '');
   const targetAmount = parseFloat(targetAmountText);

3. **Synchronizing State Transitions Across Panels**
Wiring interactive event chains into dynamic callbacks ensures button layout text patterns (`favorite` vs `favorited`) accurately sync based on whether an array match exists, preventing stale state visual bleed whenever a user alters selected dropdown values:
```js
const isFavorited = favoritesDataMock.some(
    fav => fav.source === sourceCode && fav.target === targetCode
);

```

### Continued development

Moving forward, I intend to focus on expanding client-side memory safety structures, utilizing native browser storage methods like `localStorage` to persist the favorites array and conversion logs across full page loads.

### Useful Resources

MDN Web Docs - Intl.DateTimeFormat - This was my go-to reference for learning how to handle locale-aware date and time formatting cleanly. It helped me structure the timestamp labels (14:32 · Jun 26) for the conversion log entries without relying on heavy external libraries.

MDN Web Docs - Number.prototype.toLocaleString() - Crucial for formatting currencies with proper localized thousands separators and fixed decimal places depending on the active currency context.

## AI Collaboration

This project effectively integrated AI assistance as a collaborative peer debugging agent to build a robust architecture.

* **Tools Used:** Gemini
* **Application Scope:** Debugging 404 image errors, mapping v2 API array data properties on the fly, and solving selector naming mismatches (`#receive-amount` vs `.converted-amount-display`).
* **Outcome:** The collaboration accelerated feature delivery, transitioning the app from a static mockup to a fully dynamic web application.

## Author

* Website - [dropping soon](https://www.your-site.com)
* Frontend Mentor - [@opblair](https://www.frontendmentor.io/profile/yourusername)

## Acknowledgments

A big thank you to the Frontend Mentor community for providing such an incredible, highly-detailed design challenge that mimics real-world production specifications.

Shoutout to the creators of the Frankfurter API for providing a reliable, free, and open-source currency exchange rate engine that made the live features of this application possible.
