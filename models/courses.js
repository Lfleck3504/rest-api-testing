const fs = require('fs').promises;
const path = require('path');

class Courses {
  async find(criteria = () => true) {
    const coursesPath = path.join(__dirname, 'courses.json');

    const contents = await fs.readFile(coursesPath, 'utf8');

    const courses = JSON.parse(contents);

    return courses.filter(criteria);
  }
}

module.exports = new Courses();