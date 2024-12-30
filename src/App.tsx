import React, { useState } from "react";
import CardGrid from "./components/CardGrid";
import ImageOverlay from './components/ImageOverlay';
import { useDocuments } from './custom-hooks/useDocuments';
import "./styles/app.css";

const App: React.FC = () => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [overlayImage, setOverlayImage] = useState<string>('');
  const { documents, isSaving, timeSinceLastSave, handleDocumentChange } = useDocuments();

  const openOverlay = (type: string) => {
    setOverlayImage(`/thumbnails/${type}.jpg`);
    setOverlayOpen(true);
  };

  const closeOverlay = () => {
    setOverlayOpen(false);
  };

  // Handle drag events
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("index", index.toString());
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData("index");
    if (draggedIndex !== dropIndex.toString()) {
      const reorderedDocuments = Array.from(documents);
      const [removed] = reorderedDocuments.splice(parseInt(draggedIndex), 1);
      reorderedDocuments.splice(dropIndex, 0, removed);
      handleDocumentChange(reorderedDocuments);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <h1>Document Manager</h1>
      {isSaving && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
          <p>Saving...</p>
        </div>
      )}

      {documents.length === 0 ? (
        <p>Loading documents...</p> 
      ) : (
        <CardGrid
          documents={documents}
          openOverlay={openOverlay}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
        />
      )}

      {isOverlayOpen && <ImageOverlay imageUrl={overlayImage} onClose={closeOverlay} />}

      <div className="save-timer">
        <p>{isSaving ? 'Saving...' : `Last save: ${timeSinceLastSave} seconds ago`}</p>
      </div>
    </div>
  );
};

export default App;
