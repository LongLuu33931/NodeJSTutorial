import { Student } from "../models/index.js";
import HttpStatusCode from "../exceptions/httpStatusCode.js";
import Exception from "../exceptions/exceptions.js";
import { faker } from "@faker-js/faker";
import { print } from "../helpers/print.js";
import student from "../models/student.js";
const getAllStudents = async ({ page, size, searchString }) => {
  //aggregate dât for all students
  page = parseInt(page);
  size = parseInt(size);
  //searchString? name,email,address contains searchString

  let filteredStudents = await Student.aggregate([
    {
      $match: {
        $or: [
          {
            name: { $regex: `.*${searchString}.*`, $options: "i" }, //ignore case
          },
          {
            email: { $regex: `.*${searchString}.*`, $options: "i" }, //ignore case
          },
          {
            address: { $regex: `.*${searchString}.*`, $options: "i" }, //ignore case
          },
        ],
      },
    },
    {
      $skip: (page - 1) * size,
    },
    { $limit: size },
  ]);

  return filteredStudents;
};

const getDetailStudent = async (studentId) => {
  const student = await Student.findById(studentId);
  if (!student) {
    throw new Exception("Cannot find student with id " + studentId);
  }
  return student;
};

const insertStudent = async ({
  name,
  email,
  languages,
  gender,
  phoneNumber,
  address,
}) => {
  // console.log("insert student");
  try {
    debugger;
    const student = await Student.create({
      name,
      email,
      languages,
      gender,
      phoneNumber,
      address,
    });
    return student;
  } catch (exception) {
    if (!!exception.errors) {
      throw new Exception("Input error", exception.errors);
    }
    debugger;
  }
};

const updateStudent = async ({
  id,
  name,
  email,
  languages,
  gender,
  phoneNumber,
  address,
}) => {
  try {
    const student = await Student.findById(id);
    student.name = name ?? student.name;
    student.email = email ?? student.email;
    student.languages = languages ?? student.languages;
    student.gender = gender ?? student.gender;
    student.phoneNumber = phoneNumber ?? student.phoneNumber;
    student.address = address ?? student.address;
    await student.save();
    return student;
  } catch (exception) {
    if (!!exception.errors) {
      throw new Exception("Input error", exception.errors);
    }
  }
};
const generateFakeStudents = async () => {
  let fakeStudents = [];
  for (let i = 0; i < 1000; i++) {
    let fakeStudent = {
      name: `${faker.person.fullName()}-fake`,
      email: faker.internet.email(),
      languages: [
        faker.helpers.arrayElement(["English", "Vietnamese", "French"]),
        faker.helpers.arrayElement(["Spanish", "Japanese", "Korean"]),
      ],
      gender: faker.helpers.arrayElement(["Male", "Female"]),
      phoneNumber: faker.phone.number("+84##########"),
      address: faker.location.streetAddress(),
    };
    fakeStudents.push(fakeStudent);
  }
  await Student.insertMany(fakeStudents);
};

export default {
  getAllStudents,
  getDetailStudent,
  insertStudent,
  updateStudent,
  generateFakeStudents,
};
