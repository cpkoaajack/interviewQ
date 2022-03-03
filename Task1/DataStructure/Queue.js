const ArrayDataStructure = require('./ArrayDataStructure');

module.exports = class Queue extends ArrayDataStructure {
	enqueue = (element) => {
		this._items.push(element);
	};

	dequeue = () => {
		return this._items.shift();
	};

	peek = () => {
		if (this.isEmpty()) return undefined;
		return this._items[0];
	};

	printCurrentQueue = () => {
		return this._printData();
	};
};
