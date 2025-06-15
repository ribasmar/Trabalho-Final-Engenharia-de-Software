import React, { useState, useEffect } from 'react';

import todosProfessores from '../data/professores.json';
import todasTurmas from '../data/turmas.json';
import todasProvas from '../data/provas.json';

import './GerenciamentoProvas.css';

function GerenciamentoProvas({ activeProfileId }) {
  const [turmasDoProfessor, setTurmasDoProfessor] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [provaAgendada, setProvaAgendada] = useState(null);
  
  // Simula o estado "editando" ou "agendando"
  const [isEditing, setIsEditing] = useState(false);

  // Filtra as turmas disponíveis quando o professor ativo muda
  useEffect(() => {
    const profAtual = todosProfessores.find(p => p.id === activeProfileId);
    if (profAtual) {
      const turmas = todasTurmas.filter(turma => profAtual.turmas_ids.includes(turma.id));
      setTurmasDoProfessor(turmas);
      setTurmaSelecionada('');
      setProvaAgendada(null);
      setIsEditing(false);
    }
  }, [activeProfileId]);

  // Lida com a seleção de uma turma no dropdown
  const handleTurmaChange = (event) => {
    const idTurma = Number(event.target.value);
    setTurmaSelecionada(idTurma);
    setIsEditing(false); // Sempre reseta o modo de edição

    if (idTurma) {
      // Verifica se já existe uma prova agendada para essa turma
      const prova = todasProvas.find(p => p.turma_id === idTurma);
      setProvaAgendada(prova || null);
    } else {
      setProvaAgendada(null);
    }
  };

  const handleAgendarOuRemarcar = () => {
    // Aqui iria a lógica para salvar os dados (numa API, por exemplo)
    alert('Ação de salvar executada com sucesso! (Simulação)');
    setIsEditing(false);
    // Para a simulação, poderíamos atualizar um estado local com a nova prova
  };

  const handleCancelarProva = () => {
    if (window.confirm('Tem certeza que deseja cancelar esta prova?')) {
      alert('Prova cancelada com sucesso! (Simulação)');
      setProvaAgendada(null);
    }
  };
  
  return (
    <div className="gerenciamento-provas-container">
      <h1>Gerenciamento de Provas</h1>
      <p>Selecione uma turma para ver a prova agendada ou agendar uma nova.</p>

      <div className="seletor-turma-container">
        <label htmlFor="turma-select">Selecione a Turma:</label>
        <select id="turma-select" value={turmaSelecionada} onChange={handleTurmaChange}>
          <option value="">-- Escolha uma turma --</option>
          {turmasDoProfessor.map(turma => (
            <option key={turma.id} value={turma.id}>
              {turma.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Renderiza o conteúdo apenas se uma turma for selecionada */}
      {turmaSelecionada && (
        <div className="prova-details-container">
          {/* MODO DE VISUALIZAÇÃO OU EDIÇÃO */}
          {provaAgendada && !isEditing ? (
            <div className="prova-existente">
              <h2>Prova Agendada</h2>
              <p><strong>Disciplina:</strong> {provaAgendada.disciplina}</p>
              <p><strong>Data:</strong> {new Date(provaAgendada.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</p>
              <p><strong>Horário:</strong> {provaAgendada.horario}</p>
              <p><strong>Local:</strong> {provaAgendada.local}</p>
              <h4>Conteúdo da Prova:</h4>
              <ul>
                {provaAgendada.conteudo.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
              <div className="actions">
                <button onClick={handleCancelarProva} className="button-danger">Cancelar Prova</button>
                <button onClick={() => setIsEditing(true)} className="button-secondary">Remarcar / Editar</button>
              </div>
            </div>
          ) : (
            // MODO AGENDAMENTO / EDIÇÃO (FORMULÁRIO)
            <div className="form-agendamento">
              <h2>{provaAgendada ? 'Editar Prova' : 'Agendar Nova Prova'}</h2>
              <div className="form-grid">
                <input type="date" defaultValue={provaAgendada?.data || ''} />
                <input type="time" placeholder="Horário" defaultValue={provaAgendada?.horario || ''} />
                <input type="text" placeholder="Local (Ex: Sala 302)" defaultValue={provaAgendada?.local || ''} />
              </div>
              <textarea 
                rows="5" 
                placeholder="Conteúdo da prova (um item por linha)" 
                defaultValue={provaAgendada?.conteudo.join('\n') || ''}
              />
              <div className="actions">
                {isEditing && <button onClick={() => setIsEditing(false)} className="button-secondary">Cancelar Edição</button>}
                <button onClick={handleAgendarOuRemarcar} className="button-primary">{provaAgendada ? 'Salvar Alterações' : 'Agendar Prova'}</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GerenciamentoProvas;