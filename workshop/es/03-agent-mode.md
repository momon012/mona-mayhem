<!-- l10n-sync: source-file="workshop/03-agent-mode.md" -->
# Parte 3: Construye el juego con flujos de trabajo agénticos

---

En esta parte Copilot pasa de planificador a implementador. En lugar de escribir código línea a línea, describe lo que quieres y deja que Copilot realice el trabajo en los archivos que necesite modificar.

## Tarea 1: Conecta la batalla

<!-- track:vscode:start -->
1. Cambia al modo **Agent** en Copilot Chat.
2. Introduce este prompt:
<!-- track:vscode:end -->

<!-- track:cli:start -->
1. Devuelve Copilot CLI a su flujo de programación normal (o mantente en autopilot si quieres que siga avanzando hasta detenerlo).
2. Si resulta útil, menciona el archivo de la página para aportar contexto adicional: `@src/pages/index.astro`.
3. Introduce este prompt:
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
3. Deja que Agent Mode implemente el cambio en `index.astro`.
4. Revisa los cambios propuestos en la vista de diferencias antes de aceptarlos.
<!-- track:vscode:end -->

<!-- track:cli:start -->
4. Deja que Copilot CLI implemente el cambio en `src/pages/index.astro`.
5. Usa `/diff` para inspeccionar los cambios generados y apruébalos.
<!-- track:cli:end -->

## Tarea 2: Prueba la batalla

> **⚠️ ¿No ves cambios?** Si la página de batalla no se ha actualizado, detén el servidor (`Ctrl+C`), reinícialo con `npm run dev` y actualiza el navegador.

1. Introduce `octocat` y `torvalds` como nombres de usuario y haz clic en **Battle**.
2. Deberías ver ambos gráficos de contribuciones uno junto al otro, con cuadrículas de colores.
3. Prueba los casos de error:
   - deja uno o ambos campos vacíos y haz clic en Battle — debería aparecer un error de validación;
   - introduce un nombre de usuario inválido — la aplicación debería mostrar un error de la API.
4. Pulsa **Enter** en cualquiera de los campos — debe iniciar la batalla igual que al hacer clic.

## Tarea 3: Itera con Copilot

Si algo no está del todo bien, proporciona comentarios directamente a Copilot. Por ejemplo:

- *"The contribution squares are too large, make them 12x12px"*
- *"Add a hover tooltip showing the date and contribution count"*
- *"The loading state needs a pulse animation"*

<!-- track:vscode:start -->
Agent Mode gestiona de forma natural los cambios en varios archivos y las iteraciones. Cada prompt de seguimiento aprovecha la conversación anterior, así que puedes refinar la implementación sin empezar de cero.
<!-- track:vscode:end -->

<!-- track:cli:start -->
Las sesiones de Copilot CLI conservan su historial, por lo que cada prompt de seguimiento se basa en el anterior. Usa `/session` o `/context` para inspeccionar el contexto y `/review` después de una iteración importante para buscar errores o mejoras.
<!-- track:cli:end -->

## Consejos para esta parte

- **Especifica lo que quieres**: los requisitos claros producen mejores resultados.
- **Divide las tareas grandes en prompts más pequeños** si Copilot se desvía.
- **Revisa los cambios antes de aceptarlos**: inspeccionar el código generado es más rápido que reescribirlo.
- **Prueba la aplicación inmediatamente después de cada implementación** para mantener localizados los problemas.

## ✅ Parte 3 completa

Has aprendido a:

- usar Copilot para **trabajo de implementación en varios archivos**;
- **iterar sobre los resultados** con prompts de seguimiento concretos;
- gestionar el **ciclo completo de funcionalidades**: implementación, revisión, pruebas y refinamiento.
