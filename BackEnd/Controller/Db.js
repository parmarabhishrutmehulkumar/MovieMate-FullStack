import mongoose from "mongoose";
const connectToDb = async()=>{
    await mongoose
      .connect(
        "mongodb+srv://parmarabhishrut:WmYqtZ5O0ZhpxubW@movie.0t49o.mongodb.net/?retryWrites=true&w=majority&appName=Movie"
      )
      .then((conn) =>{
        console.log(`db connected: ${conn.connection.host}`)
      })
      .catch((err)=>{
         console.log(`error in db connection: ${err.message}`)
      });
};
export default connectToDb; 