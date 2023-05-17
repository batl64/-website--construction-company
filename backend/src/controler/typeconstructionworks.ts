import db from '../db.js';

class AdminController {
    async createTypeConstructionWorks(req, res) {
        const { TypeWork, ScopeWork, ApproximateConstructionEstimate, PlaceConstructionWorks } = req.body
        db.query(`INSERT INTO typeconstructionworks( TypeWork, ScopeWork, ApproximateConstructionEstimate, PlaceConstructionWorks) VALUES (${TypeWork},${ScopeWork},${ApproximateConstructionEstimate},${PlaceConstructionWorks})`, (err, result) => {
            res.status(200).json({ message: 'List creacte' })
        });
    }

    async getOneTypeConstructionWorks(req, res) {
        const id = req.params.id;
        db.query(`SELECT * FROM typeconstructionworks WHERE id = ${id}`, (err, result) => {
            res.json(result);
        });
    }
    async updateTypeConstructionWorks(req, res) {
        const { TypeworkID, TypeWork, ScopeWork, ApproximateConstructionEstimate, PlaceConstructionWorks } = req.body

        db.query(`UPDATE typeconstructionworks SET TypeWork='${TypeWork}',ScopeWork='${ScopeWork}',ApproximateConstructionEstimate=${ApproximateConstructionEstimate},PlaceConstructionWorks='${PlaceConstructionWorks}' WHERE ID=${TypeworkID}`, (err, result) => {
            res.json(result);
        });
        
    }
    async deleteTypeConstructionWorks(req, res) {
        const id = req.body.id;
        db.query(`DELETE FROM typeconstructionworks WHERE ID = ${id}`, (err, result) => {
            res.json(result);
        });
    }

}

module.exports = new AdminController();