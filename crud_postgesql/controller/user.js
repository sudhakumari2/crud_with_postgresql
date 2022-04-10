const user = require('../model/user')
const Joi = require('joi');
const Bcrypt = require('bcrypt');
const client = require('../connection/database');
const users = client.Users
const create = async(req, res)=>{
    const Data = Joi.object({
        Name: Joi.string()
            .min(5)
            .max(30)
            .required(),
        Email: Joi.string()
            .min(5)
            .max(50)
            .required(),
        password: Joi.string()
            .min(5)
            .max(40)
            .required()
    })
    let userpayload 
    const validateSchema = Data.validate(req.body)
    if(validateSchema.error){
        return res.status(400).json({
            massage: validateSchema.error.massage || "Bad Request",
            code: 400
        })
    }
    else{
        userpayload = validateSchema.value
    }
    try{
        userpayload = {
            Name: userpayload.Name,
            Email: userpayload.Email,
            password: Bcrypt.hashSync(userpayload.password,10)
        }
        const result = await users.create(userpayload)
            // console.log(result);
            return res.status(201).send({
                massage: "user added successfully",
                status: 201,
                data: result
            })
        // const exits = await user.FINDONE({ where: { Email: userpayload.Email }})
        // if (exits) {
        //     return res.status(422).send({
        //         massage: "user already exits",
        //         status: 422,
        //         data: exits

        //     })
        // }
        // else {
            
        // }

    }
    catch(err){
        // console.log(err)
        return res.status(500).json({
            massage: 'internal server Error',
            status: 500
        })
    }
    
    
}
const getdata = async(req, res)=>{
    try{
        const data = await users.findAll()
        if(data){
            return res.status(200).send({
                massage:"find all Data",
                status: 200,
                deta:data
            })
        }
        else{
            return res.status(400).json({
                massage: 'Data not found ' || "Bad Request",
                status: 400
            })
        }
    }
    catch(err) {
        // console.log(err);
        return res.status(500).json({
            massage: 'internal server Error',
            status: 500
        })
    }
}

const update_data = async(req, res)=>{
    const Data = Joi.object({
        Name: Joi.string()
            .min(5)
            .max(30)
            .optional(),
        Email: Joi.string()
            .min(5)
            .max(50)
            .optional(),
        password: Joi.string()
            .min(5)
            .max(40)
            .optional()
    })
    let userpayload 
    const validateSchema = Data.validate(req.body)
    if(validateSchema.error){
        return res.status(400).json({
            massage: validateSchema.error.massage || "Bad Request",
            code: 400
        })
    }
    else{
        userpayload = validateSchema.value
    }
    try{
        const result = await users.update(userpayload,{where:{userId: req.params.userId}})
            // console.log(result);
        return res.status(201).send({
            massage: "user updated successfully",
            status: 201,
            data: result
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            massage: 'internal server error',
            status: 500
        })
    }
}

const delete_data = async(req, res)=>{
    try{
        const exits = await users.destroy({where: {userId: req.params.userId }})
        if(exits){
            return res.status(200).send({
                massage:"user data deleted successfully",
                status: 200,
            })
        }
        else{
            return res.status(400).json({
                message: "data not found",
                status:400
            })
        }
    }
    catch(err){
        return res.status(500).json({
            message: "internal server error",
            status: 400
        })
    }
}

module.exports = {create, getdata, update_data, delete_data}
