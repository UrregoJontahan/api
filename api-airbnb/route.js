module.exports = function (app){
    app.get("/",(req,res) => {
     res.json({"mensaje":"todo bien"})
    })

    app.get("/users",(req, res)=>{
        res.json({"mensaje":"mis usuarios"})
    })

    app.post("/users",(req, res)=>{
        const newUser =req.body;
        console.log(newUser)

        res.json({"mensaje":"creado"})
    })
}
