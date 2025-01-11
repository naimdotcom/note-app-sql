const connection = require("./mysqlConnection");

const createTables = () => {
  const userTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

  const notesTable = `
        CREATE TABLE IF NOT EXISTS notes (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            title VARCHAR(255),
            content TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
    `;

  connection.query(userTable, (err) => {
    if (err) console.error("Error creating users table:", err);
    else console.log("Users table created successfully");
  });

  connection.query(notesTable, (err) => {
    if (err) console.error("Error creating notes table:", err);
    else console.log("Notes table created successfully");
  });
};

module.exports = createTables;
