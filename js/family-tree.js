// Family Tree Visualization with D3.js
// =====================================

// Global state
let familyData = null;
let flatData = [];
let svg, g, zoom;
let width, height;
let currentPerson = null;
let searchResults = [];
let currentSearchIndex = 0;
let collapsedNodes = new Set();

// Configuration - MANUSCRIPT: Organic spacing for natural flow
const config = {
  nodeWidth: 130, // Slightly wider for larger photos
  nodeHeight: 150, // Taller for portrait composition
  verticalSpacing: 220, // Increased from 180 for breathing room
  horizontalSpacing: 80, // Increased from 60 for less rigid grid
  spouseSpacing: 180, // Increased from 150 for elegant separation
  transitionDuration: 500,

  // Frame and default image paths
  frames: {
    saint: 'images/frames/saint-frame.png',      // Ornate frame for root/saints
    male: 'images/frames/male-frame.png',        // Royal frame for males
    female: 'images/frames/female-frame.png'     // Royal frame for females
  },
  defaults: {
    male: 'images/defaults/male-default.png',    // Default male portrait
    female: 'images/defaults/female-default.png' // Default female portrait
  }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  initializeTree();
  setupEventListeners();
  loadFamilyData();
});

// Initialize D3 tree layout
function initializeTree() {
  const container = document.getElementById('tree-container');
  width = container.clientWidth;
  height = container.clientHeight;

  // Create SVG
  svg = d3.select('#family-tree')
    .attr('width', width)
    .attr('height', height);

  // Create main group for zoom/pan
  g = svg.append('g')
    .attr('class', 'tree-group');

  // Setup zoom behavior
  zoom = d3.zoom()
    .scaleExtent([0.1, 3])
    .on('zoom', (event) => {
      g.attr('transform', event.transform);
    });

  svg.call(zoom);
}

// Reset view to initial state
function resetView() {
  const initialTransform = d3.zoomIdentity
    .translate(width / 2, 80)
    .scale(0.7);

  svg.transition()
    .duration(config.transitionDuration)
    .call(zoom.transform, initialTransform);
}

// Zoom in
function zoomIn() {
  svg.transition()
    .duration(300)
    .call(zoom.scaleBy, 1.3);
}

// Zoom out
function zoomOut() {
  svg.transition()
    .duration(300)
    .call(zoom.scaleBy, 0.7);
}

// Load family data from JSON
async function loadFamilyData() {
  try {
    const response = await fetch('data/family-data.json');
    if (!response.ok) {
      throw new Error('Failed to load family data');
    }

    familyData = await response.json();
    flattenData(familyData);
    renderTree();

    // Hide loading indicator
    document.getElementById('loading').style.display = 'none';

    // Update filter stats
    updateFilterStats();

    // Set initial view
    setTimeout(resetView, 100);
  } catch (error) {
    console.error('Error loading family data:', error);
    document.getElementById('loading').innerHTML = `
      <div class="spinner"></div>
      <p style="color: var(--error-red);">Error loading family tree data</p>
    `;
  }
}

// Flatten hierarchical data for easier processing
function flattenData(node, generation = 1, parent = null) {
  const isCollapsed = collapsedNodes.has(node.id);

  // Add node to flat array
  const nodeData = {
    ...node,
    generation,
    parent,
    _children: node.children, // Store original children
    children: isCollapsed ? null : node.children,
    isCollapsed: isCollapsed
  };

  flatData.push(nodeData);

  // Process spouse
  if (node.spouse) {
    const spouseData = {
      ...node.spouse,
      generation,
      parent,
      isSpouse: true,
      spouseOf: node.id
    };
    flatData.push(spouseData);
  }

  // Process children recursively ONLY if not collapsed
  if (node.children && node.children.length > 0 && !isCollapsed) {
    node.children.forEach(child => {
      flattenData(child, generation + 1, node.id);
    });
  }
}

// Render the tree
function renderTree() {
  // Clear flat data and rebuild
  flatData = [];
  flattenData(familyData);

  // Calculate positions
  const positions = calculatePositions();

  // Render links first (so they appear behind nodes)
  renderLinks(positions);

  // Render nodes
  renderNodes(positions);
}

// Calculate positions for all nodes
function calculatePositions() {
  const positions = new Map();
  const generations = new Map();

  // Group by generation
  flatData.forEach(node => {
    if (!generations.has(node.generation)) {
      generations.set(node.generation, []);
    }
    generations.get(node.generation).push(node);
  });

  // Calculate positions generation by generation
  let generationArray = Array.from(generations.keys()).sort((a, b) => a - b);

  generationArray.forEach(gen => {
    const nodesInGen = generations.get(gen);
    const y = gen * config.verticalSpacing;

    // Separate regular nodes and spouses
    const regularNodes = nodesInGen.filter(n => !n.isSpouse);
    const spouses = nodesInGen.filter(n => n.isSpouse);

    // Calculate total width needed including spouse spacing
    let totalWidth = 0;
    let nodeWidths = [];

    regularNodes.forEach(node => {
      const hasSpouse = spouses.some(s => s.spouseOf === node.id);
      const width = config.nodeWidth + (hasSpouse ? config.spouseSpacing : 0);
      nodeWidths.push({ node, width, hasSpouse });
      totalWidth += width;
    });

    // Add spacing between nodes
    totalWidth += (regularNodes.length - 1) * config.horizontalSpacing;

    // Position regular nodes with proper spacing
    let currentX = -totalWidth / 2;

    nodeWidths.forEach(({ node, width, hasSpouse }) => {
      // Center position of the node (or node pair if spouse exists)
      const nodeX = currentX + (hasSpouse ? config.nodeWidth / 2 : width / 2);
      positions.set(node.id, { x: nodeX, y, node });

      // Position spouse if exists
      if (hasSpouse) {
        const spouse = spouses.find(s => s.spouseOf === node.id);
        if (spouse) {
          positions.set(spouse.id, {
            x: nodeX + config.spouseSpacing,
            y: y,
            node: spouse
          });
        }
      }

      // Move to next position
      currentX += width + config.horizontalSpacing;
    });
  });

  return positions;
}

// Render tree links (connections)
function renderLinks(positions) {
  const links = [];

  // Parent-child links
  flatData.forEach(node => {
    if (node.parent) {
      const parentPos = positions.get(node.parent);
      const childPos = positions.get(node.id);

      if (parentPos && childPos && !node.isSpouse) {
        // If parent has spouse, link from midpoint
        const parentNode = flatData.find(n => n.id === node.parent);
        const parentSpouse = flatData.find(n => n.spouseOf === node.parent);

        let sourceX = parentPos.x;
        if (parentSpouse) {
          const spousePos = positions.get(parentSpouse.id);
          if (spousePos) {
            sourceX = (parentPos.x + spousePos.x) / 2;
          }
        }

        links.push({
          source: { x: sourceX, y: parentPos.y },
          target: { x: childPos.x, y: childPos.y },
          type: 'parent-child'
        });
      }
    }
  });

  // Spouse links
  flatData.forEach(node => {
    if (!node.isSpouse && node.spouse) {
      const personPos = positions.get(node.id);
      const spousePos = positions.get(node.spouse.id);

      if (personPos && spousePos) {
        links.push({
          source: { x: personPos.x, y: personPos.y },
          target: { x: spousePos.x, y: spousePos.y },
          type: 'spouse'
        });
      }
    }
  });

  // Draw parent-child links (curved) with animation
  const parentChildLinks = links.filter(l => l.type === 'parent-child');

  g.selectAll('.tree-link-parent')
    .data(parentChildLinks, d => `${d.source.x}-${d.source.y}-${d.target.x}-${d.target.y}`)
    .join(
      enter => enter.append('path')
        .attr('class', 'tree-link tree-link-parent')
        .attr('d', d => {
          const midY = (d.source.y + d.target.y) / 2;
          return `M ${d.source.x},${d.source.y}
                  C ${d.source.x},${d.source.y}
                    ${d.source.x},${d.source.y}
                    ${d.source.x},${d.source.y}`;
        })
        .style('opacity', 0)
        .call(enter => enter.transition()
          .duration(config.transitionDuration)
          .ease(d3.easeCubicOut)
          .style('opacity', 1)
          .attr('d', d => {
            const midY = (d.source.y + d.target.y) / 2;
            return `M ${d.source.x},${d.source.y}
                    C ${d.source.x},${midY}
                      ${d.target.x},${midY}
                      ${d.target.x},${d.target.y}`;
          })
        ),
      update => update
        .call(update => update.transition()
          .duration(config.transitionDuration)
          .ease(d3.easeCubicInOut)
          .attr('d', d => {
            const midY = (d.source.y + d.target.y) / 2;
            return `M ${d.source.x},${d.source.y}
                    C ${d.source.x},${midY}
                      ${d.target.x},${midY}
                      ${d.target.x},${d.target.y}`;
          })
        ),
      exit => exit
        .call(exit => exit.transition()
          .duration(config.transitionDuration)
          .ease(d3.easeCubicIn)
          .style('opacity', 0)
          .attr('d', d => {
            return `M ${d.source.x},${d.source.y}
                    C ${d.source.x},${d.source.y}
                      ${d.source.x},${d.source.y}
                      ${d.source.x},${d.source.y}`;
          })
          .remove()
        )
    );

  // Draw spouse links (straight) with animation
  const spouseLinks = links.filter(l => l.type === 'spouse');

  g.selectAll('.tree-link-spouse')
    .data(spouseLinks, d => `spouse-${d.source.x}-${d.source.y}`)
    .join(
      enter => enter.append('line')
        .attr('class', 'tree-link spouse-link tree-link-spouse')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.source.x)
        .attr('y2', d => d.source.y)
        .style('opacity', 0)
        .call(enter => enter.transition()
          .duration(config.transitionDuration)
          .ease(d3.easeCubicOut)
          .style('opacity', 1)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y)
        ),
      update => update
        .call(update => update.transition()
          .duration(config.transitionDuration)
          .ease(d3.easeCubicInOut)
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y)
        ),
      exit => exit
        .call(exit => exit.transition()
          .duration(config.transitionDuration)
          .ease(d3.easeCubicIn)
          .style('opacity', 0)
          .attr('x2', d => d.source.x)
          .attr('y2', d => d.source.y)
          .remove()
        )
    );
}

// Render tree nodes
function renderNodes(positions) {
  const nodesData = Array.from(positions.values());

  const nodeGroups = g.selectAll('.tree-node')
    .data(nodesData, d => d.node.id)
    .join(
      enter => {
        // New nodes entering
        const enterGroup = enter.append('g')
          .attr('class', 'tree-node')
          .attr('transform', d => {
            // Start from parent position if exists
            if (d.node.parent) {
              const parentPos = positions.get(d.node.parent);
              if (parentPos) {
                return `translate(${parentPos.x},${parentPos.y})`;
              }
            }
            return `translate(${d.x},${d.y})`;
          })
          .style('opacity', 0);

        // Animate to final position
        enterGroup.transition()
          .duration(config.transitionDuration)
          .ease(d3.easeCubicOut)
          .attr('transform', d => `translate(${d.x},${d.y})`)
          .style('opacity', 1);

        return enterGroup;
      },
      update => {
        // Existing nodes updating position
        update.transition()
          .duration(config.transitionDuration)
          .ease(d3.easeCubicInOut)
          .attr('transform', d => `translate(${d.x},${d.y})`)
          .style('opacity', 1);
        return update;
      },
      exit => {
        // Nodes being removed
        exit.transition()
          .duration(config.transitionDuration)
          .ease(d3.easeCubicIn)
          .attr('transform', d => {
            // Move to parent position when exiting
            if (d.node.parent) {
              const parentPos = positions.get(d.node.parent);
              if (parentPos) {
                return `translate(${parentPos.x},${parentPos.y})`;
              }
            }
            return `translate(${d.x},${d.y})`;
          })
          .style('opacity', 0)
          .remove();
      }
    )
    .on('click', (event, d) => {
      // Check if click is on expand indicator - if so, don't show info
      if (!event.target.closest('.expand-indicator-group')) {
        showPersonInfo(d.node);
      }
    });

  // Remove existing content
  nodeGroups.selectAll('*').remove();

  // Add node card background
  nodeGroups.append('rect')
    .attr('class', d => {
      const classes = ['node-card'];
      if (d.node.gender === 'M') classes.push('male');
      if (d.node.gender === 'F') classes.push('female');
      if (d.node.death) classes.push('deceased');
      return classes.join(' ');
    })
    .attr('x', -60)
    .attr('y', -70)
    .attr('width', 120)
    .attr('height', 140)
    .attr('rx', 12);

  // Add expand/collapse indicator
  nodeGroups.each(function(d) {
    // Show indicator only for nodes that have children and are not spouses
    const hasChildren = d.node._children && d.node._children.length > 0;
    if (hasChildren && !d.node.isSpouse) {
      const g = d3.select(this);
      const isCollapsed = d.node.isCollapsed || collapsedNodes.has(d.node.id);

      // Create a group for the indicator that's clickable
      const indicator = g.append('g')
        .attr('class', 'expand-indicator-group')
        .attr('transform', 'translate(0, 75)')
        .style('cursor', 'pointer')
        .on('click', function(event) {
          event.stopPropagation(); // Prevent node click
          toggleNodeExpansion(d.node);
        });

      indicator.append('circle')
        .attr('class', 'expand-indicator')
        .attr('r', 14)
        .attr('fill', isCollapsed ? '#8B6F47' : '#2C3E7A')
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .style('transition', 'all 0.3s ease');

      indicator.append('text')
        .attr('class', 'expand-icon')
        .attr('y', 5)
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .attr('font-size', '18px')
        .attr('font-weight', 'bold')
        .style('pointer-events', 'none')
        .text(isCollapsed ? '+' : '−');

      // Store current state for hover
      const currentCollapsed = isCollapsed;

      // Add hover effect
      indicator.on('mouseenter', function() {
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', 16)
          .attr('fill', currentCollapsed ? '#A68958' : '#4A5FA5');
      }).on('mouseleave', function() {
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', 14)
          .attr('fill', currentCollapsed ? '#8B6F47' : '#2C3E7A');
      });
    }
  });

  // Add photo or default portrait
  nodeGroups.append('image')
    .attr('class', d => d.node.death ? 'node-photo deceased' : 'node-photo')
    .attr('x', -40) // Centered within frame
    .attr('y', -60)
    .attr('width', 80) // Slightly smaller to fit within ornate frames
    .attr('height', 80)
    .attr('href', d => getPhotoOrDefault(d.node))
    .attr('clip-path', 'circle(40px at 40px 40px)')
    .on('error', function(event, d) {
      // Fallback to gradient placeholder if default image fails
      d3.select(this).attr('href', getPlaceholderImage(d.node.name, d.node.gender));
    });

  // Add ornate frame overlay (for root person or saints)
  nodeGroups.append('image')
    .attr('class', 'node-frame')
    .attr('x', -50)
    .attr('y', -70)
    .attr('width', 100)
    .attr('height', 100)
    .attr('href', d => getFrameImage(d))
    .style('pointer-events', 'none') // Frame doesn't intercept clicks
    .style('opacity', 0.95)
    .on('error', function() {
      // Hide frame if image doesn't exist
      d3.select(this).style('display', 'none');
    });

  // Add name
  nodeGroups.append('text')
    .attr('class', 'node-name')
    .attr('y', 35)
    .attr('text-anchor', 'middle')
    .each(function(d) {
      const text = d3.select(this);
      const name = d.node.name;

      if (name.length > 15) {
        text.text(name.substring(0, 13) + '...');
      } else {
        text.text(name);
      }
    });

  // Add dates
  nodeGroups.append('text')
    .attr('class', 'node-dates')
    .attr('y', 52)
    .attr('text-anchor', 'middle')
    .text(d => {
      const birthYear = d.node.birth ? new Date(d.node.birth).getFullYear() : '?';
      const deathYear = d.node.death ? new Date(d.node.death).getFullYear() : '';
      return deathYear ? `${birthYear} - ${deathYear}` : `b. ${birthYear}`;
    });
}

// Toggle node expansion/collapse
function toggleNodeExpansion(node) {
  if (!node._children || node._children.length === 0 || node.isSpouse) {
    console.log('Cannot toggle: no children or is spouse', node.name);
    return;
  }

  if (collapsedNodes.has(node.id)) {
    console.log('Expanding:', node.name);
    collapsedNodes.delete(node.id);
  } else {
    console.log('Collapsing:', node.name);
    collapsedNodes.add(node.id);
  }

  console.log('Collapsed nodes:', Array.from(collapsedNodes));
  renderTree();
}

// Expand all nodes
function expandAll() {
  collapsedNodes.clear();
  console.log('Expanded all nodes');
  renderTree();
}

// Collapse all nodes (except first generation)
function collapseAll() {
  // Need to work with the original data structure, not flatData
  function collapseRecursive(node) {
    if (node.children && node.children.length > 0) {
      // Collapse this node if it has children
      if (node.generation && node.generation >= 1) {
        collapsedNodes.add(node.id);
      }
      // Recursively process children
      node.children.forEach(child => collapseRecursive(child));
    }
  }

  // Start from root
  collapsedNodes.clear();
  collapseRecursive(familyData);
  console.log('Collapsed all nodes:', Array.from(collapsedNodes));
  renderTree();
}

// Generate placeholder image as data URL
function getPlaceholderImage(name, gender) {
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  const bgColor = gender === 'M' ? '#3D52A0' : '#A0404F';
  const bgColorLight = gender === 'M' ? '#5C6FBF' : '#BF5566';

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="grad-${gender}-${name.replace(/\s/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${bgColorLight};stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#grad-${gender}-${name.replace(/\s/g, '')})"/>
      <text x="50" y="68" font-size="42" fill="white" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="700" style="text-shadow: 0 2px 4px rgba(0,0,0,0.3)">${initials}</text>
    </svg>
  `;

  return 'data:image/svg+xml;base64,' + btoa(svg);
}

// Get photo or default portrait based on gender
function getPhotoOrDefault(node) {
  if (node.photo) {
    return node.photo;
  }
  // Use default portraits for male/female, fallback to placeholder
  const defaultPath = node.gender === 'M' ? config.defaults.male : config.defaults.female;

  // Return default if exists, otherwise use gradient placeholder
  return defaultPath;
  // Note: If default images don't exist, browser will show broken image
  // To prevent this, add onerror handler in rendering code
}

// Get appropriate frame based on person's status
function getFrameImage(d) {
  // Check if this person is marked as a saint
  const isSaint = d.node.role === 'saint';

  if (isSaint) {
    // Saints get ornate saint frame (Nath Ji Maharaj frame)
    return config.frames.saint;
  }

  // Regular frames based on gender
  return d.node.gender === 'M' ? config.frames.male : config.frames.female;
}

// Show person information panel
function showPersonInfo(person) {
  currentPerson = person;

  const panel = document.getElementById('info-panel');
  const overlay = document.getElementById('overlay');

  // Update panel content
  document.getElementById('panel-name').textContent = person.name;
  document.getElementById('panel-photo').src = getPhotoOrDefault(person);
  document.getElementById('panel-photo').alt = person.name;

  // Birth date
  document.getElementById('panel-birth').textContent = person.birth || 'Unknown';

  // Death date
  const deathRow = document.getElementById('death-row');
  if (person.death) {
    deathRow.style.display = 'flex';
    document.getElementById('panel-death').textContent = person.death;
  } else {
    deathRow.style.display = 'none';
  }

  // Generation
  document.getElementById('panel-generation').textContent = `Generation ${person.generation || '?'}`;

  // Notes section
  const notesSection = document.getElementById('notes-section');
  const notesContent = document.getElementById('panel-notes');

  if (person.notes && person.notes.trim() !== '') {
    notesSection.style.display = 'block';
    notesContent.textContent = person.notes;
  } else {
    notesSection.style.display = 'none';
  }

  // Spouse
  const spouseSection = document.getElementById('spouse-section');
  const spouseList = document.getElementById('spouse-list');
  spouseList.innerHTML = '';

  if (person.spouse) {
    spouseSection.style.display = 'block';
    const li = document.createElement('li');
    li.textContent = person.spouse.name;
    li.dataset.personId = person.spouse.id;
    li.addEventListener('click', () => {
      const spouseData = flatData.find(n => n.id === person.spouse.id);
      if (spouseData) {
        closePanel();
        setTimeout(() => showPersonInfo(spouseData), 100);
      }
    });
    spouseList.appendChild(li);
  } else {
    spouseSection.style.display = 'none';
  }

  // Children
  const childrenSection = document.getElementById('children-section');
  const childrenList = document.getElementById('children-list');
  childrenList.innerHTML = '';

  if (person.children && person.children.length > 0) {
    childrenSection.style.display = 'block';
    person.children.forEach(child => {
      const childData = flatData.find(n => n.id === child.id);
      if (childData) {
        const li = document.createElement('li');
        li.textContent = child.name;
        li.dataset.personId = child.id;
        li.addEventListener('click', () => {
          closePanel();
          setTimeout(() => showPersonInfo(childData), 100);
        });
        childrenList.appendChild(li);
      }
    });
  } else {
    childrenSection.style.display = 'none';
  }

  // Parents - Only show for biological children, not spouses
  const parentsSection = document.getElementById('parents-section');
  const parentsList = document.getElementById('parents-list');
  parentsList.innerHTML = '';

  // Only show parents if this person has a parent field (is a biological child)
  // Spouses are embedded in the tree but don't have biological parents in the data
  if (person.parent) {
    const parentData = flatData.find(n => n.id === person.parent);
    if (parentData) {
      parentsSection.style.display = 'block';

      // Add biological parent
      const li = document.createElement('li');
      li.textContent = parentData.name;
      li.dataset.personId = parentData.id;
      li.addEventListener('click', () => {
        closePanel();
        setTimeout(() => showPersonInfo(parentData), 100);
      });
      parentsList.appendChild(li);

      // Add other biological parent (parent's spouse)
      if (parentData.spouse) {
        const spouseData = flatData.find(n => n.id === parentData.spouse.id);
        if (spouseData) {
          const li2 = document.createElement('li');
          li2.textContent = spouseData.name;
          li2.dataset.personId = spouseData.id;
          li2.addEventListener('click', () => {
            closePanel();
            setTimeout(() => showPersonInfo(spouseData), 100);
          });
          parentsList.appendChild(li2);
        }
      }
    } else {
      parentsSection.style.display = 'none';
    }
  } else {
    // No parent field means this is either root or a spouse
    // Spouses' parents are not in the family tree data
    parentsSection.style.display = 'none';
  }

  // Show panel and overlay
  panel.classList.add('open');
  overlay.classList.add('active');
}

// Close person info panel
function closePanel() {
  document.getElementById('info-panel').classList.remove('open');
  document.getElementById('overlay').classList.remove('active');
  currentPerson = null;
}

// Center on a specific person
function centerOnPerson(personId) {
  const positions = calculatePositions();
  const pos = positions.get(personId);

  if (!pos) return;

  const scale = 1.2;
  const translateX = width / 2 - pos.x * scale;
  const translateY = height / 2 - pos.y * scale;

  svg.transition()
    .duration(config.transitionDuration)
    .call(zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(scale));
}

// Search functionality
function performSearch(query) {
  if (!query || query.length < 2) {
    clearSearch();
    return;
  }

  const lowerQuery = query.toLowerCase();
  searchResults = flatData.filter(node => {
    return !node.isSpouse && (
      node.name.toLowerCase().includes(lowerQuery) ||
      (node.birth && node.birth.includes(query)) ||
      (node.death && node.death.includes(query))
    );
  });

  currentSearchIndex = 0;

  if (searchResults.length > 0) {
    highlightSearchResults();
    showSearchResults();
    centerOnPerson(searchResults[0].id);
  } else {
    showNoResults();
  }
}

// Highlight search results
function highlightSearchResults() {
  g.selectAll('.tree-node')
    .classed('highlighted', false);

  searchResults.forEach(node => {
    g.selectAll('.tree-node')
      .filter(d => d.node.id === node.id)
      .classed('highlighted', true);
  });
}

// Show search results info
function showSearchResults() {
  const resultsDiv = document.getElementById('search-results');
  const countSpan = resultsDiv.querySelector('.result-count');

  countSpan.textContent = `Found ${searchResults.length} match${searchResults.length !== 1 ? 'es' : ''}`;
  resultsDiv.style.display = 'flex';

  document.getElementById('clear-search').style.display = 'block';

  // Enable/disable navigation buttons
  updateSearchNavigation();
}

// Show no results message
function showNoResults() {
  const resultsDiv = document.getElementById('search-results');
  const countSpan = resultsDiv.querySelector('.result-count');

  countSpan.textContent = 'No matches found';
  resultsDiv.style.display = 'flex';

  document.getElementById('clear-search').style.display = 'block';

  setTimeout(() => {
    resultsDiv.style.display = 'none';
  }, 3000);
}

// Navigate search results
function navigateSearchResults(direction) {
  if (searchResults.length === 0) return;

  currentSearchIndex += direction;

  if (currentSearchIndex < 0) {
    currentSearchIndex = searchResults.length - 1;
  } else if (currentSearchIndex >= searchResults.length) {
    currentSearchIndex = 0;
  }

  centerOnPerson(searchResults[currentSearchIndex].id);
  updateSearchNavigation();
}

// Update search navigation buttons
function updateSearchNavigation() {
  const prevBtn = document.getElementById('prev-result');
  const nextBtn = document.getElementById('next-result');

  prevBtn.disabled = searchResults.length <= 1;
  nextBtn.disabled = searchResults.length <= 1;
}

// Clear search
function clearSearch() {
  searchResults = [];
  currentSearchIndex = 0;

  document.getElementById('search-input').value = '';
  document.getElementById('search-results').style.display = 'none';
  document.getElementById('clear-search').style.display = 'none';

  g.selectAll('.tree-node').classed('highlighted', false);
}

// Update filter statistics
function updateFilterStats() {
  const visibleNodes = flatData.filter(n => !n.isSpouse).length;
  document.getElementById('visible-count').textContent = visibleNodes;
  document.getElementById('total-count').textContent = visibleNodes;
}

// Setup event listeners
function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', debounce((e) => {
    performSearch(e.target.value);
  }, 300));

  // Clear search button
  document.getElementById('clear-search').addEventListener('click', clearSearch);

  // Search navigation
  document.getElementById('prev-result').addEventListener('click', () => navigateSearchResults(-1));
  document.getElementById('next-result').addEventListener('click', () => navigateSearchResults(1));

  // Filter toggle
  document.getElementById('filter-toggle').addEventListener('click', () => {
    document.getElementById('filters-sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('active');
  });

  // Close filters
  document.getElementById('close-filters').addEventListener('click', () => {
    document.getElementById('filters-sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('active');
  });

  // Close panel
  document.getElementById('close-panel').addEventListener('click', closePanel);

  // Center on current person
  document.getElementById('center-person').addEventListener('click', () => {
    if (currentPerson) {
      centerOnPerson(currentPerson.id);
    }
  });

  // Reset view button
  document.getElementById('reset-view').addEventListener('click', resetView);

  // Zoom buttons
  document.getElementById('zoom-in').addEventListener('click', zoomIn);
  document.getElementById('zoom-out').addEventListener('click', zoomOut);

  // Expand/collapse all buttons
  document.getElementById('expand-all').addEventListener('click', expandAll);
  document.getElementById('collapse-all').addEventListener('click', collapseAll);

  // Overlay click to close
  document.getElementById('overlay').addEventListener('click', () => {
    document.getElementById('filters-sidebar').classList.remove('open');
    document.getElementById('info-panel').classList.remove('open');
    document.getElementById('overlay').classList.remove('active');
  });

  // Window resize
  window.addEventListener('resize', debounce(() => {
    const container = document.getElementById('tree-container');
    width = container.clientWidth;
    height = container.clientHeight;

    svg.attr('width', width).attr('height', height);
  }, 250));
}

// Utility: Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
