const ModelUser = require("../models/user");

module.exports = function (app){
    app.get("/",(req,res) => {
     res.json({"mensaje":"todo bien"})
    })

    app.get("/users", async (req, res) => {
        const response = await ModelUser.find({})
        res.send(response)
    });

    app.post("/users", async (req, res)=>{
        const newUser =req.body;
        const response = await ModelUser.create(newUser)
        res.send(response)
    })
}

