const connection = require("../config/db")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

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

    //---------------------------------------------------
    //2: login
    login = (req, res) =>{

        const {email, password} = req.body;
        
        let sql = `SELECT * FROM user WHERE email = '${email}'`
        
        connection.query(sql, (error, result) => {
            if(error) return res.status(500).json(error)
            console.log(result);
     //en caso de no encontrar el usuario (no existe en la bd)
            if(!result || result.length == 0 || result[0].is_deleted == 1){
                res.status(401).json("Email no existe")
            }else{
            //en el caso de que exista un usuario con ese email y además no esté borrado de manera lógica
                const user = result[0];
                //haciendo destructuring
                // const [user] = result;
                const hash = user.password

                //comparamos las contraseñas
                bcrypt.compare(password, hash, (error, response) => {
                    if(error) return res.status(500).json(error)

                    if(response == true){
                        //generar token
                        const token = jwt.sign(
                            {user: {
                                id: user.user_id,
                                type: user.type
                                }
                             },
                             process.env.SECRET,
                             { expiresIn: "1d" }
                        )

                        res.status(200).json({token, user})
                    }else{
                        res.status(401).json("Contraseña no válida")
                    }
                })
            }
        })
    }
    //--------------------------------
    //3.- trae info de un usuario
    oneUser = (req, res) =>{
        console.log(req.params);
        const user_id = req.params.id;
        console.log("hola usuario ", user_id);
        let sql = `SELECT * FROM user WHERE user_id = ${user_id} AND is_deleted = 0`

        connection.query(sql, (err, result) => {
            if (err){
                res.status(400).json({err})
            }

            console.log(result[0]);
            res.status(200).json(result[0]);
        })
    }

}
module.exports = new usersControllers;