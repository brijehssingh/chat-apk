import mongoose from"mongoose"

  
 export const connectDB= async()=>{

try {
    const conn = await mongoose.connect(process.env.MONGODB) 
    console.log(`bd connected:${conn.connection.host}`);
    

} catch (error) {
    
console.log(error.message);


}
 }