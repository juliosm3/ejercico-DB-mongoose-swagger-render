const express = require('express');
const router = express.Router();
const Task = require('../models/Task.js');

router.post("/create", async (req, res) => {
    try {
        const tarea = await Task.create({ ...req.body, completed: false });
        res.status(201).send({ mensaje: 'Tarea creada con éxito', tarea });
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: 'Error al crear la tarea' });
    }
});

router.get("/", async (req, res) => {
    try {
        const tareas = await Task.find();
        res.send(tareas);
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: 'Hubo un problema al obtener las tareas' });
    }
});

router.get("/id/:_id", async (req, res) => {
    try {
        const tarea = await Task.findById(req.params._id);
        if (!tarea) {
            return res.status(404).send({ mensaje: 'Tarea no encontrada' });
        }
        res.send(tarea);
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: `Hubo un problema con la tarea con ID: ${req.params._id}` });
    }
});

router.put('/markAsCompleted/:_id', async (req, res) => {
    try {
        const tarea = await Task.findByIdAndUpdate(
            req.params._id,
            { completed: true },
            { new: true }
        );
        if (!tarea) {
            return res.status(404).send({ mensaje: 'Tarea no encontrada' });
        }
        res.send({ mensaje: 'Tarea marcada como completada', tarea });
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: `Hubo un problema al actualizar la tarea con ID: ${req.params._id}` });
    }
});

router.put("/id/:_id", async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).send({ mensaje: 'Debe proporcionar un título' });
        }

        const tarea = await Task.findByIdAndUpdate(
            req.params._id,
            { title },
            { new: true }
        );

        if (!tarea) {
            return res.status(404).send({ mensaje: 'Tarea no encontrada' });
        }

        res.send({ mensaje: 'Tarea actualizada con éxito', tarea });
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: `Error al actualizar la tarea con ID: ${req.params._id}` });
    }
});

router.delete('/id/:_id', async (req, res) => {
    try {
        const tarea = await Task.findByIdAndDelete(req.params._id);
        if (!tarea) {
            return res.status(404).send({ mensaje: 'Tarea no encontrada' });
        }
        res.send({ mensaje: 'Tarea eliminada con éxito', tarea });
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: 'Error al eliminar la tarea' });
    }
});

module.exports = router;