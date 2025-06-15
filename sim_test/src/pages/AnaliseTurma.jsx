import React, { useState, useEffect } from 'react';

// Importe os dados e componentes necessários
import todosProfessores from '../data/professores.json';
import todasTurmas from '../data/turmas.json';
import ImageModal from '../components/ImageModal';

// Importe as imagens de análise das turmas
import analiseTurma101 from '../data/analises_turmas/turma-101-analise.png';
//import analiseTurma102 from '../data/analises_turmas/turma-102-analise.png';
//import analiseTurma103 from '../data/analises_turmas/turma-103-analise.png';

import './AnaliseTurma.css';

// Mapeamento para acesso fácil às imagens
const imagensAnaliseTurma = {
  'turma-101-analise.png': analiseTurma101,
  //'turma-102-analise.png': analiseTurma102,
  //'turma-103-analise.png': analiseTurma103,
};

function AnaliseTurma({ activeProfileId }) {
  const [turmasDoProfessor, setTurmasDoProfessor] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);
  const [modalImageUrl, setModalImageUrl] = useState(null);

  // Filtra as turmas disponíveis sempre que o professor ativo muda
  useEffect(() => {
    const profAtual = todosProfessores.find(p => p.id === activeProfileId);
    if (profAtual) {
      const turmas = todasTurmas.filter(turma => profAtual.turmas_ids.includes(turma.id));
      setTurmasDoProfessor(turmas);
      setTurmaSelecionada(null); // Limpa a seleção ao trocar de professor
      setModalImageUrl(null);
    }
  }, [activeProfileId]);

  // Atualiza a turma selecionada quando o usuário escolhe no dropdown
  const handleTurmaChange = (event) => {
    const idTurma = Number(event.target.value);
    if (idTurma) {
      const turmaEncontrada = todasTurmas.find(t => t.id === idTurma);
      setTurmaSelecionada(turmaEncontrada);
    } else {
      setTurmaSelecionada(null);
    }
  };

  return (
    <div className="analise-turma-container">
      <ImageModal imageUrl={modalImageUrl} onClose={() => setModalImageUrl(null)} />

      <h1>Análise Geral da Turma</h1>
      <p>Selecione uma turma para visualizar a análise de desempenho geral.</p>

      <div className="seletor-turma-container">
        <label htmlFor="turma-select">Selecione a Turma:</label>
        <select id="turma-select" value={turmaSelecionada?.id || ''} onChange={handleTurmaChange}>
          <option value="">-- Escolha uma turma --</option>
          {turmasDoProfessor.map(turma => (
            <option key={turma.id} value={turma.id}>
              {turma.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Exibe a área de análise se uma turma for selecionada */}
      {turmaSelecionada && (
        <div className="analise-display">
          <h2>Análise: {turmaSelecionada.nome}</h2>
          <p>Clique na imagem para expandir e ver os detalhes.</p>
          <img 
            src={imagensAnaliseTurma[turmaSelecionada.analise_geral]} 
            alt={`Análise da ${turmaSelecionada.nome}`}
            className="analise-imagem-preview"
            onClick={() => setModalImageUrl(imagensAnaliseTurma[turmaSelecionada.analise_geral])}
          />
        </div>
      )}
    </div>
  );
}

export default AnaliseTurma;