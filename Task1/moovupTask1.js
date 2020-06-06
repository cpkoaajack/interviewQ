class Stack {
  constructor() {
    this.items = [];
  }

  push = (element) => {
    this.items.push(element);
  };

  pop = () => {
    if (this.items.length == 0) return false;
    return this.items.pop();
  };

  peek = () => {
    return this.items[this.items.length - 1];
  };

  isEmpty = () => {
    return this.items.length == 0;
  };

  printStack = () => {
    console.log('Print stack:');
    let str = '[ ';
    this.items.forEach((item) => (str += `${item} `));
    return str + ']';
  };
}

class Graph {
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();
  }

  addVertex = (v) => {
    this.AdjList.set(v, []);
  };

  addEdge = (v, w) => {
    this.AdjList.get(v).push(w);
    this.AdjList.get(w).push(v);
  };

  //DFS
  findPath = (start_v, end_v, stack, visited, path) => {
    if (visited.findIndex((index) => index === start_v) !== -1) {
      return;
    }

    stack.push(start_v);
    visited.push(start_v);

    while (!stack.isEmpty()) {
      if (start_v === end_v) {
        let success_path = '';
        visited.forEach((node) => (success_path += node));
        path.push(success_path);

        stack.pop();
        visited.pop();
        return;
      }

      let get_nodes = this.AdjList.get(start_v);
      let get_nodes_arr = [];
      for (const node of get_nodes) {
        get_nodes_arr.push(node);
      }

      // let get_unvisited_nodes = get_nodes_arr.filter(
      //   (node) => visited.findIndex(node) === -1
      // );

      get_nodes_arr.forEach((node) =>
        this.findPath(node, end_v, stack, visited, path)
      );

      stack.pop();
      visited.pop();

      if (stack.isEmpty()) {
        return path;
      }

      return;
    }
  };
}

const graph = new Graph(8);
const vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// adding vertices
vertices.forEach((vertice) => graph.addVertex(vertice));

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

console.log('Current graph looks like this: ', graph.AdjList);

const possible_path = graph.findPath(
  'A',
  'H',
  new Stack(),
  new Array(graph.noOfVertices),
  new Array()
);

console.log(`Q1. All possible paths between A­-H is ${possible_path}`);
console.log(
  `Q2. The least number of hops (shortest path) between A­-H is ${null}`
);
