# Library Management System

## Description

This project implements a full-featured **Library Management System** database using MySQL.  
It stores information about books, authors, members, book categories, and loans.  
The database enforces data integrity with primary keys, foreign keys, and constraints.  
It supports the following features:

- Tracking books and their authors (many-to-many relationship)
- Organizing books by categories/genres
- Managing library members
- Recording book loans to members with due dates and return dates

---

## How to Set Up / Run

1. Ensure you have MySQL installed and running on your system.
2. Open your MySQL client (e.g., MySQL Workbench, command line).
3. Create a new database (optional):
   ```sql
   CREATE DATABASE library_db;
   USE library_db;
