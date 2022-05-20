const { Graph } = require('./DataStructure');

const vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const graph = new Graph(8, vertices);

// adding edges
graph.addEdge('A', 'B');
graph.addEdge('A', 'D');
graph.addEdge('A', 'H');
graph.addEdge('B', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'F');
graph.addEdge('D', 'E');
graph.addEdge('E', 'F');
graph.addEdge('E', 'H');
graph.addEdge('F', 'G');
graph.addEdge('G', 'H');

graph.printGraph();

console.log('Get all possible nodes from the graph by DFS:', graph.getAllVertex('DFS'));
console.log('Get all possible nodes from the graph by BFS:', graph.getAllVertex('BFS'));

// a. Write a function that returns all the possible paths between A­-H.
console.log('Q1a. All possible paths between A-H by DFS is', graph.getAllPaths('DFS', 'A', 'H'));
console.log('Q1b. All possible paths between A-H by BFS is', graph.getAllPaths('BFS', 'A', 'H'));
// b. Write a function that returns the least number of hops (shortest path) between A­-H.
console.log(
	'Q2a. The least number of hops (shortest path) between A-H by DFS is',
	graph.getAllPaths('DFS', 'A', 'H', true),
);
console.log(
	'Q2b. The least number of hops (shortest path) between A-H by BFS is',
	graph.getAllPaths('BFS', 'A', 'H', true),
);
