data = document.getElementsByTagName('pre')[0]
	.innerHTML
	.split('\n\n')
  .map(pair => pair.split('\n').filter(Boolean).map(JSON.parse))
  .flat(1)

data.push([[2]], [[6]]);

const isOrdered = (left, right) => {
	// 1. If both values are integers
	if (typeof left === 'number' && typeof right === 'number') {
		if (left < right) {
			return true;
		}
		if (left > right) {
			return false;
		}
	}

	// 2. If both values are lists
	if (Array.isArray(left) && Array.isArray(right)) {
		const size = left.length > right.length ? left.length : right.length;

		for (let i = 0; i < size; i++) {
			if (right[i] === undefined) {
				return false;
			}

			if (left[i] === undefined) {
				return true;
			}

			const compareResult = isOrdered(left[i], right[i]);

			if (compareResult !== undefined) {
				return compareResult;
			}
		}
	}

	// 3. If exactly one value is an integer
	if (!Array.isArray(left) && Array.isArray(right)) {
		return isOrdered([left], right);
	}

	if (!Array.isArray(right) && Array.isArray(left)) {
		return isOrdered(left, [right]);
	}

	return undefined;
};

data = data.sort((a, b) => isOrdered(a, b) ? -1 : 1);
let first, second;

for (let i = 0; i < data.length; i++) {
	if (data[i].length === 1 && data[i][0].length === 1 && data[i][0][0] === 2) {
		first = i + 1;
	}
	if (data[i].length === 1 && data[i][0].length === 1 && data[i][0][0] === 6) {
		second = i + 1;
	}
}

console.log(`Result : ${first * second}`);