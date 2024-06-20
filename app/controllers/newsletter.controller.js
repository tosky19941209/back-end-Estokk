const db = require('../models')
// const sendEmail = require('./auth.controller').sendEmail;
const Newsletter = db.newsletter



exports.createNewsletter = (req, res) => {
    Newsletter.findOne({
        where: {
          email: req.body.email,
        }
      }).then(record => {
          console.log(record,'first record')
        if (!record) {

           Newsletter.create(req.body).then(email => {
            console.log(email,'second record')
                if (email) {
                    res.status(200).send({
                        message: 'You have successfully subscribed to our Newsletter'
                    })
                } else {
                    res.status(400).send({
                        message: 'Please try again.'
                    })
                }
            }).catch(err => {
                res.status(500).send({ message: 'Server error' })
            })
        }
        else
        {
            res.status(200).send({
                message: 'You have already subscribed to our Newletter.'
            })
        }
      })
}

exports.getNewsLetter = (req, res) => {
    const count = Number(req.query.count) ? Number(req.query.count) : 5000
    Newsletter.findAll({
        limit: count,
      }).then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res.status(500).json({ message: err.message })
      })
}


