const Vulnerabilidad = require("../models/Vulnerabilidad");
const fetch = require("node-fetch");

// primera acción : list
exports.list = async(req, res, next) => {
    try {
        let url = "https://api.metadefender.com/v4/feed/infected/latest";
        await fetch(url, {
                headers: {
                    apiKey: "60bad23bbe4fc59328c4beeacef95c31",
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((res) => res.json())
            .then(async(data) => {
                // console.log(data);
                for (const item of data.hashes) {
                    const vul = {
                        threat_id: item.data_id,
                        threat_name: item.threat_name,
                        start_time: item.start_time,
                        file_type_extension: item.file_type_extension,
                        counter: 0
                    }
                    const vulnerabilidad = await Vulnerabilidad.findOne({ threat_id: vul.threat_id });
                    if (vulnerabilidad) {
                        if (vul.data_id !== vulnerabilidad._id) {
                            await Vulnerabilidad.findOneAndUpdate({ threat_id: vul.threat_id }, { counter: 1 });
                        }
                    } else {
                        const nuevaVulnerabilidad = new Vulnerabilidad(vul); //obtiene todos los datos del body de la petición.
                        await nuevaVulnerabilidad.save();
                    }
                }
            });

        const vulnerabilidades = await Vulnerabilidad.find(); // obtenemos todos la lista de vulnerabilidades
        // console.log(vulnerabilidades);
        res.json(vulnerabilidades); // se devuelven en formato json
    } catch (error) {
        console.log(error);
        res.send(error); //devuelve el error
        next();
    }
};

// Listar Vulnerabilidad
exports.show = async(req, res, next) => {
    try {
        const vulnerabilidades = await Vulnerabilidad.findOne({ threat_id: req.params.id });
        if (!vulnerabilidades) {
            res.status(404).json({ message: "La vulnerabilidad no existe!" });
        }
        res.status(200).json(vulnerabilidades);
    } catch (error) {
        res.status(400).json({ message: "Error al procesar la petición" }); //devuelve el error
        next();
    }
};
//Actualizar cliente
exports.update = async(req, res, next) => {
    try {
        await Vulnerabilidad.findOneAndUpdate({ threat_id: req.params.id }, // se obtiene el id del params
            req.body, //generalizo todo las variables a actualizar.
            { new: true } //una ves actualziado, devuelve el objeto actualizado
        );
        res.status(200).json({
            message: "Vulnerabilidad actualizado correctamente",
        });
    } catch (error) {
        res.status(400).json({ message: "Error al procesar la petición" }); //devuelve el error
    }
};
// Eliminar Cliente
exports.delete = async(req, res, next) => {
    try {
        await Vulnerabilidad.findOneAndDelete({ threat_id: req.params.id });
        res.status(200).json({
            message: "La vulnerabilidad ha sido  eliminado",
        });
    } catch (error) {
        res.status(400).json({ message: "Error al procesar la petición" }); //devuelve el error
    }
};