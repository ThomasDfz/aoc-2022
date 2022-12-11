const data = (document.getElementsByTagName('pre')[0].innerHTML)
	.replaceAll('\n', ' ')
	.split(' ')
	.filter(Boolean);

let X = 1, cycle = 1;

const CRT =  {
	screen: new Array(240).fill('.'),

	draw: function() {
		for (let i = 0; i < 6; i++) {
			console.log(`${this.screen.slice(i * 40, (i + 1) * 40).join(' ')}\n`);
		}
	}
};

const drawPixel = () => {
	const verticalPos = (cycle - 1) % 40;
	if (X >= (verticalPos - 1) && X <= (verticalPos + 1))  {
		CRT.screen[cycle - 1] = '#';
	} 
}

const registerCycle = () => {
	drawPixel();
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

CRT.draw();