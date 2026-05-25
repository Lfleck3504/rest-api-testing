const fs = require('fs').promises;
const path = require('path');

class GenEd {
  async find(criteria = () => true) {
    const genedPath = path.join(__dirname, 'gened.json');

    const contents = await fs.readFile(genedPath, 'utf8');

    const genedCourses = JSON.parse(contents);

    return genedCourses.filter(criteria);
  }
}

module.exports = new GenEd();