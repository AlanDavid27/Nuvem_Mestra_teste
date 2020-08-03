const express = require('express');
const fetch = require('node-fetch');

//routes
const router = express.Router();
router.get('/:state&:dateStart&:dateEnd', (req, res)=>{
    const { state, dateStart, dateEnd } = req.params;
    const estado = (state.slice(-2));
    const dataInicio  = dateStart.slice(-10);
    const dataFim  = dateEnd.slice(-10);
    
    let cidadesInicio =[];
    let cidadesFim = [];

    const urlInicio = `https://brasil.io/api/dataset/covid19/caso/data/?state=${estado}&date=${dataInicio}`;
    const urlFim = `https://brasil.io/api/dataset/covid19/caso/data/?state=${estado}&date=${dataFim}`;
    //requisição para api buscar os dados da data inicial
    fetch(urlInicio)
        .then(resposta => resposta.json())
        .then(body => {
            // armazenar os dados em vetor
            cidadesInicio = body.results.map(cidade => {
                let cidades = {};
                
                cidades.city = cidade.city;
                cidades.confirmados = cidade.confirmed;
                cidades.data = cidade.date;

                return(cidades);
                
            });
            //requisicao para api buscar os dados da data final
            fetch(urlFim)
                .then(resposta => resposta.json())
                .then(body => {
                    //armazenar os dados em um vetor
                    cidadesFim = body.results.map(cidade => {
                        let cidades = {};
                        
                        cidades.city = cidade.city;
                        cidades.confirmados = cidade.confirmed;
                        cidades.data = cidade.date;

                        return(cidades);
                    });
                    //filtra as cidades que aparecem nos dois vetores
                    const cidadesIguais = cidadesInicio.map(cidade => {
                        return cidadesFim.find(cidadeIgual => cidadeIgual.city === cidade.city)
                    });
                    //let cidadesCasos = [];

                    const cidadesCasos = cidadesIguais.map(cidade => {
                        let cidades = {};
                        
                        cidades.diferencaCasos = cidade.confirmados;
                        cidades.cidade = cidade.city;
                        
        
                        return(cidades);
                        
                    });

                    for(let i=0; i<cidadesInicio.length; i++) {
                        cidadesCasos[i].diferencaCasos = cidadesCasos[i].diferencaCasos - cidadesInicio[i].confirmados;
                    }
                    const casosOrdenados = (cidadesCasos.slice(0,cidadesCasos.length-1).sort(function (a, b) {
                        if (a.diferencaCasos < b.diferencaCasos) {
                          return 1;
                        }
                        if (a.diferencaCasos > b.diferencaCasos) {
                          return -1;
                        }
                        return 0;
                      }));
                      const cidadeTop10 = (casosOrdenados.slice(0,10));
                    //renderiza uma view com as informações em uma tabela
                    res.render("main", {cidadeTop10});
                    
                });
            });
})




//Configurações
const app = express();
app.set('view engine', 'ejs');
app.use('/',router);

module.exports = app;


