# ComfyUI Frame (LGraphGroup) & Canvas API Documentation

This document provides a technical overview of how groups (frames) are implemented in ComfyUI's frontend and how they can be modified via the LiteGraph Canvas API.

## 1. LGraphGroup: The Core Class

A "frame" in ComfyUI is an instance of `LGraphGroup`. It is not a node itself, but an organizational element on the canvas.

### Properties
| Property | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | The text displayed in the group header. |
| `pos` | `[number, number]` | Current [x, y] coordinates on the canvas. |
| `size` | `[number, number]` | Current [width, height] dimensions. |
| `color` | `string` | Hex or CSS color of the group's background/border. |
| `font` | `string` | Header font style (e.g., `"Arial"`). |
| `font_size` | `number` | Size of the header text. |
| `_children` | `Set<LGraphNode>` | (Modern LiteGraph) Set containing nodes deemed to be inside the group. |

### Methods
- `move(dx, dy, move_nodes)`: Moves the group. If `move_nodes` is true, nodes inside are moved with it.
- `recomputeInsideNodes()`: Forces LiteGraph to check which nodes are within the group's bounding box.
- `serialize() / configure(data)`: Used for saving/loading the group to/from the workflow JSON.

---

## 2. LGraphCanvas: The Drawing Engine

The rendering of groups is handled by `LGraphCanvas.prototype.drawGroups`.

### The Rendering Pipeline
Every frame of the canvas, LiteGraph executes the following sequence:
1. Clear Canvas.
2. Draw Connections (links).
3. **Draw Groups (frames).**
4. Draw Nodes.

### Overriding the Rendering
To "massively" modify a frame's appearance, you must intercept the `drawGroups` call:

```javascript
const originalDraw = LGraphCanvas.prototype.drawGroups;
LGraphCanvas.prototype.drawGroups = function(canvas, ctx) {
    // 1. You can call originalDraw if you want the default box
    // 2. Or you can ignore it and use your own code:
    for (const group of this.graph._groups) {
        // Use standard HTML5 Canvas context (ctx) to draw
        ctx.fillStyle = group.color;
        
        // Draw custom shapes (e.g. rounded corners)
        drawRoundedRect(ctx, group.pos[0], group.pos[1], group.size[0], group.size[1], 10);
        
        // Add images/icons
        const img = getAppIcon();
        ctx.drawImage(img, group.pos[0] + 5, group.pos[1] + 5);
    }
};
```

---

## 3. Advanced Interactions

### Mouse Detection
LiteGraph provides a helper for coordinate checks:
`LiteGraph.isInsideRectangle(x, y, rectX, rectY, rectW, rectH)`

You can use this inside `processMouseDown` or `processMouseMove` to determine if a user is interacting with a specific part of your "frame" overlay.

### Parent-Child Logic
Groups and nodes are "coupled" dynamically. When a group moves, it checks its `_children` or performs a spatial query. If you want to create "sticky" frames or frames that automatically resize to fit nodes:
1. Hook into `node.onDragged`.
2. Find the group at that position.
3. Update group size or notify the group that it should adjust.

---

## 4. Useful Browser Debugging Snippets

To explore a group in the console:
```javascript
// Select a group on the canvas first, then:
console.log(app.canvas.selected_group);

// To see all groups in the graph:
console.log(app.graph._groups);

// To get nodes inside the first group:
const group = app.graph._groups[0];
const nodesInGroup = group._children ? Array.from(group._children) : [];
console.log(nodesInGroup);
```
