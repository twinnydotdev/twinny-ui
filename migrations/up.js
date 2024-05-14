import sqlite3 from 'sqlite3'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const db = new sqlite3.Database('sqlite.db')

db.exec(fs.readFileSync(path.join(__dirname, 'seed.sql')).toString())

const migrations = fs
  .readdirSync(__dirname)
  .filter((file) => file.endsWith('.sql') && file !== 'seed.sql')

migrations.forEach((file) => {
  const id = file.replace('.sql', '')
  db.get(`SELECT * FROM migrations WHERE id = ?`, [id], (err, row) => {
    if (err) throw err
    if (!row) {
      const sql = fs.readFileSync(path.join(__dirname, `./${id}.sql`)).toString()
      db.exec(sql)
      db.run(`INSERT INTO migrations (id, timestamp) VALUES (${id}, CURRENT_TIMESTAMP)`)
    }
  })
})
