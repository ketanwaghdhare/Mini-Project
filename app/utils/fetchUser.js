const User = require('../models/User.model.js');

async function fetchUser(id){
    try{
        const user = await User.findById({_id: id},{password:0});
        return user;
    }
    catch(err){
        // console.log(err)
        return false;
    }
}

module.exports = fetchUser;