# ComfyUI VNCCS Utils

A collection of utility nodes from the [VNCCS](https://github.com/AHEKOT/ComfyUI_VNCCS) project that are useful not only for the project's primary goals but also for everyday ComfyUI workflows.

## Main Nodes

### 1. VNCCS Visual Camera Control
An interactive node with a visual widget for controlling camera position. This is the primary node for intuitive angle control.
These node is specifically designed for advanced camera control and prompt generation, optimized for multi-angle LoRAs like **Qwen-Image-Edit-2511-Multiple-Angles**.

*   **Visual Widget**: Allows mouse-based selection of azimuth (rotation around the subject) and distance (rings).
*   **Elevation Slider**: A vertical bar on the right for selecting the elevation angle (-30° to 60°).
*   **Trigger Word**: A square indicator in the bottom-right corner toggles the presence of the <sks> trigger in the prompt (green for ON, red for OFF).



## Installation

1. Copy the ComfyUI_VNCCS_Utils folder into your ComfyUI custom_nodes directory.
2. Restart ComfyUI.

## Usage
The node outputs a string (Prompt) that should be connected to your CLIP Text Encode or used for concatenation with other prompt parts. It's ideally suited for LoRAs trained on multi-angle datasets.
