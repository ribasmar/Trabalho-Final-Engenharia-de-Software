import React from 'react';
import './ProfileSelector.css';

function ProfileSelector({ professores, activeProfileId, onProfileChange }) {
  return (
    <div className="profile-selector-container">
      <label htmlFor="profile-select">Usuário Ativo:</label>
      <select 
        id="profile-select"
        value={activeProfileId} 
        onChange={e => onProfileChange(Number(e.target.value))}
      >
        {professores.map(prof => (
          <option key={prof.id} value={prof.id}>
            {prof.nome}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProfileSelector;