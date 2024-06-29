import { Router } from "express";
import pool from "../database.js";

const router = Router();

router.get('/ordencompra/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT c.orden_id, p.nombre as nombre, c.prov_id, DATE_FORMAT(c.fecha, "%Y-%m-%d") as fecha, c.total FROM proveedores p JOIN ordenes_compra c ON p.prov_id = c.prov_id;');
        res.render('ordencompra/list', { ordencompras: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/ordencompra/add', async (req, res) => {
    try {
        const [proveedores] = await pool.query('SELECT prov_id, nombre FROM proveedores');
        res.render('ordencompra/add', { proveedores });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/ordencompra/add', async (req, res) => {
    try {
        const {prov_id, fecha, total } = req.body;
        const newCompra = {
            prov_id,
            fecha,
            total
        };
        await pool.query('INSERT INTO data.ordenes_compra SET ?', [newCompra]);
        res.redirect('/ordencompra/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/ordencompra/edit/:orden_id', async (req, res) => {
    try {
        const { orden_id } = req.params;
        const [ordencompra] = await pool.query('SELECT * FROM data.ordenes_compra WHERE orden_id = ?', [orden_id]);
        const compraEdit = ordencompra[0];

        const [proveedores] = await pool.query('SELECT prov_id, nombre FROM data.proveedores');
        
        res.render('ordencompra/edit', { ordencompra: compraEdit, proveedores });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/ordencompra/edit/:orden_id', async (req, res) => {
    try {
        const { prov_id, fecha, total } = req.body;
        const { orden_id } = req.params;
        const editProducto = { prov_id, fecha, total };
        await pool.query('UPDATE data.ordenes_compra SET ? WHERE orden_id = ?', [editProducto, orden_id]);
        res.redirect('/ordencompra/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/ordencompra/delete/:orden_id',async(req,res)=>{
    try{
        const {orden_id}=req.params;
        await pool.query('DELETE FROM data.ordenes_compra WHERE orden_id=?',[orden_id]);
        res.redirect('/ordencompra/list');
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
});


export default router;