-- Create departments table
CREATE TABLE departments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Create classes table
CREATE TABLE classes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    UNIQUE(name, department_id) -- Ensure unique class names within a department
);

-- Create users table
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) CHECK (role IN ('principal', 'teacher', 'parent')) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create students table
CREATE TABLE students (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15),
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES users(id) ON DELETE SET NULL -- Link to parent user
);

-- Create attendance table
CREATE TABLE attendance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR(10) CHECK (status IN ('present', 'absent')) NOT NULL
);

-- Create marks table
CREATE TABLE marks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    subject VARCHAR(255) NOT NULL,
    score INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100),
    max_score INTEGER NOT NULL CHECK (max_score > 0)
);

-- Create notifications table
CREATE TABLE notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    recipient_id UUID REFERENCES users(id) ON DELETE CASCADE, -- Notify specific user
    date_sent TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM departments;
SELECT * FROM classes;
SELECT * FROM users;
SELECT * FROM students;
SELECT * FROM attendance;
SELECT * FROM marks;
SELECT * FROM notifications;