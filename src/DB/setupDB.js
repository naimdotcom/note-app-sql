const pool = require("./mysqlConnection");

const createTables = async () => {
  const userTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            verification_code INT DEFAULT NULL,
            otp_expires INT DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

  const notesTable = `
        CREATE TABLE IF NOT EXISTS notes (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            editors_id INT, 
            title VARCHAR(255),
            content TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
    `;

  await pool
    .query(userTable)
    .then(() => {
      console.log("Users table created successfully");
    })
    .catch((err) => {
      console.log("Error creating users table: ", err);
    });

  await pool
    .query(notesTable)
    .then(() => {
      console.log("Notes table created successfully");
    })
    .catch((err) => {
      console.log("Error creating notes table: ", err);
    });
};

module.exports = createTables;
