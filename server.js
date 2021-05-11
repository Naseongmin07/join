const express = require('express')
const app = express()
const {sequelize, User} = require('./models')
const router = require('./routers/index')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')

app.set('view engine', 'html')
nunjucks.configure('views',{
    express: app
})

app.use(cors())

app.use(session({
    secret:'aaa',
    resave:false,
    saveUninitialized:true,
}))

app.use(bodyParser.urlencoded({extended:false}))

sequelize.sync({force:false})
.then(()=>{ // resolve
    console.log('DB접속이 완료되었습니다.')
})
.catch((err)=>{ // reject
    console.log(err)
})

app.use('/',router)
// app.get('/',async (req,res)=>{
//         User.create({
//         userid: 'wh5825',
//         userpw: '1234',
//         username : '곽인구',
//         gender : true,
//         userimage: 'no image',
//     })
//     res.send('hello world')

// })


app.listen(3000,()=>{
    console.log('server start port 3000')
})






    // User.create({
    //     userid: 'rh5825',
    //     userpw: '1234',
    //     username : '곽인구',
    //     gender : true,
    //     userimage: 'no image',
    // })

    // let userList = User.findAll({})
    // .then((result)=>{
    //     console.log(result)
    // })
    // .catch((error)=>{
    //     console.log(error)
    // })
    // ;

    // let userList = await User.findAll({})
    // console.log(userList)

    // let result = await User.update({
    //     userpw:'1234567',
    //     username:'곽인구1',
    //     gender:true,
    // },{
    //     where:{ 
    //         userid:'rh5825'
    //     }
    // })


    // User.destroy({
    //     where:{id:4}
    // })
