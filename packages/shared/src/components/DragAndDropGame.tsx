import React from 'react';
import { Content } from '../types/schema';

interface DragAndDropGameProps {
  items: Content[];
  onComplete: (score: number) => void;
}

export const DragAndDropGame: React.FC<DragAndDropGameProps> = ({ items, onComplete }) => {
  // Boilerplate for drag and drop vocabulary game
  // Complex CSS animations and drag-drop logic left empty for now
  
  const handleComplete = () => {
    // Dummy complete handler
    onComplete(100);
  };

  return (
    <div className="drag-and-drop-container">
      <h2>Drag & Drop Vocabulary</h2>
      <div className="draggable-items">
        {items.map(item => (
          <div key={item.id} className="draggable-item">
            {item.word || item.title}
          </div>
        ))}
      </div>
      <div className="drop-zones">
        {items.map(item => (
          <div key={`drop-${item.id}`} className="drop-zone">
            Drop here
          </div>
        ))}
      </div>
      <button onClick={handleComplete}>Complete Game</button>
    </div>
  );
};
