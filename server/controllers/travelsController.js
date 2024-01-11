const connection = require("../config/db")

class TravelsControllers {
    createTravel = (req, res) => {
        const {travel_city, description, country, user_id} = JSON.parse(req.body.regTravel);
        console.log(req);
        let sql = `INSERT INTO travel (travel_city, country, description, user_id) VALUES ("${travel_city}","${country}", "${description}", ${user_id})`

        let sqlTravels = `SELECT * FROM travel WHERE user_id = ${user_id} AND is_deleted = 0`;

        let images = [];
        if(req.files){
            images = req.files
        }
  
        connection.query(sql, (err, result) =>{
            if(err){
                res.status(500).json(err)
            }
            console.log(result);
            //inserción las fotos
            let travel_id = result.insertId
            this.saveTravelImages(images, travel_id)

            connection.query(sqlTravels, (errorTrav, resultTravels)=>{
                if(errorTrav){ res.status(500).json(errorTrav)}
                res.status(200).json(resultTravels)
            })

        })
    }

    //funcion para guardar fotos
    saveTravelImages = (images, travel_id) => {
        images.forEach(elem => {
            let sql = `INSERT INTO picture (picture_img, travel_id) VALUES ('${elem.filename}', ${travel_id})`
            connection.query(sql, (err, result) => {
                if(err){
                    res.status(500).json(err)
                }
            })          
        });
    }

    //pide ls fotos de un viaje
    getPicsOneTravel = (req, res) =>{
        const {travel_id} = req.params;
        let sql = `SELECT * FROM picture WHERE travel_id = ${travel_id} AND is_deleted = 0`;

        connection.query(sql, (err, result) => {
            err? 
                res.status(500).json(err)
                :
                res.status(200).json(result)
        })
    }

    editTravel = (req, res) =>{
        const {travel_city, country, description, travel_id} = req.body;
        let sql = `UPDATE travel SET travel_city="${travel_city}", country="${country}", description="${description}" WHERE travel_id = ${travel_id}`
        connection.query(sql, (err, result)=>{
            err? res.status(500).json(err): res.status(200).json(result);
        });
    };

    delTravel = (req, res) =>{
        const {travel_id} = req.params;
        console.log(travel_id);
        let sql =`UPDATE travel LEFT JOIN picture
        ON travel.travel_id = picture.travel_id
      SET travel.is_deleted = 1, picture.is_deleted = 1
      WHERE travel.travel_id = ${travel_id}`; 
      connection.query(sql, (err, result)=>{
        err?res.status(500).json(err):res.status(200).json(result)
      })  
    }
    addPics = (req, res) => {
        const { travel_id } = req.params;
        req.files.forEach((elem)=>{
            let sql = `INSERT INTO picture (picture_img, travel_id) VALUES ("${elem.filename}", ${travel_id})`;
            connection.query(sql,(error, result)=>{
                error && res.status(500).json(error);
            } )
        })

        let sql2 = `SELECT * FROM picture WHERE travel_id = ${travel_id} AND is_deleted = 0`
        connection.query(sql2, (error, result)=>{
            error?res.status(500).json(error):res.status(200).json(result)
        })
    }

    delPic = (req, res) => {
        const {picture_id} = req.params;
        let sql = `UPDATE picture SET is_deleted = 1 WHERE picture_id=${picture_id} `
        connection.query(sql, (err, result)=>{
            err? res.status(500).json(err):res.status(200).json(result);
        })


    }
}

module.exports = new TravelsControllers();