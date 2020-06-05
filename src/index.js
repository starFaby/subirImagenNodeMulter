const express = require('express');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid/v4');

const storage=multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),
    filename: (req, file, cb)=>{
        cb(null, uuid()+path.extname(file.originalname).toLocaleLowerCase());
    }
})
const app = express();

app.set('port',3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
//middlewars
app.use(multer({
    storage,
    dest: path.join(__dirname,'public/uploads'),
    limits:{
        fileSize: 1000000//1 bit 10bit 100bit 1000bit => y es un kilobyte 10000 10=> kilobyte 100000 100=> kilobyte 1000000 1000=>megaByute
    },
    fileFilter: (req, file, cb)=>{
        const fileTypes = /jpg|jpeg|png|gif/;
        const mimetype = fileTypes.test(file.mimetype);
        const extraname = fileTypes.test(path.extname(file.originalname));
        if(mimetype && extraname){
            return cb(null, true)
        }
        cb('ERROR: Archivo debe ser una imagen valida');
    }
}).single('image'));

//routes
app.use(require('./routes/indexRoutes'))


app.listen(app.get('port'),()=>{
    console.log(`SErver on port ${app.get('port')}`);
    
})