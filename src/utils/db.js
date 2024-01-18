import mysql from 'mysql';

const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect((e) => {
  if (e) {
    console.error('Error connecting to MySQL: ', e);
    return;
  }
});

export default db;
