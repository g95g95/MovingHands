# Hand Sculpt - Piano di Sviluppo

## Obiettivo
Creare l'applicazione Hand Sculpt come descritto nel CLAUDE.md - un'app browser per creare forme geometriche usando i gesti delle mani.

## Todo Items

### Struttura Base
- [ ] Creare il file `hand-sculpt.html` con struttura HTML base
- [ ] Aggiungere loading overlay
- [ ] Aggiungere header con logo e status

### Sistema Canvas
- [ ] Implementare canvas wrapper con video, hand canvas e draw canvas
- [ ] Configurare il mirroring del video per interazione naturale

### UI Panels
- [ ] Creare side panel per selezione forme (circle, rectangle, triangle, star, line)
- [ ] Creare side panel per selezione colori
- [ ] Creare instructions panel con guida ai gesti
- [ ] Aggiungere action buttons (undo, clear, save)

### Stili CSS
- [ ] Definire CSS variables (colori neon, bg, glow effects)
- [ ] Implementare design system (Orbitron, Exo 2, glass-morphism)
- [ ] Aggiungere animazioni e effetti glow

### JavaScript - Core
- [ ] Implementare state management (shapes[], history[], etc.)
- [ ] Creare classe Shape con draw() e contains()
- [ ] Implementare tipi forma: circle, rectangle, triangle, star, line

### JavaScript - MediaPipe
- [ ] Inizializzare MediaPipe Hands
- [ ] Configurare Camera Utils per webcam
- [ ] Implementare visualizzazione landmarks sulla hand canvas

### JavaScript - Gesture Detection
- [ ] Implementare detectGesture() function
- [ ] Rilevamento Point (indice su) -> crea forma
- [ ] Rilevamento Pinch (pollice-indice) -> ridimensiona
- [ ] Rilevamento Open (mano aperta) -> trascina
- [ ] Rilevamento Peace (V) -> ruota

### JavaScript - UI Handlers
- [ ] Event handlers per selezione forme
- [ ] Event handlers per selezione colori
- [ ] Implementare undo, clear, save (download immagine)
- [ ] Gesture indicator visivo

### Testing e Rifinitura
- [ ] Test funzionalita' completa
- [ ] Verificare performance
- [ ] Fix eventuali bug

---

## Review
(Da completare dopo l'implementazione)
