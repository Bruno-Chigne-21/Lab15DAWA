import { Router } from "express";
import pool from "../database.js";

const router = Router();

router.get('/add', (req, res) => {
    res.render('clientes/add');
});

router.post('/add', async(req, res) => {
    try {
        const {nomcli, apecli, nrodnicli, telcli} = req.body;
        const newCliente = {
            nomcli, apecli, nrodnicli, telcli
        }
        await pool.query('INSERT INTO CLIENTE SET ?', [newCliente]);
        res.redirect('/list');
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
});

router.get('/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM cliente');
        res.render('clientes/list', {clientes: result});
    }
    catch (err) {
        res.status(500).json({message:err.message});
    }
});

router.get('/edit/:idcli', async (req, res) => {
    try{
        const {idcli} = req.params;
        const [cliente] = await pool.query('SELECT * FROM data.cliente WHERE idcli = ?', [idcli]);
        const clienteEdit = cliente[0];
        res.render('clientes/edit', {cliente: clienteEdit});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.post('/edit/:idcli', async (req, res) => {
    try {
        const { idcli } = req.params;
        const { nomcli, apecli, nrodnicli, telcli } = req.body;
        const editCliente = { nomcli, apecli, nrodnicli, telcli };
        await pool.query('UPDATE data.cliente SET ? WHERE idcli = ?', [editCliente, idcli]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/delete/:idcli',async(req,res)=>{
    try{
        const {idcli} = req.params;
        await pool.query('DELETE FROM data.cliente WHERE idcli=?', [idcli]);
        res.redirect('/list');
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
});


export default router;