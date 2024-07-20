require('dotenv').config();

module.exports = {
    URLS: {
        BASE_URL: process.env.URL_ROTA,
        ROTA_CONTEUDO: '/conteudos' ,
        ROTA_USUARIO: '/users' 
    },

    HEADERS: {
        API_TOKEN: { "token": "uiyeqwuiyeqiuy321" },
        CONTENT_TYPE: {"accept": "application/json"}
    }
}