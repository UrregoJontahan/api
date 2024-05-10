const ModelUser = require("../models/user");

module.exports = function (app){
    app.get("/users", async (req, res) => {
        const response = await ModelUser.find()
        res.send(response)
    });  
    
    app.get("/users/:id", async (req, res) => {
        const id= req.params.id;
        const response = await ModelUser.find(id);
        res.json(response);
    });

    app.post("/users", async (req, res)=>{
        const {name, celphone, password } = req.body
        const newUser = new ModelUser({name, celphone, password});
        newUser.save()
        res.send(newUser)
    })
}
