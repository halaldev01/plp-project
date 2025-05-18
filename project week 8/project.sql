-- Library Management System Database
-- This database manages books, authors, members, loans, and categories.

-- DROP tables if they exist to avoid conflicts during creation
DROP TABLE IF EXISTS BookAuthors;
DROP TABLE IF EXISTS Loans;
DROP TABLE IF EXISTS Books;
DROP TABLE IF EXISTS Authors;
DROP TABLE IF EXISTS Members;
DROP TABLE IF EXISTS Categories;

-- Table: Authors
-- Stores author details
CREATE TABLE Authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(100) NOT NULL,
    birthYear INT,
    UNIQUE(fullName)
);

-- Table: Categories
-- Stores book categories/genres
CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    categoryName VARCHAR(50) NOT NULL UNIQUE
);

-- Table: Books
-- Stores book details
CREATE TABLE Books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    category_id INT NOT NULL,
    publishedYear INT,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    total_copies INT NOT NULL CHECK (total_copies >= 0),
    available_copies INT NOT NULL CHECK (available_copies >= 0),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- Table: BookAuthors
-- Many-to-Many relationship between Books and Authors
CREATE TABLE BookAuthors (
    book_id INT NOT NULL,
    author_id INT NOT NULL,
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (author_id) REFERENCES Authors(author_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Table: Members
-- Library members who can borrow books
CREATE TABLE Members (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    joinDate DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Table: Loans
-- Tracks book loans to members
CREATE TABLE Loans (
    loan_id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    member_id INT NOT NULL,
    loanDate DATE NOT NULL DEFAULT CURRENT_DATE,
    dueDate DATE NOT NULL,
    returnDate DATE,
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (member_id) REFERENCES Members(member_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CHECK (dueDate > loanDate),
    CHECK (returnDate IS NULL OR returnDate >= loanDate)
);
