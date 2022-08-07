import { createContact, deleteContact, getContact, updateContact } from "../controllers/contact.controller.js";
import express from "express";

const router = express.Router();

router.post("/createContact", createContact);
router.get("/getContact/:id", getContact);
router.post("/updateContact/:id", updateContact);
router.delete("/deleteContact/:id", deleteContact);


export default router;
