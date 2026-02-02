-- Database setup for Security Assessment
CREATE DATABASE IF NOT EXISTS cyber_assessment;
USE cyber_assessment;

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    question_text TEXT NOT NULL,
    max_weight FLOAT DEFAULT 3.0,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Assessments table (Summary)
CREATE TABLE IF NOT EXISTS assessments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    score INT NOT NULL,
    grade VARCHAR(2) DEFAULT 'A',
    details JSON NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Initial Seed Data
INSERT INTO categories (title) VALUES 
('Access Control'), 
('Network Security'), 
('Data Protection'), 
('Incident Response');

INSERT INTO questions (category_id, question_text) VALUES 
(1, 'Are passwords required to be changed every 90 days?'),
(1, 'Is Multi-Factor Authentication (MFA) used for all remote access?'),
(2, 'Is there a firewall protecting the internal network?'),
(2, 'Are network logs reviewed on a weekly basis?'),
(3, 'Is sensitive data encrypted at rest?'),
(3, 'Are regular backups performed and tested?'),
(4, 'Is there a documented incident response plan?');
