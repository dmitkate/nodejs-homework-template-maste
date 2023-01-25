const app = require('./app')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
mongoose.set('strictQuery', false);
// const { HOST_URL } = process.env;
const HOST_URL = 'mongodb+srv://admin:RWXnpp3SHJ5EFkcL@cluster0.ecad6ur.mongodb.net/dbcontscts?retryWrites=true&w=majority'

async function main() { 
  try { 
   await mongoose.connect(HOST_URL);
    console.log("Database connection successful");    
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000")
    })

  } catch(error) {
    console.error(`error conecting to mongodb`, error.message);
    process.exit(1);

  }
}
main()

