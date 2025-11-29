# Golden Crop Distributors Ltd. (GCDL) Cereal Management System

[![Frontend](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://reactjs.org/)
[![Backend](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-MySQL-blue?logo=mysql)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-Educational-orange)](#)
[![Version](https://img.shields.io/badge/Version-1.0.0-lightgrey)](#)



## Part A: Project Description

### Introduction
Golden Crop Distributors Ltd. (GCDL) is a leading wholesale produce distributor specializing in cereals, operating across two regional branches. Currently, GCDL relies on manual record-keeping using ruled 4 Quire A4 Counter books, which has led to inefficiencies and errors. 

This project aims to develop a **comprehensive web application** to manage procurement, sales, stock, and analytics, modernizing GCDL’s operations. The system demonstrates proficiency in frontend and backend development, database management, and system design.

---

### Business Overview
GCDL deals in the following produce:  
- Beans  
- Grain maize  
- Cowpeas  
- Groundnuts (G-nuts)  
- Rice  
- Soybeans  

The company sources produce from:  
- Individual dealers (minimum 1 ton per transaction)  
- Other companies  
- Its farms in Maganjo and Matugga  

Each branch is managed by a branch manager, while two sales agents handle procurement and sales.

---

### Functional Requirements

#### 1. Procurement Management
- Record produce details: name, type, date, time, tonnage, cost, dealer name, branch, contact, and selling price.  
- Ensure data validation (numeric fields, valid phone numbers, etc.).  

#### 2. Sales Management
- Record sales details: produce name, tonnage, amount paid, buyer’s name, sales agent’s name, date, time, and buyer’s contact.  
- Generate receipts for every sale.  

#### 3. Credit Sales Management
- Record credit sales with buyer details, national ID, location, amount due, due date, and produce details.  

#### 4. Stock Management
- Automatically update stock levels after sales.  
- Allow stock and sales records to be edited or updated.  

#### 5. Analytics and Reporting
- Interactive dashboards for managers and the CEO displaying KPIs such as sales trends, profit margins, stock turnover, and procurement costs.  
- Generate reports on credit sales, dealer performance, sales agent performance, and buyer analysis.  
- Enable data export in PDF, CSV, and Excel formats.  

---

### Technical Requirements
- **Frontend:** React.js (or Angular, Vue.js)  
- **Backend:** Node.js (or Django, Laravel)  
- **Database:** Relational (MySQL, PostgreSQL) or NoSQL (MongoDB)  
- **Other Requirements:**  
  - Secure, scalable, and user-friendly system  
  - Proper data validation and error handling  

---

### Project Structure
```

gcdl-frontend/
├─ public/                 # Static assets
├─ src/
│  ├─ components/          # Reusable UI components
│  ├─ context/             # React contexts for state management
│  ├─ pages/               # Application pages (Dashboard, Sales, Procurement, etc.)
│  ├─ App.tsx              # Main app component
│  └─ main.tsx             # Entry point
├─ package.json             # Node dependencies and scripts
├─ tsconfig.json            # TypeScript configuration
├─ tailwind.config.js       # Tailwind CSS config
└─ README.md                # Project documentation

```

---

### Features in Development
- Responsive and user-friendly interface  
- Role-based access (CEO, branch managers, sales agents)  
- Real-time stock and sales updates  
- Exportable reports for analysis and decision-making  

---

### Author
**Web Programming Student** – Designed and implemented by the owner of this repository.

---

### License
This project is for educational purposes.
