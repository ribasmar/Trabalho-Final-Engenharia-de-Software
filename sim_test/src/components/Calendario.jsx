import React from 'react';
import './Calendario.css';

function Calendario({ avisos, turmas }) {
  return (
    <div className="calendario-container">
      <div className="cronograma-aulas">
        <h4>Meu Cronograma de Aulas</h4>
        <ul>
          {turmas.map(turma => (
            turma.horarios.map(horario => (
              <li key={`${turma.id}-${horario.dia}`}>
                <strong>{horario.dia} ({horario.hora}):</strong> {turma.nome}
              </li>
            ))
          ))}
        </ul>
      </div>
      <div className="avisos">
        <h4>Avisos Importantes</h4>
        <ul>
          {avisos.map(aviso => (
            <li key={aviso.id}>
              <strong>{new Date(aviso.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}:</strong> {aviso.aviso}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Calendario;