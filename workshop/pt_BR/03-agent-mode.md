<!-- l10n-sync: source-file="workshop/03-agent-mode.md" -->
# Parte 3: Construa o jogo com fluxos de trabalho agênticos

---

Nesta parte, o Copilot passa de planejador a implementador. Em vez de escrever código linha por linha, descreva o que deseja e deixe o Copilot executar o trabalho nos arquivos que precisar alterar.

## Tarefa 1: Conecte a batalha

<!-- track:vscode:start -->
1. Mude para o modo **Agent** no Copilot Chat.
2. Insira este prompt:
<!-- track:vscode:end -->

<!-- track:cli:start -->
1. Retorne o Copilot CLI ao fluxo normal de programação (ou permaneça no autopilot se quiser que ele continue até você pará-lo).
2. Se for útil, mencione o arquivo da página para fornecer contexto extra: `@src/pages/index.astro`.
3. Insira este prompt:
<!-- track:cli:end -->

   > Add client-side JavaScript to the battle page that:
   > 1. When the Battle button is clicked, gets both usernames from the inputs
   > 2. Validates both are filled (show error if not)
   > 3. Fetches both users' contribution data in parallel from our API
   > 4. Renders contribution graphs as colored grids — each day is a colored square using GitHub's color palette
   > 5. Shows a VS badge between the two users
   > 6. Displays username, total contributions, and date range for each user
   > 7. Handles loading states and errors
   > 8. Also triggers on Enter key in input fields.
   >
   > Use TypeScript interfaces for the contribution data structure.

<!-- track:vscode:start -->
3. Deixe o Agent Mode implementar a alteração em `index.astro`.
4. Revise as alterações propostas na visualização de diff antes de aceitá-las.
<!-- track:vscode:end -->

<!-- track:cli:start -->
4. Deixe o Copilot CLI implementar a alteração em `src/pages/index.astro`.
5. Use `/diff` para inspecionar as alterações geradas e depois aprove-as.
<!-- track:cli:end -->

## Tarefa 2: Teste a batalha

> **⚠️ Não está vendo mudanças?** Se a página de batalha não tiver sido atualizada, pare o servidor (`Ctrl+C`), reinicie com `npm run dev` e atualize o navegador.

1. Insira `octocat` e `torvalds` como os nomes de usuário e clique em **Battle**.
2. Você deve ver os dois gráficos de contribuições lado a lado, com grades coloridas.
3. Teste os casos de erro:
   - deixe um ou ambos os campos vazios e clique em Battle — deve aparecer um erro de validação;
   - insira um nome de usuário inválido — o app deve exibir um erro da API.
4. Pressione **Enter** em qualquer campo — isso deve iniciar a batalha como o clique.

## Tarefa 3: Itere com o Copilot

Se algo não estiver correto, forneça feedback diretamente ao Copilot. Por exemplo:

- *"The contribution squares are too large, make them 12x12px"*
- *"Add a hover tooltip showing the date and contribution count"*
- *"The loading state needs a pulse animation"*

<!-- track:vscode:start -->
O Agent Mode lida naturalmente com alterações em vários arquivos e iterações. Cada prompt de acompanhamento aproveita a conversa anterior, então você pode refinar a implementação sem começar do zero.
<!-- track:vscode:end -->

<!-- track:cli:start -->
As sessões do Copilot CLI mantêm o histórico, então cada prompt de acompanhamento se baseia no anterior. Use `/session` ou `/context` para inspecionar o contexto e `/review` após uma iteração maior para procurar bugs ou melhorias.
<!-- track:cli:end -->

## Dicas para esta parte

- **Seja específico sobre o que deseja**: requisitos claros levam a resultados melhores.
- **Divida tarefas grandes em prompts menores** se o Copilot sair do rumo.
- **Revise as alterações antes de aceitar**: inspecionar o código gerado é mais rápido que reescrevê-lo.
- **Teste o app imediatamente após cada implementação** para manter os problemas localizados.

## ✅ Parte 3 concluída

Você aprendeu a:

- usar o Copilot para **trabalho de implementação em vários arquivos**;
- **iterar nos resultados** com prompts de acompanhamento focados;
- lidar com o **ciclo completo de funcionalidades**: implementação, revisão, testes e refinamento.
