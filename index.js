const toFactorial = [0,3,4,5,6,7];

function trainGame(target, numbers, log = [], log2 = []) {
	// console.log(numbers);
	if (numbers.length === 1) {
		if (target === numbers[0]) {
			console.log(log);
			console.log(log2);

			return 1;
		} else {
			return 0;
		}
	} else {
	
		return numbers.map((number1, index1) => {

			let numFactorial = 0;

			if (toFactorial.includes(number1)) {
				const factorialNumbers = [...numbers];
				factorialNumbers[index1] = factorial(number1);
                numFactorial = trainGame(target, factorialNumbers, [`${number1}!`, ...log], [numbers, ...log2])
			}

			const numbers2 = numbers.slice(index1+1)
			return numbers2.map((number2, index2) => {
				const newNumbers = [...numbers];
				newNumbers.splice(index2+index1+1, 1);
				newNumbers.splice(index1, 1);

				return trainGame(target, [...newNumbers, number1 + number2], [`${number1} + ${number2}`, ...log], [numbers, ...log2]) +
					
					trainGame(target, [...newNumbers, number1 - number2], [`${number1} - ${number2}`, ...log], [numbers, ...log2]) +
					trainGame(target, [...newNumbers, number2 - number1], [`${number2} - ${number1}`, ...log], [numbers, ...log2]) +
					
					trainGame(target, [...newNumbers, number1 * number2], [`${number1} * ${number2}`, ...log], [numbers, ...log2]) +
					
					trainGame(target, [...newNumbers, number1 / number2], [`${number1} / ${number2}`, ...log], [numbers, ...log2]) +
					trainGame(target, [...newNumbers, number2 / number2], [`${number2} / ${number1}`, ...log], [numbers, ...log2]) +
					
					trainGame(target, [...newNumbers, Math.pow(number1, number2)], [`${number1} ^ ${number2}`, ...log], [numbers, ...log2]) +
					trainGame(target, [...newNumbers, Math.pow(number2, number1)], [`${number2} ^ ${number1}`, ...log], [numbers, ...log2])
			})
			.reduce((accumulator, value) => {
				return accumulator + value;
			}, 0) + numFactorial;
		})
		.reduce((accumulator, value) => {
			return accumulator + value;
		}, 0);
	}
}

console.log(trainGame(10,[7,7,6,6]));


function factorial(n) {
	if (n === 0) {
		return 1;
	} else {
		return n * factorial(n-1);
	}
}