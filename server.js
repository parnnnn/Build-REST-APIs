const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let student = [
    { id: 1, name: 'Trin Chansuwan', gpa: 4.0 },
    { id: 2, name: 'Lionel Messi', gpa: 1.0 },
    { id: 3, name: 'Ronaldo', gpa: 3.9 },
    { id: 4, name: 'Kwanjira', gpa: 2.5 },
    { id: 5, name: 'vecna', gpa: 3.5 },
    { id: 6, name: 'chica', gpa: 1.5 },
    { id: 7, name: 'maew maw', gpa: 2.6 },
    { id: 8, name: 'dawg lee', gpa: 3.1 },

];

app.get('/', (req, res) => {
    res.send('Welcome to the Student API');
});

app.get('/api/student', (req, res) => {
    res.json(student);
});

app.get('/api/student/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentItem = student.find(item => item.id === studentId);
    if (studentItem) {
        res.json(studentItem);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

app.post('/api/student', (req, res) => {
    const newStudent = req.body;
    newStudent.id = student.length ? student[student.length - 1].id + 1 : 1;
    student.push(newStudent);
    res.status(201).json(newStudent);
});
app.put('/api/student/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = student.findIndex(item => item.id === studentId);
    if (studentIndex !== -1) {
        student[studentIndex] = { id: studentId, ...req.body };
        res.json(student[studentIndex]);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});
app.delete('/api/student/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = student.findIndex(item => item.id === studentId);
    if (studentIndex !== -1) {
        student.splice(studentIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} at http://localhost:${PORT}/`);
});