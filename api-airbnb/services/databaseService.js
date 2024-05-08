const mongoose = require("mongoose")

const DB_URI = "mongodb://localhost:27017/airbnb"

module.exports = () => {
    const connect = () =>{
        try {
            const conn = mongoose.createConnection(DB_URI);
            conn.on('connected', () => console.log('connected'));
            conn.on('open', () => console.log('open'));
            conn.on('disconnected', () => console.log('disconnected'));
            conn.on('reconnected', () => console.log('reconnected'));
            conn.on('disconnecting', () => console.log('disconnecting'));
            conn.on('close', () => console.log('close'));
          } catch (error) {
            console.log(error);
          }
    }

    connect()
}