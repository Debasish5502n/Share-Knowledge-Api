CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    number BIGINT UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    is_verified BOOLEAN DEFAULT TRUE,  -- Stores true/false values
    updated_at BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
    created_at BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT
);

CREATE TABLE IF NOT EXISTS course (
    course_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    course_category VARCHAR(100) NOT NULL,
    course_language VARCHAR(100) NOT NULL,
    course_title VARCHAR(100) UNIQUE NOT NULL,
    course_description VARCHAR(100) NOT NULL,
    course_image VARCHAR(100) NOT NULL,
    course_thumbnail VARCHAR(100) NOT NULL,
    updated_at BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
    created_at BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS subjects (
    subject_id SERIAL PRIMARY KEY,
    course_id INT NOT NULL,
    subject_title VARCHAR(100) NOT NULL,
    updated_at BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
    created_at BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE
)

CREATE TABLE IF NOT EXISTS subjects_topic (
    subjects_topic_id SERIAL PRIMARY KEY,
    subject_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    created_at BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE
)

CREATE TABLE IF NOT EXISTS lessons (
    lessons_id SERIAL PRIMARY KEY,
    subject_id INT NOT NULL,
    subjects_topic_id INT NOT NULL,
    lessons_data VARCHAR(10000) NOT NULL,
    lessons_type VARCHAR(100) NOT NULL,
    created_at BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE
    FOREIGN KEY (subjects_topic_id) REFERENCES subjects(subjects_topic_id) ON DELETE CASCADE
)