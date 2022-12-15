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

let xmin = Number.MAX_SAFE_INTEGER, xmax = Number.MIN_SAFE_INTEGER;

sensors.forEach(sensor => {
  if (sensor.x - sensor.dist - 1 < xmin) xmin = sensor.x - sensor.dist - 1;
  if (sensor.x + sensor.dist + 1 > xmax) xmax = sensor.x + sensor.dist + 1;
});

// cant have beacon but can have a little salami, as a treat
let cantHaveBeacon = 0;
const y = 2000000;

for (let x = xmin; x <= xmax; x++) {
  let inRange = false;
  let onBeacon = false;

  sensors.forEach(sensor => {
    const dist = Math.abs(sensor.x - x) + Math.abs(sensor.y - y);
    if (dist <= sensor.dist) {
      inRange = true;
    }
    if (sensor.bx === x && sensor.by === y) {
      onBeacon = true;
    }
  });

  if (inRange && !onBeacon) {
    cantHaveBeacon++; 
  } 
}

console.log(`Result : ${cantHaveBeacon}`);