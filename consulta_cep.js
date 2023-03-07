// função para preencher o formulario com os dados extraidos da API
function preencherFormulario(endereco) {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
    document.getElementById('ibge').value = endereco.ibge;
    document.getElementById('ddd').value = endereco.ddd;
    document.getElementById('siafi').value = endereco.siafi;
}

// função para limpar os campos em caso de erro
function erroCampos() {
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('ibge').value = '';
    document.getElementById('ddd').value = '';
    document.getElementById('siafi').value = '';
}

// função para verificar se a entrada é um número ou não, se for retorna TRUE, caso contrário FALSE
function isNumber(numero) {
    return /^[0-9]+$/.test(numero);
}

// função para verificar se o CEP é válido, se tem possui 8 digitos e se é número
function cepValido(cep) {
    return cep.length === 8 && isNumber(cep);
}

// função para limpar os campos de texto da página
function limparCampos() {
    const textInputs = document.querySelectorAll('input');
    textInputs.forEach((element) => {
        element.value = '';
    })
}

// precisa do async para rodar o await
// o await é uma flag de indicação que para o código continuar é necessário esperar o resultado daquela operção
// portanto usa-se o async para avisar que aquela função não será sincrona com o código
async function pesquisarCEP() {

    // captura a entrada do usuário no campo cep e limpa (tira os '-' e os '.')
    const cep = document.getElementById('cep').value.replace('-', '').replace('.', '');
    // url que serão buscados os dados
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if (cepValido(cep)) {
        // busca os dados na api e passa para variaveis
        const dados = await fetch(url);
        const enderecoAPI = await dados.json();
        // caso o  CEP não seja encontrado
        if (enderecoAPI.hasOwnProperty('erro')) {
            document.getElementById('endereco').value = 'CEP não encontrado!'
            erroCampos()
        } else {
            // caso o CEP seja encontrado, preenche os campos
            preencherFormulario(enderecoAPI)
        }
    } else {
        // caso o CEP nao seja valido
        document.getElementById('endereco').value = 'CEP invalido!';
        erroCampos();
    }
}

// ao dar 'focusout' no elemento com id CEP, chama a função 'pesquisarCEP' definida acima
document.getElementById('cep').addEventListener('focusout', pesquisarCEP);

// ao clicar no botao com id limpar, chama a função 'limparCampos'
document.getElementById('limpar').addEventListener('click', limparCampos);

// ao clicar no botao salvar, executa essa função
// essa função mostra os elementos que o usuário passou num alert e depois limpa os campos
document.getElementById('salvar').addEventListener('click', () => {
    const valoresEntrada = document.querySelectorAll('input');
    let output = '';

    // roda a nodeList, em cada elemento ele vai para o próximo elemento irmao, pega o innerText, concatena na variavel de saida
    // pega também o valor contido no elemento em si e também concatena na variável de saida
    valoresEntrada.forEach((element) => {
        output += element.nextElementSibling.innerText + ': ' + element.value + '\n';
    })

    // mostra no alert a variavel de saida
    alert(output);
    alert('Seus dados foram salvos!')
    limparCampos();
})