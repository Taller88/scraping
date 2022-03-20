const {JsonDB} = require('node-json-db');
const {Config} = require('node-json-db/dist/lib/JsonDBConfig');

const User =class{
    db;
    constructor(){
        this.db= new JsonDB(new Config("db/database", true, false, "/"))
    }
    find(phoneNum){
        console.log(phoneNum)
        const data = this.db.getData("/user");
        const test = this.db.getIndex("/user",phoneNum);
        console.log(JSON.stringify(test));
        let result = {};
        for(var i =0; i<data.length; i++){
            const temp = data[i];
            if(temp[phoneNum]){
                result= temp[phoneNum];
            }
        }
        
        return result;
    }
    create(phoneNum, name, birth, email){
        this.db.push("/user[]/"+phoneNum+"/", {
            id:phoneNum,
            name:name,
            birth:birth,
            email:email
        },false);
        this.db.save();
        this.db.reload();
    }

}

module.exports = User;