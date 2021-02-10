const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

let comments = [
    {
        id: uuid(),
        username: 'Arpit B.',
        comment: 'Journery is more beautiful than the destination'
    },
    {
        id: uuid(),
        username: 'Udit K.',
        comment: 'Life is a bitch if you are not rich'
    },
    {
        id: uuid(),
        username: 'Manvik S.',
        comment: 'Next stop to the top'
    },
    {
        id: uuid(),
        username: 'Aadarsh P.',
        comment: 'Flutter fanboy'
    }
];

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/comments', (req, res) => {
    res.render('allComments', { comments });
})

app.get('/comments/new', (req, res) => {
    res.render('newComment');
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid()});
    res.redirect('/comments')
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('show', {comment})
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('edit', {comment})
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const matchedComment = comments.find(c => c.id === id)
    const newComment = req.body.comment;
    matchedComment.comment = newComment;
    res.redirect('/comments');
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.listen(8000, () => {
    console.log('Server is running!!!');
})
