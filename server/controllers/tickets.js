module.exports =  {
    add: (req, res) => {
        const db = req.app.get('db');
        const { daypass, startingdate, price, name, lastname } = req.body

        db.dinosaurs_tickets([daypass, startingdate, price, name, lastname, +req.session.user.id ])
        .then(response => res.status(200).send(response))
        .catch(err => console.log(err))
    },
    get: (req, res) => {
        const db = req.app.get('db');
        
        db.get_tickets([+req.session.user.id])
        .then(response => res.status(200).send(response))
        .catch(err => console.log(err))
    }
}