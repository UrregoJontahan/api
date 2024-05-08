const mongoose = require("mongoose")

const DB_URI = "mongodn://localhost:27017/airbnb"

module.exports = () => {
    const connect = () =>{
        mongoose.connect(
            DB_URI,{
                keepAviable:true,
                userNewUrlParser:true,
                userUnifiedTopology:true
            },
            (err) => {
                if(err){
                    console.log("DB:error")
                } else {
                    console.log("conexion exitosa")
                }
            }
        )
    }

    connect()
}