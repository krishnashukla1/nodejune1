const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const DATA_FILE = './data.json';

// Read data from JSON file
const readData = () => JSON.parse(fs.readFileSync(DATA_FILE));

// Write data to JSON file
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// Create (POST)
app.post('/items', (req, res) => {
  const data = readData();
  const newItem = { ...req.body, id: Date.now() };
  data.push(newItem);
  writeData(data);
  res.status(201).json(newItem);
});

// Read (GET)
app.get('/items', (req, res) => res.json(readData()));

app.get('/items/:id', (req, res) => {
  const data = readData();
  const item = data.find(i => i.id === parseInt(req.params.id));
  item ? res.json(item) : res.status(404).json({ message: 'Item not found' });
});

// Update (PUT)
app.put('/items/:id', (req, res) => {
  const data = readData();
  const index = data.findIndex(i => i.id === parseInt(req.params.id));
  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    writeData(data);
    res.json(data[index]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Delete (DELETE)
app.delete('/items/:id', (req, res) => {
  const data = readData();
  const newData = data.filter(i => i.id !== parseInt(req.params.id));
  if (newData.length !== data.length) {
    writeData(newData);
    res.json({ message: 'Item deleted' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/*
POST---http://localhost:3000/items
{
    "name": "Mr ram Shukla",
    "age": 25,
    "address":"LKO"
}
----------------
GET--http://localhost:3000/items
GET--http://localhost:3000/items/1717683341941
{
    "name": "Mr ram Shukla",
    "age": 25,
    "address": "LKO",
    "id": 1717683341941
}
==========================================================


YOUTUBE LINK----  https://youtu.be/9t45rQwJ37Y?si=HH30wRupH_XnTUSq

------------------------

PS E:\A GIT\AA> git init  
Initialized empty Git repository in E:/A GIT/AA/.git/
-----------------
PS E:\A GIT\AA> git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        data.json
        index1.js

nothing added to commit but untracked files present (use "git add" to track)
-----------------
PS E:\A GIT\AA> git add .
warning: in the working copy of 'data.json', LF will be replaced by CRLF the next time Git touches it
-----------------
PS E:\A GIT\AA> git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   data.json
        new file:   index1.js
-----------------

PS E:\A GIT\AA> git commit -m "I am krishna"
[master (root-commit) 85870a5] I am krishna
 2 files changed, 89 insertions(+)
 create mode 100644 data.json
 create mode 100644 index1.js
-----------------
PS E:\A GIT\AA> git branch
* master
-----------------
PS E:\A GIT\AA> git remote add origin https://github.com/krishnashukla1/nodejune1.git
PS E:\A GIT\AA> git remote
origin
-----------------
PS E:\A GIT\AA> git branch -M main
>>
-----------------
PS E:\A GIT\AA> git push -u origin main
>>
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 8 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 1.03 KiB | 1.03 MiB/s, done.
Total 4 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/krishnashukla1/nodejune1.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
----------------------------------
===========================================================================================
1]   PS E:\A GIT\AA> git init  
2]   PS E:\A GIT\AA> git add .
3]   PS E:\A GIT\AA> git commit -m "I am krishna"
4]   PS E:\A GIT\AA> git remote add origin https://github.com/krishnashukla1/nodejune1.git
5]  PS E:\A GIT\AA> git branch -M main
6]  PS E:\A GIT\AA> git push -u origin main
=====================================

*/