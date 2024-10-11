const express = require("express");
const app= express();

const users= [{
  name: "preetesh",
  kidney:[{
    healthy:false
  }]
}];
app.use(express.json());
app.get("/",function(req,res){
  const preetkidney = users[0].kidney;
  const numberofkidneys= preetkidney.length
  let numberofhealthykidneys=0;
  for (let i = 0; i<preetkidney.length;i++){
    if(preetkidney[i].healthy){
      numberofhealthykidneys=numberofhealthykidneys+1;
    }
  }
  const numberofunhealthykidneys=numberofkidneys-numberofhealthykidneys;
  res.json({
    numberofunhealthykidneys,
    numberofhealthykidneys,
    numberofkidneys
  })
})
app.post('/', function (req, res) {
  const ishealthy = req.body.ishealthy;
  users[0].kidney.push({
    healthy:ishealthy
  })
  res.json({
    msg:"done"
  })
})


app.put('/', function(req, res) {
  for (let i = 0; i < users[0].kidney.length; i++) {
    users[0].kidney[i].healthy=true;
    
  }
  res.json({});
})
app.delete('/', function(req, res) {
  if(isatleastoneunhealtykidney()){
  const newKidneys = [];
  for(let i=0;i<users[0].kidney.length;i++){
    if(users[0].kidney[i].healthy){
      newKidneys.push({
        healthy:true
      })
    }
  }
  users[0].kidney=newKidneys;
  res.json({msg:"done"});}
  else{
    res.status(411).json({
      msg:"you are healthy nigga"
    })
  }
})
function isatleastoneunhealtykidney() {
  let atleastoneunhealtykidney=false;
  for(let i=0;i<users[0].kidney.length;i++){
    if(!users[0].kidney[i].healthy){
      atleastoneunhealtykidney=true;
      }
    }
    return atleastoneunhealtykidney;
  }
  



app.listen(3000)