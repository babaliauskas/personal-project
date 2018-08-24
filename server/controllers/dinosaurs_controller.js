module.exports = {
    get: (req, res) => {
        const db = req.app.get('db');

        db.join_table()
        .then(dinosaurs => res.status(200).send(dinosaurs))
        .catch(err => console.log(err))
    },

    
    getStore: (req,res) => {
        const db = req.app.get('db');
        
        // const { category } = req.query
        db.storeGetAll()
        // db.asquery([category])
        .then(store => res.status(200).send(store))
        .catch(err => console.log(err) )
    },




    getHats: (req,res) => {
        const db = req.app.get('db');
        let item = req.params.item
        console.log(item)
        if(item === "all") {
            db.storeGetAll()
            .then(store => res.status(200).send(store))
            .catch(err => console.log(err) )
        } else {
            db.select_hats(item)
            .then(store => res.status(200).send(store))
            .catch(err => console.log(err) )
        }
    }
}