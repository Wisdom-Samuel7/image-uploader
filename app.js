const express = require("express")
const app = express()
const multer = require("multer")
const bp = require("body-parser")
const path = require("path")
const img = require("./db.js")


app.use(express.static(path.join(__dirname, "imageupload")))
app.use(bp.json())
app.use(bp.urlencoded({extended: true}))
app.set("view engine","ejs")

const Storage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null,"./imageupload")
    },
    filename : (req,file,cb)=>{
        cb(null,file.originalname )
    }
})


  const upload = multer({
    storage : Storage,
    limits : {fileSize : 3000000},
    fileFilter : function(req,file,cb){
       fileReview(file,cb)
    }
  }).single("image")

// CHECKING FOR FILE REVIEW 
   function fileReview(file,cb){
       const filetypes = /jpeg|jpg|png|gif/
       const checkExt = filetypes.test(path.extname(file.originalname).toLowerCase())
       const mime = filetypes.test(file.mimetype)

    if(checkExt && mime){
      return cb(null,true)
    }else{
      cb("Error : IMAGES TO BE RENDERED")
    }

    }


  app.get("/",(req,res)=>{ 
    res.render("../views/home")
  })


  app.post("/",(req,res)=>{
    
    upload(req,res,(err) =>{
       if(err) {
        res.render("../views/upload",{msg:err})
         
       }else{
        if(req.file == undefined){
          res.render("../views/upload",{msg:"No File Uploaded"})   
          
        }else{
          res.render("../views/upload",
          { 
            msg:"Uploaded",
            file : `${req.file.filename}`,
            filename : `${req.file.filename}`,
            destination : `${req.file.destination}`,
            size : `${req.file.size}kb`,
            mime : `${req.file.mimetype}`,
            path : `${req.file.path}`,
         })   
          console.log(req.file)
        }
       }
  

    })


  })


app.listen(4000,()=>{
    console.log("SERVER RUNNING")
})

