const Stack = require('./Stack');
const Queue = require('./Queue');

module.exports = class Graph {
	#noOfVertices;
	#AdjList;

	constructor(noOfVertices) {
		this.#noOfVertices = noOfVertices;
		this.#AdjList = new Map();
	}

	addVertex = (vertex) => {
		this.#AdjList.set(vertex, []);
	};

	addEdge = (vertex1, vertex2) => {
		this.#AdjList.get(vertex1).push(vertex2);
		this.#AdjList.get(vertex2).push(vertex1);
	};

	printGraph = () => {
		console.log('Current graph has number of vertices: ', this.#noOfVertices);
		console.log('Current graph looks like this: ', this.#AdjList);
	};

	getAllVertex = (method) => {
		if (!['DFS', 'BFS'].includes(method)) return false;
		const iterator = this.#AdjList.keys();
		const firstVertex = iterator.next().value;
		if (method === 'DFS') return this.#getAllVertexByDFS(firstVertex);
		else if (method === 'BFS') return this.#getAllVertexByBFS(firstVertex);
		else return false;
	};

	#getAllVertexByDFS = (firstVertex) => {
		const visited = [],
			nodeList = [];
		const stack = new Stack();
		stack.push(firstVertex);
		visited.push(stack.peek());
		nodeList.push(stack.peek());
		while (!stack.isEmpty()) {
			const lastNode = stack.peek();
			if (!lastNode) break;
			const adjNodes = this.#AdjList.get(lastNode);
			if (adjNodes.every((node) => visited.includes(node))) {
				stack.pop();
				continue;
			}
			const node = adjNodes.filter((node) => !visited.includes(node))[0];
			stack.push(node);
			visited.push(stack.peek());
			nodeList.push(stack.peek());
		}
		return nodeList;
	};

	#getAllVertexByBFS = (firstVertex) => {
		const visited = [],
			nodeList = [];
		const queue = new Queue();
		queue.enqueue(firstVertex);
		visited.push(queue.peek());
		nodeList.push(queue.peek());
		while (!queue.isEmpty()) {
			const processingNode = queue.dequeue();
			const adjNodes = this.#AdjList.get(processingNode);
			const nodes = adjNodes.filter((node) => !visited.includes(node));
			nodes.forEach((node) => {
				queue.enqueue(node);
				visited.push(node);
				nodeList.push(node);
			});
		}
		return nodeList;
	};

	getShortestPath = (method, startVertex, endVertex) => {
		if (!['DFS', 'BFS'].includes(method)) return false;
		if (!startVertex || !endVertex) return false;
		if (!this.#AdjList.has(startVertex) || !this.#AdjList.has(endVertex)) return false;
		if (startVertex === endVertex) return [];
		let result;
		if (method === 'DFS') result = this.#getAllPathsByDFS(startVertex, endVertex);
		else if (method === 'BFS') result = this.#getAllPathsByBFS(startVertex, endVertex);
		else return false;
		return result.reduce((prev, next) => (prev.length <= next.length ? prev : next));
	};

	getAllPaths = (method, startVertex, endVertex) => {
		if (!['DFS', 'BFS'].includes(method)) return false;
		if (!startVertex || !endVertex) return false;
		if (!this.#AdjList.has(startVertex) || !this.#AdjList.has(endVertex)) return false;
		if (startVertex === endVertex) return [];
		if (method === 'DFS') return this.#getAllPathsByDFS(startVertex, endVertex);
		else if (method === 'BFS') return this.#getAllPathsByBFS(startVertex, endVertex);
		else return false;
	};

	#getAllPathsByDFS = (startVertex, endVertex) => {
		const possiblePaths = [];
		let visited = {};
		for (const [key, value] of this.#AdjList) visited[key] = [];
		const stack = new Stack();
		stack.push(startVertex);
		visited[startVertex] = [];
		while (!stack.isEmpty()) {
			const lastNode = stack.peek();
			if (lastNode === endVertex) {
				possiblePaths.push(stack.items.reduce((prev, next) => (prev += next), ''));
				stack.pop();
				continue;
			}
			const adjNodes = this.#AdjList.get(lastNode);
			const availableNodes = adjNodes
				.filter((node) => !visited[lastNode].includes(node))
				.filter((node) => !stack.items.includes(node));
			if (!availableNodes.length) {
				const removedNode = stack.pop();
				visited[removedNode] = [];
				continue;
			}
			const nextNode = availableNodes[0];
			stack.push(nextNode);
			visited[lastNode].push(stack.peek());
		}
		return possiblePaths;
	};

	#getAllPathsByDFS_2 = (startVertex, endVertex, currentStack = new Stack()) => {
		currentStack.push(startVertex);
		if (startVertex === endVertex)
			return currentStack.items.reduce((prev, next) => (prev += next), '');
		let possiblePaths = [];
		const adjNodes = this.#AdjList.get(startVertex);
		const availableNodes = adjNodes.filter((node) => !currentStack.items.includes(node));
		availableNodes.forEach((node) => {
			const nodeStack = new Stack();
			currentStack.items.forEach((node) => nodeStack.push(node));
			possiblePaths = possiblePaths.concat(this.#getAllPathsByDFS_2(node, endVertex, nodeStack));
		});
		return possiblePaths;
	};

	#getAllPathsByBFS = (startVertex, endVertex) => {
		let parentPath = new Stack();
		parentPath.push(startVertex);
		if (startVertex === endVertex)
			return parentPath.items.reduce((prev, next) => (prev += next), '');
		parentPath.pop();
		const queue = new Queue();
		const possiblePaths = [];
		queue.enqueue({ node: startVertex, path: parentPath });
		while (!queue.isEmpty()) {
			parentPath = new Stack();
			const processingNode = queue.dequeue();
			const { node, path } = processingNode;
			path.items.forEach((node) => parentPath.push(node));
			parentPath.push(node);
			const adjNodes = this.#AdjList.get(node);
			const availableNodes = adjNodes.filter((node) => !parentPath.items.includes(node));
			availableNodes.forEach((node) => {
				if (node !== endVertex) {
					queue.enqueue({ node, path: parentPath });
					return;
				}
				parentPath.push(node);
				possiblePaths.push(parentPath.items.reduce((prev, next) => (prev += next), ''));
				parentPath.pop();
			});
		}
		return possiblePaths;
	};
};
