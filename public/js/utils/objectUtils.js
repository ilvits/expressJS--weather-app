/* eslint-disable no-unused-vars */
/*!
 * Add a new item to an object
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Object} obj   The original object
 * @param  {String} key   The key for the item to add
 * @param  {Any}    value The value for the new key to add
 * @param  {Number} index The position in the object to add the new key/value pair [optional]
 * @return {Object}       An immutable clone of the original object, with the new key/value pair added
 */
function addToObject(obj, key, value, index) {
	// Create a temp object and index variable
	const temp = {};
	let i = 0;

	// Loop through the original object
	for (const prop in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, prop)) {
			// If the indexes match, add the new item
			if (i === index && key && value) {
				// Console.log(typeof (value));
				temp[key] = value;
			}

			// Add the current item in the loop to the temp obj
			temp[prop] = obj[prop];

			// Increase the count
			i++;
		}
	}

	// If no index, add to the end
	// console.log('If no index, add to the end', obj, key, value)
	if (!index && key) {
		temp[key] = value;
	}

	return temp;
}
