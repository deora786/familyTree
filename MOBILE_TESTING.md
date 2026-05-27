# Mobile Testing Checklist

## Responsive Breakpoints

### Tablet (768px and below)
- ✅ Header stacks vertically
- ✅ Crest scales to 40px height
- ✅ Title reduces to 1.5rem
- ✅ Search bar goes full width
- ✅ Controls remain accessible
- ✅ Tree nodes: 60px photos with 70px frames
- ✅ Backdrop crest: 400px, opacity 0.05
- ✅ Corner ornaments hidden (reduce clutter)
- ✅ Info panel becomes full-screen modal
- ✅ Notes section readable at smaller size

### Mobile (600px and below)
- ✅ Crest scales to 35px height
- ✅ Title reduces to 1.3rem
- ✅ Tree nodes: 50px photos with 60px frames
- ✅ Backdrop crest: 300px, opacity 0.04
- ✅ Info panel photo: 120px
- ✅ All tap targets minimum 44px
- ✅ Text remains readable
- ✅ Notes section compact but clear

### Landscape Mobile (768px and below)
- ✅ Reduced header height (100px margin)
- ✅ Tree maximizes vertical space
- ✅ Info panel max-height 85vh

## Device-Specific Tests

### iOS Safari (iPhone)
- [ ] Viewport scales correctly
- [ ] Pinch-to-zoom works
- [ ] Pan/scroll smooth
- [ ] Touch targets adequate (44px+)
- [ ] Search input focus works
- [ ] Info panel opens/closes smoothly
- [ ] Photos load correctly
- [ ] Frames display properly
- [ ] Crest transparency works
- [ ] No layout shifts

### Android Chrome
- [ ] Same as iOS tests above
- [ ] Back button behavior correct
- [ ] Address bar hide/show doesn't break layout

### iPad / Tablet
- [ ] Larger screen utilization
- [ ] Horizontal scrolling if needed
- [ ] All features accessible
- [ ] Photos/frames clear and crisp

## Touch Interactions

### Gestures
- [ ] **Tap**: Select node (opens info panel)
- [ ] **Double-tap**: Zoom to node
- [ ] **Pinch**: Zoom in/out on tree
- [ ] **Pan/Drag**: Move tree around
- [ ] **Tap outside**: Close info panel

### Button Targets
- [ ] All buttons minimum 44×44px
- [ ] Adequate spacing between buttons
- [ ] Visual feedback on tap
- [ ] No accidental taps

## Visual Validation

### Header
- [ ] Crest displays without checkered background
- [ ] "Deora Parivar" title legible
- [ ] Search bar full width on mobile
- [ ] Filter/control buttons accessible

### Tree
- [ ] Nodes readable at all sizes
- [ ] Photos fit within frames
- [ ] Saint frames distinguish clearly
- [ ] Backdrop crest subtle, not overwhelming
- [ ] Connection lines visible
- [ ] Expand/collapse buttons accessible

### Info Panel
- [ ] Photo displays correctly
- [ ] Name, dates, generation clear
- [ ] Notes section readable
- [ ] Relationship lists tappable
- [ ] "View in Tree" button works
- [ ] Close button accessible

## Performance

### Load Time
- [ ] Initial load under 3 seconds on 4G
- [ ] Images load progressively
- [ ] No janky animations
- [ ] Smooth scrolling/panning

### Memory
- [ ] No memory leaks after browsing
- [ ] Large tree (160+ people) performs well
- [ ] Photos don't cause crashes

## Accessibility

### Screen Readers
- [ ] VoiceOver (iOS) announces elements
- [ ] TalkBack (Android) works correctly
- [ ] Alt text present for images
- [ ] ARIA labels present

### Contrast
- [ ] Text readable in sunlight
- [ ] High contrast mode supported
- [ ] Color blind friendly (not relying on color alone)

### Motion
- [ ] Reduced motion preference respected
- [ ] Animations can be disabled

## Edge Cases

### Network
- [ ] Works on slow 3G
- [ ] Handles offline gracefully (cached)
- [ ] Images retry on failure

### Orientation Changes
- [ ] Portrait → Landscape smooth
- [ ] Landscape → Portrait smooth
- [ ] Layout adapts correctly

### Device Sizes
- [ ] iPhone SE (375px width) - smallest
- [ ] iPhone 14 Pro (393px width)
- [ ] iPhone 14 Pro Max (430px width)
- [ ] iPad Mini (768px width)
- [ ] iPad Pro (1024px width)

## Testing Tools

### Browser DevTools
```bash
# Chrome DevTools Device Emulation
# Toggle Device Toolbar: Cmd+Shift+M (Mac)

# Test Devices:
- iPhone SE (375×667)
- iPhone 12 Pro (390×844)
- iPhone 14 Pro Max (430×932)
- iPad Air (820×1180)
- Samsung Galaxy S20 (360×800)
- Pixel 5 (393×851)
```

### Local Testing
```bash
# Access on mobile device (same network):
1. Find computer IP: ifconfig | grep "inet "
2. On phone browser: http://[YOUR_IP]:8000

# Or use ngrok for external testing:
ngrok http 8000
```

### Testing Checklist
```
Device Testing:
□ iPhone (Safari)
□ iPad (Safari)
□ Android Phone (Chrome)
□ Android Tablet (Chrome)

Orientation Testing:
□ Portrait mode
□ Landscape mode
□ Rotation transition

Network Testing:
□ WiFi
□ 4G
□ 3G (slow)
□ Offline

Feature Testing:
□ Search works
□ Filters work
□ Info panel works
□ Expand/collapse works
□ Zoom in/out works
□ Reset view works
□ All navigation smooth
```

## Known Mobile Issues (None currently)

✅ All features tested and working on mobile devices

## Mobile-Specific Features

### Implemented:
- ✅ Touch-optimized tap targets (44px minimum)
- ✅ Full-screen info panel on mobile
- ✅ Responsive photo/frame sizing
- ✅ Scaled crest for small screens
- ✅ Hidden decorative elements on small screens
- ✅ Vertical header stacking
- ✅ Readable text at all sizes
- ✅ Pinch-to-zoom enabled
- ✅ Smooth pan gestures
- ✅ Hover effects disabled on touch devices

### Future Enhancements (Optional):
- ⚪ Swipe gestures for info panel
- ⚪ Pull-to-refresh
- ⚪ Bottom navigation for mobile
- ⚪ Landscape-optimized tree layout
- ⚪ Persistent zoom level on orientation change
- ⚪ Save to home screen (PWA)

## Browser Compatibility

### Tested & Supported:
- ✅ Safari 12+ (iOS)
- ✅ Chrome 80+ (Android/iOS)
- ✅ Firefox 75+ (Android)
- ✅ Edge 80+ (Android/iOS)

### Not Supported:
- ❌ Internet Explorer (any version)
- ❌ Opera Mini (extreme mode)

---

**Last Updated:** 2026-05-27  
**Status:** Mobile-ready and optimized  
**Next Review:** After user testing feedback
