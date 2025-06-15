import React, { useState, useEffect } from 'react';

// Importe todos os dados
import todosProfessores from '../data/professores.json';
import todasTurmas from '../data/turmas.json';
import todosAvisos from '../data/avisos.json';
import ImageModal from '../components/ImageModal'; // 1. Importe o modal

// Importe todas as imagens. Crie um mapa para fácil acesso.
import florestopolisImg from '../data/imgs/florestopolis.png';
import catatauImg from '../data/imgs/catatau.png';
import lImg from '../data/imgs/l.png';

import Calendario from '../components/Calendario';
import './Perfil.css';

const imagensDePerfil = {
  'florestopolis.png': florestopolisImg,
  'catatau.png': catatauImg,
  'l.png': lImg,
};

// Receba o ID do perfil ativo como um "prop"
function Perfil({ activeProfileId }) {
  const [professor, setProfessor] = useState(null);
  const [turmas, setTurmas] = useState([]);
  const [avisos, setAvisos] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);
  
  // 2. Adicione o estado para controlar a imagem no modal
  const [modalImageUrl, setModalImageUrl] = useState(null);

  // useEffect vai rodar sempre que o ID do perfil ativo mudar
  useEffect(() => {
    const profAtual = todosProfessores.find(p => p.id === activeProfileId);
    if (profAtual) {
      const turmasDoProfessor = todasTurmas.filter(turma =>
        profAtual.turmas_ids.includes(turma.id)
      );
      const avisosDoProfessor = todosAvisos.filter(aviso => 
        aviso.professor_id === profAtual.id || aviso.professor_id === 0
      );
      setProfessor(profAtual);
      setTurmas(turmasDoProfessor);
      setAvisos(avisosDoProfessor);
      setTurmaSelecionada(null); // Reseta a turma selecionada ao trocar de perfil
      setModalImageUrl(null); // Garante que o modal feche ao trocar de perfil
    }
  }, [activeProfileId]); // Dependência: rode este efeito quando activeProfileId mudar

  const handleSelectTurma = (event) => {
    const turmaId = parseInt(event.target.value);
    const turma = turmas.find(t => t.id === turmaId);
    setTurmaSelecionada(turma);
  };

  if (!professor) {
    return <div>Carregando perfil...</div>;
  }

  const fotoAtual = imagensDePerfil[professor.foto_perfil];

  return (
    <div className="perfil-container">
      {/* 3. Adicione o componente do Modal aqui */}
      <ImageModal imageUrl={modalImageUrl} onClose={() => setModalImageUrl(null)} />

      <div className="perfil-header">
        <img 
          src={fotoAtual} 
          alt="Foto de Perfil" 
          className="perfil-foto clicavel" // Adicionada classe para estilo
          onClick={() => setModalImageUrl(fotoAtual)} // 4. Evento de clique adicionado
        />
        <div className="perfil-info">
          <h1>{professor.nome}</h1>
          <p>{professor.email}</p>
        </div>
      </div>

      <div className="gerenciamento-turmas">
        <h2>Gerenciar Minhas Turmas</h2>
        <select onChange={handleSelectTurma} value={turmaSelecionada?.id || ''}>
          <option value="" disabled>Selecione uma turma...</option>
          {turmas.map(turma => (
            <option key={turma.id} value={turma.id}>{turma.nome}</option>
          ))}
        </select>
        
        {turmaSelecionada && (
          <div className="turma-detalhes">
            <h3>Detalhes de: {turmaSelecionada.nome}</h3>
            <p><strong>Curso:</strong> {turmaSelecionada.curso}</p>
            <p><strong>Período:</strong> {turmaSelecionada.periodo}</p>
            {/* O campo `alunos` não existe mais em `turmas.json`, substituído por `aluno_ids` */}
            <p><strong>Alunos Matriculados:</strong> {turmaSelecionada.aluno_ids.length}</p>
          </div>
        )}
      </div>

      <Calendario avisos={avisos} turmas={turmas} />
    </div>
  );
}

export default Perfil;