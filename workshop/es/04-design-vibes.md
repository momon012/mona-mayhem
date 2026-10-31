<!-- l10n-sync: source-file="04-design-vibes.md" -->
# Parte 4: Tematización Orientada al Diseño

---

En esta parte, usarás **Plan Mode** para diseñar una transformación de tema completa, y luego **Agent Mode** para implementarla. Esto es desarrollo orientado al diseño — comienza con la visión, itera sobre los elementos visuales y deja que Copilot se encargue del trabajo pesado de CSS.

## Tarea 1: Planifica el Tema Retro

<!-- track:vscode:start -->
Cambia al modo **Plan** en GitHub Copilot Chat.
<!-- track:vscode:end -->

<!-- track:cli:start -->
Usa `/plan` en GitHub Copilot CLI o pulsa **Shift+Tab** hasta activar el plan mode.
<!-- track:cli:end -->

Ingresa este prompt:

> I want to transform this page into a full retro arcade experience. Plan a comprehensive visual overhaul that includes: CRT scanline effects on the background, neon glow on the title that pulses like a neon sign, animated VS badge with gradient color shifts, shine/shimmer overlay on the user result cards, float-in animations for input fields, color-shifting loading text between green and purple, and hover glow effects on contribution squares. Keep the dark background (#0a0a1a) with green (#5fed83) and purple (#8a2be2) accent colors.

Copilot generará un plan detallado de implementación cubriendo todos los efectos visuales. **No lo aceptes de inmediato** — revisa el plan e itera:

- Sugiere ajustes en la velocidad de las animaciones (por ejemplo, "Make the neon pulse slower, around 3 seconds")
- Pregunta sobre efectos específicos (por ejemplo, "How will the shimmer overlay work on the cards?")
- Solicita cambios en el enfoque si algo no te convence

## Tarea 2: Implementa el Tema

Cuando estés satisfecho con el plan, pide a Copilot que lo implemente:

> Implement the retro arcade theme plan we just designed.

Copilot añadirá múltiples animaciones CSS, pseudo-elementos y transiciones en tu hoja de estilos. Esto puede incluir:

- `@keyframes` para scanlines, pulso neón, shimmer y efectos de aparición flotante
- Pseudo-elementos (`::before`, `::after`) para efectos de superposición
- Propiedades personalizadas de CSS para los colores del tema
- Transiciones y estados hover para elementos interactivos

<!-- track:cli:start -->
Después de aplicar los cambios, usa `/diff` para revisar los cambios de estilo antes de aprobarlos.
<!-- track:cli:end -->

## Tarea 3: Ajusta las Vibras

> **⚠️ ¿No ves cambios?** Si el tema o las animaciones no aparecen, detén el servidor (`Ctrl+C`), reinícialo con `npm run dev` y haz una recarga forzada (`Ctrl+Shift+R`) en el navegador.

Mantén la vista previa del navegador abierta e itera sobre el diseño. Prueba prompts como:

> The scanline effect is too strong, reduce opacity to 0.03

> Add a subtle electrical flicker to the title text

> The VS badge should pulse more dramatically

Esto es **desarrollo orientado al diseño** — estás iterando sobre la salida visual en tiempo real. Cada prompt refina la experiencia hasta que se sienta correcta. No te conformes con "suficientemente bueno" — perfecciona las vibras hasta que la página parezca pertenecer a un gabinete arcade.

## Tarea 4: Actualiza las Instrucciones

Las instrucciones de tu workspace deben reflejar las decisiones de diseño importantes. Pídele a Copilot:

<!-- track:vscode:start -->
> Add a design guide section to copilot-instructions.md describing our retro arcade theme: colors, fonts, animation style
<!-- track:vscode:end -->

<!-- track:cli:start -->
Pide a Copilot CLI:

> Update our repository instructions with a short design guide for the retro arcade theme: colors, fonts, animation style, and the rule that new UI should keep the neon aesthetic.
<!-- track:cli:end -->

Esto mantiene las interacciones futuras de Copilot consistentes con la identidad visual que has establecido. Cualquier nueva funcionalidad o componente seguirá automáticamente la estética retro arcade.

Haz commit de las instrucciones y los cambios de diseño cuando la página tenga el aspecto adecuado.

## ✅ Parte 4 Completa

**Lo que aprendiste:**

- **Plan Mode para sistemas de diseño** — esbozar una renovación visual completa antes de escribir código
- **Iterar sobre la salida visual** — usar prompts rápidos de seguimiento para ajustar animaciones, colores y efectos
- **Mantener las instrucciones actualizadas con decisiones de diseño** — documentar tu tema para que Copilot se mantenga consistente
- **Flujo de trabajo de desarrollo orientado al diseño** — comenzar con la visión, implementar con IA, refinar hasta que se sienta correcto
