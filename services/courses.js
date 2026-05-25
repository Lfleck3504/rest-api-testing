const coursesModel = require('../models/courses');
const genedModel = require('../models/gened');

class CourseServices {
  async getCoursesBySubject(subjectCode) {
    const subject = subjectCode.toUpperCase();

    return await coursesModel.find((course) => {
      const baseCode = this.getBaseCourseCode(course.course_code);

      return baseCode.startsWith(subject);
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
      const baseCode = this.getBaseCourseCode(course.course_code);

      return genEdCourseCodes.has(baseCode);
    });
  }

  getBaseCourseCode(fullCourseCode) {
    if (!fullCourseCode) {
      return '';
    }

    const parts = fullCourseCode.trim().split(' ');

    return `${parts[0]} ${parts[1]}`;
  }
}

module.exports = new CourseServices();