import dados from "../models/dados.js";
const { cartas } = dados;

const getAllCartas = (req, res) => {
    res.status(200).json({
        total: cartas.length,
        cartas: cartas
    })
}

const getById = (req, res) => {
    let id = parseInt(req.params.id);

    const carta = cartas.find(c => c.id === id);

    if (carta) {
        res.status(200).json({
            success: true,
            carta: carta
        })
    }

    res.status(400).json({
        success: false,
        message: "carta nao encontrada"
    })
}

const createCarta = (req, res) => {
    const { nome, elixir, raridade, tipo, foto, dataUpdate, evolucao } = req.body;

    const raridadeLista = ["rara", "comum", "epica", "épica", "lendária", "lendaria", "campeao", "campeão"];

    const tipoLista = ["terrestre", "aerea", "feitiços", "construção"]


    if (!nome) {
        return res.status(400).json({
            success: false,
            message: "O campo 'nome' é obrigatório para criar uma carta!"
        });
    }

    if (!elixir || elixir <= 0 || elixir >= 10) {
        return res.status(400).json({
            success: false,
            message: "O campo 'elixir' é obrigatório e deve estar entre 1 e 9!"
        });
    }

    if (!raridade || !raridadeLista.includes(raridade.toLowerCase())) {
        return res.status(400).json({
            success: false,
            message: `O campo 'raridade' é obrigatório e deve ser uma das opções: ${raridadeLista.join(", ")}!`
        });
    }

    if (!foto) {
        return res.status(400).json({
            success: false,
            message: "O campo 'foto' é obrigatório para criar uma carta!"
        });
    }

    if (!tipo || !tipoLista.includes(tipo.toLowerCase())) {
        return res.status(400).json({
            success: false,
            message: `O campo 'tipo' é obrigatório e deve ser uma das opções: ${tipoLista.join(", ")}!`
        });
    }

    if (evolucao === undefined) {
        return res.status(400).json({
            success: false,
            message: "O campo 'evolucao' é obrigatório para criar uma carta!"
        });
    }



    const novaCarta = {
        id: cartas.length + 1,
        nome,
        elixir,
        raridade: raridade.toLowerCase(),
        tipo: tipo.toLowerCase(),
        foto,
        dataCadastro: new Date(),
        dataUpdate: null,
        evolucao
    }

    cartas.push(novaCarta);
    res.status(201).json({
        success: true,
        message: "Carta cadastrada com sucesso",
        carta: novaCarta
    })
}

const deleteCarta = (req, res) => {
    let id = parseInt(req.params.id);
    const cartaParaRemover = cartas.find(c => c.id === id);

    if (!cartaParaRemover) {
        return res.status(404).json({
            success: false,
            message: 'Esta carta nao existe'
        })
    }
    const cartasFiltradas = cartas.filter(carta => carta.id !== id);
    cartas.splice(0, cartas.length, ...cartasFiltradas);
    res.status(200).json({
        success: true,
        message: 'Carta deletada com sucesso',
        cartaRemovida: cartaParaRemover
    })
}

const updateCarta = (req, res) => {
    const id = parseInt(req.params.id);

    const { nome, elixir, raridade, tipo, foto, dataUpdate, evolucao } = req.body;

    const raridadeLista = ["rara", "comum", "epica", "épica", "lendária", "lendaria", "campeao", "campeão"];

    const tipoLista = ["terrestre", "aerea", "feitiços", "construção"]

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser um número válido"
        })
    }

    const cartaExiste = cartas.find(carta => carta.id === id);

    if (!cartaExiste) {
        return res.status(400).json({
            success: false,
            message: "A carta não existe."
        })
    }

    if(elixir) {
        if (elixir <= 0 || elixir >= 10) {
            return res.status(400).json({
                success: false,
                message: "O campo 'elixir' deve estar entre 1 e 9!"
            });
        }
    }

    if(raridade){
        if (!raridadeLista.includes(raridade.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: `O campo 'raridade' deve ser uma das opções: ${raridadeLista.join(", ")}!`
            });
        }
    }

    if(tipo){
        if (!tipoLista.includes(tipo.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: `O campo 'tipo' deve ser uma das opções: ${tipoLista.join(", ")}!`
            });
        } 
    }

    const cartasAtualizadas = cartas.map(carta => {
        return carta.id === id
            ? {
                ...carta,
                ...(nome      && { nome }),
                ...(elixir    && { elixir }),
                ...(raridade  && { raridade }),
                ...(foto      && { foto }),
                ...(tipo      && { tipo }),
                ...(evolucao !== undefined && { evolucao }),
                ...(dataUpdate && new Date(dataUpdate) >= new Date() && { dataUpdate })
            }
            : carta;
    });
    
    cartas.splice(0, cartas.length, ...cartasAtualizadas);

    const cartaNova = cartas.find(carta => carta.id === id);

    res.status(200).json({
        success: true,
        message: "Dados atualizados com sucesso",
        carta: cartaNova
    })

}

export { getAllCartas, getById, createCarta, deleteCarta, updateCarta };