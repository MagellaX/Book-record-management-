const { UserModel } = require("../models");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getSingleUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) throw new Error("User not found");
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) throw new Error("User not found");
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body.data, { new: true });
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

exports.createNewUser = async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getSubscriptionDetailsById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) throw new Error("User not found");

    const getDateInDays = (data) => {
      let date;
      if (!data) {
        date = new Date();
      } else {
        date = new Date(data);
      }
      return Math.floor(date / (1000 * 60 * 60 * 24));
    };

    const subscriptionType = (user) => {
      let subscriptionExpiration = getDateInDays(user.subscriptionDate);
      if (user.subscriptionType === "Basic") {
        subscriptionExpiration += 90;
      } else if (user.subscriptionType === "Standard") {
        subscriptionExpiration += 180;
      } else if (user.subscriptionType === "Premium") {
        subscriptionExpiration += 365;
      }
      return subscriptionExpiration;
    };

    let currentDate = getDateInDays();
    let subscriptionExpiration = subscriptionType(user);

    const subscriptionDetails = {
      ...user.toObject(),
      subscriptionExpired: subscriptionExpiration < currentDate,
      daysLeftForExpiration: subscriptionExpiration - currentDate,
    };

    res.status(200).json({ success: true, data: subscriptionDetails });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
