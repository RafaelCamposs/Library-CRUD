//
console.log("Iniciando o Cadastro de Livros")

const express = require('express')
const app = express();


MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    
    console.log('Connected to Database')
    const db = client.db('library-books')
    const booksCollection = db.collection('books')
    
    app.set('view engine', 'ejs')
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())
    app.use(express.static('public'))


    app.get("/",(req, res)=> {
        db.collection('books').find().toArray()
       .then(results =>{
           res.render('index.ejs', {books: results})
       })
       .catch(error => console.error(error))
        
    })

    app.post('/show',(req, res)=>{
        booksCollection.insertOne(req.body)
            .then(result =>{
                res.redirect('/')
            })
            .catch(error => console.error(error))
    })

    app.put('/update', (req,res) =>{
        booksCollection.findOneAndUpdate(
            {_id: new mongo.ObjectId(req.body._id)},
            {
                $set: {
                    nome: req.body.nome,
                    autor: req.body.autor,
                    editora: req.body.editora,
                    idioma: req.body.idioma,
                    npag: req.body.npag
                }
            },
            {
                upsert: true
            }
                
        )
        .then(result => {
            res.json('Success')
        })
        .catch(error => console.error(error))
    })

    app.delete('/delete', (req, res)=>{
        booksCollection.deleteOne(
            {_id: new mongo.ObjectId(req.body.id)},
        )
        .then(result =>{
            res.json('O livro foi deletado') 
        })
        .catch(error => console.error(error))
    })
    
    app.listen(3000,function(){
        console.log('Server running on port 3000')
    })
  })
  .catch(error => console.error(error))

