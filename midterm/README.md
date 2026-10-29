# Midterm Lab – CSC336 Web Technologies

**Name:** YOUR NAME
**Roll No:** FA24-BCS-143
**N:** 43
**BP:** 643px
**H:** 301
**K:** 4

## Files changed

- `index.html` – header/nav markup (Task 1)
- `product.html` – header/nav markup (Task 1)
- `style.css` – header/nav rules + new Task 1 section at the end (Task 1)

## Task 1 – Mega-menu

Added a "Shop by Category" item to the navbar with K = 4 columns (heading + 5-link list each). From 643px up it opens as a full-width absolutely positioned panel using `:hover` and `:focus-within`, so Tab alone opens it and it closes when focus leaves; the header's z-index was raised so it sits above everything.
Below 643px the hamburger now opens a menu (CSS-only, checkbox + label) and the same 4 groups are `<details>`/`<summary>` accordions, closed by default.
I moved the old 767px header rules to 642px so the switch happens exactly at BP, and removed the `left:` pixel offsets from the logo, links and icons because nine links no longer fit with them.

## Task 2 – Checkout form

-

## Task 3 – Cart badge and mini cart

-

## AI tools used

- Claude