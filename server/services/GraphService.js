const Graph = require('../models/Graph')

class GraphService {
    static async getAllGraphs() {
        const graphs = await Graph.find({})
        return graphs
    }

    static async newGraph(name, data) {
        const doc = new Graph({name, data});
        await doc.save();

        return doc;
    }

    static async getByName(name) {
        const graph = await Graph.findOne({name})
        return graph
    }

    static async updateGraph(_id, data) {
        const doc = await Graph.findById(_id)
        doc.data = data
        doc.save()

        return doc
    }
}

module.exports = GraphService