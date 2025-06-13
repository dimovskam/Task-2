const validateSchema = require("../helper/validareSchema")
const { courseCreate } = require("../pkg/courses/validate")
const {getCourses, createCourse, updateCourse, removeCourse} = require ("./../pkg/courses/courses")

const getAllCourses = async (req, res) => {
    try{
        const courses = await getCourses()
        return res.status(200).send(courses)
    }catch(err){
        console.log(err)
        return res.status(500).send("Internal server error!")
    }
}

const createNewCourse = async (req, res) => {
    try{
        const data = {
            ...req.body,
            academy
    }
    await validateSchema(req.body, courseCreate)
    const newCourse = await createCourse(data)
    return res.status(200).send(newCourse)
    }catch(err){
        console.log(err)
        return res.status(500).send("Internal server error!")
    }
}

