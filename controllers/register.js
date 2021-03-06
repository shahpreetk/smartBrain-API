const handleRegister = (bcrypt,db) =>(req,res)=> {
    const {
        email,
        name,
        password
    } = req.body;
    if(!email||!password||!name){
        return res.status(400).json('please fill all details ');
    }
    var hash=bcrypt.hashSync(password);
        db.transaction(trx=>{
            trx.insert({
                hash:hash,
                email:email
            })
            .into('login')
            .returning('email')
            .then(loginEmail=>{
                return trx('users')
                .returning('*')
                .insert({
                    email:loginEmail[0],
                    name:name,
                    joined:new Date()
                })
                    .then(user=>{
                        res.json(user[0]);
                    }) 
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
            .catch(err=> res.status(404).json('unable to register vroom'))
    
}

module.exports={
    handleRegister:handleRegister
};