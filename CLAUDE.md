# Family Tree Visualization - Project Documentation

## Project Overview

An interactive, elegant family tree visualization built with D3.js for displaying 10 generations of family history (~160 people including spouses). Designed to be hosted on GitHub Pages and shared with family members for viewing and exploration.

**Live Development Server:** `http://localhost:8000`

## Design Philosophy

### Visual Theme: Royal & Elegant
The design emphasizes **royalty, elegance, and heritage** with a warm, welcoming feel appropriate for family history.

**Key Design Principles:**
- High contrast for excellent readability
- Professional, timeless aesthetic
- Warm, family-friendly color palette
- Clear visual hierarchy
- Smooth, polished interactions

### Color Scheme

```css
/* Primary Colors */
--primary: #2C3E7A           /* Deep Royal Blue - headers, male borders, links */
--primary-light: #4A5FA5     /* Lighter Royal Blue - hover states */
--primary-dark: #1A2550      /* Darker Royal Blue - depth */

/* Accent Colors */
--accent-gold: #D4AF37       /* True Gold - buttons, highlights, photo borders */
--accent-rose: #8B4653       /* Royal Rose/Burgundy - female borders */
--accent-purple: #6B4E89     /* Royal Purple - optional accents */

/* Neutrals */
--card-bg: #FFFFFF           /* Pure white - card backgrounds */
--text-primary: #1A1A2E      /* Dark Navy - main text */
--text-secondary: #4A4A5E    /* Medium gray - dates, secondary text */
--border-elegant: #C9B896    /* Gold-tinted border */

/* Backgrounds */
Body: Linear gradient #E8E4E0 → #F5F1ED → #E0D5C7 (warm ivory/beige)
Tree Container: Linear gradient #F8F6F4 → #EBE8E4 (lighter warm gray)
Header: Linear gradient from primary-dark to primary with gold border
```

### Typography

**Fonts:**
- **Headings:** Poppins (600-700 weight) - Modern, confident
- **Body:** Inter (400-600 weight) - Clean, highly readable

**Hierarchy:**
- Header Title: 1.5rem, gold, heavy text-shadow
- Node Names: 0.95rem, bold (700), dark navy
- Node Dates: 0.8rem, semi-bold (600), medium gray
- Info Panel: Clear sizing hierarchy

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
├── index.html              # Main HTML entry point
├── css/
│   ├── styles.css          # Royal design system, main styles
│   └── mobile.css          # Responsive breakpoints (<768px)
├── js/
│   └── family-tree.js      # D3.js visualization logic (~900 lines)
├── data/
│   └── family-data.json    # Hierarchical family data
├── images/
│   └── photos/             # Family member photos (optional)
├── README.md               # User documentation
├── CLAUDE.md               # This file - project context
└── .gitignore              # Git ignore rules
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
  - Large photo (200px) or placeholder
  - Full name, dates, generation number
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

### Animation Easing

- **Enter:** `d3.easeCubicOut` - Fast start, slow end
- **Update:** `d3.easeCubicInOut` - Smooth both ways
- **Exit:** `d3.easeCubicIn` - Slow start, fast end

## Design Patterns

### Node Cards

**Structure:**
```
<g class="tree-node">
  <rect class="node-card male|female">  // Border and background
  <g class="expand-indicator-group">    // +/− button (if has children)
    <circle>                             // Button background
    <text>+/−</text>                     // Button icon
  </g>
  <image class="node-photo">            // Photo or placeholder
  <text class="node-name">              // Person name
  <text class="node-dates">             // Birth-death years
</g>
```

**Gender Differentiation:**
- Male: Royal blue border (#2C3E7A)
- Female: Royal rose border (#8B4653)
- White background for both (high contrast)

**Deceased Styling:**
- Double border
- Slightly gray background (#F5F5F5)
- Grayscale photo filter
- 85% opacity

### Photo Placeholders

**SVG Generation:**
- Circular gradient (darker to lighter)
- Male: Blue gradient (#3D52A0 → #5C6FBF)
- Female: Rose gradient (#A0404F → #BF5566)
- White initials (42px, bold, text-shadow)
- Data URI encoding for inline display

### Links/Connections

**Parent-Child:**
- Curved Bézier paths using d3.linkVertical()
- Royal blue (#2C3E7A)
- 2.5px width
- Connects from midpoint between parents to child

**Spouse:**
- Straight horizontal line
- Gold color (#D4AF37)
- Dashed (8px dash, 4px gap)
- 3px width
- Higher visual weight for clarity

## Known Constraints

1. **No In-Family Marriages:** Data structure doesn't support cousin marriages or complex graphs
2. **Single Spouse:** Each person can have only one spouse in current structure
3. **Static Data:** No backend, changes require editing JSON directly
4. **Browser-Only:** No server-side rendering or SEO optimization
5. **Large Trees:** Performance may degrade beyond ~500 people (not yet tested)

## Current Issues / Areas for Improvement

### Readability
- ✅ **FIXED:** Changed from dark gradients to white cards with high contrast text
- ✅ **FIXED:** Increased font weights and sizes
- ✅ **FIXED:** Removed text shadows that reduced contrast

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
- ✅ No jerky movements
- ✅ Consistent timing
- ✅ Proper easing curves

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
1. Review this color scheme - maintain royal/elegant theme
2. Ensure high contrast for readability (current cards are white)
3. Keep text legible: dark navy (#1A1A2E) on white backgrounds
4. Maintain gold accents for consistency
5. Test hover states and animations

**When modifying layout:**
1. Check `config` object for spacing values
2. Test with collapsed/expanded states
3. Verify spouse positioning logic
4. Ensure responsive breakpoints still work
5. Test animations with easing curves

**When adding features:**
1. Follow existing code patterns (e.g., debounced events)
2. Add to header controls or info panel, not overlays
3. Maintain smooth animations (500ms, cubic easing)
4. Update this CLAUDE.md with new features
5. Test on mobile devices

**When debugging:**
1. Check browser console (console.log statements present)
2. Verify data structure in family-data.json
3. Test with collapsed/expanded states
4. Check D3.js data binding keys
5. Verify CSS class names match JS

## Contact & Credits

**Built with:**
- D3.js v7 (BSD License)
- Font Awesome 6.4 (Free License)
- Google Fonts (Open Font License)

**Design Philosophy:**
- Inspired by royal family trees and genealogical charts
- Focus on elegance, warmth, and heritage
- Prioritizing readability and user experience

**For Support:**
- Check README.md for user documentation
- Review code comments for technical details
- Test on http://localhost:8000 during development

---

**Last Updated:** May 27, 2026
**Version:** 1.0
**Status:** Fully functional, ready for real data
