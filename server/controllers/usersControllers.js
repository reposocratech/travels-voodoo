const connection = require("../config/db")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class usersControllers {
    getAllUsers = (req, res) =>{
       let sql = "select user.*, travel.*, picture.* from user, travel, picture where user.user_id = travel.user_id and travel.travel_id = picture.travel_id and user.type = 1 and user.is_deleted = 0 and travel.is_deleted = 0 group by travel.travel_id order by rand()"
    
        connection.query(sql, (err, result)=>{
            if(err){
                res.status(500).json(err)
            }
            console.log(result);
            res.status(200).json(result)
        })
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
            if(!result || result.length == 0){
                res.status(401).json("Email no existe")
            }else if(result[0].is_deleted == 1){
                res.status(401).json("está bloqueado!!!!!")
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
      
        const user_id = req.params.id;
        ;
        let sql = `SELECT * FROM user WHERE user_id = ${user_id} AND is_deleted = 0`
        let sqlTravels = `SELECT * FROM travel WHERE user_id = ${user_id} AND is_deleted = 0`


        connection.query(sql, (err, result) => {
            if (err){
                res.status(500).json(err)
            }
            connection.query(sqlTravels, (errTravel, resultTravel) =>{
                if(errTravel){
                    res.status(500).json(errTravel);
                }
                res.status(200).json({result: result[0], resultTravel});
            })
        })
    }
    
    //--------------------------------
    //4.- edita usuario
    editUser = (req, res) =>{
       
        const {name, lastname, address, user_city, user_id} =  JSON.parse(req.body.editUser)
        //aqui deberiasmos de hacer validación de los datos a insertar
       let sql = `UPDATE user SET name = "${name}", lastname = "${lastname}", address = "${address}", user_city = "${user_city}" WHERE user_id = ${user_id} `
    
       let img
    
       if(req.file){
        img = req.file.filename;
        sql = `UPDATE user SET name = "${name}", lastname = "${lastname}", address = "${address}", user_city = "${user_city}", user_img = "${img}" WHERE user_id = ${user_id} `
       }

       connection.query(sql, (err, result)=>{
        if(err){
            res.status(400).json(err)
        }else{
            res.status(200).json({result, img})
        }
       })
    }
}

module.exports = new usersControllers;