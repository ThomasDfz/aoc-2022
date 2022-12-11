class Item {
	constructor(worryLevel) {
		this.worryLevel = worryLevel;
	}
}

class Monkey {
	constructor(input) {
		const [, startingItems, operation, test, trueDecision, falseDecision] = input;
		this.items = startingItems.split(':')[1].split(',').map(e => Number(e.trim())).map(worryLevel => new Item(worryLevel))
		this.operation = operation.split(' = ').pop();
		this.divider = Number(test.split(' ').pop());
		this.targetIfTrue = Number(trueDecision.split(' ').pop());
		this.targetIfFalse = Number(falseDecision.split(' ').pop());
		this.activity = 0
	}

	inspectItem(index) {
		const item = this.items[index];

		// 1. Compute new worry level after inspection
		let newWorryLevel = eval(this.operation.replaceAll('old', item.worryLevel));
		// 2. Relief that it didn't break
		newWorryLevel = Math.floor(newWorryLevel / 3);
		item.worryLevel = newWorryLevel;

		this.activity++;
	}

	conditionMet(itemIndex) {
		return (this.items[itemIndex].worryLevel % this.divider === 0);
	}
}

const inputs = document
	.getElementsByTagName('pre')[0]
	.innerHTML
	.split('\n\n')
	.map(el => el.split('\n').filter(Boolean))

const monkeys = inputs.map(input => new Monkey(input));

const throwItem = (worryLevel, target) => {
	monkeys[target].items.push(new Item(worryLevel));
}

for (let round = 0; round < 20; round++) {
	monkeys.forEach(monkey => {
		monkey.items.forEach((item, i) => {
			monkey.inspectItem(i);
			throwItem(item.worryLevel, monkey.conditionMet(i) ? monkey.targetIfTrue : monkey.targetIfFalse);
		});

		monkey.items = [];
	});		
}

monkeys.sort((m1, m2) => m1.activity > m2.activity ? -1 : 1);
console.log(`Result : ${monkeys[0].activity * monkeys[1].activity}`);