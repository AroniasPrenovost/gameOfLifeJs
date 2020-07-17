import { patterns } from './global/globals';

let patternsObj = require('./mapPatterns.json');
patternsObj = patternsObj.patterns;

const generatePatternCoordinates = (baseNumber, patternStr) => {


  if (patternStr === null) patternStr = patterns.value;
  if (baseNumber === null || baseNumber === undefined) baseNumber = 60

  /*
  
   iterate through pattern coodinates left -> right, 
   pattern coordinates are offsets of centerCoordinates

  */

  let pattern = null;
  let centerCoordinates = [baseNumber / 2, baseNumber / 2];

  for (var ii = 0; ii < patternsObj.length; ii++) {
    if (patternsObj[ii].name === patternStr) {
      pattern = patternsObj[ii];
    }
  }

  let elementIds = [];
  for (var xx = 0; xx < pattern.coordinates.length; xx++) {
    pattern.coordinates[xx].id = String(centerCoordinates[0] - pattern.coordinates[xx].x) + '-' + String(centerCoordinates[1] - pattern.coordinates[xx].y);
    elementIds.push(pattern.coordinates[xx].id);
  }

  return {
    name: pattern.name,
    coordinates: elementIds
  };
}

export { generatePatternCoordinates };
