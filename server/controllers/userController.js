mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});


exports.view = (req,res)=>{
    pool.getConnection((err, connection)=>{
        if(err){
            throw err;
        };
        console.log('Connected as ID'+ connection.threadId);
    connection.query('SELECT * FROM Users WHERE category = "Food"', (err, foodData) => {
        if (err) throw err;
    
        connection.query('SELECT * FROM Users WHERE category = "Skin-Care"', (err, skinData) => {
          if (err) throw err;

          connection.query('SELECT * FROM Users WHERE category = "Electronics"', (err, electronicsData) => {
            if (err) throw err;
    
            let removedUser = req.query.removed;
            res.render('home', {foodData: foodData,skinData: skinData,electronicsData: electronicsData,removedUser});
          });
        });
      });
    });
};


exports.form = (req,res) => {
    res.render('add-user');
}; 

exports.create= (req,res) => {
    const {Name,Item,Category,Expense} = req.body;

    pool.getConnection((err, connection)=>{
        if(err){
            throw err;
        };
        console.log('Connected as ID'+ connection.threadId);
        connection.query('INSERT INTO Users SET Name = ?, Item = ?,Category = ?, Expense = ?',[Name,Item,Category,Expense],(err,rows)=>{
               connection.release();

               if(!err){
                res.render('add-user', { alert: `New Item Added Successfully for ${Name}`});
               }else{
                console.log(err);
               }

               console.log('The data from user table: \n', rows)
        });
    });
};

exports.edit = (req,res) => {
    pool.getConnection((err, connection)=>{
        if(err){
            throw err;
        };
        console.log('Connected as ID'+ connection.threadId);
        connection.query('SELECT * FROM Users WHERE id = ?',[req.params.Id],(err,rows)=>{
               connection.release();

               if(!err){
                res.render('edit-user',{rows});
               }else{
                console.log(err);
               }

               console.log('The data from user table: \n', rows)
        });
    });
};

exports.update = (req,res) => {
    const {Name,Item,Category,Expense} = req.body;

    pool.getConnection((err, connection)=>{
        if(err){
            throw err;
        };
        console.log('Connected as ID'+ connection.threadId);
        connection.query('UPDATE Users SET Name = ?, Item = ?, Category = ?, Expense = ? WHERE id = ?',[Name,Item,Category,Expense,req.params.Id],(err,rows)=>{
               connection.release();

               if(!err){
                
                pool.getConnection((err, connection)=>{
                    if(err){
                        throw err;
                    };
                    console.log('Connected as ID'+ connection.threadId);
                    connection.query('SELECT * FROM Users WHERE Id = ?',[req.params.Id],(err,rows)=>{
                           connection.release();
            
                           if(!err){
                            res.render('edit-user',{rows, alert: `${Name}'s Item Has Been Updated Successfully.`});
                           }else{
                            console.log(err);
                           }
            
                           console.log('The data from user table: \n', rows)
                    });
                });

               }else{
                console.log(err);
               }

               console.log('The data from user table: \n', rows)
        });
    });
};

exports.delete = (req,res) => {
    pool.getConnection((err, connection)=>{
        if(err){
            throw err;
        };
        console.log('Connected as ID'+ connection.threadId);
        connection.query('DELETE FROM Users WHERE id = ?',[req.params.Id],(err,rows)=>{
               connection.release();

               if(!err){
                let removedUser = encodeURIComponent('Item Deleted Successfully.')
                res.redirect('/?removed='+removedUser);
               }else{
                console.log(err);
               }

               console.log('The data from user table: \n', rows)
        });
    });
};


