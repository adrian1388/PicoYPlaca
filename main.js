/**
 * PicoYPlaca Function
 * Developer: Héctor Mosquera
 * 
 * Detects if the Plate number inserted as a parameter can be on the roads of Quito or not
 * in the date and time inserted as parameters too.
 * 
 * @param plate The full plate number
 * @param dateString The string of the date we want to see if the #plate number is restricted or not
 * @param time The time we want to see if the #plate number is restricted or not
 * @return a string if the plate inserted is restricted to be on the road or not.
 */
const picoYPlaca = (plate, dateString, time) => {
	const date = new Date(dateString),
		dayComparer = {
			// monday
			1: [1,2],
			
			// tuesday
			2: [3,4],
			
			// wednesday
			3: [5,6],
			
			// thursday
			4: [7,8],
			
			// friday
			5: [9,0],
		},
		timeComparer = {
			morning: {
				start: '7:00',
				finish: '9:30'
			},
			night: {
				start: '16:00',
				finish: '19:30'
			}
		},
		dateConcat = '01/01/2011 ';

	// Plate is any string but if the last character is a number it can be restricted or not,
	// otherwise it can be on road.

	// Plate validation.
	if (!plate) {
		return "Invalid Plate";
	}
	
	const lastPlateNumber = Number(plate.slice(-1));
	// Date validation.
	if (date.toString().indexOf("Invalid Date") >= 0) {
		return "Invalid Date";
	}

	/**
	 * If the last number is on the day according to the next list,
	 * and the time is inside the ranges [7:00, 9:30], [16:00, 19:30]
	 * then the plate is restricted to be on roads.
	 * Otherwise the plate is not restricted.
	 *
	 * List:
	 * monday: 1, 2
	 * tuesday: 3, 4
	 * wednesday: 5, 6
	 * thursday: 7, 8
	 * friday: 9, 0
	 */
	if (
		// Comparison of days
		dayComparer[date.getDay()] && dayComparer[date.getDay()].includes(lastPlateNumber) &&
		(
			// Comparison of time inside of th ranges
			(
				// Comparison of time inserted against morning's range
				new Date(dateConcat + time) > new Date(dateConcat + timeComparer.morning.start) &&
				new Date(dateConcat + time) < new Date(dateConcat + timeComparer.morning.finish)
			) ||
			(
				// Comparison of time inserted against afternoon and night's range
				new Date(dateConcat + time) > new Date(dateConcat + timeComparer.night.start) &&
				new Date(dateConcat + time) < new Date(dateConcat + timeComparer.night.finish)
			)
		)
	) {
		return 'Restriction';
	} else {
		return 'No restriction';
	}
}

/**
 * submitcheck Function
 * Developer: Héctor Mosquera
 * 
 * Get the values from the form and calls picoYPlaca function.
 * 
 * @param element the form
 * @return false.
 */
function submitcheck(element)
{
	let result = picoYPlaca(
		element.elements.plate.value,
		element.elements.date.value,
		element.elements.time.value
	);
	
	// Adding the result of picoYPlaca function to the DOM
	document.getElementById("result").innerHTML = result;
	return false;
}

//export for testing
exports.picoYPlaca = picoYPlaca;