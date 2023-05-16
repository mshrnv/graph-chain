const GraphService = require('../services/GraphService')

class GraphController {
    async getOne(req, res) {
        try {
            const {name} = req.query

            if (!name) {
                res.status(404).json({
                    message: "Не передано название графа"
                })
            }

            const graph = await GraphService.getByName(name)
            res.json(graph)
        } catch (e) {
            res.status(404).json({
                jsMessage: e,
                message: "Ошибка получения графа"
            })
        }
    }

    async getAll(req, res) {
        try {
            const allGraphs = await GraphService.getAllGraphs()
            res.json(allGraphs)
        } catch (e) {
            res.status(404).json({
                jsMessage: e,
                message: "Ошибка получения списка графов"
            })
        }
    }

    async newGraph(req, res) {
        try {
            const {name, data} = req.body

            if (!name || !data) {
                res.status(404).json({
                    message: "Не передано название или содержимое графа"
                })
            }

            const newGraph = await GraphService.newGraph(name, data);
            return newGraph
        } catch (e) {
            res.status(404).json({
                jsMessage: e,
                message: "Ошибка добавления нового графа"
            })
        }
    }

    async updateGraph(req, res) {
        const {_id, data} = req.body

        if (!_id || !data) {
            res.status(404).json({
                message: "Не передан _id или обновленное содержимое графа"
            })
        }

        const updatedGraph = await GraphService.updateGraph(_id, data);
        return updatedGraph
    }
}

module.exports = new GraphController()