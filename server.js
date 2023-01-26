const app = require('./app')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
mongoose.set('strictQuery', false);
const { DB_URL } = process.env;


async function main() { 
  try { 
    await mongoose.connect(DB_URL);
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

