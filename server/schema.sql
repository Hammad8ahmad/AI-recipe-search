CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_ingredients TEXT NOT NULL, -- Store user-input ingredients as a JSON array
    actual_ingredients TEXT NOT NULL, -- Store correct ingredients as a JSON array
    instructions TEXT NOT NULL, -- Store instructions as a JSON array
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
