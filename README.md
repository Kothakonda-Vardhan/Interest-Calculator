# 📊 Interest Calculator using Google Sheets API

A full-stack web application that calculates **Simple Interest** and **Compound Interest** using **React**, **Node.js**, and **Google Sheets** as the calculation engine.

---

## 🌐 Live Demo
- **Frontend (Netlify)**: https://69417d5b311959bd851ae493--profound-cascaron-409849.netlify.app/
- **Backend (Render)**: https://interest-calculator-4rem.onrender.com/

---

## 🛠️ Tech Stack
- **Frontend**: React
- **Backend**: Node.js, Express
- **Calculation Engine**: Google Sheets
- **Authentication**: Google Service Account
- **Deployment**: Netlify (Frontend), Render (Backend)

---

## ⚙️ How It Works
1. User enters principal, time, and rate in the UI  
2. React sends data to the Node.js backend  
3. Backend writes input values to Google Sheets  
4. Google Sheets calculates interest using formulas  
5. Backend reads results and sends them back to the UI  

---

## 📁 Project Structure

Interest-Calculator/  
├── backend/  
│   ├── server.js  
│   ├── sheets.js  
│   └── package.json  
│  
├── frontend/  
│   ├── public/  
│   │   └── index.html  
│   ├── src/  
│   │   ├── App.js  
│   │   ├── App.css  
│   │   └── index.js  
│   └── package.json  
│  
└── .gitignore  

---

## 📊 Google Sheets Design
- **Input** → Stores user input values  
- **Calc** → Performs Simple & Compound Interest calculations  
- **Output** → Final values read by backend  

---


## 🔐 Security
- Uses Google **Service Account** for Sheets API access  
- `credentials.json` is excluded using `.gitignore`  
- Secrets are never pushed to GitHub  

---


## 📄 License
This project is created for educational purposes.
