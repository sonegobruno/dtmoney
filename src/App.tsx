import {  GlobalStyle } from './styles/styles';
import { Header } from './components/Header'
import { Dashboard } from './components/Dashboard';
import Modal from 'react-modal';
import { useState } from 'react';

Modal.setAppElement('#root');

export function App() {
  const [ isNewTransactionModalOpen, setIsNewTransactionModalOpen ] = useState(false);

  function handleOpenNewTransactionModal() {
      setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
      setIsNewTransactionModalOpen(false);
  }

  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashboard />
      <Modal
          isOpen={isNewTransactionModalOpen}
          onRequestClose={handleCloseNewTransactionModal}
      >
          <h2>Cadastrar Transação</h2>
      </Modal>
      
      <GlobalStyle />
    </>
  );
}