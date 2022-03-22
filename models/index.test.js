const User = require("./index");
const dotenv = require('dotenv');
dotenv.config();

const user = new User();
describe("[Database] Test",()=>{
    test('[Insert] ', ()=>{
        const userName = process.env.NAME;
        const birth = process.env.BIRTH
        const userPhone = process.env.PHONENUM;
        const email = process.env.EMAIL;
        console.log(userPhone)
        user.insert(userPhone,userName, birth, email );
    });

});