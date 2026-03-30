var qr=require('qrcode');
var express=require("express");
var path=require('path');
const port=3000;
var app=express();

app.use(express.json());
app.use(express.static(__dirname));
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post("/generate",(req,res)=>{
    const { type, data}=req.body;
    let qrData;
    switch(type){
        case "URL":
            qrData=data;
            break;
        case "Phone Number":
            qrData=`tel:${data}`;
            break;
        case "SMS":
            qrData=`SMSTO:${data}?body="Hi"`;
            break;
        case "Plain Text":
            qrData=data;
            break;
    }
    let qrImage;
    console.log(qrData);
    qr.toDataURL(qrData,(err,url)=>{
        if (err) throw err;
        qrImage=url;
        res.json({qrImage});
    });
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}.`);
});