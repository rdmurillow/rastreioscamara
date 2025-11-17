# 📦 Rastreamento Automático de Encomendas (Google Apps Script)

Este é um código escrito em **Google Apps Script** (JavaScript customizado para Google Workspace) projetado para **automatizar o rastreamento de encomendas** diretamente em uma Planilha Google. Ele é ideal para lojas, e-commerce, ou qualquer usuário que precise monitorar múltiplos códigos de rastreio de forma centralizada e automática.

---

## 🚀 Funcionalidade Principal

O script interage com uma **API de rastreamento de terceiros** (neste caso, `wonca.com.br`) para buscar o status mais recente de uma lista de códigos de rastreamento e registrar as informações essenciais (status, data/hora, local, detalhes) de volta na sua planilha.

---

## ⚙️ Como Funciona o Código

O projeto consiste em três funções principais que trabalham em conjunto:

### 1. `rastrearEncomenda(codigo)`
Esta é a função central que faz a requisição à API:
* **Busca a Chave de API:** Obtém a `apikey` de uma célula específica (`B1`) em uma aba chamada "API".
* **Faz a Requisição:** Envia uma solicitação `POST` para a API com o código de rastreio e a autorização.
* **Encontra o Evento Mais Recente:** Garante que sempre retorne o **último status** da remessa.
* **Monta o Resumo:** Extrai os campos mais importantes (código, status, data/hora, local, detalhe) e os retorna.

### 2. `LoopRastreamento()`
Esta função é o motor da automação:
* **Acessa a Aba "Rastreios":** Percorre os dados na aba principal.
* **Verifica o Sinalizador (Coluna 3):** O rastreamento só é executado se a célula na **Coluna 3** estiver marcada como `true` (via *checkbox*).
* **Chama `rastrearEncomenda`:** Rastreia o código da **Coluna 2** da linha atual.
* **Registra o Resultado:** Escreve o objeto de resumo na **Coluna 4**.

### 3. `onOpen(e)`
Esta função cria a interface de usuário:
* **Menu Personalizado:** Cria um menu chamado **"Rastreamento"** na Planilha Google.
* **Item de Menu:** Adiciona o item **"RASTREAR ENTREGAS"** que, quando clicado, executa a função `LoopRastreamento()`.

---

## 🛠️ Configuração Inicial

Para usar este script, você precisa configurar a Planilha Google:

1.  **Aba "API":** Crie uma aba e insira sua chave de API (fornecida pelo serviço de rastreamento) na célula **B1**.
2.  **Aba "Rastreios":** Crie a aba principal para os dados com a seguinte estrutura mínima (começando na linha 5):
    * **Coluna 2 (B):** Códigos de rastreio.
    * **Coluna 3 (C):** **Checkbox** para selecionar o rastreio (Sinalizador `true`/`false`).
    * **Coluna 4 (D):** Resultado do rastreamento (onde o status será escrito).
3.  **Cole o Código:** Abra o Editor de Apps Script na sua planilha e cole o código completo.
4.  **Execute:** Recarregue a planilha e use o novo menu **"Rastreamento" > "RASTRAR ENTREGAS"** para iniciar.

> **⚠️ Observação:** Na primeira execução, o Google pedirá autorização para que o script acesse serviços externos (como a API) e sua planilha.

---

## 🚀 Exemplo de Uso (Loja Online)

Uma loja pode usar este script para:
* Manter uma lista mestre de todos os pedidos enviados.
* **Marcar manualmente** apenas os pedidos que precisam de atenção especial (`true` na Coluna 3).
* Rodar o script uma vez ao dia para atualizar o status **apenas** dessas encomendas selecionadas, garantindo que a informação mais recente esteja sempre disponível para o time de atendimento.
