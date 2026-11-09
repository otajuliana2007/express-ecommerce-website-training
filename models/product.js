const db=require('../config/db');

// sql code
// CREATE TABLE products (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     description VARCHAR(225) NOT NULL,
//     price DECIMAL(10, 2) NOT NULL,
//     image VARCHAR(225) NOT NULL,
//     quantity INT NOT NULL DEFAULT 0,
//     category_id INT NOT NULL,
//     FOREIGN KEY (category_id)
//         REFERENCES categories(id)
//         ON DELETE CASCADE
//         ON UPDATE CASCADE
// );
  const Product={
    // create product 
    create:(product,callback)=>{
        const sql=`insert into products
        (
        category_id,
        product_name,
        description,
        price,
        quantity,
        image
        )
        values(?,?,?,?,?,?)`

        const values=[
            product.category_id,
            product.product_name,
            product.description,
            product.price,
            product.quantity,
            product.image

        ]
        db.query(sql,values,callback)
    }, 

    // get all products 
    getAll:(callback)=>{
        const sql=`select 
        products.id,
        products.product_name,
        products.description,
        products.price,
        products.quantity,
        products.image,
        products.created_at,
        products.updated_at,
        categories.id as category_id,
        categories.category
         from products
         inner join categories
         on products.category_id=categories.id
         order by products.id desc `

         db.query(sql,callback)
    },
    // delete product 
    delete:(id,callback)=>{
        const sql=`delete from products where id=?`

        db.query(sql,[id],callback)
    },


    // find product by id 
    getByID: (id, callback) => {
        const sql = `
            SELECT products.*, categories.category
            FROM products
            INNER JOIN categories
                ON products.category_id = categories.id
            WHERE products.id = ?
        `;

        db.query(sql, [id], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0]);
        });
    },

    // get product by category 
    getByCategory:(category_id,callback)=>{
         const sql =`select products.*,
        categories.category from products
        inner join categories
        on products.category_id=categories.id
        where products.id=?`
        db.query(sql,[category_id],callback)
    } ,



    // Update product
  update: (id, product, callback) => {
    const sql = `
        UPDATE products
        SET
            category_id = ?,
            product_name = ?,
            description = ?,
            quantity = ?,
            price = ?,
            image = ?
        WHERE id = ?
    `;

    const values = [
        product.category_id,
        product.product_name,
        product.description,
        product.quantity,
        product.price,
        product.image,
        id
    ];

    db.query(sql, values, callback);
  }
}



module.exports=Product
