const courseServices = require('../services/courses');

class CourseController {
  async getCoursesBySubject(request) {
    const subjectCode = request.params.subjectCode;

    const courses = await courseServices.getCoursesBySubject(subjectCode);

    return JSON.stringify(courses);
  }

  async getGenEdCoursesByCategory(request) {
    const categoryName = request.params.categoryName;

    const courses = await courseServices.getCoursesByGenEdCategory(categoryName);

    return JSON.stringify(courses);
  }
}

module.exports = new CourseController();