const usersModel = require("../models/usersModel.js");

const apiController= {
    getUsersApi: async (req, res) => {
        try {
          const result = await usersModel.getUsers();
          let users = []
         result.forEach(user=> users.push({
             id:user.id,
             user_name: user.name,
             user_email: user.email,
             user_url_detail:`https://gabook.herokuapp.com/api/user/${user.id}`
            }))
          res.status(200).json({count:result.length, users})         
        } catch (error) {
          res.status(404).json("No se encontraron datos");
        //   console.log(error);
        }
      },

      getUserApi: async function (req, res) {
        try {
          const user = await usersModel.getUserDetail(req.params.id);
          let userImage = user.image;
          const user_detail = {
            id:user.id,
            name: user.name,
            last_name: user.last_name,
            email: user.email,
            image: `https://gabook.herokuapp.com/images/users/${userImage}`,
          };
          res.status(200).json(user_detail)  
        } catch (error) {
            res.status(404).json("No se encontraron datos");
        //   console.log(error);
        }
      },
}

module.exports = apiController;