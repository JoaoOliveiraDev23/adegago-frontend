import Modal from './Modal.jsx';

// O foco inicial recai sobre "Cancelar", a opção mais segura para ações destrutivas.
export default function ConfirmDialog({ titulo, mensagem, rotuloConfirmar, onConfirmar, onCancelar }) {
  return (
    <Modal titulo={titulo} idTitulo="dialogo-confirmacao-titulo" onFechar={onCancelar}>
      <p>{mensagem}</p>
      <div className="modal-acoes">
        <button type="button" className="botao botao-sec" onClick={onCancelar}>
          Cancelar
        </button>
        <button type="button" className="botao botao-perigo-solido" onClick={onConfirmar}>
          {rotuloConfirmar}
        </button>
      </div>
    </Modal>
  );
}
