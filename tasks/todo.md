# Hand Sculpt - Piano di Sviluppo

## Obiettivo
Creare l'applicazione Hand Sculpt come descritto nel CLAUDE.md - un'app browser per creare forme geometriche usando i gesti delle mani.

## Todo Items

### Struttura Base
- [x] Creare il file `hand-sculpt.html` con struttura HTML base
- [x] Aggiungere loading overlay
- [x] Aggiungere header con logo e status

### Sistema Canvas
- [x] Implementare canvas wrapper con video, hand canvas e draw canvas
- [x] Configurare il mirroring del video per interazione naturale

### UI Panels
- [x] Creare side panel per selezione forme (circle, rectangle, triangle, star, line)
- [x] Creare side panel per selezione colori
- [x] Creare instructions panel con guida ai gesti
- [x] Aggiungere action buttons (undo, clear, save)

### Stili CSS
- [x] Definire CSS variables (colori neon, bg, glow effects)
- [x] Implementare design system (Orbitron, Exo 2, glass-morphism)
- [x] Aggiungere animazioni e effetti glow

### JavaScript - Core
- [x] Implementare state management (shapes[], history[], etc.)
- [x] Creare classe Shape con draw() e contains()
- [x] Implementare tipi forma: circle, rectangle, triangle, star, line

### JavaScript - MediaPipe
- [x] Inizializzare MediaPipe Hands
- [x] Configurare Camera Utils per webcam
- [x] Implementare visualizzazione landmarks sulla hand canvas

### JavaScript - Gesture Detection
- [x] Implementare detectGesture() function
- [x] Rilevamento Point (indice su) -> crea forma
- [x] Rilevamento Pinch (pollice-indice) -> ridimensiona
- [x] Rilevamento Open (mano aperta) -> trascina
- [x] Rilevamento Peace (V) -> ruota

### JavaScript - UI Handlers
- [x] Event handlers per selezione forme
- [x] Event handlers per selezione colori
- [x] Implementare undo, clear, save (download immagine)
- [x] Gesture indicator visivo

### Testing e Rifinitura
- [x] Test funzionalita' completa
- [x] Verificare performance
- [x] Fix eventuali bug

---

## Review

### Riepilogo delle modifiche
Creata l'applicazione completa `hand-sculpt.html` come file singolo contenente:

**HTML:**
- Loading overlay con animazione spinner
- Header con logo "Hand Sculpt" e indicatore status webcam
- Canvas wrapper con 3 layer: video (webcam), hand-canvas (landmarks), draw-canvas (forme)
- Side panel sinistro per selezione forme (5 tipi con icone SVG)
- Side panel destro per selezione colori (6 colori neon)
- Instructions panel in basso con guida ai 4 gesti
- Action buttons (Undo, Clear, Save)
- Gesture indicator per mostrare il gesto corrente

**CSS:**
- Design system cyberpunk/neon con variabili CSS
- Font Orbitron (headings) e Exo 2 (body)
- Glass-morphism con backdrop-filter blur
- Effetti glow neon su elementi interattivi
- Animazioni (spinner, transizioni)
- Layout responsive (pannelli nascosti < 1024px)

**JavaScript:**
- Classe `Shape` con supporto per 5 tipi: circle, rectangle, triangle, star, line
- State management: shapes[], history[] (max 50), currentShape, currentColor
- MediaPipe Hands integration con confidence 0.7
- Visualizzazione landmarks con connessioni
- Sistema gesture detection:
  - Point: crea nuove forme / disegno libero
  - Pinch: ridimensiona forme
  - Open: trascina forme
  - Peace: ruota forme
- Undo con history stack
- Save come PNG con background
- Keyboard shortcut Ctrl+Z per undo

### Note tecniche
- Video mirrored con `scaleX(-1)` e coordinate invertite `(1 - landmark.x)`
- Soglie gesture calibrate come da CLAUDE.md (pinch < 0.06, finger up > 0.05)
- History limitato a 50 stati per performance
- Canvas ridimensionati dinamicamente con window resize
