import express from "express";
import { studentController } from "../controllers/index.js";

const router = express.Router();

router.get("", studentController.getAllStudents);

router.get("/:id", studentController.getStudentsById);

router.patch("", studentController.updateStudent);

router.post("/", studentController.insertStudent);

// router.post("/generateFakeStudents", studentController.generateFakeStudents);

export default router;
