
import PropTypes from 'prop-types';
import { Download, RefreshCw, Settings, LayersPlus, Eraser } from 'lucide-react';

const Controls = ({ 
  pixelSize, setPixelSize, 
  contrast, setContrast,
  brightness, setBrightness,
  saturation, setSaturation,
  onDownload, onReset,
  onNewFile,
  onRemoveBackground,
  isProcessing
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto win95-window mb-8 p-2">
      <div className="win95-titlebar mb-4">
        <span>Settings</span>
      </div>

      <div className="space-y-6">
          {/* Pixel Size */}
          <div>
            <div className="flex justify-between mb-2 font-sans text-sm font-bold text-black">
              <label>Pixel Size</label>
              <span>{pixelSize}px</span>
            </div>
            <input
              type="range"
              min="1"
              max="128"
              step="1"
              value={pixelSize}
              onChange={(e) => setPixelSize(Number(e.target.value))}
              className="slider-input w-full"
            />
          </div>

          <div className="h-px bg-white border-t border-[#808080] my-4" />

          {/* Adjustments */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <div className="flex justify-between mb-2 font-sans text-sm font-bold text-black">
                <label>Contrast</label>
                <span>{contrast}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="slider-input w-full"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2 font-sans text-sm font-bold text-black">
                <label>Brightness</label>
                <span>{brightness}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="slider-input w-full"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2 font-sans text-sm font-bold text-black">
                <label>Saturation</label>
                <span>{saturation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={saturation}
                onChange={(e) => setSaturation(Number(e.target.value))}
                className="slider-input w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4 mt-2">
          <button
            onClick={onNewFile}
            className="flex-1 win95-button flex items-center justify-center gap-1"
          >
            <LayersPlus className="w-4 h-4" />
            <span className="mt-1">NEW</span>
          </button>

          <button
            onClick={onReset}
            className="flex-1 win95-button flex items-center justify-center gap-1"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="mt-1">RESET</span>
          </button>
          
          <button
            onClick={onDownload}
            className="flex-1 win95-button flex items-center justify-center gap-1 font-bold"
          >
            <Download className="w-4 h-4" />
            <span className="mt-1">SAVE</span>
          </button>
        </div>
        
        <div className="pt-2 mt-2">
          <button
            onClick={onRemoveBackground}
            disabled={isProcessing}
            className={`w-full win95-button flex items-center justify-center gap-2 h-10 ${isProcessing ? 'opacity-50' : ''}`}
          >
            <Eraser className="w-5 h-5 text-black" />
            <span className="mt-1 text-black font-bold">REMOVE BACKGROUND</span>
          </button>
        </div>

    </div>
  );
};

Controls.propTypes = {
  pixelSize: PropTypes.number.isRequired,
  setPixelSize: PropTypes.func.isRequired,
  contrast: PropTypes.number.isRequired,
  setContrast: PropTypes.func.isRequired,
  brightness: PropTypes.number.isRequired,
  setBrightness: PropTypes.func.isRequired,
  saturation: PropTypes.number.isRequired,
  setSaturation: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onNewFile: PropTypes.func.isRequired,
  onRemoveBackground: PropTypes.func, // Optional as it might not be passed initially
  isProcessing: PropTypes.bool,
};

export default Controls;
