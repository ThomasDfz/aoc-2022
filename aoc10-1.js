const data = document
	.getElementsByTagName('pre')[0]
	.innerHTML
	.replaceAll('\n', ' ')
	.split(' ')
	.filter(Boolean);

let X = 1, cycle = 1, result = 0;
const breaks = [20, 60, 100, 140, 180, 220];

const registerCycle = () => {
	if (breaks.includes(cycle)) {
		result += (cycle * X);
	}
	cycle++;
}

for (let i = 0; i < data.length; i++) {
	if (data[i] === 'noop')  {
		registerCycle();
		continue;
	}

	const incr = Number(data[++i]);
	registerCycle();
	registerCycle();
	X += incr;
}


console.log(`Result : ${result}`);