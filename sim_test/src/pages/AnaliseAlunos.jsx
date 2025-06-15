import React, { useState, useEffect } from 'react';

// Importe todos os dados e o novo modal
import todosProfessores from '../data/professores.json';
import todasTurmas from '../data/turmas.json';
import todosAlunos from '../data/alunos.json';
import ImageModal from '../components/ImageModal';

// Importe as imagens dos alunos
import aluno1Img from '../data/imgs/aluno1.png';
import aluno2Img from '../data/imgs/aluno2.png';
import aluno3Img from '../data/imgs/aluno3.png';
import aluno4Img from '../data/imgs/aluno4.png';
import aluno5Img from '../data/imgs/aluno5.png';

// Importe as imagens de análise
import analisePoze from '../data/analises/analise-poze.png';
import analiseDiabolico from '../data/analises/analise-diabolico.png';
import analiseBrunao from '../data/analises/analise-brunao.png';
import analiseNuncaAcertou from '../data/analises/analise-nunca-acertou.png';
import analiseRibamar from '../data/analises/analise-ribamar.png';


import './AnaliseAlunos.css';

// Mapeamento para fácil acesso às imagens
const imagensAlunos = {
  'aluno1.png': aluno1Img, 'aluno2.png': aluno2Img, 'aluno3.png': aluno3Img,
  'aluno4.png': aluno4Img, 'aluno5.png': aluno5Img,
};
const imagensAnalise = {
  'analise-poze.png': analisePoze, 'analise-diabolico.png': analiseDiabolico,
  'analise-brunao.png': analiseBrunao, 'analise-nunca-acertou.png': analiseNuncaAcertou,
  'analise-ribamar.png': analiseRibamar,
};

function AnaliseAlunos({ activeProfileId }) {
  const [turmasDoProfessor, setTurmasDoProfessor] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [alunosDaTurma, setAlunosDaTurma] = useState([]);
  const [modalImageUrl, setModalImageUrl] = useState(null);

  // ... (o useEffect continua o mesmo)
  useEffect(() => {
    const profAtual = todosProfessores.find(p => p.id === activeProfileId);
    if (profAtual) {
      const turmas = todasTurmas.filter(turma => profAtual.turmas_ids.includes(turma.id));
      setTurmasDoProfessor(turmas);
      setTurmaSelecionada('');
      setAlunosDaTurma([]);
      setModalImageUrl(null);
    }
  }, [activeProfileId]);

  // --- LÓGICA ATUALIZADA AQUI ---
  const handleTurmaChange = (event) => {
    const idTurma = Number(event.target.value);
    setTurmaSelecionada(idTurma);
    setModalImageUrl(null);

    if (idTurma) {
      // 1. Encontre o objeto da turma selecionada
      const turmaInfo = todasTurmas.find(t => t.id === idTurma);
      
      if (turmaInfo && turmaInfo.aluno_ids) {
        // 2. Pegue a lista de IDs de alunos da turma
        const idsDosAlunos = turmaInfo.aluno_ids;
        
        // 3. Filtre a lista principal de alunos para encontrar aqueles cujos IDs estão na lista
        const alunosFiltrados = todosAlunos.filter(aluno => idsDosAlunos.includes(aluno.id));
        setAlunosDaTurma(alunosFiltrados);
      } else {
        setAlunosDaTurma([]);
      }
    } else {
      setAlunosDaTurma([]);
    }
  };
  
  return (
    <div className="analise-alunos-container">
      {/* O Modal de Imagem fica aqui, pronto para ser ativado */}
      <ImageModal imageUrl={modalImageUrl} onClose={() => setModalImageUrl(null)} />

      <h1>Análise de Alunos</h1>
      <p>Selecione uma turma, clique na foto para expandir ou no botão para ver a análise.</p>

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

      {turmaSelecionada && (
        <div className="lista-alunos">
          <h2>Alunos da Turma</h2>
          <table>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nome</th>
                <th>Matrícula</th>
                <th>Análise Individual</th>
              </tr>
            </thead>
            <tbody>
              {alunosDaTurma.length > 0 ? (
                alunosDaTurma.map(aluno => (
                  <tr key={aluno.id}>
                    <td>
                      <img
                        src={imagensAlunos[aluno.foto]}
                        alt={aluno.nome}
                        className="aluno-foto"
                        onClick={() => setModalImageUrl(imagensAlunos[aluno.foto])}
                      />
                    </td>
                    <td>{aluno.nome}</td>
                    <td>{aluno.matricula}</td>
                    <td>
                      <button onClick={() => setModalImageUrl(imagensAnalise[aluno.analise])}>
                        Ver Análise
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Nenhum aluno encontrado para esta turma.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AnaliseAlunos;