# Simple Store

A simple online store written in **pure JavaScript**. The UI consists of two panels: a product list and a cart. Products in the cart are grouped by manufacturer and only selected items are included in price totals.

---

## 📸 Screenshots

### Website
<img width="1916" height="906" alt="image" src="https://github.com/user-attachments/assets/4c51608d-c660-443a-91f3-7d35429213e5" />

<br><br>

### Cart with products
<img width="567" height="692" alt="image" src="https://github.com/user-attachments/assets/99847c47-a87c-4e76-a9d3-698bec93a5ad" />

---

## 🛒 Features

- Product list (left panel)
- Cart (right panel) with grouping by manufacturer
- Selectable products and manufacturers
- Changable quantity of products on product list
- Changable quantity of products in the cart
- Real-time calculation of:
  - Total price per manufacturer
  - Total price of selected items in the cart
- Products loading from .json file
- Scalability and responsiveness of the UI

---

## 🧠 Logic Highlights

- Products can be added from the product list to the cart
- Cart groups products based on their **manufacturer**
- Users can select/deselect:
  - Entire manufacturers
  - Individual products
- Only **selected items** are used in price calculations
- Users can delete unwanted products from tje cart
- Users can change quantity of every product in the cart
- Users can change quantity of a product added to the cart (via input or buttons)

---

## 🧰 Technologies

- HTML
- Pure CSS (no prepocessors)
- Pure JavaScript (no frameworks)

---

## 📂 Project Structure
```
simple-shop/
├── assets
    └── item_image_example.png
├── data
    └── products.json
├── styles
    ├── _variables.css
    ├── cart.css
    ├── shop.css
    └── styles.css
├── index.html
├── main.js
└── README.md
```


---

## 🚀 Installation Guide

1. Clone the repozitory or download .zip file
2. Open `index.html` in your browser (simply double-click it in file manager)

---

## 📌 Notes

- This is a **front-end only** project (no backend)
- No external libraries or frameworks were used
- (**free for use**) Font Awasome kit used for attaching icons
