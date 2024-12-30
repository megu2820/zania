import React from "react";
import { Document } from "../types";
import Card from "./Card";

interface CardGridProps {
  documents: Document[];
  openOverlay: (type: string) => void;
  handleDragStart: (e: React.DragEvent, index: number) => void;
  handleDrop: (e: React.DragEvent, dropIndex: number) => void;
  handleDragOver: (e: React.DragEvent) => void;
}

const CardGrid: React.FC<CardGridProps> = ({
  documents,
  openOverlay,
  handleDragStart,
  handleDrop,
  handleDragOver,
}) => {
  return (
    <div className="container" onDragOver={handleDragOver}>
      {documents.map((doc, index) => (
        <div
          key={doc.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDrop={(e) => handleDrop(e, index)}
        >
          <Card
            title={doc.title}
            type={doc.type}
            index={index}
            openOverlay={openOverlay}
          />
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
