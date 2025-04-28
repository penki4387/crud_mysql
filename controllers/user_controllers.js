import UserServices from "../services/user_services.js";

export default class userControllers{

    createUser(req,res,next){
        UserServices.prototype.createUser(req.body).then(result=>{
            res.json(result)
        }).catch(err=>next(err))
    }

    updateUser(req,res,next){
        UserServices.prototype.updateUser(req.body,req.params.id).then(result=>{
            res.json(result)
        }).catch(err=>next(err))
    }

    loginUser(req,res,next){
        UserServices.prototype.loginUser(req.body).then(result=>{
            res.json(result)
        }).catch(err=>next(err))
    }
    
    getAllUsers(req,res,next){
        UserServices.prototype.getAllUsers().then(result=>{
            res.json(result)
        }).catch(err=>next(err))
    }
    deleteUser(req,res,next){
        UserServices.prototype.deleteUser(req.params.id).then(result=>{
            res.json(result)
        }).catch(err=>next(err))
    }
    getUserById(req,res,next){
        UserServices.prototype.getUserById(req.params.id).then(result=>{
            res.json(result)
        }).catch(err=>next(err))
    }
}