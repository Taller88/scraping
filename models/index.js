const {JsonDB} = require('node-json-db');
const {Config} = require('node-json-db/dist/lib/JsonDBConfig');

const User =class{
    // db;
    constructor(){
        this.db= new JsonDB(new Config("db/database", true, false, "/"));
        // this.db.push("/user[]",{},true);
       
    }
    select(phoneNum){
        const idx = this.db.getIndex("/user",phoneNum);
        var result = {}
        if(idx !== -1){
            result['resultCode'] = 1
            result['data'] = this.db.getData("/user["+idx+"]");
        }else{
            result["resultCode"] = -1 // 존재하지 않는 사용자
            result['data'] = {};
        }
        
        return result;
    }
    insert(phoneNum, name, birth, email){
        var result = {};
        
        if(JSON.stringify(this.db.getData("/"))==="{}"){
            result['resultCode'] = 1
            result['data'] = this.db.push("/user[]", {
                id:phoneNum,
                name:name,
                birth:birth,
                email:email
            },true);
            return result;
        }else{
            const idx = this.db.getIndex("/user",phoneNum);
            if(idx === -1){
                result['resultCode'] = 1
                result['data'] = this.db.push("/user[]", {
                    id:phoneNum,
                    name:name,
                    birth:birth,
                    email:email
                },true);
            }else{
                result["resultCode"] = -1 // 이미 있는 사용자
                result['data'] = this.db.getData("/user["+idx+"]");
            }
          
            console.log("create result:"+ result);
            this.db.save();
            this.db.reload();
            // 위에 두개 필요한건지 check
            return result;
    
        }
    }

}

module.exports = User;