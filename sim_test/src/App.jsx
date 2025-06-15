import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Importe a lista completa de professores
import professoresData from './data/professores.json';

import Sidebar from './components/Sidebar';
import Perfil from './pages/Perfil';
import AnaliseAlunos from './pages/AnaliseAlunos';
import AnaliseTurma from './pages/AnaliseTurma';
import GerenciamentoProvas from './pages/GerenciamentoProvas';
import './App.css';

function App() {
  // O App agora controla o ID do perfil ativo
  const [activeProfileId, setActiveProfileId] = useState(professoresData[0].id); // Começa com o primeiro professor

  const handleProfileChange = (id) => {
    setActiveProfileId(id);
  };

  return (
    <div className="dashboard-layout">
      {/* Passe os dados e a função para a Sidebar */}
      <Sidebar 
        professores={professoresData}
        activeProfileId={activeProfileId}
        onProfileChange={handleProfileChange}
      />
      <main className="main-content">
        <Routes>
          {/* Passe o ID do perfil ativo para a página de Perfil */}
          <Route path="/perfil" element={<Perfil activeProfileId={activeProfileId} />} />
          <Route path="/alunos" element={<AnaliseAlunos activeProfileId={activeProfileId} />} />
          <Route path="/turma" element={<AnaliseTurma activeProfileId={activeProfileId} />} />
          <Route path="/provas" element={<GerenciamentoProvas activeProfileId={activeProfileId} />} />
          <Route path="/alunos" element={<AnaliseAlunos />} />
          <Route path="/turma" element={<AnaliseTurma />} />
          <Route path="/provas" element={<GerenciamentoProvas />} />
          <Route path="/" element={<Perfil activeProfileId={activeProfileId} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;