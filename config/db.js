// Load the mysql package so this module can create a database connection.
const sql=require('mysql')

// Create a connection object using credentials stored in environment variables.
const connect=sql.createConnection({
    // The hostname or address of the MySQL server.
    host:process.env.DB_HOST,
    // The MySQL account name used to authenticate.
    user:process.env.DB_USER,
    // The password for the MySQL account.
    password:process.env.DB_PASS,
    // The database on the server that this connection will use.
    database:process.env.DB_NAME
})

// Start connecting to MySQL and receive any connection error in the callback.
connect.connect((err)=>{
 // Check whether the connection attempt returned an error.
 if(err){
    // Print the failure message and the error details to the console.
    console.error("MySQL connection faile",err.message)
 }

 // Print this message after the attempt; as written, it also runs if there was an error.
 console.log("MySQL connected successfully")
})

// Export the connection object so other modules can run queries through it.
module.exports=connect
