/*********************************************************************************
*  BTI325 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Bajpayee Aum Shekhar    Student ID: 12068522  
*
*  Online (Cyclic) URL: 
*
********************************************************************************/ 




const express = require('express');
const blogData = require("./blog-service");
const path = require("path");
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect("/about");
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"))
});

app.get('/blog', (req,res)=>{
    blogData.getPublishedPosts().then((data=>{
        res.json(data);
    })).catch(err=>{
        res.json({message: err});
    });
});

app.get('/posts', (req,res)=>{
    blogData.getAllPosts().then((data=>{
        res.json(data);
    })).catch(err=>{
        res.json({message: err});
    });
});

app.get('/categories', (req,res)=>{
    blogData.getCategories().then((data=>{
        res.json(data);
    })).catch(err=>{
        res.json({message: err});
    });
});

app.use((req,res)=>{
    res.status(404).send("404 - Page Not Found")
})

blogData.initialize().then(()=>{
    app.listen(HTTP_PORT, () => { 
        console.log('server listening on: ' + HTTP_PORT); 
    });
}).catch((err)=>{
    console.log(err);
})
