import { redis } from "../connection/redis.connect.js";

const addUserController = async function (req, res) {
   try {
      const { userName } = req.body;
      if (!userName) throw new Error("UserName Not Filed it ");
      console.log(userName)
      const joinedUser = await redis.set(`joinUser`, userName);
      return res.status(201).json({ join: joinedUser });
   } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({ message: error.message });
   }
};

const showUserController = async function (req,res) {
   try {
      const allUser = await redis.get("joinUser");
      console.log(allUser)
      if(!allUser) throw new Error("Join User Not Showing !")
      return res.status(200).json({user:allUser});
   } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({ message: error.message });
   }
}

const deleteJoinUserController = async function (req,res){
   try {

      
   } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({ message: error.message });
   }
}


export { addUserController, showUserController }