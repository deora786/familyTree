#!/usr/bin/env python3
"""
Remove checkered background from Deora crest and make it transparent.
"""
from PIL import Image
import numpy as np

# Load the image
img = Image.open('images/crest/deora-crest.png').convert('RGBA')
data = np.array(img)

# The checkered pattern consists of two gray colors:
# Light gray: approximately (204, 204, 204) or similar
# Dark gray: approximately (153, 153, 153) or similar

# Create a mask for the checkered pattern
# We'll consider any pixel that's close to gray (R≈G≈B) and relatively light as background
r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

# Check if R, G, B are similar (gray) and in the lighter range
is_gray = (np.abs(r.astype(int) - g.astype(int)) < 20) & \
          (np.abs(g.astype(int) - b.astype(int)) < 20) & \
          (np.abs(r.astype(int) - b.astype(int)) < 20)

# Light checkerboard pattern (both light and dark grays)
is_light_bg = (r > 120) & (r < 220) & is_gray

# Set alpha to 0 (transparent) for checkered background
data[:,:,3] = np.where(is_light_bg, 0, a)

# Save the result
result = Image.fromarray(data, 'RGBA')
result.save('images/crest/deora-crest-transparent.png', 'PNG')

print("✅ Transparent crest saved as: images/crest/deora-crest-transparent.png")
print("   Original size:", img.size)
print("   Transparent pixels added:", np.sum(is_light_bg))
