# Midterm Lab – CSC336 Web Technologies

**Name:** YOUR NAME
**Roll No:** FA24-BCS-143
**N:** 43
**BP:** 643px
**H:** 301
**K:** 4

## Files changed

- `index.html` – header/nav markup (Task 1), cart icon link (Task 2), cart badge + mini-cart markup and `<script>` link (Task 3)
- `product.html` – header/nav markup (Task 1), cart icon link (Task 2)
- `style.css` – header/nav rules + Task 1 section, Task 2 section, Task 3 section at the end
- `checkout.html` – new (Task 2)
- `script.js` – new (Task 3)

## Task 1 – Mega-menu

Added a "Shop by Category" item to the navbar with K = 4 columns (heading + 5-link list each). From 643px up it opens as a full-width absolutely positioned panel using `:hover` and `:focus-within`, so Tab alone opens it and it closes when focus leaves; the header's z-index was raised so it sits above everything.
Below 643px the hamburger now opens a menu (CSS-only, checkbox + label) and the same 4 groups are `<details>`/`<summary>` accordions, closed by default.
I moved the old 767px header rules to 642px so the switch happens exactly at BP, and removed the `left:` pixel offsets from the logo, links and icons because nine links no longer fit with them.

## Task 2 – Checkout form

Created `checkout.html` (reusing the header and footer from `product.html`) and wrapped the cart icon on all pages in a link to it. The form has two fieldsets with legends, Contact (name, email, phone) and Delivery (address, city `<select>`, date), and every input has a `<label for>` matching its `id`.
Validation is HTML5 only: `required`, `type=email`, `pattern="03[0-9]{2}-[0-9]{7}"` for the phone, and `min="2026-10-29"` / `max="2026-12-11"` for the date (exam date + N = 43 days). Red border and message use `:user-invalid`, so nothing shows on page load.
From 643px the fieldsets sit side by side and each `.fields` block is a CSS Grid with a label column and an input column; below that it is one column with labels above. The button is `width: 100%` at every size.

## Task 3 – Cart badge and mini cart

Added `script.js` (plain JavaScript, loaded at the end of `index.html`). The cart is an array `cart` of `{ name, price }` objects; every "+" button on the product cards reads the name from `.eqt-title` and the price from `.eqt-price` of its own card (`closest()` + `querySelector()`), strips the `£` and converts it with `Number()`, then pushes it. A single `render()` function redraws everything from the array (badge, list, total, buttons), so adding and removing always stay in sync.
The cart icon is now `<div class="nav-cart">` containing the link and the badge `<span>` plus a hidden `#mini-cart` panel. The click handler calls `preventDefault()` and toggles the panel's `hidden` attribute, so the first click opens it and the second closes it (Escape also closes it). Without JavaScript the icon still goes to `checkout.html`, and the panel has its own CHECKOUT link. Each row has a Remove button; one listener on the `<ul>` (event delegation) finds the clicked button, does `cart.splice(index, 1)` and calls `render()`. The total is `cart.reduce((sum, item) => sum + item.price, 0)`.
Limit: `N mod 4 + 2 = 43 mod 4 + 2 = 5`, stored in `MAX_PER_PRODUCT`. `updateButtons()` counts how many copies of each card's product are in the cart; at 5 the button gets the text "Limit reached", `disabled = true` and the class `.is-limit`, and when one is removed the count drops, so the next `render()` turns it back into an enabled "+". In CSS the badge is `position: absolute` on the cart wrapper and the panel sits under the icon inside the header (z-index 2000), so it covers the page without pushing it down.

## AI tools used

- Claude