const Hometax = require("./hometax");
const {base64Encoding} = require("../common/commonFunc");
const dotenv = require('dotenv');
dotenv.config();
describe("[간편로그인] 정상 function test",()=>{
    

    // test('[간편로그인] 정상 데이터 로그인 테스트', async()=>{
    //     const userName = base64Encoding(process.env.NAME);
    //     const userPhone = process.env.PHONENUM
    //     const birth = process.env.BIRTH
    //     const result = await Hometax.prototype.간편로그인(userName, userPhone, birth);
    //     console.log(result['resultCode'])
    //     expect(result['resultCode']).toBe("200");
    // });
  
    test('[간편로그인] 입력 데이터 오류  로그인 테스트: 이름 not base64 encoding', async()=>{
        const userName = process.env.NAME;
        const birth = process.env.BIRTH
        const userPhone = process.env.PHONENUM
        const result = await Hometax.prototype.간편로그인(userName, userPhone, birth);
        console.log(result['resultMsg'])
        expect(result['resultCode']).toEqual(500);
    });
    
      
    test('[간편로그인] 입력 데이터 오류  로그인 테스트:  생년월일, 연락처 오류', async()=>{
        const userName = base64Encoding(process.env.NAME);
        const birth = "19930101"
        const userPhone = "01012341234"
        const result = await Hometax.prototype.간편로그인(userName, userPhone, birth);
        console.log(result['resultMsg'])
        expect(result['resultCode']).toBe("401");
    });
  
})