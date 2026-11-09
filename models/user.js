// Import the shared MySQL connection from the database configuration module.
const db=require('../config/db')

// Collect the user-related database operations in one object.
const User={
    // Retrieve every user, sorting the newest/highest ID first; callback receives the query result.
    getAll:(callback)=>{
        // SQL statement that selects all columns from users in descending ID order.
        const sql="select * from users order by id desc"
        // Run the SQL statement and pass the result or error to the callback.
        db.query(sql,callback)
    },

    // Find one user by ID; id is supplied separately as a parameter.
    findByID:(id,callback)=>{
        // The question mark is a placeholder for the ID value.
        const sql="select * from users where id=?"
        // Execute the query with the ID value and callback.
        db.query(sql,[id], callback)
    },
    // Find one user by email address; email is supplied separately as a parameter.
    findByEmail:(email,callback)=>{
        // The question mark is a placeholder for the email value.
        const sql= `select * from users where email=?`
        // Execute the query with the email value and callback.
        db.query(sql,[email], callback)
    },

    // Insert a new user using the supplied user object and callback.
    create:(user,callback)=>{
        // SQL statement to insert the four user fields represented by placeholders.
        const sql=`
            insert into users 
            (name,email,role,password)
            values(?,?,?,?)
        `
        // Values are kept separate from the SQL so the driver can bind them to placeholders.
        const values=[
            // Name value for the first placeholder.
            user.name,
            // Email value for the second placeholder.
            user.email,
            // Role value for the third placeholder.
            user.role,
            // Password value for the fourth placeholder.
            user.password,
        ]

        // Execute the insert with the values and report its result through the callback.
        db.query(sql,values,callback)
    },
    // Update a user's name, email, and role, identifying the row by ID.
    update:(id,user,callback)=>{
        // SQL statement with placeholders for the updated fields and target ID.
        const sql=`
        update users 
        set name=?, email=?, role=?
        where id=?
        `
        // Values match the placeholders in order: name, email, role, then ID.
        const values=[
            // New name for the user.
            user.name,
            // New email address for the user.
            user.email,
            // New role for the user.
            user.role,
            // ID of the user row to update.
            id
        ]
        // Call the MySQL query method. This currently passes callback before values.
        db.query(sql,values,callback)
    },
    // Delete a user by ID and report the result through the callback.
    delete:(id,callback)=>{
        // SQL statement with a placeholder for the ID of the row to delete.
        const sql="delete from users where id=?"

        // Execute the deletion with the ID value and callback.
        db.query(sql,[id], callback)
    }

}

// Export the User object so other modules can call these database operations.
module.exports=User
