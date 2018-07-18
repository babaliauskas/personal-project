module.exports = {
    add: (req, res) => {
            const db = req.app.get('db');
            const {img, price} = req.body
    
             db.add_dinosaurs_cart([img, price, +req.session.user.id])
            .then(response => res.status(200).send(response))
            .catch(err => console.log(err))
    },
    get: (req, res) => {
        const db = req.app.get('db')

        db.dinosaurs_cart()
        .then(response => res.status(200).send(response))
        .catch(err => console.log(err))
    },
    delete: (req,res) => {
        
        const db = req.app.get('db')
        const {id, cartid} = req.params

        db.delete_item([id, cartid])
        
        .then(response =>  res.status(200).send(response))
        .catch(err => console.log(err))
    },

    update: (req, res) => {
        const db = req.app.get('db')
        const { id, quantity } = req.params

        db.update_quantity([ id, quantity ])
        .then(response => res.status(200).send(response))
        .catch(err => console.log('aaaaaaaaaaaaaaaaaa', err))
    }
}