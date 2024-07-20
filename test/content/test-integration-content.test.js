const request = require('supertest');
const { faker } = require('@faker-js/faker');

const{
    URLS,
    HEADERS
} = require('../../suporte/configEnv')

describe('CRUD - Conteúdo: GET, POST, DELETE e PUT', () => {

    let payloadConteudo;
    let idConteudo;

    let responseCadastro;

    beforeAll(async()=>{
        payloadConteudo = {
            titulo: faker.lorem.sentence({ min: 3, max: 5 }),
            descricao: faker.lorem.paragraphs(5),
            tipoConteudo: 'Teste de Unidade',
            conteudo: faker.lorem.paragraphs(4, '<br/>\n')
        }

        responseCadastro = await request(URLS.BASE_URL)
            .post(URLS.ROTA_CONTEUDO)
            .send(payloadConteudo);

        expect(responseCadastro.status).toBe(201);      
        
    });

    it('Validar retorno dos dados esperado do Cadastro de Conteúdo', async ()=>{
        const {
            id, 
            titulo, 
            descricao, 
            tipoConteudo, 
            conteudo, 
            dataCadastro
        } = responseCadastro.body;

        expect(id).toBeDefined();
        expect(titulo).toBeDefined();
        expect(descricao).toBeDefined();
        expect(tipoConteudo).toBeDefined();
        expect(conteudo).toBeDefined();
        expect(dataCadastro).toBeDefined();
        
        console.log("Cadastro realizado com sucesso", responseCadastro.body);
        idConteudo = id;
    });

    it('GET: Validar se o conteúdo recém cadastro foi persistido', async() => {
        const camposJson = ['id', 'titulo', 'descricao', 'tipoConteudo', 'dataCadastro'];

        const responseConsulta = await request(URLS.BASE_URL)
            .get(`${URLS.ROTA_CONTEUDO}/${idConteudo}`);

        expect(responseConsulta.status).toBe(200);

        camposJson.forEach(campo => {
            expect(responseConsulta.body[campo]).toBe(responseCadastro.body[campo]);
        });
    });

    it('PUT: Validar alteração do conteúdo ', async() => {
        const payloadAlteracao = {
            titulo: faker.lorem.sentence({ min: 3, max: 5 }),
            descricao: faker.lorem.paragraphs(5),
            tipoConteudo: 'Teste de Integração',
            conteudo: faker.lorem.paragraphs(4, '<br/>\n')
        }
        const camposJson = ['titulo', 'descricao', 'tipoConteudo'];

        const responseAlteracao = await request(URLS.BASE_URL)
            .put(`${URLS.ROTA_CONTEUDO}/${idConteudo}`)
            .send(payloadAlteracao);

        expect(responseAlteracao.status).toBe(201);
        
        camposJson.forEach(campo => {
            expect(responseAlteracao.body[campo]).toBe(payloadAlteracao[campo]);
        });

        console.log("Alteração realizada com sucesso", responseAlteracao.body);

    });
    
    it('DELETE: Validar exclusão do conteúdo ', async() => {
        const responseDelecao = await request(URLS.BASE_URL)
            .delete(`${URLS.ROTA_CONTEUDO}/${idConteudo}`);

        expect(responseDelecao.status).toBe(200);
        expect(responseDelecao.body.message).toEqual("O conteúdo foi removido com sucesso!");

        const responseConsulta = await request(URLS.BASE_URL)
            .get(`${URLS.ROTA_CONTEUDO}/${idConteudo}`);

        expect(responseConsulta.status).toBe(404);
        expect(responseConsulta.body.error).toEqual(`O conteúdo com o ID: ${idConteudo} não foi encontrado.`);   

    });

});