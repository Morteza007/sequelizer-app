const express = require('express')
const User = require('../models/user')
//const auth = require('../middelware/auth')
const router = new express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

router.post('/users', async (req,res)=>{
//   const user = new User(req.body)
    try{
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: (await bcrypt.hash(req.body.password, 8)).toString()
        })
        const token = generateAuthToken(req.body.email)
        res.status(201).send({token})
    } catch(error){
        console.log(error)
        res.status(400).send(error)
    }
})

const generateAuthToken =  function (input){
    const token = jwt.sign(input, 'mortezaesmaeili123456789',{})
    return token
}

router.post('/users/login', async (req,res) => {
    try{
        const user = await User.findOne({
            where: {
                email: req.body.email,
            }
        })
        if(user){
            const isMatched = await bcrypt.compare(req.body.password, user.password)
            if(isMatched){
                const token = await generateAuthToken(req.body.email)
                res.send({user,token})
            }else{
                throw "error: Invalid login operation 1!"
            }
            
        }
        else{
            throw "error: Invalid login operation 2!"
        }
    }catch(Error){
        console.log(Error)
        res.status(400).send(Error)

    }
})
/*

router.post('/users/logout', auth, async(req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    }catch(r){
        res.status(500).send()

    }
})

router.post('/users/logoutAll', auth, async (req, res) =>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(error){
        res.status(500).send()
    }
})

// router.get('/users', auth, (req,res)=>{
//     User.find({}).then((users) => {
//         res.send(users)
//     }).catch((error) => {
        
//         res.status(404).send(error)
//     })
// })

router.get('/users/me', auth, (req,res)=>{
    res.send(req.user)
})

// router.get('/users/:id', (req,res) => {
//     const _id = req.params.id
//     User.findById(_id).then((user) => {
//         if(!user){
//             return res.status(404).send()
//         }
//         res.status(200).send(user)
//     }).catch((error) => {
//         res.status(400).send(error)
//     })
// })

router.patch('/users/me', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ['name','email','password','age']
    const isValidOperation = updates.every((update) => allowedUpdate.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid update!'})
    }
    try{
        
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
 
        res.send(req.user)
    } catch(error){
        console.log(error)
        res.status(400).send(error)
    }
})

router.delete('/users/me', auth, async(req,res) => {
    try{
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send()
        // }

        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

*/


module.exports = router