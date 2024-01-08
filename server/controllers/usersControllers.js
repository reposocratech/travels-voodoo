const connection = require("../config/db")
const bcrypt = require('bcrypt')

class usersControllers {
    getAllUsers = (req, res) =>{
        console.log("hola");
        res.status(200).json({saludo: "hola"})
    }

    //-------------------------------------------------
    //1.- crear un usuario
    
    createUser = (req, res) => {
        const { name, email, password } = req.body;
        //habría que validar  
        
        //encriptar el password
        let saltRounds = 8;
        bcrypt.genSalt(saltRounds, function(err, saltRounds) {
            bcrypt.hash(password, saltRounds, function(err, hash) {
                if(err){console.log(err)
                }else{
                    let sql = `INSERT INTO user (name, email, password) VALUES ( '${name}', '${email}', '${hash}')`

                    connection.query(sql, (error, result)=>{
                        console.log(error);
                        error
                            ? res.status(500).json({error})
                            : res.status(200).json(result)
                    })

                }
            });
        });
    }
}
module.exports = new usersControllers;