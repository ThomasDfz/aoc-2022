paths = (document.getElementsByTagName('pre')[0].innerHTML)
	.split('\n')
	.filter(Boolean)
	.map(path => path.split(' -&gt; ').map(coord => coord.split(',').map(Number)))

let xmin = 1000, xmax = 0, ymin = 0, ymax = 0;

// paths = [[[498,4], [498,6], [496,6]], [[503,4], [502,4], [502,9], [494,9]]]

// normalize data
paths.forEach((path) => {
  for (let i = 0; i < path.length; i++) {
    const [x, y] = path[i];
    if (x < xmin) xmin = x;
    if (x > xmax) xmax = x;
    if (y > ymax) ymax = y;
  }
});

paths.forEach((path) => {
  for (let i = 0; i < path.length; i++) {
    path[i][0] -= xmin;
  }
});

const spawn = 500 - xmin;
const slice = [];

for (let y = ymin; y <= ymax; y++) {
  slice.push(new Array(xmax - xmin + 1).fill('.'));
}

const getRange = (start, end) => {
  const max = start > end ? start : end;
  const min = start <= end ? start : end;

  return Array.from({ length: max - min + 1 }, (_, i) => i + min);
};

const setLine = (start, end) => {
  const [x1, y1] = start;
  const [x2, y2] = end;

  if (x1 === x2) {
    getRange(y1, y2).forEach((y) => slice[y][x1] = '#');
  } else if (y1 === y2) {
    getRange(x1, x2) .forEach((x) => slice[y1][x] = '#');
  }
};

paths.forEach((path) => {
  for (let i = 0; i < path.length - 1; i++) {
    setLine(path[i], path[i + 1]);
  }
});

let sand = { x: spawn, y: 0 };
let grains = 0;

const canGoDown = (sand) => {
	return (slice[sand.y + 1] && slice[sand.y + 1][sand.x] !== '#');
};

const canGoLeft = (sand) => {
	return (slice[sand.y + 1] && slice[sand.y + 1][sand.x - 1] !== '#');
};

const canGoRight = (sand) => {
	return (slice[sand.y + 1] && slice[sand.y + 1][sand.x + 1] !== '#');
};

while (sand.y !== ymax) {
	if (canGoDown(sand)) {
		sand.y++;
	} else if (canGoLeft(sand)) {
		sand.y++;
		sand.x--;
	} else if (canGoRight(sand)) {
		sand.y++;
		sand.x++
	} else {
		console.log(`Settling sand at ${sand.y}; ${sand.x}`);
		slice[sand.y][sand.x] = '#';
		grains++;
		sand = { x: spawn, y: 0 };
	}
}

console.log(grains);