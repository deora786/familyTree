# Frame & Default Portrait Setup Guide

The family tree now supports ornate frames and default portraits when photos are missing.

## 📁 Directory Structure

```
images/
├── frames/
│   ├── saint-frame.png      # Ornate frame for root/saint (100×100px)
│   ├── male-frame.png        # Royal frame for males (100×100px)
│   └── female-frame.png      # Royal frame for females (100×100px)
└── defaults/
    ├── male-default.png      # Default male portrait (90×90px)
    └── female-default.png    # Default female portrait (90×90px)
```

## 🖼️ Frame Image Requirements

### Frame Specifications:
- **Size:** 100×100 pixels (frames overlay 90px photos with 5px border space)
- **Format:** PNG with transparency
- **Style:** Ornate circular/square frames matching the reference images you provided
- **Transparency:** Frame interior should be transparent (shows photo through it)
- **Edge:** Frame border should be opaque with ornamental details

### Frame Types:

1. **saint-frame.png** (Ornate/Sacred)
   - Most elaborate ornamental design
   - Used for: Root person (first ancestor) or special saints
   - Example: Decorative frame with floral/spiritual motifs, jeweled accents
   - Reference: Your first two frame images (ornate black/gold patterns)

2. **male-frame.png** (Royal Male)
   - Elegant masculine frame
   - Used for: All male family members
   - Colors: Gold tones, royal blue accents
   - Reference: Your male portrait frame (gold with blue details)

3. **female-frame.png** (Royal Female)
   - Elegant feminine frame
   - Used for: All female family members
   - Colors: Gold tones, mahogany/rose accents
   - Reference: Your female portrait frame (gold with warmer tones)

## 🎨 Default Portrait Requirements

### Portrait Specifications:
- **Size:** 90×90 pixels (circular crop)
- **Format:** PNG or JPG
- **Style:** Traditional Indian miniature painting aesthetic
- **Circular:** Should work well when displayed in circular frame
- **Colors:** Rich, warm tones matching manuscript aesthetic

### Portrait Types:

1. **male-default.png**
   - Traditional Indian male attire (turban, royal dress)
   - Warm skin tones, elegant jewelry
   - Reference: Your male portrait example (turban, ornate clothing)
   - Should feel timeless and dignified

2. **female-default.png**
   - Traditional Indian female attire (saree, jewelry)
   - Warm skin tones, bridal/festive ornamentation
   - Reference: Your female portrait example (traditional dress, jewelry)
   - Should feel elegant and ceremonial

## 🚀 Quick Start Options

### Option 1: Use Your Reference Images (Recommended)

You provided perfect reference images! Here's how to prepare them:

1. **For Frames:**
   - Open your frame images in an image editor (Photoshop, GIMP, etc.)
   - Resize to 100×100 pixels
   - Ensure center is transparent (remove any inner content)
   - Save as PNG with transparency
   - Place in `images/frames/` folder

2. **For Default Portraits:**
   - Open your portrait examples
   - Crop to square (centered on face)
   - Resize to 90×90 pixels
   - Save as PNG or JPG
   - Place in `images/defaults/` folder

### Option 2: Generate AI Images

Use AI image generators like:
- **Midjourney**: "Indian miniature painting portrait, royal attire, ornate frame, traditional art style"
- **DALL-E 3**: "Traditional Indian royal portrait in miniature painting style"
- **Stable Diffusion**: Use "Indian miniature painting" in prompt

### Option 3: Stock Images

Search for:
- "Indian miniature painting portraits"
- "Traditional Indian royal portraits"
- "Ornate picture frames PNG transparent"
- "Victorian portrait frames"

Sites: Shutterstock, Getty Images, Creative Market, Freepik

### Option 4: Create Simple CSS Fallbacks (Temporary)

If you don't have images ready, the system will fail gracefully:
- Missing frames: Photo shows with current gold border
- Missing defaults: Shows initials placeholder (current behavior)

## 🎯 How It Works

### Frame Logic:

```javascript
// Root person (generation 1) gets saint frame
if (isRoot) return 'images/frames/saint-frame.png';

// Others get gender-based frames
return isMale ? 'images/frames/male-frame.png' : 'images/frames/female-frame.png';
```

### Default Portrait Logic:

```javascript
// If person has photo, use it
if (person.photo) return person.photo;

// Otherwise use gender-appropriate default
return isMale ? 'images/defaults/male-default.png' : 'images/defaults/female-default.png';
```

### Future Enhancement: Notes Field

Currently, only the root person gets the saint frame. To mark other saints/special ancestors:

```json
{
  "name": "Saint Name",
  "notes": "saint", // or "origin"
  "gender": "M",
  ...
}
```

Update JavaScript to check:
```javascript
const isSaint = d.node.notes === 'saint' || d.node.notes === 'origin';
if (isSaint) return config.frames.saint;
```

## 📐 Image Sizing Guide

### Current Photo Size: 90×90px

Frame overlay calculation:
- Photo: 90px diameter circle
- Frame: 100×100px square
- Visible frame border: ~5px on each side
- Frame should have ~10px transparent interior

### Creating Frames in Image Editor:

1. Create 100×100px canvas
2. Draw ornate border in outer 10-15px
3. Keep center 80-85px transparent
4. Add ornamental details on corners/edges
5. Use gold/bronze colors (#C9A961, #8B6F47)
6. Add subtle drop shadow for depth

## 🎨 Color Palette for Custom Frames

Match the manuscript aesthetic:

```css
/* Gold tones */
--accent-gold: #C9A961    /* Primary frame color */
--accent-bronze: #8B6F47  /* Aged bronze accents */

/* Gender accents */
--male-accent: #2A5080    /* Royal blue for male frames */
--female-accent: #7D5446  /* Mahogany for female frames */

/* Highlights */
--gold-light: #D4B76A     /* Bright gold highlights */
--gold-dark: #A08A50      /* Dark gold shadows */
```

## 🧪 Testing

After adding your images:

1. **Test with photo:**
   - Verify frame overlays correctly
   - Check transparency works
   - Hover should enhance frame visibility

2. **Test without photo:**
   - Default portrait should appear
   - Frame should still overlay default
   - Gender-appropriate images used

3. **Test root person:**
   - Should have ornate saint frame
   - More prominent than regular frames

4. **Test on mobile:**
   - Frames should scale appropriately
   - Touch interactions work
   - Still visible at small size

## 📝 File Naming (Important!)

Exact file names required (case-sensitive):
- `saint-frame.png` (not Saint-Frame.png)
- `male-frame.png` (not male_frame.png)
- `female-frame.png`
- `male-default.png`
- `female-default.png`

## 🎭 Style Tips

### For Frames:
- **Subtle is better:** Frame should enhance, not overwhelm photo
- **Consistent style:** All three frames should feel related
- **Gold dominates:** Primary color should be antique gold
- **Transparency matters:** Ensure PNG transparency works correctly
- **Detail in corners:** Most ornamental work in 4 corners
- **Blend with photo:** Use soft edges, avoid harsh lines

### For Default Portraits:
- **Face centered:** Portrait should be centered for circular crop
- **Traditional attire:** Should feel timeless and formal
- **Warm tones:** Match parchment background (#F9F6F0)
- **Dignified expression:** Calm, noble, respectful
- **Minimal background:** Focus on person, not setting
- **High quality:** Clear, not pixelated

## 🚀 Next Steps

1. **Prepare your frame images** (100×100px PNG with transparency)
2. **Prepare default portraits** (90×90px circular-friendly)
3. **Place in correct folders:**
   ```bash
   cp your-frames/* images/frames/
   cp your-portraits/* images/defaults/
   ```
4. **Test at http://localhost:8000**
5. **Commit when satisfied:**
   ```bash
   git add images/
   git commit -m "Add ornate frames and default portraits"
   ```

## 🎨 Example Frame Creation (Photoshop/GIMP)

```
1. New 100×100px canvas
2. Circular selection: 85px diameter, center
3. Expand selection by 5px → delete (creates transparent center)
4. Add ornamental border in remaining area
5. Layer styles: Gold gradient, inner glow, bevel
6. Export as PNG-24 (preserve transparency)
```

---

**Your reference images are perfect!** Just resize and extract them following this guide, and your manuscript aesthetic will be complete. 🎨👑
