const db = require("../database");

exports.update = (req,res)=>{
    const{table, data} = req.body;
    const id = data.id;
    delete data.id;

    // Ellenőrizd a konzolon, hogy benne van-e a 'pictures':
    console.log("Frissítendő adatok:", data);

    const keys = Object.keys(data);
    const values = Object.values(data);

    const setClause = keys.map(key => `${key} = ?`).join(", ");
    values.push(id);

    const query = `Update ${table} set ${setClause} where id = ?`;

    db.query(query,values,(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).send("Database error");
        }
        // Itt küldjünk vissza sikeres választ, amit a frontend lekezel
        res.json({success: true, message: "Successful update"});
    });
};