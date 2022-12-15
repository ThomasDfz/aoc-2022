const extractNumbers = str => str.match(/-?\d+/g).map(Number);

const sensors = (document.getElementsByTagName('pre')[0].innerHTML)
  .split('\n')
  .filter(Boolean)
  .map(extractNumbers)
  .map(line => {
    const [sx, sy, bx, by] = line;
    const dist = Math.abs(sx - bx) + Math.abs(sy - by);

    return {
      x: sx,
      y: sy,
      bx,
      by,
      dist,
    };
  });

let found;
const max = 4000000

const isDistress = (x, y) => {
  if (x < 0 || x > max || y < 0 || y > max) {
    return false;
  }

  couldHaveBeenFound = false; 

  sensors.forEach(sensor => {
    const dist = Math.abs(sensor.x - x) + Math.abs(sensor.y - y);
    if (dist <= sensor.dist) {
      couldHaveBeenFound = true;
    }
  });

  return !couldHaveBeenFound;
}

// searches around a sensor
const extendSearch = (sensor, radius) => {
  // left top diagonal search
  let x = (sensor.x - sensor.dist - radius);
  let y = sensor.y;

  while (x != sensor.x && y != (sensor.y - sensor.dist - radius)) {
    if (isDistress(x, y)) {
      found = { x, y };
      console.log('Result ', x, y);
      return true;
    }
    x++;
    y--;
  }

  // right top diagonal search
  while (x != (sensor.x + sensor.dist + radius) && y != sensor.y) {
    if (isDistress(x, y)) {
      found = { x, y };
      console.log('Result ', x, y);
      return true;
    }
    x++;
    y++;
  }

  // right bottom diagonal search
  while (x != sensor.x && y != (sensor.y + sensor.dist + radius)) {
    if (isDistress(x, y)) {
      found = { x, y };
      console.log('Result ', x, y);
      return true;
    }
    x--;
    y++;
  }

  // left bottom diagonal search
  while (x != (sensor.x - sensor.dist - radius) && y != sensor.y) {
    if (isDistress(x, y)) {
      found = { x, y };
      console.log('Result ', x, y);
      return true;
    }
    x--;
    y--;
  }

  return false;
};

let radius = 1;

while (!found) {
  sensors.every((sensor) => !extendSearch(sensor, radius));

  radius++;
}

const tuning = found.x * 4000000 + found.y;

console.log(`Result : ${tuning}`);