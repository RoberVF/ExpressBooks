const {Router}= require('express');
const router= Router();
const fs= require('fs');
const uuid= require('uuid/v4');

const json_books= fs.readFileSync('src/books.json', 'utf-8', ); //Leer el archivo src/books.json
let books= JSON.parse(json_books); //Convertir el string que hay en src/books.json a formato json para que el navegador lo entienda

router.get('/', (req, res)=>{
    res.render('index.ejs', {
        books
    });
});

router.get('/new-entry', (req, res)=>{
    res.render('new-entry.ejs')
});

router.post('/new-entry', (req, res)=>{
    const {title, author, image, link, description}= req.body;
    if(!title || !author || !image || !link || !description){
        res.status(400).send('Rellena todos los campos');
        return;
    }else{
        let newBook={
            id: uuid(), //Asi se genera un id diferente para cada libro
            title, //Esto es igual a title: title
            author,
            image,
            link,
            description
        }
        books.push(newBook); //books contiene un arreglo vacio. push va a hacer que los datos de req.body se metan dentro del arreglo de books
        const json_books= JSON.stringify(books); //Cambia los datos del arreglo books a un string
        fs.writeFileSync('src/books.json', json_books, 'utf-8'); //Crea un archivo books.json si no existe. Si existe escribira en el. Le especificas la ruta del archivo, lo que va a escribir en el, el formato en el que escribira

        res.redirect('/'); //Tras aniadir los libros te redirecciona a la pagina principal
    }
    

   
});

router.get('/delete/:id', (req, res)=>{
    books= books.filter(book => book.id != req.params.id); //Filter permite recorrer un arreglo y aplicar una condicional. Todos los datos seran agregados en el recorrido excepto el que cumpla con el :id. Una vez quitado el libro va a actualizar el arreglo
    const json_books= JSON.stringify(books); //Cambia los datos del arreglo books a un string
    fs.writeFileSync('src/books.json', json_books, 'utf-8');
    res.redirect('/');
});

router.get('/about', (req, res)=>{
    res.render('about.ejs');
});

router.get('/book/:id', (req, res)=>{
    res.render('./download.ejs', {
        books
    });
});

module.exports= router;