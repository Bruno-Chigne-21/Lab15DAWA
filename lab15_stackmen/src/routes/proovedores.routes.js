import { Router } from "express";
import pool from "../database.js";

const router = Router();

router.get('/proovedores/add', (req, res) => {
    res.render('proovedores/add');
});

router.post('/proovedores/add', async(req, res) => {
    try {
        const {nombre, direccion, telefono} = req.body;
        const newProovedor = {
            nombre, direccion, telefono
        }
        await pool.query('INSERT INTO data.proveedores SET ?', [newProovedor]);
        res.redirect('/proovedores/list');
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
});

router.get('/proovedores/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM data.proveedores');
        res.render('proovedores/list', {proovedores: result});
    }
    catch (err) {
        res.status(500).json({message:err.message});
    }
});

router.get('/proovedores/edit/:prov_id', async (req, res) => {
    try{
        const {prov_id} = req.params;
        const [proovedor] = await pool.query('SELECT * FROM data.proveedores WHERE prov_id = ?', [prov_id]);
        const proovedorEdit = proovedor[0];
        res.render('proovedores/edit', {proovedor: proovedorEdit});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.post('/proovedores/edit/:prov_id', async (req, res) => {
    try {
        const { prov_id } = req.params;
        const { nombre, direccion, telefono} = req.body;
        const editProovedor = { nombre, direccion, telefono};
        await pool.query('UPDATE data.proveedores SET ? WHERE prov_id = ?', [editProovedor, prov_id]);
        res.redirect('/proovedores/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/proovedores/delete/:prov_id',async(req,res)=>{
    try{
        const {prov_id} = req.params;
        await pool.query('DELETE FROM data.proveedores WHERE prov_id=?', [prov_id]);
        res.redirect('/proovedores/list');
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
});


export default router;