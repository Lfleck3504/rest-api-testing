const coursesModel = require('../models/courses');
const genedModel = require('../models/gened');

class CourseServices {
  async getCoursesBySubject(subjectCode) {
    const subject = subjectCode.toUpperCase();

    return await coursesModel.find((course) => {
      const code = this.getCourseCode(course);

      return code.startsWith(subject);
    });
  }

  async getCoursesByGenEdCategory(categoryName) {
    const allCourses = await coursesModel.find();
    const allGenEdCategories = await genedModel.find();

    const normalizedCategoryName = categoryName.toLowerCase();

    const matchingCategory = allGenEdCategories.find((genedCategory) => {
      return genedCategory.category.toLowerCase() === normalizedCategoryName;
    });

    if (!matchingCategory) {
      return [];
    }

    const genEdCourseCodes = new Set();

    matchingCategory.req.forEach((requirement) => {
      if (requirement.course_code) {
        requirement.course_code.forEach((code) => {
          genEdCourseCodes.add(code);
        });
      }
    });

    return allCourses.filter((course) => {
      const code = this.getCourseCode(course);

      return genEdCourseCodes.has(code);
    });
  }

  getCourseCode(course) {
    return (
      course.code ||
      course.course_code ||
      course.courseCode ||
      ''
    ).trim();
  }
}

module.exports = new CourseServices();