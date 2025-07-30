import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ _id: userId }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {});

  return token;
};
