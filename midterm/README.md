# Midterm Lab – CSC336 Web Technologies

**Name:** YOUR NAME
**Roll No:** FA24-BCS-143
**N:** 43
**BP:** 643px
**H:** 301
**K:** 4

## Files changed

- `index.html` – header/nav markup (Task 1), cart icon link (Task 2)
- `product.html` – header/nav markup (Task 1), cart icon link (Task 2)
- `style.css` – header/nav rules + Task 1 section, Task 2 section at the end
- `checkout.html` – new (Task 2)

## Task 1 – Mega-menu

Added a "Shop by Category" item to the navbar with K = 4 columns (heading + 5-link list each). From 643px up it opens as a full-width absolutely positioned panel using `:hover` and `:focus-within`, so Tab alone opens it and it closes when focus leaves; the header's z-index was raised so it sits above everything.
Below 643px the hamburger now opens a menu (CSS-only, checkbox + label) and the same 4 groups are `<details>`/`<summary>` accordions, closed by default.
I moved the old 767px header rules to 642px so the switch happens exactly at BP, and removed the `left:` pixel offsets from the logo, links and icons because nine links no longer fit with them.

## Task 2 – Checkout form

Created `checkout.html` (reusing the header and footer from `product.html`) and wrapped the cart icon on all pages in a link to it. The form has two fieldsets with legends, Contact (name, email, phone) and Delivery (address, city `<select>`, date), and every input has a `<label for>` matching its `id`.
Validation is HTML5 only: `required`, `type=email`, `pattern="03[0-9]{2}-[0-9]{7}"` for the phone, and `min="2026-10-29"` / `max="2026-12-11"` for the date (exam date + N = 43 days). Red border and message use `:user-invalid`, so nothing shows on page load.
From 643px the fieldsets sit side by side and each `.fields` block is a CSS Grid with a label column and an input column; below that it is one column with labels above. The button is `width: 100%` at every size.

## Task 3 – Cart badge and mini cart

-

## AI tools used

- Claude