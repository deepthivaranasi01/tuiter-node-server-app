import * as usersDao from "./users-dao.js";


const updateUser = async (req, res) => {
  const id = req.params.uid;
  const status = await usersDao.updateUser(id, req.body);
  const user = await usersDao.findUserById(id);
  req.session["currentUser"] = user;
  res.json(status);
};
const deleteUser = async (req, res) => {
  const userId = req.params.uid;
  const status = await usersDao.deleteUser(id);
  res.json(status);
};
const createUser = async (req, res) => {
  const newUser = await usersDao.createUser(req.body);
 //newUser._id = new Date().getTime().toString();
 //users.push(newUser);
  console.log("loginsuerss"+users);
  res.json(newUser);
};
const findUserById = async (req, res) => {
  const id = req.params.id;
  const user = await usersDao.findUserById(id);
  res.json(user);
};
const findUsers = async (req, res) => {
  const allUsers = await usersDao.findAllUsers();
  res.json(allUsers);
};


const UserController = (app) => {
  app.get('/api/users', findUsers);
  app.get('/api/users/:uid', findUserById);
  app.post('/api/users', createUser);
  app.delete('/api/users/:uid', deleteUser);
  app.put('/api/users/:uid', updateUser);
};




export default UserController;