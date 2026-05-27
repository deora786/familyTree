# Family Tree Visualization

**Premium royal genealogy visualization** built with D3.js - inspired by luxury ancestry platforms, historical lineage books, and museum exhibits. Designed to display 10 generations (~160 family members) with museum-quality aesthetics.

## ✨ Premium Features

- **🎨 Luxury Genealogy Design**: Museum-quality aesthetic inspired by royal archives, historical manuscripts, and premium ancestry platforms
- **🏛️ Heritage Theme**: Warm parchment backgrounds, antique gold accents, elegant serif typography
- **🖼️ Ornate Portrait Frames**: Customizable decorative frames overlay photos (saint, male, female styles)
- **👤 Default Portraits**: Gender-specific default portraits when photos are unavailable
- **🔍 Interactive Exploration**: Smooth pan, zoom, expand/collapse with cinematic animations
- **🔎 Advanced Search**: Real-time search with highlighting, result navigation, and auto-centering
- **📖 Detailed Info Panels**: Click any person to explore relationships, notes, and biographical information
- **📝 Rich Biography Support**: Display detailed notes, life achievements, and historical significance
- **🎯 Smart Filtering**: Filter by generation range, living/deceased status, and photo availability
- **🏅 Special Role Markers**: Highlight saints, founders, or other significant ancestors
- **📱 Fully Responsive**: Touch gestures, mobile-optimized (44px tap targets), works on all devices
- **🎭 Subtle Gender Accents**: Royal blue for males, mahogany for females (mature, elegant)
- **🎨 Customizable Family Crest**: Add your family crest to header and backdrop watermark
- **⚡ No Build Tools**: Pure D3.js + CSS - deploy directly to GitHub Pages

## 🚀 Quick Start

### Option 1: Local Development

1. Clone or download this repository
2. Start a local web server in the project directory:
   ```bash
   # Using Python 3
   python3 -m http.server 8000

   # Or using Node.js
   npx serve

   # Or using PHP
   php -S localhost:8000
   ```
3. Open your browser to `http://localhost:8000`

### Option 2: GitHub Pages (Free Hosting)

1. Create a new GitHub repository
2. Upload all files to the repository
3. Go to Settings → Pages
4. Deploy from: `main` branch, `/` (root) folder
5. Wait 1-2 minutes for deployment
6. Access your tree at: `https://<username>.github.io/<repo-name>/`

## 📂 Project Structure

```
/
├── index.html              # Main HTML file
├── css/
│   ├── styles.css          # Main stylesheet
│   └── mobile.css          # Mobile-responsive styles (<768px, <600px)
├── js/
│   └── family-tree.js      # D3.js visualization logic
├── data/
│   └── family-data.json    # Your family tree data
├── images/
│   ├── crest/              # Family crest images (optional)
│   ├── frames/             # Ornate photo frames (optional)
│   ├── defaults/           # Default portraits (optional)
│   └── photos/             # Family member photos
├── FRAME_SETUP.md          # Guide for setting up frames and portraits
├── MOBILE_TESTING.md       # Mobile testing checklist
└── README.md               # This file
```

## 📝 Adding Your Family Data

### Data Format

Edit `data/family-data.json` to add your family members. The data uses a hierarchical structure:

```json
{
  "name": "Person Name",
  "id": "unique-id",
  "gender": "M",
  "birth": "1920-03-15",
  "death": "1995-08-22",
  "photo": "images/photos/person-1.jpg",
  "spouse": {
    "name": "Spouse Name",
    "id": "spouse-id",
    "gender": "F",
    "birth": "1922-07-10",
    "death": null,
    "photo": null
  },
  "children": [
    { /* child data... */ }
  ]
}
```

### Required Fields

- `name`: Full name of the person
- `id`: Unique identifier (e.g., "person-1", "person-2")
- `gender`: "M" for male, "F" for female

### Optional Fields

- `birth`: Birth date (YYYY-MM-DD format recommended)
- `death`: Death date (YYYY-MM-DD or null if living)
- `photo`: Path to photo (or null for default portrait)
- `location`: Location/city where person lived
- `notes`: Biographical information, life achievements, notes (supports paragraphs)
- `role`: Special role marker (e.g., "saint", "founder") for ornate frames
- `spouse`: Spouse object (or null if no spouse)
- `children`: Array of children (or empty array `[]`)

### Tips

- Start with the oldest generation (root person) first
- Use consistent date formats (YYYY-MM-DD is recommended)
- Each person needs a unique `id`
- Set `death` to `null` for living people
- Set `photo` to `null` to use gender-appropriate default portrait (or initials if no defaults)
- Use `role: "saint"` or similar to mark special ancestors with ornate frames
- Add rich biographical information in the `notes` field
- No in-family marriages supported in this version

## 📸 Adding Photos & Frames

### Photos
1. Place photos in the `images/photos/` folder
2. Name files as referenced in your data (e.g., `person-1.jpg`)
3. Recommended photo specs:
   - Size: 400x400px minimum (800x800px ideal for retina)
   - Format: JPG, PNG, or WebP
   - File size: <200KB for best performance
4. Photos are automatically:
   - Displayed in circular frames with **ornate overlays** (if frames provided)
   - Enhanced with soft shadows and elegant hover effects
   - Shown as grayscale + sepia for deceased members
   - Replaced with gender-appropriate default portraits or initials if missing

### Ornate Frames (Optional)
Add decorative frames that overlay photos for a heritage manuscript aesthetic:

1. Create or obtain ornate frame images (100×100px PNG with transparency)
2. Place in `images/frames/` folder:
   - `saint-frame.png` - For saints/founders (role:"saint")
   - `male-frame.png` - For all male family members
   - `female-frame.png` - For all female family members
3. See `FRAME_SETUP.md` for detailed specifications and examples

### Default Portraits (Optional)
Provide default portraits when family photos are unavailable:

1. Create or obtain traditional-style portrait images (90×90px)
2. Place in `images/defaults/` folder:
   - `male-default.png` - Default for males without photos
   - `female-default.png` - Default for females without photos
3. These will display instead of initials placeholders

### Family Crest (Optional)
Add your family crest to the header and backdrop:

1. Create or obtain family crest image (PNG with transparent background)
2. Place in `images/crest/` folder as `family-crest.png`
3. Update `index.html` to reference your crest file
4. Crest will appear in header (50px) and as subtle backdrop watermark (600px)

## 🎨 Features Guide

### Search

- Type any part of a name in the search box
- Search also works for birth/death years
- Results are highlighted in the tree
- Use ↑↓ buttons to navigate multiple results

### Filters

- **Generations**: Show specific generations (e.g., 1-5)
- **Status**: Filter by living, deceased, or show all
- **Photos**: Show only members with photos
- Click "Clear All Filters" to reset

### Info Panel

- Click any person to open their detail panel
- View full information, dates, location, and generation
- **Biography/Notes section** displays rich biographical information
- Click relationship names to navigate to them
- "View in Tree" button centers the person in the view

### Navigation

- **Pan**: Click and drag the tree (or swipe on mobile)
- **Zoom**: Use mouse wheel, pinch gesture (mobile), or zoom buttons in header
- **Reset View**: Click home icon in header to return to initial view
- **Expand/Collapse**: Click the **+** or **−** button at the bottom of any node with children
- **Expand All**: Click expand icon in header to show all branches
- **Collapse All**: Click compress icon in header to collapse all branches
- **Mobile**: Full touch support with 44px minimum tap targets, optimized for phones and tablets

## 🖥️ Browser Support

### Desktop
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

### Mobile & Tablet
- ✅ Mobile Safari (iOS 12+)
- ✅ Chrome Mobile (Android 7+)
- ✅ Touch-optimized with 44px minimum tap targets
- ✅ Responsive breakpoints: 768px (tablet), 600px (phone)
- ✅ Full-screen info panels on mobile
- ✅ Pinch-to-zoom and swipe gestures

See `MOBILE_TESTING.md` for complete mobile testing checklist.

## 🛠️ Troubleshooting

### Photos Not Loading

- Check file paths are correct
- Ensure images are in `images/photos/` folder
- Verify file names match the `photo` field in data
- Check image file extensions (jpg, png, webp)

### Tree Not Rendering

- Open browser console (F12 → Console tab)
- Check for JavaScript errors
- Verify `family-data.json` is valid JSON
- Use a JSON validator: https://jsonlint.com

### Slow Performance

- Reduce photo file sizes (<200KB each)
- Use modern image formats (WebP)
- Filter to show fewer generations
- Clear browser cache (Ctrl+Shift+Delete)

### CORS Errors (when opening index.html directly)

- You must use a web server (see Quick Start above)
- File protocol (`file://`) doesn't work due to browser security
- Use `python3 -m http.server` or any local server

## 🎯 Next Steps

Ready to add more features? Here are some enhancements you can implement:

1. **Filter by Branch**: Add filtering by specific family branches
2. **Export to PDF**: Add export functionality for printing
3. **Timeline View**: Alternative chronological visualization
4. **Statistics**: Show family statistics (average lifespan, etc.)
5. **Edit Mode**: In-browser editing of family data
6. **Dark Mode**: Toggle between light and dark themes

## 🎨 Design Credits

**Premium Royal Genealogy Theme** inspired by:
- Luxury ancestry platforms (Ancestry.com Premium, MyHeritage)
- Royal archives and museums (British Royal Archives aesthetic)
- Historical genealogy manuscripts (illuminated family trees)
- High-end editorial design (National Geographic, museum catalogs)

**Typography:**
- [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) - Christian Thalmann (Open Font License)
- [Inter](https://fonts.google.com/specimen/Inter) - Rasmus Andersson (Open Font License)

## 📄 License

This project uses:
- **D3.js** (BSD license) - https://d3js.org/
- **Font Awesome** (Free license) - https://fontawesome.com/
- **Google Fonts** (Open Font License) - https://fonts.google.com/

Your family tree data and this implementation are yours to use and modify freely.

## 🤝 Contributing

Want to add features or fix bugs?

1. Test your changes locally
2. Ensure responsiveness on mobile
3. Check browser console for errors
4. Test with your family data

## 📧 Support

For questions or issues:
- Check the Troubleshooting section above
- Review the browser console for errors
- Verify your JSON data is valid
- Ensure you're using a web server (not `file://`)

---

**Built with ❤️ using D3.js • Version 3.0 - Heritage Edition**

Premium features: Ornate frames • Default portraits • Biography notes • Family crest • Mobile-optimized

Enjoy exploring your family history with museum-quality elegance!
