

describe('Descrição da suíte de testes', ()=>{
    it('Test 01: Cadastrando usuario, e validando dados enviados e statusCode 201.', async()=>{
        //Você deverá cadastrar um novo conteúdo e verificar que o conteúdo está devidamente retornando os dados esperados e o statusCode de sucesso esperado.
    })

    it('Test 02: deve consultar o registro cadastrado anteriormente, e validar resultado e statusCode', async()=>{
        //Você deverá realizar a consulta desse conteúdo em que acabou de cadastrar, e verificar se realmente está sendo retornado o conteúdo desejado com os dados desejados.
    })

    it('Test 03: deve alterar o conteudo cadastrado anteriormente, e validar que os dados realmente foram alterados e validar statusCode', async()=>{
    //Você deverá alterar o conteúdo consultado anteriormente, e em seguida validar se realmente os dados foram alterados.
    })

    it('Test 04: deve remover o registro cadastrado, e validar a consulta do registro para garantir sua remoção.', async()=>{
        //Por fim, você deverá remover o conteúdo e garantir que o mesmo foi removido e não existe mais para consulta.
    })

    it('Exemplo da nova rota', async()=>{

        const payloadConteudos ={
            "titulo": "string",
            "descricao": "string",
            "tipoConteudo": "string",
            "conteudo": "string",
        }

        const responseGet = await request(URLS.ROTA_ENDPOINT)
        .post('/conteudos')
        .send(payloadConteudos)

        expect(responseGet.status).toBe(200);
        expect(responseGet.body.titulo).toBe(payloadConteudos.titulo)
    })
})
