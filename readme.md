#  Library Management System

This project implements a complete CRUD (Create, Read, Update, Delete) system for managing library loans, connecting to a MySQL database through MySQL Workbench. The application is developed with:

Frontend: Pure HTML, CSS and JavaScript
Backend: Node.js with Express
Database: MySQL managed with MySQL Workbench



## Key Features


✅ Complete CRUD for loans, users and books
✅ Initial data load from CSV files
✅ Data validation in both frontend and backend
✅ Specialized queries for reports
✅ Intuitive and responsive interface



## Tech Stack

### Backend
- Node.js (v16+)
- Express.js
- MySQL2 driver
- CORS middleware

### Frontend 
- Vite.js
- Pure JavaScript (ES6+)
- Modern CSS (Flexbox/Grid)
- Responsive design

### Database
- MySQL (via MySQL Workbench)
- CSV data import functionality


## Required Software


MySQL Workbench (latest version)

Node.js (v16 or higher)

Modern web browser (Chrome, Firefox, Edge)


## 📁 Project Structure


Prueba/
│
├── apps/ 
│      ──css
│             ──styles.css
│          ──js
│              ──main.js
├── docs/ # documentation
│       ──ModeloRelacional
│          ──pd_jaider_rodriguez_sierra
│          ──prueba.postman
│  
├── server/ # Backend│
├     ──data
│          ──01_customers.csv
│          ──02_transactions.csv
│          ──03_bills.csv
│     ──seeders
│          ──load_bills.js
│          ──load_customers.js
│          ──load_transaction.js
│     ──conection_db.js
│     ──index.js
├── index.html 
├── .gitignore
└── README.md


## Installation

1. **Clone the repository**:

```bash
git clone https://github.com/jaiderr1582/prueba.git
cd biblioteca
```

2. Install dependencies:


npm install

Main dependencies:
**csv-parser**: for parsing CSV files
**express**: Node server framework
**mysql2**: MySQL connector
**cors**: For frontend-backend communication


3. start the backend:

node server/index.js


4. start the frontend:

npm run dev


## API Endpoints

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/api/customers` | Get all customers | - |
| POST | `/api/customers` | Create customer | |
| PUT | `/api/customers` | Update customer | - |
| Delete | `/api/customers` | Delete customer | - |

## Coder

**Name**: Jaider Yesid Rodriguez Robles

**Clan**: Sierra

**document**: *********


## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request



## License
This project is licensed under the [MIT License](LICENSE).
