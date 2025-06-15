import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileSelector from './ProfileSelector'; // Importe o novo componente
import './Sidebar.css';

// Receba os novos props vindos do App.jsx
function Sidebar({ professores, activeProfileId, onProfileChange }) {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h3>Admin Dashboard</h3>
      </div>
      
      {/* Adicione o seletor de perfil aqui */}
      <ProfileSelector 
        professores={professores}
        activeProfileId={activeProfileId}
        onProfileChange={onProfileChange}
      />

      <ul>
        <li><NavLink to="/perfil">Perfil</NavLink></li>
        <li><NavLink to="/alunos">Análise de Alunos</NavLink></li>
        <li><NavLink to="/turma">Análise da Turma</NavLink></li>
        <li><NavLink to="/provas">Gerenciamento de Provas</NavLink></li>
      </ul>
    </nav>
  );
}

export default Sidebar;