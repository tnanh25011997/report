const Course = require('../models/Course');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc      Get courses
// @route     GET /api/v1/courses
// @route     GET /api/v1/bootcamps/:bootcampId/courses
// @access    Public
exports.getCourses = asyncHandler(async (req, res, next) => {
    let query;

    query = Course.find().populate({
        path: 'bootcamp',
        select: 'name description'
    });



    const courses = await query;
    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    })
});

// @desc      Get single course
// @route     GET /api/v1/courses/:id
// @access    Public
exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    });

    if (!course) {
        return next(
            new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: course
    });
});

// @desc      Add course
// @route     POST /api/v1/courses
// @access    Private
exports.addCourse = asyncHandler(async (req, res, next) => {

    const course = await Course.create(req.body);

    res.status(200).json({
        success: true,
        data: course
    });
});

// @desc      Update course
// @route     PUT /api/v1/bootcamps/courses/:id
// @access    Private
exports.updateCourse = asyncHandler(async (req, res, next) => {

    let course = await Course.findById(req.params.id);
    if (!course) {
        return next(
            new ErrorResponse(
                `No bootcamp with the id of ${req.params.id}`,
                404
            )
        );
    }
    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: course
    });
});

// @desc      Delete course
// @route     DELETE /api/v1/courses/:id
// @access    Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        return next(
            new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
        );
    }
    await course.remove();
    res.status(204).json({
        success: true,
        data: {}
    });
});