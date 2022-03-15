const express = require('express');
const app =express();

app.use(express.json());
app.use(express.urlencoded({extendes : false}));

app.use("/api/users", require('./routes/api/users'));

app.listen(3000, ()=>{
    console.log("Server started on 3000")
})