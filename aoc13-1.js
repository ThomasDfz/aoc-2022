let data = document.getElementsByTagName('pre')[0]
	.innerHTML
	.split('\n\n')
  .map(pair => pair.split('\n').filter(Boolean).map(JSON.parse))

const debug = false;
debug && (data = [[[1,1,3,1,1],[1,1,5,1,1]],[[[1],[2,3,4]],[[1],4]],[[9],[[8,7,6]]],[[[4,4],4,4],[[4,4],4,4,4]],[[7,7,7,7],[7,7,7]],[[],[3]],[[[[]]],[[]]],[[1,[2,[3,[4,[5,6,7]]]],8,9],[1,[2,[3,[4,[5,6,0]]]],8,9]]]);

const isOrdered = (left, right) => {
	debug && console.log(`Compare ${JSON.stringify(left)} vs ${JSON.stringify(right)}`);

	// 1. If both values are integers
	if (typeof left === 'number' && typeof right === 'number') {
		if (left < right) {
			debug && console.log('Left side is smaller, so inputs are in the right order');
			return true;
		}

		if (left > right) {
			debug && console.log('Right side is smaller, so inputs are not in the right order');
			return false;
		}
	}

	// 2. If both values are lists
	if (Array.isArray(left) && Array.isArray(right)) {
		const maxSize = left.length > right.length ? left.length : right.length;

		for (let i = 0; i < maxSize; i++) {
			if (right[i] === undefined) {
				debug && console.log('Right side ran out of items, so inputs are not in the right order');
				return false;
			}

			if (left[i] === undefined) {
				debug && console.log('Left side ran out of items, so inputs are in the right order');
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

let sum = 0;

data.forEach((pair, index) => {
	const [left, right] = pair;

	if (isOrdered(left, right)) {
		sum += (index + 1);
	}

	debug && console.log('\n');
});

console.log(`Result : ${sum}`);