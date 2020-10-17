const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];

let edges = roads.map(r => r.split("-"));

const builder = (edges) => {
    let graph = Object.create(null);
    const addEdges = (from, to) => {
        if (graph[from] == null) {
            graph[from] = [to];
        }
        else {
            graph[from].push(to);
        }
    };

    for (let [from, to] of edges) {
        addEdges(from, to);
        addEdges(to, from);
    }

    return graph;
}

let roadGraph = builder(edges);

class State {
    constructor(current, parcels) {
        this.current = current;
        this.parcels = parcels;
    }
    move(destination) {
        if (!roadGraph[this.current].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.current != this.current) return p; // Robot doesn't have parcel
                return { current: destination, address: p.address }; // Robot picks up parcel
            }).filter(p => p.current != p.address); // Robot delivers parcel
            return new State(destination, parcels);
        }
    }
}

let first = new State(
    "Post Office",
    [{ current: "Post Office", address: "Alice's House" }]
);

let next = first.move("Alice's House")

console.log(next);