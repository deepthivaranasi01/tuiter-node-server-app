import * as usersDao from "./users-dao.js";


var currentUserVar;
const AuthController = (app) => {
const register = async (req, res) => {
const username = req.body.username;
const user = await usersDao.findUserByUsername(username);
if (user) {
res.sendStatus(409);
return;
 }
 const newUser = await usersDao.createUser(req.body);
currentUserVar = newUser;
 res.json(newUser);
};

const login = async (req, res) => {
 const username = req.body.username;
const password = req.body.password;
const user = await usersDao.findUserByCredentials(username, password);
if (user) {
currentUserVar = user;
console.log("curruserhiossbjb"+currentUserVar)
res.json(user);
 } else {
res.sendStatus(404);
}
};

 const profile = async (req, res) => {
 const currentUser = currentUserVar
 console.log("curruser"+currentUser)
 console.log("auth-controllerprofile" + currentUser)
 if (!currentUser) {
 res.sendStatus(404);
 return;
 }
res.json(currentUser);
 };

 const logout = async (req, res) => {
 req.session.destroy();
 res.sendStatus(200);
 };

 const update = async (req, res) => {
    try {
      const currentUser = currentUserVar;
      if (!currentUser) {
        res.sendStatus(404);
        return;
      }
      currentUser.firstName = req.body.firstName;
      currentUser.lastName = req.body.lastName;
      const updatedUser = await usersDao.updateUser(currentUser);
      currentUserVar = updatedUser;
  
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.sendStatus(500);
    }
  };
  


 app.post("/api/users/register", register);
app.post("/api/users/login", login);
app.post("/api/users/profile", profile);
app.post("/api/users/logout", logout);
app.put("/api/users", update);
};
export default AuthController;