let main = (req,res)=>{
    console.log(req.session)
    res.render('index.html',{
        userid: req.session.uid,
        isLogin: req.session.islogin
    })
}

exports.main = main;