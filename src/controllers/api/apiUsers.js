const usersModel = require("../../models/usersModel.js");

const apiController = {
  getUsersApi: async (req, res) => {
    try {
      const result = await usersModel.getUsers();
      let users = [];
      result.forEach((user) =>
        users.push({
          id: user.id,
          user_name: user.name,
          user_email: user.email,
          user_url_detail: `https://gabook.herokuapp.com/api/user/${user.id}`,
        })
      );
      res.status(200).json([{count: result.length}, {users} ]);
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
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        image: `https://gabook.herokuapp.com/images/users/${userImage}`,
      };
      res.status(200).json(user_detail);
    } catch (error) {
      res.status(404).json("No se encontraron datos");
      //   console.log(error);
    }
  },

  paginationUsersApi: async (req, res) => {
    try {
      const pageNum = Number.parseInt(req.query.page);
      const sizeNum = Number.parseInt(req.query.size);

      // console.log(pageNum);

      let page = 0;
      if(!Number.isNaN(pageNum) && pageNum > 0) page = pageNum;
      
      let size = 10;
      if(!Number.isNaN(sizeNum) && sizeNum > 0 && sizeNum < 10) size = sizeNum;

      const users = await usersModel.paginationUsers(page, size);
      // console.log(users);

      const content = users.content.map(user => {
        const userImage = user.image;
        delete user.password;
        delete user.role;
        user.image = `https://gabook.herokuapp.com/images/users/${userImage}`
        return user;
      })

      // console.log(content);
      // console.log(users.total_pages-1);
      // console.log(page);

      res.status(200).json({ 
        total_users: users.total_users,
        total_pages: users.total_pages,
        previous: (page > 0 && page <= users.total_pages - 1) 
          ? `https://gabook.herokuapp.com/api/users/pags?page=${ page - 1 }`
          : null,
        next: (page >= 0 && page < users.total_pages - 1) 
          ? `https://gabook.herokuapp.com/api/users/pags?page=${ page + 1 }`
          : null,
        content 
      });

    } catch (error) {
      res.status(404).json("No se encontraron datos");
    }
  },

};

module.exports = apiController;
