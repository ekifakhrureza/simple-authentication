const express = require('express');
const {
  User
} = require('../models')
var bcrypt = require('bcrypt');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);
const jwt = require('jsonwebtoken')

function signUp(req, res) {
  var hash = bcrypt.hashSync(req.body.password, salt)

  let obj = {
    username: req.body.username,
    password: hash,
    role: req.body.role,

  }
  User.create(obj).then(data => {
    res.status(200).json({
      message: 'Add user success',
      obj
    })
  }).catch(err => {
    res.status(500).json({
      message: 'Add user failed',
      err
    })
  })
}


function signIn(req, res) {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(data => {

    if (data) {
      var result = bcrypt.compareSync(req.body.password, data.password);
      if (result) {
        let payload = {
          id: data.id,
          username: data.username,
          role : data.role
          // password: data.password
        }
        let token = jwt.sign(payload, 'rahasia dong')
            res.status(200).json({
              message: 'login success',
              token: token,
              id: data.id,
              username: data.username,
              role : data.role
              // password: data.password
            })

      } else {
        res.status(500).json({
          message: 'password incorrect'
        })
      }
    } else {
      res.status(200).json({
        message: 'Username not found'
      })
    }
  }).catch(err => {
    res.status(500).json({
      message: 'Sign in failed'
    })
  })

}


function viewAll(req, res) {
  User.findAll()
    .then(data => {
      res.status(200).json({
        message: 'List user :',
        data
      })
    }).catch(err => {
      res.status(500).json({
        message: 'Cannot find user data',
        err
      })
    })
}


function viewUser(req, res) {
  User.findById(req.params.id)
    .then(data => {
      res.status(200).json({
        message: 'Get specific user :',
        data
      })
    }).catch(err => {
      res.status(500).json({
        message: 'Cannot find user data',
        err
      })
    })
}



function addUser(req, res) {
  let obj = {
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  }
  User.create(obj).then(data => {
    res.status(200).json({
      message: 'Add user success',
      obj
    })
  }).catch(err => {
    res.status(500).json({
      message: 'Add user failed',
      err
    })
  })
}

function editUser(req, res) {
  let obj = {
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  }
  User.update(obj, {

    where: {
      id: req.params.id
    }
  }).then(data => {
    res.status(200).json({
      message: 'edit user success',
      obj
    })
  }).catch(err => {
    res.status(500).json({
      message: 'edit user failed',
      err
    })
  })
}


function updateUser(req, res) {
  let obj = {
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  }
  User.update(obj, {

    where: {
      id: req.params.id
    }
  }).then(data => {
    res.status(200).json({
      message: 'update user success',
      obj
    })
  }).catch(err => {
    res.status(500).json({
      message: 'update user failed',
      err
    })
  })
}

function deleteUser(req, res) {
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => {
    res.status(200).json({
      message: 'delete user success',
      data
    })
  }).catch(err => {
    res.status(500).json({
      message: 'delete user failed',
      err
    })
  })
}




module.exports = {
  signUp,
  signIn,
  viewUser,
  viewAll,
  addUser,
  editUser,
  deleteUser,
  updateUser
};
