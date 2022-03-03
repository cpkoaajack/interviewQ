const ArrayDataStructure = require('./ArrayDataStructure');

module.exports = class Stack extends ArrayDataStructure {
	push = (element) => {
		this._items.push(element);
	};

	pop = () => {
		return this._items.pop();
	};

	peek = () => {
		if (this.isEmpty()) return undefined;
		return this._items[this._items.length - 1];
	};

	printCurrentStack = () => {
		return this._printData();
	};
};
