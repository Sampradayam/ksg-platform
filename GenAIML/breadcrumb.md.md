# 📌 Breadcrumb Navigation – Sampradayam Web Application

This project is a simple **Breadcrumb Navigation UI** built using **HTML, CSS, and JavaScript**.  
Breadcrumbs help users understand their current location within a website and navigate easily between different sections.

---

## 🚀 Features

- Simple and clean breadcrumb navigation bar
- Responsive design
- Built using pure HTML, CSS, and JavaScript (no frameworks)
- Dynamically generated breadcrumb items
- Current page is highlighted
- Displays warning message if breadcrumb data is missing

---

## 🛠️ Technologies Used

- HTML5  
- CSS3  
- JavaScript (Vanilla JS)

---

## 📂 Project Structure

```
Sampradayam-Breadcrumb/
│
├── index.html
└── README.md
```

---

## 📸 Example Output

Breadcrumb displayed on the page:

```
Home › Courses › Computer Science › Data Structures
```

The last item is shown as the **current page** in bold text.

---

## ⚙️ How It Works

The breadcrumb is generated using a JavaScript function called `renderBreadcrumb()`.

Example:

```javascript
renderBreadcrumb([
  "Home",
  "Courses",
  "Computer Science",
  "Data Structures"
]);
```

- Each item except the last is displayed as a clickable link
- The last item is displayed as bold text
- If no breadcrumb data is provided, it shows:
  > Breadcrumb not available

---

## ▶️ How to Run the Project

1. Download or clone the project
2. Open the `index.html` file in any web browser (Chrome, Edge, Firefox, etc.)
3. The breadcrumb navigation bar will appear on the screen

---

## ✨ Customization

You can customize breadcrumb items by editing this code:

```javascript
renderBreadcrumb([
  "Home",
  "Your Section",
  "Your Category",
  "Your Page"
]);
```

You can also modify styles in the CSS section:
- Font color
- Font size
- Background color
- Spacing
- Shadow effects

---

## 📌 Use Cases

- Educational websites
- Course platforms
- Dashboards
- E-commerce websites
- Multi-level navigation systems

---

## ⚠️ Error Handling

If the breadcrumb array is empty or invalid, the application displays:

```
Breadcrumb not available
```

---

## 📄 License

This project is open-source and free to use for learning and personal projects.

---

## 👩‍💻 Author

Created as part of **Sampradayam Web Application** project.  
Developed using basic web technologies for educational purposes.
