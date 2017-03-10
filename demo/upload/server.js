var express=require("express");
var fs=require("fs");
var fileUpload  = require('express-fileupload');
var app=express();
app.use(fileUpload());
app.get("/index.html", function (req,res) {
    res.sendFile(__dirname+"/index.html");
});
app.post("/index.html", function (req,res) {
    var file=req.files.myfile.data;
    console.log("path 1 : ", file)
    console.log("path 2 : ", file.path)
    fs.writeFile(__dirname + req.files.myfile.name, file, function (err) {
        if(err) res.send("写文件操作失败.");
        else res.send("文件上传成功");
    })
    // fs.readFile(__dirname + req.files.myfile.name, function (err,data) {
    //     if(err) res.send("读文件操作失败");
    //     else{
    //
    //     }
    // });
});


app.listen(1337,"127.0.0.1", function () {
    console.log("开始监听");
});