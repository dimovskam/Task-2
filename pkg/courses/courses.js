const mongoose = require ("mongoose")

const courseSchema = mongoose.Schema({
    title: String,
    description: String,
    academy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Academy"
  }
})

const courseModel = mongoose.model ("Course", courseSchema, "courses")

const getCourses = async () => {
    return await courseModel.find()
}

const createCourse = async (data) => {
    const newCourse = courseModel(data)
    return await newCourse.save()
}

const updateCourse = async (id, data) => {
    return await courseModel.updateOne({_id: id})
}

const removeCourse = async (id) => {
    return await courseModel.deleteOne({_id: id})
}

module.exports = {
    getCourses,
    createCourse,
    updateCourse,
    removeCourse
}