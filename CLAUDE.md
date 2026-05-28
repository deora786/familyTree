# Family Tree Visualization - Project Documentation

## Project Overview

An interactive, elegant family tree visualization built with D3.js for displaying 10 generations of family history (~160 people including spouses). Designed to be hosted on GitHub Pages and shared with family members for viewing and exploration.

**Live Development Server:** `http://localhost:8000`

## Design Philosophy

### Visual Theme: Premium Royal Genealogy
The design embodies **luxury genealogy, heritage, and museum-quality aesthetics** inspired by historical lineage books, royal archives, and premium ancestry platforms. The visual approach evokes timeless elegance with warm, archival parchment textures.

**Key Design Principles:**
- Premium editorial feel with soft depth and texture
- Museum/archive quality aesthetic
- Elegant, timeless, warm, heritage-inspired
- Subtle ornamental flourishes
- Cinematic animations without playful bounce
- Luxury without pretension

**Design Inspirations:**
- Historical genealogy manuscripts and illuminated family trees
- Royal archives and museums (British Royal Archives aesthetic)
- Luxury ancestry platforms (Ancestry.com Premium, MyHeritage)
- High-end editorial design (National Geographic, museum catalogs)

### Color Scheme - Premium Heritage Palette

```css
/* Premium Royal Primary Colors - Deep Navy */
--primary: #1E3A5F              /* Deep navy blue (heritage and legacy) */
--primary-light: #2A5080        /* Medium royal blue (hover states) */
--primary-dark: #0F1D33         /* Almost black blue (depth) */

/* Antique Gold & Bronze Accents */
--accent-gold: #C9A961          /* Warm antique gold (aged, not shiny) */
--accent-bronze: #8B6F47        /* Aged bronze for secondary accents */

/* Mahogany Brown (Female Accents) */
--accent-rose: #5C3A31          /* Rich mahogany (mature, elegant) */
--accent-mahogany-light: #7D5446 /* Lighter mahogany */

/* Ivory & Parchment - Warm Neutrals */
--card-bg: #F9F6F0              /* Warm ivory (NOT pure white) */
--card-bg-alt: #F3EDE3          /* Darker parchment */
--bg-parchment-base: #E8DFD0    /* Warm beige base */
--bg-parchment-light: #F0E8D8   /* Lighter parchment */
--text-primary: #1A1A2E         /* Deep navy text */
--text-secondary: #7D7363       /* Warm gray */
--border-elegant: #C9A961       /* Antique gold borders */

/* Backgrounds */
Body: 4-layer parchment with noise texture, radial highlights, and vignette
  - Noise pattern via SVG data URI
  - Top-left radial highlight for depth
  - Subtle edge vignette
  - Base gradient: #F4EFE7 → #E8DED1
Tree Container: Light parchment with crosshatch grain texture
  - Fine grain pattern using repeating gradients
  - Double gold border (ornamental effect)
  - Soft inset shadows
Header: Deep royal gradient with aged gold border
```

### Typography - Premium Editorial

**Fonts:**
- **Display (Headings/Names):** Cormorant Garamond (400-700 weight) - Elegant serif, heritage feel
- **Body (Dates/Metadata):** Inter (300-600 weight) - Clean, highly readable

**Philosophy:** Cormorant Garamond brings royal/editorial elegance while Inter ensures modern readability. This combination is used by luxury publications and genealogy platforms.

**Hierarchy:**
- Header Title: 2rem (32px), Cormorant, antique gold, subtle depth shadow
- Node Names: 1.1rem (17.6px), Cormorant, semi-bold, dark navy, wide tracking
- Node Dates: 0.85rem (13.6px), Inter, medium weight, warm gray
- Panel Names: 1.8rem (28.8px), Cormorant, bold, decorative gold underline
- Info Panel: Clear sizing hierarchy with serif for emphasis

## Technical Stack

**Frontend:**
- D3.js v7 - Tree visualization and animations
- Pure Vanilla JavaScript - No frameworks
- CSS3 with CSS Variables - Theming system
- HTML5 - Semantic structure

**Deployment:**
- GitHub Pages (static hosting)
- No build process required
- Single-page application

**Browser Support:**
- Chrome, Firefox, Safari, Edge (latest)
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 7+)

## Project Structure

```
/
├── index.html                    # Main HTML entry point
├── css/
│   ├── styles.css                # Royal design system, main styles (~1300 lines)
│   └── mobile.css                # Responsive breakpoints (<768px, <600px)
├── js/
│   └── family-tree.js            # D3.js visualization logic (~900 lines)
├── data/
│   ├── family-data.json          # Current Deora family data
│   ├── deora_family_data.json    # Backup of family data
│   └── sample_family-data.json   # Sample data for testing
├── images/
│   ├── crest/
│   │   ├── deora-crest-transparent.png  # Family crest (transparency fixed)
│   │   └── deora-crest.png              # Original crest
│   ├── frames/
│   │   ├── saint-frame.png       # Ornate Nath Ji frame (100×100px)
│   │   ├── male-frame.png        # Royal male frame (100×100px)
│   │   └── female-frame.png      # Royal female frame (100×100px)
│   ├── defaults/
│   │   ├── male-default.png      # Default male portrait (90×90px)
│   │   ├── female-default.png    # Default female portrait (90×90px)
│   │   └── NathJiSaint-default.png  # Saint default
│   └── photos/
│       └── [individual-photos]   # Family member photos
├── remove_checkerboard.py        # Python script to fix PNG transparency
├── README.md                     # User documentation (generic)
├── CLAUDE.md                     # This file - project context (Deora-specific)
├── FRAME_SETUP.md                # Guide for frames and portraits
├── MOBILE_TESTING.md             # Mobile testing checklist
├── GITHUB_PAGES_CHECKLIST.md     # Deployment checklist
└── .gitignore                    # Git ignore rules
```

## Key Features Implemented

### 1. Interactive Tree Visualization
- **Pan & Zoom:** Smooth d3.zoom() with scale limits (0.1-3x)
- **Spouse Positioning:** Side-by-side layout with gold dashed connecting lines
- **Hierarchical Layout:** Vertical tree, generations top-to-bottom
- **Dynamic Spacing:** Accounts for spouse pairs in layout calculations

### 2. Expand/Collapse Functionality
- **Individual Nodes:** Click +/− button on any node with children
- **Expand All:** Header button shows all generations
- **Collapse All:** Header button hides all except root generation
- **Smooth Animations:** Nodes/links fade in/out with parent position transitions
- **Visual Indicators:** 
  - Blue circle with − = expanded
  - Bronze circle with + = collapsed

### 3. Search System
- **Real-time Search:** Debounced input (300ms)
- **Search Fields:** Name, birth year, death year
- **Visual Feedback:** Pulse animation on matching nodes
- **Navigation:** ↑↓ buttons to cycle through multiple results
- **Auto-center:** Zooms to first result
- **Result Count:** Shows "Found X matches"

### 4. Person Info Panel
- **Trigger:** Click any node
- **Content:** 
  - Large photo (200px desktop, 150px tablet, 120px mobile)
  - Full name, dates, generation number, location
  - **Notes/Biography section:** (NEW) Displays person.notes field
    - Life achievements, Samadhi locations, historical significance
    - Gold-bordered styling with serif typography
    - Auto-hides when no notes present
  - Spouse (clickable to navigate)
  - Children list (clickable)
  - Parents (clickable)
- **Layout:**
  - Desktop: Slide-in from right (400px width)
  - Mobile: Full-screen modal from bottom
- **Actions:** "View in Tree" centers person, "X" closes

### 5. Control Buttons (Header)
- 🏠 **Reset View:** Returns to initial view (center, 0.7 scale)
- 🔍+ **Zoom In:** Scale by 1.3x
- 🔍− **Zoom Out:** Scale by 0.7x
- 📤 **Expand All:** Show all branches
- 📥 **Collapse All:** Hide all branches
- 🔍 **Search Bar:** Real-time filtering
- 🎛️ **Filters Toggle:** Open filter sidebar

### 6. Responsive Design
- **Desktop:** Full layout with sidebars
- **Tablet (<1024px):** Adapted spacing
- **Mobile (<768px):**
  - Smaller nodes (60px photos)
  - Larger tap targets (44px minimum)
  - Full-screen info panel
  - Hamburger menu for filters
  - Touch gestures (pinch-to-zoom, swipe to pan)

## Data Structure

### Hierarchical Format (Used)

```json
{
  "name": "Person Name",
  "id": "unique-id",
  "gender": "M",
  "birth": "YYYY-MM-DD",
  "death": "YYYY-MM-DD",
  "photo": "path/to/photo.jpg",
  "spouse": {
    "name": "Spouse Name",
    "id": "spouse-id",
    "gender": "F",
    "birth": "YYYY-MM-DD",
    "death": null,
    "photo": null
  },
  "children": [
    { /* recursive child nodes */ }
  ]
}
```

**Key Design Decisions:**
- **Hierarchical structure:** Simpler than flat graph for trees without in-family marriages
- **Nested spouses:** Spouse is property of person, not separate node
- **Recursive children:** Natural tree representation
- **Optional fields:** `death`, `photo`, `spouse` can be `null`

### Data Processing

1. **Flattening:** Recursive function converts hierarchy to flat array
2. **Generation Assignment:** Calculated during flattening (root = 1)
3. **Collapse State:** `collapsedNodes` Set tracks hidden branches
4. **Position Calculation:** Custom algorithm accounts for spouse pairs

## Configuration

### Spacing (js/family-tree.js)

```javascript
const config = {
  nodeWidth: 120,           // Card width
  nodeHeight: 140,          // Card height
  verticalSpacing: 180,     // Between generations
  horizontalSpacing: 60,    // Between sibling groups
  spouseSpacing: 150,       // Between spouses
  transitionDuration: 500   // Animation duration (ms)
};
```

### Animation Easing - Premium Cinematic

- **Node Entrance:** `cubic-bezier(0.4, 0, 0.2, 1)` - Smooth, elegant, no overshoot (500ms)
- **Transitions:** `cubic-bezier(0.4, 0, 0.2, 1)` - Standard premium easing (400ms)
- **Emphasized:** `cubic-bezier(0.65, 0, 0.35, 1)` - Strong elegant easing (500ms)
- **Philosophy:** Avoid bounce/overshoot - use slow fade-ins, smooth transforms, elegant glow

## Design Patterns - Premium Royal Aesthetic

### Node Cards - Luxury Portrait Cards

**SVG Structure:**
```
<g class="tree-node">
  <rect class="node-card male|female">  // SVG rect with fill and stroke
  <g class="expand-indicator-group">    // +/− button (if has children)
    <circle>                             // Button background
    <text>+/−</text>                     // Button icon
  </g>
  <image class="node-photo">            // Photo with 3px gold ring
  <text class="node-name">              // Cormorant Garamond, wide tracking
  <text class="node-dates">             // Inter, warm gray
</g>
```

**Premium Card Styling:**
- **Base**: Ivory/parchment background with layered shadows
- **Inner Border**: White border (pseudo-element) for double-frame effect
- **Corner Flourish**: SVG ornamental curve (visible on hover)
- **Shadows**: Deep `0 8px 30px` with gender-specific color tints
- **Hover**: Elegant lift (-4px), scale (1.02), gold border glow

**Gender Differentiation (Subtle, Mature):**
- **Male**: 
  - Fill: `#FFFDF8` (ivory with cool undertone)
  - Border: Royal blue `#2A5080`
  - Shadow: Blue-tinted `rgba(42, 80, 128, 0.12)`
- **Female**: 
  - Fill: `#FAF8F6` (ivory with warm undertone)
  - Border: Mahogany `#7D5446`
  - Shadow: Mahogany-tinted `rgba(125, 84, 70, 0.12)`
- **Philosophy**: Avoid bright pink/blue - use mature, elegant accents

**Deceased Styling:**
- Double-dashed border (`stroke-dasharray: 4, 2`)
- Parchment background `#F3EDE3`
- Sepia filter (15%)
- Grayscale photo filter with sepia
- 88% opacity
- Bronze border color

### Photo Styling - Premium Gold Frames

**Photo Borders:**
- **3px gold ring** (`#C8A96B`) - elegant, not too thick
- Soft shadow: `0 3px 10px rgba(0,0,0,0.12)`
- Inset shadow for depth: `inset 0 1px 2px rgba(0,0,0,0.08)`
- Hover: Scales to 1.05, border increases to 4px with gold glow
- Deceased: Bronze border, grayscale + sepia filter

**Photo Placeholders:**
- Circular gradient (darker to lighter)
- Male: Royal blue gradient (#3D52A0 → #5C6FBF)
- Female: Mahogany gradient (#A0404F → #BF5566)
- White initials (42px, Cormorant Garamond, bold, text-shadow)
- Data URI encoding for inline SVG display

### Links/Connections - Elegant Engraved Lineage

**Parent-Child Lines:**
- Curved Bézier paths using d3.linkVertical()
- Deep navy `#1E3A5F`
- **Width**: 2.5px (refined, elegant)
- **Opacity**: 0.35 (subtle, engraved feel)
- **Glow**: Subtle drop-shadow for depth
- Hover: Opacity increases to 0.65, width to 3px

**Spouse Links:**
- Straight horizontal line
- **Antique gold** `#C8A96B`
- **Dashed pattern**: 6px dash, 4px gap (elegant rhythm)
- **Width**: 3px
- **Glow**: Gold drop-shadow `0 0 2px rgba(200,169,107,0.4)`
- Hover: Width increases to 3.5px with enhanced glow

## Known Constraints

1. **No In-Family Marriages:** Data structure doesn't support cousin marriages or complex graphs
2. **Single Spouse:** Each person can have only one spouse in current structure
3. **Static Data:** No backend, changes require editing JSON directly
4. **Browser-Only:** No server-side rendering or SEO optimization
5. **Large Trees:** Performance may degrade beyond ~500 people (not yet tested)

## Recent Updates (May 2026)

### Deora Family-Specific Customizations (May 27, 2026)
- ✅ **Family Crest:** Added Deora family crest to header and backdrop
  - Lion, Swan, Nath Ji symbols with "Aadesh Aadesh" motto
  - Header: 50px crest (40px tablet, 35px mobile)
  - Backdrop: Large faded watermark (600px, 8% opacity)
  - Transparency fixed via Python script (removed checkered background)
- ✅ **Title Update:** Changed "Family Tree" → "Deora Parivar"
- ✅ **Ornate Frames:** Three frame types overlay photos
  - Saint frame: For saints/Nath Ji Maharaj (root + role:"saint")
  - Male frame: For all male family members
  - Female frame: For all female family members
  - 100×100px PNG frames overlay 80×80px photos
- ✅ **Default Portraits:** Gender-specific defaults when photo is null
  - Traditional Indian miniature painting aesthetic
  - Male and female default portraits (90×90px)
- ✅ **Saints System:** `role: "saint"` field marks special ancestors
  - Joravar Singh Deora (founder, Generation 1)
  - Aiji Kahn Nath Deora (Asarlai Dhooni, Generation 5)
  - Aiji Uday Nath Deora (Asan Jilelav, Generation 5)
- ✅ **Notes/Biography Section:** Added to info panel
  - Displays person.notes field (biographical information)
  - Samadhi locations, life achievements, historical significance
  - Gold-bordered styling, serif typography
  - Auto-hides when no notes present
- ✅ **Mobile Optimization:** Comprehensive responsive improvements
  - Touch-optimized (44px minimum tap targets)
  - Responsive breakpoints: 768px, 600px, landscape
  - Scaled crest, photos, frames for mobile
  - Full-screen info panel on mobile
  - Backdrop crest more subtle on small screens
  - Corner ornaments hidden on mobile
  - Created MOBILE_TESTING.md checklist

### Image Assets Structure
```
images/
├── crest/
│   ├── deora-crest-transparent.png  # Header crest (transparency fixed)
│   └── deora-crest.png              # Original (has checkered bg)
├── frames/
│   ├── saint-frame.png              # Ornate Nath Ji frame (100×100px)
│   ├── male-frame.png               # Royal male frame (100×100px)
│   └── female-frame.png             # Royal female frame (100×100px)
├── defaults/
│   ├── male-default.png             # Default male portrait (90×90px)
│   ├── female-default.png           # Default female portrait (90×90px)
│   └── NathJiSaint-default.png      # Special saint default
└── photos/
    └── [individual-photos.jpg]      # Family member photos
```

### Data Structure Updates
```json
{
  "name": "Person Name",
  "id": "unique-id",
  "gender": "M",
  "birth": "YYYY-MM-DD",
  "death": "YYYY-MM-DD",
  "photo": "path/to/photo.jpg",
  "location": "City Name",          // NEW: Location field
  "notes": "Biography text...",     // NEW: Notes/biography field
  "role": "saint",                  // NEW: Special role marker
  
  // UPDATED: Multiple spouses support (May 28, 2026)
  "spouses": [                      // NEW: Array of spouses (replaces single "spouse")
    {
      "name": "Spouse Name",
      "id": "spouse-id",
      "gender": "F",
      "birth": "YYYY-MM-DD",
      "death": "YYYY-MM-DD",
      "photo": "path/to/photo.jpg",
      "children": [                 // NEW: Children nested under each spouse
        { /* child data */ }
      ]
    }
  ]
  
  // LEGACY: Old single-spouse format (still supported via backward compatibility)
  // "spouse": { /* spouse data */ },
  // "children": [ /* children */ ]
}
```

### Configuration Updates (js/family-tree.js)
```javascript
const config = {
  nodeWidth: 130,              // Increased from 120
  nodeHeight: 150,             // Increased from 140
  verticalSpacing: 220,        // Increased from 180 (+22%)
  horizontalSpacing: 80,       // Increased from 60 (+33%)
  spouseSpacing: 180,          // Increased from 150 (+20%)
  transitionDuration: 500,
  
  // NEW: Frame image paths
  frames: {
    saint: 'images/frames/saint-frame.png',
    male: 'images/frames/male-frame.png',
    female: 'images/frames/female-frame.png'
  },
  
  // NEW: Default portrait paths
  defaults: {
    male: 'images/defaults/male-default.png',
    female: 'images/defaults/female-default.png'
  }
};
```

### Helper Functions Added
```javascript
// Get photo or gender-appropriate default
function getPhotoOrDefault(node) {
  if (node.photo) return node.photo;
  return node.gender === 'M' ? config.defaults.male : config.defaults.female;
}

// Get frame based on role (saint vs regular)
function getFrameImage(d) {
  const isSaint = d.node.role === 'saint';
  if (isSaint) return config.frames.saint;
  return d.node.gender === 'M' ? config.frames.male : config.frames.female;
}
```

### Photo & Frame Specifications
- **Desktop Photos:** 80×80px (reduced from 90px to fit frames)
- **Desktop Frames:** 100×100px overlay
- **Tablet Photos:** 60×60px (CSS media query)
- **Tablet Frames:** 70×70px
- **Mobile Photos:** 50×50px
- **Mobile Frames:** 60×60px
- **Frame Opacity:** 0.95 normal, 1.0 on hover
- **Blend Mode:** `mix-blend-mode: multiply` for natural integration

### Manuscript Transformation Complete (May 2026)
- ✅ **Header:** Parchment background, centered layout, elegant separator
- ✅ **Border-Radius:** Sharp archival corners (0-2px)
- ✅ **Hover Effects:** Removed all scale/transform, replaced with glow
- ✅ **Typography:** 70%+ serif coverage (dates, relationships, notes)
- ✅ **Tree Lines:** Delicate 1.5px ink strokes, dotted spouse links
- ✅ **Canvas:** Watermark crest, vignette overlay, corner ornaments
- ✅ **Spacing:** Organic breathing room (increased vertical/horizontal)
- ✅ **Icons:** Removed decorative FontAwesome, kept functional only

### Multiple Spouses Support (May 28, 2026)
- ✅ **Feature Complete:** Full support for people with 2-3 spouses
- ✅ **Data Structure:** Changed from `spouse` (single object) → `spouses` (array)
- ✅ **Maternal Lineage:** Children nested under each spouse for accurate attribution
- ✅ **Visual Layout:** Spouses positioned side-by-side horizontally around person
- ✅ **Spouse Links:** Separate gold dotted lines to each spouse
- ✅ **Parent-Child Links:** Children descend from midpoint between father and specific mother
- ✅ **Info Panel - Spouses:** Lists all spouses with child counts
- ✅ **Info Panel - Children:** Grouped by mother with subheadings
- ✅ **Info Panel - Parents:** Correctly shows both father and biological mother
- ✅ **Expand/Collapse:** Works correctly with children from multiple spouses
- ✅ **Backward Compatibility:** Old single-spouse format automatically converted

**Example Implementation:** Mishri Nath Deora
- **First Wife:** Naini Devi (1952-1965) → 1 child: Narayan Nath Deora
- **Second Wife:** Soni Devi (1951-2025) → 5 children: Koyali Devi, Durga Devi, Bhagvati Devi, Chaitan Nath Deora, Rakesh Nath Deora

**New Data Format:**
```json
{
  "name": "Mishri Nath Deora",
  "id": "p15",
  "gender": "M",
  "spouses": [
    {
      "name": "Naini Devi",
      "id": "p15w1",
      "gender": "F",
      "birth": "1952",
      "death": "1965",
      "children": [
        {
          "name": "Narayan Nath Deora",
          "id": "p33",
          "gender": "M",
          "birth": "1962-06-12"
        }
      ]
    },
    {
      "name": "Soni Devi",
      "id": "p15w2",
      "gender": "F",
      "birth": "1951",
      "death": "2025",
      "children": [
        { "name": "Koyali Devi", "id": "p34" },
        { "name": "Durga Devi", "id": "p35" },
        { "name": "Bhagvati Devi", "id": "p36" },
        { "name": "Chaitan Nath Deora", "id": "p37" },
        { "name": "Rakesh Nath Deora", "id": "p38" }
      ]
    }
  ]
}
```

**Technical Implementation:**
- **normalizeSpouses():** Backward compatibility helper converts old format on-the-fly
- **Flattening Logic:** Loops through spouses array, adds spouseIndex for positioning
- **Position Calculation:** Centers person with spouses distributed on both sides
  - 1 spouse: legacy behavior (person left, spouse right)
  - 2 spouses: [Spouse1 — Person — Spouse2]
  - 3+ spouses: distributed evenly around person
- **Link Rendering:** Finds specific mother by matching child.id in spouse.children array
- **Info Panel:** Shows spouses with child counts, groups children by mother

**Known Limitations:**
- Maximum 3 spouses recommended (layout gets very wide beyond 3)
- Horizontal space increases significantly with multiple spouses
- Mobile view may need special handling for 3+ spouses

## Recent Design Evolution

### Premium Royal Genealogy Redesign (May 2026)
- ✅ **COMPLETE:** Full transformation to luxury genealogy aesthetic
- ✅ **Color Palette:** Deep navy (#1E3A5F), antique gold (#C9A961), mahogany (#5C3A31)
- ✅ **Typography:** Cormorant Garamond (display) + Inter (body)
- ✅ **Backgrounds:** Multi-layer parchment with CSS textures (no image files)
- ✅ **Cards:** Layered premium ivory cards with ornamental details
- ✅ **Shadows:** Deep premium shadows (0 8px 30px) with SVG drop-shadow filters
- ✅ **Animations:** Cinematic easing, no bounce/overshoot
- ✅ **Borders:** Subtle gender differentiation (royal blue vs mahogany)
- ✅ **Photos:** 3px gold rings with soft shadows
- ✅ **Links:** Subtle engraved lineage feel (0.35 opacity)

### Design Improvements Applied
- ✅ Increased card shadow depth for premium feel
- ✅ Added 4th background layer (radial highlight) for depth
- ✅ Refined connector lines (more subtle, elegant)
- ✅ Updated photo frames (3px gold rings)
- ✅ Removed elastic bounce from animations
- ✅ Applied SVG-compatible styling (fill/stroke instead of background/border)

### Layout
- ⚠️ **Consider:** Alternate layout for very wide trees (>10 siblings)
- ⚠️ **Consider:** Vertical spacing adjustment based on generation count
- ⚠️ **Consider:** Horizontal scrolling on very wide generations

### Features to Add
- **Export:** PDF generation, PNG export
- **Print:** Print-optimized view (partially implemented)
- **Edit Mode:** In-browser data editing
- **Photos:** Bulk photo upload, drag-and-drop
- **Timeline:** Alternative chronological view
- **Statistics:** Family demographics, average lifespan, etc.
- **Multi-language:** i18n support
- **Dark Mode:** Toggle theme
- **Filters:** By branch, date range, location
- **Notes:** Rich text biographies per person

## Performance Considerations

**Current Optimizations:**
- Debounced search input (300ms)
- Smooth 500ms transitions (not too slow)
- Lazy loading ready (Intersection Observer commented in code)
- CSS transforms for animations (GPU accelerated)

**Future Optimizations:**
- Virtual scrolling for very large trees
- Canvas rendering for >1000 nodes
- WebGL for extreme scale
- Image lazy loading (currently all loaded)
- Progressive rendering (generations on demand)

## Testing Checklist

### Visual
- ✅ All 4 generations render correctly
- ✅ Spouse connections visible and correct
- ✅ Photos or placeholders display
- ✅ Text is readable (high contrast)
- ✅ Colors match royal theme

### Interactions
- ✅ Pan works (click and drag)
- ✅ Zoom works (wheel, buttons)
- ✅ Reset view centers tree
- ✅ Expand/collapse buttons work
- ✅ +/− indicators toggle correctly
- ✅ Expand all shows everything
- ✅ Collapse all hides descendants

### Search
- ✅ Real-time search highlights nodes
- ✅ Auto-centers on first result
- ✅ Navigation buttons cycle results
- ✅ Clear button resets search
- ✅ No matches message appears

### Info Panel
- ✅ Clicks open panel
- ✅ All data displays correctly
- ✅ Relationship links navigate
- ✅ "View in Tree" centers person
- ✅ Close button works
- ✅ Overlay dismisses panel

### Responsive
- ✅ Desktop layout works
- ✅ Mobile layout adapts
- ✅ Touch gestures work
- ✅ Tap targets are large enough
- ✅ Text remains readable on small screens

### Animations
- ✅ Smooth expand/collapse
- ✅ Links animate with nodes
- ✅ Cinematic easing (no bounce/overshoot)
- ✅ Consistent timing (500ms entrance, 400ms transitions)
- ✅ Premium cubic-bezier curves
- ✅ Elegant hover effects with gold glow

## Deployment to GitHub Pages

**Current Setup:**
- Static files only, no build process
- Ready for immediate deployment

**Steps:**
1. Create GitHub repository
2. Push all files to main branch
3. Enable Pages: Settings → Pages → Deploy from main branch
4. Access at: `https://<username>.github.io/<repo-name>/`

**Pre-deployment Checklist:**
- [ ] Replace sample data with real family data
- [ ] Add family photos (optional)
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Verify all links work
- [ ] Check console for errors
- [ ] Update README with live URL

## Future Enhancement Ideas

### Design Enhancements
1. **Alternative Color Themes:** Medieval, Modern, Pastel, Dark Mode
2. **Custom Fonts:** More elegant serif options, script fonts for names
3. **Background Patterns:** Subtle family crest, ornate borders
4. **Node Shapes:** Oval, hexagon, coat-of-arms shaped
5. **Animations:** More elaborate entrance effects, confetti for birthdays
6. **Icons:** Add badges for military service, professions, achievements
7. **Timelines:** Show historical context alongside tree

### Technical Enhancements
1. **Data Import:** GEDCOM file support, CSV import
2. **Data Export:** Download as JSON, GEDCOM, PDF
3. **Collaboration:** Multi-user editing, version control
4. **Cloud Storage:** Sync with Google Drive, Dropbox
5. **Search:** Advanced filters, fuzzy matching, phonetic search
6. **Analytics:** Family statistics dashboard
7. **Notifications:** Birthday reminders, anniversary alerts

### UX Enhancements
1. **Onboarding:** Interactive tutorial on first visit
2. **Tooltips:** Hover previews before clicking
3. **Bookmarks:** Save favorite people
4. **Compare:** Side-by-side person comparison
5. **Stories:** Rich text editor for biographies
6. **Media:** Videos, documents, audio recordings
7. **Maps:** Birthplace and migration visualization

## Tips for Future Claude Sessions

**When asked to improve design:**
1. **Maintain premium aesthetic** - Deep navy, antique gold, mahogany, ivory/parchment
2. **Typography** - Cormorant Garamond for display, Inter for body
3. **Backgrounds** - Keep warm parchment textures, avoid pure white
4. **Shadows** - Use deep premium shadows (0 8px 30px) with color tints
5. **Animations** - Cinematic easing, no bounce/overshoot
6. **Gender differentiation** - Subtle (not bright pink/blue)
7. **Test hover states** - Gold glow effects, elegant lift

**When modifying layout:**
1. Check `config` object for spacing values (js/family-tree.js)
2. Test with collapsed/expanded states
3. Verify spouse positioning logic (side-by-side layout)
4. Ensure responsive breakpoints still work (mobile.css)
5. Test animations with premium cubic-bezier curves

**When adding features:**
1. Follow existing code patterns (e.g., debounced events)
2. Add to header controls or info panel, not overlays
3. Maintain smooth animations (500ms entrance, 400ms transitions)
4. Update this CLAUDE.md with new features
5. Test on mobile devices
6. Ensure premium aesthetic maintained

**When debugging:**
1. Check browser console (console.log statements present)
2. Verify data structure in family-data.json
3. Test with collapsed/expanded states
4. Check D3.js data binding keys
5. **SVG styling** - Use `fill`/`stroke` for SVG elements, not `background`/`border`
6. **Filters** - SVG elements need `drop-shadow` filters, not `box-shadow`
7. Verify CSS class names match JS

**Critical Design Constraints:**
- **NO bright colors** - avoid neon, bright gradients
- **NO flat dashboard aesthetics** - maintain museum/archive quality
- **NO pure white backgrounds** - use warm ivory/parchment
- **NO playful animations** - cinematic only, no bounce
- **YES to ornamental details** - corner flourishes, double borders
- **YES to layered depth** - multiple shadows, gradients, textures

## Contact & Credits

**Built with:**
- D3.js v7 (BSD License)
- Font Awesome 6.4 (Free License)
- Google Fonts (Open Font License)

**Design Philosophy:**
- Inspired by **luxury genealogy platforms** (Ancestry Premium, MyHeritage)
- **Royal archives and museums** (British Royal Archives aesthetic)
- **Historical genealogy manuscripts** (illuminated family trees)
- **High-end editorial design** (National Geographic, museum catalogs)
- Focus on **elegance, timeless beauty, and heritage**
- **Museum-quality aesthetic** avoiding generic dashboard design
- Prioritizing **premium feel** and **exceptional user experience**

**For Support:**
- Check README.md for user documentation
- Review code comments for technical details
- Test on http://localhost:8000 during development

---

**Last Updated:** May 28, 2026
**Version:** 3.1 - Deora Parivar Edition
**Status:** Fully customized with family crest, ornate frames, saints system, notes, mobile optimization, and multiple spouses support. Production-ready for deployment.
