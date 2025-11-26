#!/bin/sh
mkdir -p data
node -e "const sqlite3=require('sqlite3').verbose(); const db=new sqlite3.Database('./data/comments.sqlite'); db.serialize(()=>{ db.run('CREATE TABLE IF NOT EXISTS comments(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, comment TEXT)'); db.close(); });"
