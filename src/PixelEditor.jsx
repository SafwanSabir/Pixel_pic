import { useState, useRef, useEffect } from 'react';
import ImageUploader from './components/ImageUploader';
import Controls from './components/Controls';
import PixelCanvas from './components/PixelCanvas';
import { Layers } from 'lucide-react';
import { removeBackground } from '@imgly/background-removal';

const PixelEditor = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [pixelSize, setPixelSize] = useState(8);
  const [contrast, setContrast] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);

  const canvasRef = useRef(null);

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `pixel-art-${Date.now()}.png`;
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  const handleReset = () => {
    setPixelSize(8);
    setContrast(100);
    setBrightness(100);
    setSaturation(100);
  };



  const handleRemoveBackground = async () => {
    if (!imageSrc || isProcessing) return;
    
    try {
      setIsProcessing(true);
      const blob = await removeBackground(imageSrc);
      const url = URL.createObjectURL(blob);
      setImageSrc(url);
    } catch (error) {
      console.error('Failed to remove background:', error);
      alert('Failed to remove background. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNewFile = () => {
    setImageSrc(null);
    setPixelSize(8);
    setContrast(100);
    setBrightness(100);
    setSaturation(100);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">
      
      <div className="win95-window w-full max-w-5xl mx-auto mt-4 md:mt-8">
        <div className="win95-titlebar">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>Pixel_pic.exe</span>
          </div>
          <div className="win95-button !py-0 !px-1 font-sans text-xs font-bold w-5 h-5 flex items-center justify-center">X</div>
        </div>
        
        <div className="p-4 md:p-6 bg-[#c0c0c0]">
          {/* Header */}
          <header className="mb-8 text-center flex flex-col items-center justify-center">
            <h1 className="text-2xl md:text-4xl font-press-start text-black">
                PIXEL PIC
            </h1>
            <p className="font-press-start text-xs md:text-sm text-gray-700 mt-4 tracking-wider">
                RETRO IMAGE CONVERTER
            </p>
          </header>

      {/* Main Content */}
      <main className="w-full relative z-10">
        {!imageSrc ? (
          <ImageUploader onImageUpload={setImageSrc} />
        ) : (
          <div className="animate-in fade-in zoom-in duration-500">
            <PixelCanvas
              imageSrc={imageSrc}
              pixelSize={pixelSize}
              contrast={contrast}
              brightness={brightness}
              saturation={saturation}
              canvasRef={canvasRef}
            />
            <Controls
              pixelSize={pixelSize}
              setPixelSize={setPixelSize}
              contrast={contrast}
              setContrast={setContrast}
              brightness={brightness}
              setBrightness={setBrightness}
              saturation={saturation}
              setSaturation={setSaturation}
              onDownload={handleDownload}
              onReset={handleReset}
              onNewFile={handleNewFile}
              onRemoveBackground={handleRemoveBackground}
              isProcessing={isProcessing}
            />
            
            {/* Loading Overlay */}
            {isProcessing && (
              <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                <div className="win95-window p-6 text-center max-w-sm w-full mx-4">
                  <div className="win95-titlebar mb-4">
                    <span>Processing...</span>
                  </div>
                  <p className="font-sans text-sm mb-4">Removing background. Please wait...</p>
                  <div className="w-full bg-[#808080] h-4 win95-inset">
                    <div className="bg-[#000080] h-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-700 font-sans text-xs flex flex-col items-center gap-1">
        <p>BUILD WITH REACT & TAILWIND</p>
        <p>
          Find more works 
          <a href="https://yuteoctober.github.io/wins95Portfolio/" target="_blank" rel="noopener noreferrer" className="text-[#000080] hover:underline ml-1">
          @here
          </a>
        </p>
      </footer>
      
      </div>
      </div>
    </div>
  );
};

export default PixelEditor;
