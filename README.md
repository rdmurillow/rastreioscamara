📦 Rastreamento Automático de Encomendas (Google Apps Script)
Este é um código escrito em Google Apps Script (JavaScript customizado para Google Workspace) projetado para automatizar o rastreamento de encomendas diretamente em uma Planilha Google. Ele é ideal para lojas, e-commerce, ou qualquer usuário que precise monitorar múltiplos códigos de rastreio de forma centralizada e automática.

🚀 Funcionalidade Principal
O script interage com uma API de rastreamento de terceiros (neste caso, wonca.com.br) para buscar o status mais recente de uma lista de códigos de rastreamento e registrar as informações essenciais (status, data/hora, local, detalhes) de volta na sua planilha.

⚙️ Como Funciona o Código
O projeto consiste em três funções principais que trabalham em conjunto:

1. rastrearEncomenda(codigo)
Esta é a função central que faz a requisição à API:

Busca a Chave de API: Obtém a apikey de uma célula específica (B1) em uma aba chamada "API" na sua planilha.

Faz a Requisição: Utiliza UrlFetchApp.fetch para enviar uma solicitação POST para o endpoint da API, passando o código de rastreio (codigo) no payload e a Authorization no header.

Processa a Resposta: Analisa a resposta JSON da API.

Encontra o Evento Mais Recente: O código é robusto e ordena todos os eventos (eventos) da encomenda por data/hora (dtHrCriado) para garantir que ele sempre retorne o último status da remessa.

Monta o Resumo: Extrai os campos mais importantes (código, status, data/hora, local, detalhe) e os retorna em um objeto JavaScript (resumo).

2. LoopRastreamento()
Esta função é o motor da automação:

Acessa a Aba "Rastreios": O loop é configurado para rodar sobre a aba de dados (presume-se que seja a aba "Rastreios").

Itera sobre as Linhas: Ele percorre as linhas da planilha, começando da linha 5 (ajustável se o cabeçalho for maior).

Verifica o Sinalizador (Coluna 3): O rastreamento só é executado se a célula na Coluna 3 (geralmente uma checkbox ou um valor true/false) estiver marcada como true. Isso permite que o usuário selecione quais encomendas deseja rastrear em um determinado ciclo.

Chama rastrearEncomenda: Se o sinalizador for true, ele chama a função de rastreamento com o código da Coluna 2 (onde se espera estar o código de rastreio).

Registra o Resultado: O objeto resumo retornado é escrito na Coluna 4 da mesma linha.

3. onOpen(e)
Esta função cria a interface de usuário:

Menu Personalizado: Sempre que a Planilha Google é aberta, esta função é executada automaticamente para criar um menu chamado "Rastreamento" na barra superior.

Item de Menu: Este menu contém o item "RASTREAR ENTREGAS", que quando clicado, executa a função LoopRastreamento() e inicia o processo de rastreamento.

🛠️ Configuração Inicial
Para usar este script, você precisa configurar a Planilha Google:

Aba "API": Crie uma aba e insira sua chave de API (fornecida pela Wonca ou serviço similar) na célula B1.

Aba "Rastreios": Crie a aba principal para os dados.

Coluna 2 (B): Lista de códigos de rastreio.

Coluna 3 (C): Coluna para as checkboxes (true/false) para indicar se a encomenda deve ser rastreada.

Coluna 4 (D): Coluna onde o resumo do rastreamento será escrito.

Cole o Código: Abra o Editor de Apps Script na sua planilha e cole o código completo.

Execute: Recarregue a planilha e use o novo menu "Rastreamento" > "RASTRAR ENTREGAS" para iniciar.

⚠️ Observação: Na primeira execução, o Google pedirá autorização para que o script acesse serviços externos (como UrlFetchApp e sua planilha). Você deve conceder essa permissão.

Exemplo de Uso (Loja Online)
Uma loja pode usar este script para:

Manter uma lista mestre de todos os pedidos enviados.

Marcar manualmente apenas os pedidos que estão gerando reclamações ou que precisam de atenção especial (true na Coluna 3).

Rodar o script uma vez ao dia para atualizar o status apenas dessas encomendas selecionadas, garantindo que a informação mais recente esteja sempre disponível para o time de atendimento.

🔗 Dependências
Google Apps Script Services:

SpreadsheetApp: Para interagir com a Planilha Google.

UrlFetchApp: Para fazer a requisição HTTP externa à API.

API Externa: Necessita de uma chave de acesso válida para o serviço Wonca Labs (api-labs.wonca.com.br).

Gostaria de um passo a passo mais detalhado sobre como adicionar e rodar o Apps Script na sua Planilha Google?
