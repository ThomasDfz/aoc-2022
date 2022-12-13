const data = (document.getElementsByTagName('pre')[0].innerHTML)
	.split('\n')
	.filter(Boolean)
	.map(e => e.split(''));

class Graph {
	constructor() {
		this.vertices = new Map();
		this.source = null;
		this.target = null;
	}

	addVertex(vertex) {
		this.vertices.set(`${vertex.x};${vertex.y}`, vertex);
	}

	getVertex(x, y) {
		return this.vertices.get(`${x};${y}`);
	}
}

class Vertex {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.height = 0;
		this.neighbours = [];
		this.dist = Number.MAX_SAFE_INTEGER;
		this.prev = undefined;
	}
}

const g = new Graph();
const queue = [];

// 1. Build graph
for (let x = 0; x < data.length; x++) {
	for (let y = 0; y < data[0].length; y++) {
		const vertex = new Vertex(x, y);

		if (data[x][y] === 'S') {
			vertex.height = 1;
			g.source = vertex;
		} else if (data[x][y] === 'E') {
			vertex.height = 26;
			g.target = vertex;
		} else {
			vertex.height = data[x][y].charCodeAt() - 96;
		}

		g.addVertex(vertex);
	}
}

// 2. Set neighbours
for (let x = 0; x < data.length; x++) {
	for(let y = 0; y < data[0].length; y++) {
		const current = g.getVertex(x, y);

		if (x > 0) {
			const up = g.getVertex(x - 1, y);
			((current.height + 1) >= up.height) && current.neighbours.push(up);
		}
		if (x < data.length - 1) {
			const down = g.getVertex(x + 1, y);
			((current.height + 1) >= down.height) && current.neighbours.push(down);
		}
		if (y > 0) {
			const left = g.getVertex(x, y - 1);
			((current.height + 1) >= left.height) && current.neighbours.push(left);
		}
		if (y < data[0].length - 1) {
			const right = g.getVertex(x, y + 1);
			((current.height + 1) >= right.height) && current.neighbours.push(right);
		}

		queue.push(current);
	}
}

// 3. Dijkstra
g.source.dist = 0;

while (queue.length !== 0) {
	const u = queue.sort((a, b) => a.dist > b.dist ? -1 : 1).pop();
	u.neighbours.forEach(v => {
		if (!queue.includes(v)) {
		  return;
    }

		const alt = u.dist + 1;

		if (alt < v.dist) {
			v.dist = alt;
			v.prev = u;
		}
	});
}

const path = [];
let current = g.target;

while (current) {
  path.push(current);
  current = current.prev;
}

console.log(`Result : ${path.length - 1}`);
