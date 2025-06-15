import React from 'react';
import './ImageModal.css';

function ImageModal({ imageUrl, onClose }) {
  // Não renderiza nada se não houver imagem
  if (!imageUrl) {
    return null;
  }

  return (
    // O "backdrop" é o fundo escuro clicável
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content">
        <img src={imageUrl} alt="Imagem expandida" />
        <button onClick={onClose} className="modal-close-button">Fechar</button>
      </div>
    </div>
  );
}

export default ImageModal;