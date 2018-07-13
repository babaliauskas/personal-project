module.exports = {
    get: (req, res) => {
        const db = req.app.get('db');

        db.join_table()
        .then(dinosaurs => res.status(200).send(dinosaurs))
        .catch(err => console.log(err))
    },
}