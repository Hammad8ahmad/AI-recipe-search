CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    ingredients JSONB NOT NULL,
    calories TEXT NOT NULL, 
    image_url TEXT NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
