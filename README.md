# ComfyUI VNCCS Utils

A collection of utility nodes from the [VNCCS](https://github.com/AHEKOT/ComfyUI_VNCCS) project that are useful not only for the project's primary goals but also for everyday ComfyUI workflows.

## Main Nodes

### 1. VNCCS Visual Camera Control
An interactive node with a visual widget for controlling camera position. This is the primary node for intuitive angle control.
These node is specifically designed for advanced camera control and prompt generation, optimized for multi-angle LoRAs like **Qwen-Image-Edit-2511-Multiple-Angles**.

*   **Visual Widget**: Allows mouse-based selection of azimuth (rotation around the subject) and distance (rings).
*   **Elevation Slider**: A vertical bar on the right for selecting the elevation angle (-30° to 60°).
*   **Trigger Word**: A square indicator in the bottom-right corner toggles the presence of the <sks> trigger in the prompt (green for ON, red for OFF).

### 2. VNCCS QWEN Detailer
A powerful detailing node that leverages QWEN-Image-Edit2511 model to enhance detected regions (faces, hands, objects). It goes beyond standard detailers by using visual understanding to guide the enhancement process.

*   **Smart Cropping**: Automatically squares crops and handles padding for optimal model input.
*   **Vision-Guided Enhancement**: Uses QWEN-generated instructions or user prompts to guide the detailing.
*   **Drift Fix**: Includes mechanisms to prevent the enhanced region from drifting too far from the original composition.
*   **Quality of Life**: Built-in color matching, Poisson blending (seam fix), and versatile upscaling options.
*   **Inpainting Mode**: specialized mode for mask-based editing or filling black areas.
*   **Inputs**: Requires standard model/clip/vae plus a BBOX_DETECTOR (like YOLO).
*   **Options**: Supports QWEN-Image-Edit2511 specific optimizations (`distortion_fix`, `qwen_2511` mode).

### 3. VNCCS BBox Extractor
A helper node to simply extract and visualize the crops. Useful when you need extract bbox detected regions but don't want to run whole facedetailer.


## Installation

1. Copy the ComfyUI_VNCCS_Utils folder into your ComfyUI custom_nodes directory.
2. Restart ComfyUI.

## Usage
The node outputs a string (Prompt) that should be connected to your CLIP Text Encode or used for concatenation with other prompt parts. It's ideally suited for LoRAs trained on multi-angle datasets.
