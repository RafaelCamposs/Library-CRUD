const { response } = require("express");

function updateItem(id){
    fetch('/update',{
       method: 'put', 
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
           _id: id,
           nome: 'A sutil arte de ligar o f*da-se',
           autor: 'Mark Manson',
           editora: 'Intriseca',
           idioma: "Portugues",
           npag: '224'
       })
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response =>{
        window.location.reload()
    })
}

function deleteItem(id) {
    fetch('/delete', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: id
        })
    })
        .then(res => {
            if (res.ok) return res.json
        })
        .then(data => {
            window.location.reload()
        });
}
