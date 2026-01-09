from .nodes.vnccs_nodes import VNCCS_PositionControl, VNCCS_VisualPositionControl
from .nodes.vnccs_qwen_detailer import VNCCS_QWEN_Detailer, VNCCS_BBox_Extractor

NODE_CLASS_MAPPINGS = {
    "VNCCS_PositionControl": VNCCS_PositionControl,
    "VNCCS_VisualPositionControl": VNCCS_VisualPositionControl,
    "VNCCS_QWEN_Detailer": VNCCS_QWEN_Detailer,
    "VNCCS_BBox_Extractor": VNCCS_BBox_Extractor,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "VNCCS_PositionControl": "VNCCS Position Control",
    "VNCCS_VisualPositionControl": "VNCCS Visual Camera Control",
    "VNCCS_QWEN_Detailer": "VNCCS QWEN Detailer",
    "VNCCS_BBox_Extractor": "VNCCS BBox Extractor",
}

WEB_DIRECTORY = "./web"

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]
