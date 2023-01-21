const express = require('express');
require('')
const port = process.env.PORT || 3000;
const app = express();


app.get("/",(req, res) => {
    res.send("Hello");
})

app.listen(port, (err)=>{
    if(err)
        console.log("Something went wrong");
    else
        console.log(`Listening on port ${port}`);
})


