/**
 * Reference Code for Modifying ComfyUI Frames (Groups)
 * 
 * This file contains consolidated logic from rgthree-comfy and LiteGraph.js 
 * to demonstrate how to "deeply" modify and interact with node groups.
 */

/* ============================================================================
   1. HOW TO OVERRIDE GROUP RENDERING (The "Blueprint")
   ============================================================================ */

const setupGroupCustomDrawing = () => {
    // We store the original drawing method to call it if needed
    const oldDrawGroups = LGraphCanvas.prototype.drawGroups;

    LGraphCanvas.prototype.drawGroups = function (canvasEl, ctx) {
        // Calling original first so our custom stuff is on top
        // OR: Don't call it if you want to completely redraw the group from scratch
        oldDrawGroups.apply(this, [...arguments]);

        const graph = this.graph;
        const groups = graph._groups || [];

        ctx.save();
        for (const group of groups) {
            const pos = group._pos;     // [x, y]
            const size = group._size;   // [width, height]

            // EXAMPLE: DRAWING A CUSTOM OVERLAY ON TOP OF THE GROUP
            // Let's draw a subtle gradient or a border
            ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
            ctx.lineWidth = 2;
            ctx.strokeRect(pos[0], pos[1], size[0], size[1]);

            // EXAMPLE: DRAWING TEXT OR METRICS
            ctx.fillStyle = "#fff";
            ctx.font = "10px Arial";
            ctx.fillText(`Nodes inside: ${group._children ? group._children.length : 0}`, pos[0] + 5, pos[1] + size[1] - 5);
        }
        ctx.restore();
    };
};

/* ============================================================================
   2. INTERACTING WITH NODES INSIDE A GROUP
   ============================================================================ */

/**
 * Gets all nodes that are currently within the bounds of a group.
 * @param {LGraphGroup} group 
 * @returns {LGraphNode[]}
 */
export function getGroupNodes(group) {
    if (group._children) {
        // Modern LiteGraph stores actual children in _children Set
        return Array.from(group._children).filter((c) => c instanceof LGraphNode);
    }
    
    // Fallback/Manual check if _children is not available
    const nodes = group.graph._nodes;
    return nodes.filter(node => {
        return LiteGraph.isInsideRectangle(
            node.pos[0], node.pos[1],
            group.pos[0], group.pos[1],
            group.size[0], group.size[1]
        );
    });
}

/* ============================================================================
   3. CLICK HANDLING ON THE FRAME
   ============================================================================ */

const setupGroupClickHandling = () => {
    // ComfyUI (via rgthree) often uses a global event listener on mouse down
    // or monkeypatches the LGraphCanvas.prototype.processMouseDown
    
    const oldProcessMouseDown = LGraphCanvas.prototype.processMouseDown;
    LGraphCanvas.prototype.processMouseDown = function (e) {
        const res = oldProcessMouseDown.apply(this, arguments);
        
        // 'this.selected_group' is set by LiteGraph when you click a group
        if (this.selected_group) {
            const group = this.selected_group;
            console.log("Clicked on group:", group.title);
            
            // Check if we clicked in a specific area (e.g., top-right corner)
            const margin = 20;
            const isTopRight = (
                e.canvasX > group.pos[0] + group.size[0] - margin &&
                e.canvasY < group.pos[1] + margin
            );
            
            if (isTopRight) {
                alert("Top Right of Group Clicked!");
                // Prevent canvas drag if we handled the click
                this.selected_group = null;
                this.dragging_canvas = false;
            }
        }
        return res;
    };
};

/* ============================================================================
   4. HOOKING INTO GROUP CREATION
   ============================================================================ */

app.registerExtension({
    name: "MyCustomFrameMod",
    async setup() {
        const onGroupAdd = LGraphCanvas.onGroupAdd;
        LGraphCanvas.onGroupAdd = function (...args) {
            // Apply standard behavior
            onGroupAdd.apply(this, [...args]);
            
            // Get the newly created group
            const graph = app.canvas.getCurrentGraph();
            const newGroup = graph._groups[graph._groups.length - 1];
            
            // Customize it immediately
            newGroup.color = "#FF00FF";
            newGroup.title = "NEW FRAME";
        };
    }
});
