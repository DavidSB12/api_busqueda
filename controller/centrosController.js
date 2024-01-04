const Centro_Educativo = require("../model/Centro_Educativo");
const Localidad = require("../model/Localidad");
const Provincia = require("../model/Provincia");


const getCentrosEducativos = async (req, res) => {
    try {
        const { localidad, provincia, codigoPostal, tipo} = req.query; 
        
        let codigoLocalidad;
        let codigoProvincia;
        const params = {};
        

                        
        if(localidad && provincia) {

            const provinciaObj = await Provincia.findOne({ nombre: provincia });
            if(!provinciaObj) {
                return res.status(404).json({ error: "No existe la provincia proporcionada" });
            }
            codigoProvincia = provinciaObj.codigo;

            const localidadObj = await Localidad.findOne({ nombre: localidad, codigoProvincia: codigoProvincia });
            if(!localidadObj) {
                return res.status(404).json({ error: "No existe la localidad, o no se encuentra en la provincia proporcionada" });
            }
            codigoLocalidad = localidadObj.codigo;

        }
        else if(provincia && !localidad) {
            console.log(provincia)
            const provinciaObj = await Provincia.findOne({ nombre: provincia });
            if(!provinciaObj) {
                return res.status(404).json({ error: "No existe la provincia proporcionada" });
            }
            codigoProvincia = provinciaObj.codigo;

            const localidadesDeProvincia = await Localidad.find({ codigoProvincia: codigoProvincia });
            const codigosLocalidades = localidadesDeProvincia.map(localidad => localidad.codigo);

            codigoLocalidad = { $in: codigosLocalidades };

        }
        else if(!provincia && localidad) {

            const localidadObj = await Localidad.findOne({ nombre: localidad });
            if(!localidadObj) {
                return res.status(404).json({ error: "No existe la localidad proporcionada" });
            }
            codigoLocalidad = localidadObj.codigo;

        }

        if(codigoLocalidad) params.codigoLocalidad = codigoLocalidad                             
        if(codigoPostal) params.codigo_postal = codigoPostal;
        if(tipo) params.tipo = tipo;
      
        console.log(params)
        const centrosEducativos = await Centro_Educativo.find(params);
        
        res.json(centrosEducativos);
    } catch (error) {        
        console.error("Error al obtener centros educativos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
       
}

module.exports = {getCentrosEducativos}