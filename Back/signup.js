import Employees from "../models/employees.js";
import UserModel from "../models/employees.js";
import bcrypt from "bcrypt";

export default async (req, res) => {
  const { Name, Password, Email } = req.body;
  try {
     if (await UserModel.findOne({ email })) {
       res.send({ err: "Email is Taken" });
     } else if (await UserModel.findOne({ username })) {
       res.send({ err: "Username is Taken" });
     } else {
       const salt = await bcrypt.genSalt();
       const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new employees({
       
        Name,
        Password,
        Email,
        
      });
      newUser.save();

      res.send({ msg: "Student added" });
     }
  } catch (err) {
    res.send({ err: "Database error" });
    console.log(err);
  }
};