// Based on https://github.com/dscape/cycle/blob/master/cycle.js

// Make a deep copy of an object or array, assuring that there is at most
// one instance of each object or array in the resulting structure. The
// duplicate references (which might be forming cycles) are replaced with
// an object of the form
//      {$ref: PATH}
// where the PATH is a JSONPath string that locates the first occurance.
// So,
//      var a = [];
//      a[0] = a;
//      return JSON.stringify(JSON.decycle(a));
// produces the string '[{"$ref":"$"}]'.

// JSONPath is used to locate the unique object. $ indicates the top level of
// the object or array. [NUMBER] or [STRING] indicates a child member or
// property.
export function decycle(object: any): any {
	var objects: any[] = [],   // Keep a reference to each unique object or array
			paths: string[] = [];     // Keep the path to each unique object or array

	return (function derez(value, path) {
		// The derez recurses through the object, producing the deep copy.
		var i,          // The loop counter
				name,       // Property name
				nu: {[key: string]: any };
	
		// typeof null === 'object', so go on if this value is really an object but not
		// one of the weird builtin objects.
		if (typeof value === 'object' && value !== null &&
						!(value instanceof Boolean) &&
						!(value instanceof Date)    &&
						!(value instanceof Number)  &&
						!(value instanceof RegExp)  &&
						!(value instanceof String)) {
	
			// If the value is an object or array, look to see if we have already
			// encountered it. If so, return a $ref/path object. This is a hard way,
			// linear search that will get slower as the number of unique objects grows.
			for (i = 0; i < objects.length; i += 1) {
					if (objects[i] === value) {
							return {$ref: paths[i]};
					}
			}
	
			// Otherwise, accumulate the unique value and its path.	
			objects.push(value);
			paths.push(path);
	
			// If it is an array, replicate the array.
			if (Object.prototype.toString.apply(value) === '[object Array]') {
					nu = [];
					for (i = 0; i < value.length; i += 1) {
							nu[i] = derez(value[i], path + '[' + i + ']');
					}
			} else {
				// If it is an object, replicate the object.
				nu = {};

				for (name in value) {
					if (Object.prototype.hasOwnProperty.call(value, name)) {
						nu[name] = derez(value[name],
								path + '[' + JSON.stringify(name) + ']');
					}
				}
			}

			return nu;
		}
		return value;

	}(object, '$'));
}