module.exports = class ArrayDataStructure {
	_items;

	constructor() {
		this._items = [];
	}

	isEmpty = () => {
		return this._items.length === 0;
	};

	_printData = () => {
		let str = '[ ';
		this._items.forEach((item) => (str += `${item} `));
		return str + ']';
	};

	get items() {
		return this._items;
	}
};
