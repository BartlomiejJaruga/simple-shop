# Simple Store

A simple online store written in **pure JavaScript**. The UI consists of two panels: a product list and a cart. Products in the cart are grouped by manufacturer and only selected items are included in price totals.

---

## 📸 Screenshots

### Website
<img width="1918" height="1027" alt="image" src="https://github.com/user-attachments/assets/fc48841c-bef6-4fa3-8153-6df6b869f7e7" />

<br><br>

### Cart with products
<img width="568" height="783" alt="image" src="https://github.com/user-attachments/assets/6c360c6f-3ea8-497d-ab12-f63ab1964910" />

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
- Full control over cart contents:
  - Adding products
  - Changing quantity of products
  - Changing products state (counted or not)
  - Deleting products
  - Clearing whole cart
- Products loading from .json file
- Search Bar for searching specific products or manufacturers
- Scalability and responsiveness of the UI
- Accessibility support: (a11y) and "tabbing" through page

---

## 🧠 Logic Highlights

- Products can be added from the product list to the cart
- Cart groups products based on their **manufacturer**
- Users can select/deselect:
  - Entire manufacturers
  - Individual products
- Only **selected items** are used in price calculations
- Users can delete unwanted products from the cart
- Users can change quantity of every product in the cart
- Users can change quantity of a product added to the cart (via input or buttons)
- Users can clear whole cart
- Products or manufacturers can be searched with the search bar located at the top of the page

---

## 🧰 Technologies

- HTML
- Pure CSS (no prepocessors)
- Pure JavaScript (no frameworks)

---

## 📂 Project Structure
```
simple-shop/
├── miniweb.exe
├── simple-shop.bat    <-- launching app
└── htdocs
    ├── assets
    |    └── item_image_example.png
    ├── data
    |    └── products.json
    ├── modules
    |    ├── cartUtils.js
    |    ├── common.js
    |    └── shopUtils.js
    ├── styles
    |    ├── _variables.css
    |    ├── cart.css
    |    ├── shop.css
    |    └── styles.css
    ├── index.html
    └── main.js
```


---

## 🚀 Installation Guide

1. Clone the repozitory or download .zip file (e.g. from latest release)
2. Open `simple-shop.bat` (simply double-click it in file manager)
3. App automatically starts on `http://localhost:8080/`
4. To close the app just simply close CMD window

---

## 📌 Notes

- This is a **front-end only** project (no backend)
- No frameworks were used
- (**free for use**) MiniWeb HTTP server used for loading products from file ([server download link](https://sourceforge.net/projects/miniweb/), author: stanleyhuang)
- (**free for use**) Font Awasome kit used for attaching icons
