import { uniq } from 'lodash';
import config from './../../../config/main.json';

module.exports = ({
  groupByFilter: (issues) => {
    // Get all different filter types.
    const filters = uniq(issues.map(i => i.filter.name));
    const result = [];

    filters.forEach(name => result.push(issues.filter(i => i.filter.name === name)));

    return { issues: result, enableSkip:config.enableSkipPRCheckBtn };
  }
});
