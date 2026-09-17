# 📦 Full Stack Project (.NET 9 + React + SQL Server)

This repository contains a full-stack system built with:

* 🖥 **Backend:** REST API built with .NET 9
* 🌐 **Frontend:** User interface built with React (Vite + TypeScript)
* 🗄 **Database:** SQL Server scripts for creating and populating the database

---

## 👤 Web Application for Users

![WhatsApp Image 2025-07-24 at 13 47 03\_817a4612](https://github.com/user-attachments/assets/daeffbae-e34d-4b82-831c-e0f888b82171)

*Home screen*

---

![WhatsApp Image 2025-07-24 at 13 46 01\_6d30c5d8](https://github.com/user-attachments/assets/08427413-4f2d-4e11-99c7-cfa3a1fb770a)

*Vehicle registration and editing*

---

## 🚗 Web Application for Customers

![WhatsApp Image 2025-07-24 at 14 17 24\_4a5ae5b5](https://github.com/user-attachments/assets/af7e0aec-772e-4709-8a52-641dc3b61bf9)

*Saved vehicles*

---

## ✅ Requirements

Make sure you have the following tools installed:

| Tool                                                               | Required Version          |
| ------------------------------------------------------------------ | ------------------------- |
| [.NET SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0) | .NET 9.0 Preview or later |
| [Node.js](https://nodejs.org/)                                     | 18.x or later             |
| [NPM](https://www.npmjs.com/)                                      | 9.x or later              |
| [SQL Server](https://www.microsoft.com/en-us/sql-server/)          | Express or later          |
| [Visual Studio Code](https://code.visualstudio.com/)               | Optional                  |

---

## 🔨 1. Apply the Existing Migration

### 📁 Location:

`/backend/FinanzautoAPI`

You can create the initial migration, including the seed data, using:

```bash
dotnet ef migrations add InitialCreate
```

This command creates the migration based on the entities and relationships defined in Entity Framework.

Apply the migration to create the database and its tables:

```bash
dotnet ef database update
```

If `dotnet-ef` is not installed, you can install it globally using:

```bash
dotnet tool install --global dotnet-ef
```

You can run the project using:

```bash
dotnet run
```

---

## ⚙️ 2. Run the .NET 9 Backend

### 📁 Location:

`/backend/FinanzautoAPI`

### Steps:

1. Open a terminal in the backend directory.
2. Restore the required packages:

```bash
dotnet restore
```

3. Run the API:

```bash
dotnet run
```

### ⚙️ `appsettings.json`

Configure `appsettings.json` with your SQL Server connection string. The database name should be `FinanzautoDB` after the database setup has been completed.

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=FinanzautoDB;Trusted_Connection=True;TrustServerCertificate=True"
}
```

---

## 🌐 3. Run the User Application (React + Vite)

### 📁 Location:

`/frontend/finanzauto-user-app`

### Steps:

1. Open a terminal in the frontend directory.
2. Install the required dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the following URL in your browser:

http://localhost:5173

---

## 🌐 4. Run the Customer Application (React + Vite)

### 📁 Location:

`/frontend/client-app`

### Steps:

1. Open a terminal in the frontend directory.
2. Install the required dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the following URL in your browser:

http://localhost:5180
