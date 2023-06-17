import { body, validationResult } from "express-validator";
import { studentRepository, userRepository } from "../repositories/index.js";
import HttpStatusCode from "../exceptions/httpStatusCode.js";
import { MAX_RECORDS } from "../global/constants.js";
async function getAllStudents(req, res) {
  try {
    let { page = 1, size = MAX_RECORDS, searchString = "" } = req.query;
    size = size >= MAX_RECORDS ? MAX_RECORDS : size;
    let filteredStudents = await studentRepository.getAllStudents({
      size,
      page,
      searchString,
    });
    res.status(HttpStatusCode.OK).json({
      message: "get all students successfully",
      size: filteredStudents.length,
      page,
      searchString,
      data: filteredStudents,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
}

async function getStudentsById(req, res) {
  let studentId = req.params.id.toString();
  try {
    const student = await studentRepository.getDetailStudent(studentId);
    res.status(HttpStatusCode.OK).json({
      message: "get detail students successfully",
      data: student,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
}

async function updateStudent(req, res) {
  const { id, name, email, languages, gender, phoneNumber, address } = req.body;
  try {
    const student = await studentRepository.updateStudent(req.body);
    res.status(HttpStatusCode.OK).json({
      message: "update student successfully",
      data: student,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
}

async function insertStudent(req, res) {
  try {
    const student = await studentRepository.insertStudent(req.body);
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "insert student successfully ",
      data: student,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "cannot insert student" + exception,
      validationErrors: exception.validationErrors,
    });
  }
}

async function generateFakeStudents(req, res) {
  const student = await studentRepository.generateFakeStudents(req.body);
  res.status(HttpStatusCode.INSERT_OK).json({
    message: "insert fake student successfully ",
    data: student,
  });
}

export default {
  getAllStudents,
  getStudentsById,
  updateStudent,
  insertStudent,
  generateFakeStudents,
};
