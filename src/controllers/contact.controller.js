import contactModel from "../models/contact.model.js";
import { HttpException } from "../exception/HttpException.js";
import validator from "validator";

export const createContact = async (req, res, next) => {
  try {
    const { first_name, last_name, email, mobile_number } = req.body;
    if (!validator.isEmail(email))
      throw new HttpException(400, "Please enter a valid email");
    if (!validator.isMobilePhone(mobile_number, ["en-IN"]))
      throw new HttpException(400, "Please enter a valid mobile number");
    if (!first_name || !last_name)
      throw new HttpException(400, "Please enter a name");
    const isEmailExist = await contactModel.findOne({ email });
    if (isEmailExist)
      throw new HttpException(400, "Please enter a unique email");
    const isNumberExist = await contactModel.findOne({ mobile_number });
    if (isNumberExist)
      throw new HttpException(400, "Please enter a unique mobile number");
    const contact = await contactModel.create({
      first_name,
      last_name,
      email,
      mobile_number,
    });
    res.status(200).json({
      data: contact,
      message: "Contact created",
    });
  } catch (error) {
    next(error);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const isContactExist = await contactModel.find({ _id: id });
    if (!isContactExist) throw new HttpException(400, "Contact does not exist");
    res.status(200).json({
      data: isContactExist,
      message: `Contact Details`,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { email, mobile_number } = req.body;
    const isUserExist = await contactModel.findOne({ _id: id });
    if (!isUserExist) throw new HttpException(400, "Contact does not exist");

    if (email) {
      if (!validator.isEmail(email))
        throw new HttpException(400, "Please enter a valid email");
      const isEmailExist = await contactModel.findOne({ email });
      if (isEmailExist)
        throw new HttpException(400, "Please enter a unique email");
    }
    if (mobile_number) {
      if (!validator.isMobilePhone(mobile_number, ["en-IN"]))
        throw new HttpException(400, "Please enter a valid mobile number");
      const isNumberExist = await contactModel.findOne({ mobile_number });
      if (isNumberExist)
        throw new HttpException(400, "Please enter a unique mobile number");
    }
    const updateContact = await contactModel.findByIdAndUpdate(
      { _id: id },
      {
        email: email || isUserExist.email,
        mobile_number: mobile_number || isUserExist.mobile_number,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      data: updateContact,
      message: "Update contact",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteContact = await contactModel.findByIdAndRemove({ _id: id });
    if (!deleteContact) throw new HttpException(400, "Contact does not  exist");
    res.status(200).json({ data: deleteContact, message: "Contact deleted" });
  } catch (error) {}
};
