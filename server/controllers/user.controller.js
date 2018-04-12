const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const saltRounds = 10
// const salt = bcrypt.genSaltSync(saltRounds)

module.exports = {
    register : function(req,res){

        // let hash = bcrypt.hashSync(req.body.password,salt)
        let newUser =  new User({
            email : req.body.email,
            password : req.body.password
        })
        newUser.save()
            .then(response=>{
              let token = jwt.sign(payload, process.env.SECRETKEY)
                res.status(200).json({
                    message : 'register success',
                    data : response,
                    token: token,
                })
            }).catch(err=>{
                res.status(500).json({
                    message : 'register failed',
                    err
                })
            })
    },

     login: function(req, res) {

        User.findOne({
            email: req.body.email
        }).then(data => {
          if (data !==null) {
            var result = bcrypt.compareSync(req.body.password, data.password);
            if (result) {
              let payload = {
                id: data.id,
                email: data.email,
              }
              let token = jwt.sign(payload, process.env.SECRETKEY)
              console.log(data+'TOKEEEN');
                  res.status(200).json({
                    message: 'login success',
                    id: data.id,
                    email: data.email,
                    token: token,
                  })
                //   console.log(process.env.SECRETKEY+' ini secrfet');

            } else {


              res.status(202).json({
                message: 'Wrong Username / Password'
              })
            }
          } else {
            res.status(202).json({
              message: 'Wrong Username / Password'
            })
          }
        }).catch(err => {
            console.log(err);

          res.status(500).json({
            message: 'Sign in failed'
          })
        })

      }
}
