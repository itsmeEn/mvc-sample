const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

//middleware accessing book array
const books = [
    {
        "id": 1,
        "title": "Brading Sweet Grass ",
        "author": "Robin Wall Kimmerer",
        "price": "₱1,823.47",
        "published": "2013",
        "stock": "100"
    },
    {
        "id": 2,
        "title": "The Poet X",
        "author": "Elizabeth Acevedo",
        "price": " ₱795.01",
        "published": "March 6, 2018",
        "stock": "10"
        }
];
//get the book records
app.get('/api/books',(req, res) => {
    res.json(books);
});
//post new books id, title, author, publication, price and stocks
app.post('/api/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        published: req.body.published,
        stock: req.body.stock
        };
        books.push(newBook);
        res.json(newBook);
        });
//updating books based on their id 
app.put('/api/books/:id', (req, res) => {
    const id = req.params.id;
    const book = books.find(book => book.id === parseInt(id));
    if(!book) {
        return res.status(404).json({message: 'Book not found'});
        }
        const updatedBook = {
            id: book.id,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            published: req.body.published,
            stock: req.body.stock
            };
            const index = books.indexOf(book);
            books.splice(index, 1, updatedBook);
            res.json(updatedBook);
    });
//delete books based on their id
app.delete('/api/books/:id', (req, res) => {
    const id = req.params.id;
    //delete using for loops
    for(let i = 0; i < books.length; i++) {
        if(books[i].id === parseInt(id)) {
            books.splice(i, 1);
            res.json({message: 'Book deleted'});
            return;
            }
            }
            res.status(404).json({message: 'Book not found'});
    });
    //server listening on port 3000
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });