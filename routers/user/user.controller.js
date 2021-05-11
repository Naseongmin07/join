const {User} = require('../../models')
const Sequelize = require('sequelize')

let join = (req,res)=>{
    res.render('./user/join')
}

let login = (req,res)=>{
    let flag = req.query.flag;
    res.render('./user/login',{flag})
}

let info = async (req,res)=>{
    // let userList =await User.findAll({
    //     attributes:['id','userid','userpw','username','gender','userimage',
    //     [Sequelize.fn('date_format',Sequelize.col('userdt'), '%Y-%m-%d'),'userdt']]
    // })
    let userList = await User.findAll({})

    console.log(userList)
    res.render('./user/info',{
        userList : userList
    })
    // res.json({
    //     userList
    // })
}

let join_success = async (req,res)=>{
    let userid = req.body.userid
    let userpw = req.body.userpw
    let username = req.body.username
    let gender = req.body.gender
    let userimage = req.file == undefined ? '' : req.file.path;
    await User.create({
        userid, userpw, username, gender, userimage
    })
    res.render('./user/join_success',{
        userid:req.body.userid,
        username:req.body.username
    })
}

let login_check = async (req,res)=>{

    let result = await User.findOne({
        where:{
            userid: req.body.userid,
            userpw: req.body.userpw
        }
    })
    if(result == null){
        res.redirect('/user/login?flag=0')
    }
    else{
        req.session.uid = req.body.userid;
        req.session.islogin = true;
        req.session.save(()=>{
            res.redirect('/')
        })
    }
}

let logout = (req,res)=>{
    delete req.session.islogin;
    delete req.session.uid;

    req.session.save(()=>{
        res.redirect('/');
    })
}

let userid_check = async (req,res)=>{
    let result = await User.findOne({
        where:{
            userid: req.query.userid
        }
    })
    console.log(result)
    if(result==null){
        flag = true
    }
    else{
        flag = false
    }
    res.json({
        login: flag,
    })
}


module.exports ={
    join:join,
    login:login,
    info:info,
    join_success : join_success,
    login_check : login_check,
    logout :logout,
    userid_check: userid_check
}