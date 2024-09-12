export const generateAccessToken = (userData) => {};

export const generateRefreshToken = (userData) => {};

// userSchema.methods.generateAuthToken = async function () {
//   const user = this;
//   const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
//   user.tokens = user.tokens.concat({ token });
//   await user.save();
//   return token;
// };
