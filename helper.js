const jwt = require('jsonwebtoken');

const verifyContextToken =  async (req)=>{
    let authToken = null;

      authToken = req.headers.authorization;

    //   if (authToken) {
    //     jwt.verify(authToken, secret, (err, decoded)=>{
    //       if (err) {
    //         authToken = false; 
    //     } else {
    //         authToken = true; 
    //     }
    //     })
    //   }
     resp="verify"

    return {
      resp
    };
}
module.exports ={verifyContextToken}