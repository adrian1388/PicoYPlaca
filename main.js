/**
 * PicoYPlaca Function
 * Developer: Héctor Mosquera
 * 
 * Detects if the Plate number insertes as a parameter can be on the road or not
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
		dateConcat = '01/01/2011 ',
		lastPlateNumber = Number(plate.slice(-1));
	
	if (
		dayComparer[date.getDay()] && dayComparer[date.getDay()].includes(lastPlateNumber) 
		
	) {
		if (
			(
				new Date(dateConcat + time) > new Date(dateConcat + timeComparer.morning.start) &&
				new Date(dateConcat + time) < new Date(dateConcat + timeComparer.morning.finish)
			) ||
			(
				new Date(dateConcat + time) > new Date(dateConcat + timeComparer.night.start) &&
				new Date(dateConcat + time) < new Date(dateConcat + timeComparer.night.finish)
			)
		) {
			console.info('time true');
		}else{
			console.info('time else');
		}
		console.info('restrinction');
		return 'restrinction';
	} else {
		console.info('no restrinction');
		return 'no restrinction';
	}
	
	//console.info(time, timeComparer, new Date('01/01/2011 ' + time));
}


function submitcheck(element)
{
	let result = picoYPlaca(
		element.elements.plate.value,
		element.elements.date.value,
		element.elements.time.value
	);
	
	
	return false;
}