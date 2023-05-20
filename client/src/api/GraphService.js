import axios from "axios";

class GraphService {
    static async getAllGraphs() {
        const allGraphs = await axios.get('http://localhost:5000/graphs');
        return allGraphs.data
    }

    static async getGraphData(graphId) {
        const graph = await axios.get('http://localhost:5000/graph/?graph_id=' + graphId);
        return graph.data
    }

    static async updateGraphData(graphId, updatedData) {
        const graph = await axios.put('http://localhost:5000/graph', {
            _id: graphId,
            data: JSON.stringify(updatedData)
        });

        return graph.data
    }

    static async createGraph(graphName, userAccount) {
        const graph = await axios.post('http://localhost:5000/graph', {
            name: graphName,
            data: JSON.stringify({
                nodes: [{
                    id: graphName,
                    isRoot: true,
                    isFolder: true,
                    x: 500,
                    y: 50
                }],
                links: []
            }),
            owner: userAccount
        });

        return graph.data
    }
}

export default GraphService;