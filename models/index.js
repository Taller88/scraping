const {JsonDB} = require('node-json-db');
const {Config} = require('node-json-db/dist/lib/JsonDBConfig');

const User =class{
    db;
    constructor(){
        this.db= new JsonDB(new Config("db/database", true, false, "/"));
        this.db.push("/user[]",{},true);
        // this.db.push("/user[]",{
        //     id:"01011111111",
        //     name:"정진우",
        //     birth:"930616"
        // },true)
    }
    select(phoneNum){
        // const data = this.db.getData("/user");
        // const test = this.db.getIndex("/user","phoneNum",phoneNum);
        // const test1 = this.db.getData("/user/"+phoneNum);
        
        // return 1 / -1
        const idx = this.db.getIndex("/user",phoneNum);
        var result = {}
        if(idx !== -1){
            result['resultCode'] = 1
            result['data'] = this.db.getData("/user["+idx+"]");
        }else{
            result["resultCode"] = -1 // 존재하지 않는 사용자
            result['data'] = {};
        }
        

        // console.log(test);
        // console.log(JSON.stringify(test));
        // console.log(JSON.stringify(test1));
        
        return result;
    }
    insert(phoneNum, name, birth, email){
        // const result = this.db.push("/user[]/"+phoneNum+"/", {
        //     id:phoneNum,
        //     name:name,
        //     birth:birth,
        //     email:email
        // },false);
        const idx = this.db.getIndex("/user",phoneNum);
        var result = {};
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

module.exports = User;