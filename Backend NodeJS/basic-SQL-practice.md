Here is a complete, well-formatted **Markdown documentation (`.md`)** file for your SQL dummy data setup and practice queries, including your comments and the playground link.

You can copy this file and save it as `sql_practice.md` for future reference.

---

````md
# 🌐 SQL Practice: Employees & Companies — PostgreSQL

This document serves as a personal reference and refresher guide for practicing SQL queries on a dummy dataset of companies and employees.

👉 **Practice here**: [SQL Playground Session](https://sqlplayground.app/sandbox/6878e676b40fd2a7b8c62fab)

---

## 🧱 Step 1: Create Tables and Dummy Data

### Create Tables

```sql
CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  companyName VARCHAR(255)
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  companyId INT,
  employeeName VARCHAR(255),
  age INT,
  salary NUMERIC,
  country VARCHAR(255),
  FOREIGN KEY (companyId) REFERENCES companies(id)
);
```
````

### Insert Dummy Company Data (15 companies)

```sql
INSERT INTO companies (companyName) VALUES
('Acme Corp'),
('Tech Solutions'),
('Globus Labs'),
('EY GDS'),
('TCS'),
('Infosys'),
('Wipro'),
('Capgemini'),
('Cognizant'),
('Oracle'),
('Google'),
('Microsoft'),
('Amazon'),
('Netflix'),
('Apple');
```

### Insert Dummy Employee Data (30 diverse entries)

```sql
INSERT INTO employees (companyId, employeeName, age, salary, country) VALUES
(4, 'John Doe', 30, 60000, 'USA'),
(2, 'Rock Doe', 25, 55000, 'Canada'),
(1, 'Mark Polo', 43, 65000, 'MIAMI'),
(5, 'Alice Johnson', 29, 72000, 'USA'),
(6, 'Bob Smith', 34, 85000, 'UK'),
(7, 'Charlie Lee', 28, 60000, 'India'),
(8, 'David Kim', 31, 78000, 'South Korea'),
(9, 'Eve Adams', 45, 95000, 'USA'),
(10, 'Frank Zhang', 37, 70000, 'China'),
(11, 'Grace Liu', 26, 62000, 'Singapore'),
(12, 'Hannah White', 40, 80000, 'Germany'),
(13, 'Ian Brown', 39, 88000, 'Canada'),
(14, 'Jenny Wilson', 33, 67000, 'France'),
(15, 'Kevin Patel', 24, 54000, 'India'),
(1, 'Linda Garcia', 38, 91000, 'USA'),
(2, 'Michael Scott', 41, 86000, 'USA'),
(3, 'Nina Thomas', 30, 69000, 'Australia'),
(4, 'Oscar Wilde', 50, 100000, 'UK'),
(5, 'Pam Beesly', 27, 59000, 'USA'),
(6, 'Quincy Jones', 32, 73000, 'Brazil'),
(7, 'Rachel Green', 29, 61000, 'USA'),
(8, 'Steve Rogers', 36, 77000, 'USA'),
(9, 'Tina Fey', 44, 92000, 'Canada'),
(10, 'Uma Thurman', 31, 64000, 'USA'),
(11, 'Victor Hugo', 35, 80000, 'France'),
(12, 'Wendy Harris', 27, 56000, 'Australia'),
(13, 'Xander Cage', 42, 87000, 'Germany'),
(14, 'Yuki Tanaka', 30, 69000, 'Japan'),
(15, 'Zara Khan', 28, 66000, 'India');
```

---

## 🔍 Step 2: Practice Queries & Use Cases

### 1. Employees with salary less than 70,000 (descending order)

```sql
SELECT *
FROM employees
WHERE salary < 70000
ORDER BY salary DESC;
```

### 2. Top 5 highest-paid employees

```sql
SELECT *
FROM employees
ORDER BY salary DESC
LIMIT 5;
```

### 3. Unique list of countries (no duplicates)

```sql
SELECT DISTINCT country
FROM employees;
```

### 4. Search employees whose name contains 'Jo'

```sql
SELECT *
FROM employees
WHERE employeeName LIKE '%Jo%';
```

### 5. Employees aged between 20 and 40 (ascending order)

```sql
SELECT *
FROM employees
WHERE age BETWEEN 20 AND 40
ORDER BY age ASC;
```

### 6. Total salary payout across all employees

```sql
SELECT SUM(salary) AS total_salary
FROM employees;
```

### 7. Average salary of all employees

```sql
SELECT AVG(salary) AS average_salary
FROM employees;
```

### 8. Average salary by country

```sql
SELECT country, AVG(salary) AS avg_salary
FROM employees
GROUP BY country;
```

### 9. Total employee count per country (descending order)

```sql
SELECT country, COUNT(id) AS total_employee
FROM employees
GROUP BY country
ORDER BY total_employee DESC;
```

---

## 🧩 3. Joining Employees with Their Companies

### Option A: Simple JOIN with all employee details + company name

```sql
SELECT
  c.companyName,
  e.*
FROM employees e
JOIN companies c ON e.companyId = c.id;
```

### Option B: Cleaner column naming (employee_id, etc.)

```sql
SELECT
  c.companyName,
  e.id AS employee_id,
  e.employeeName,
  e.age,
  e.salary,
  e.country
FROM employees e
JOIN companies c ON e.companyId = c.id;
```

> Tip: Use `e.*` to include all employee columns without typing each field.

---

## ✅ Summary

This playground allows experimenting with:

-  **Filtering** (`WHERE`, `BETWEEN`, `LIKE`)
-  **Sorting & Limiting** (`ORDER BY`, `LIMIT`)
-  **Grouping & Aggregation** (`SUM`, `AVG`, `COUNT`, `GROUP BY`)
-  **Table Joins** (`JOIN`)

---

## 🧪 Try It Live

👉 [Click here to open on SQL Playground](https://sqlplayground.app/sandbox/6878e676b40fd2a7b8c62fab)
