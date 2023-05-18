import axios from "axios";

class GraphService {
    static async getAllGraphs() {
        const allGraphs = await axios.get('http://localhost:5000/graphs');
        return allGraphs.data
    }
}

export default GraphService;