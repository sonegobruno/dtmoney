import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({
    isOpen,
    onRequestClose
}: NewTransactionModalProps) {
    const { createTransaction } = useTransactions();

    const [ type, setType ] = useState('deposit');
    const [ amount, setAmount ] = useState(0);
    const [ title, setTitle] = useState('');
    const [ category, setCategory] = useState('');

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            amount,
            category,
            title,
            type
        });

        setTitle('')
        setType('deposit')
        setAmount(0)
        setCategory('')
        onRequestClose();
    }

    return(
        <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          overlayClassName="react-modal-overlay"
          className="react-modal-content"
        >
            <button onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="fechar modal"/>
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>  
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título"/>
                <input value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="Valor" type="number"/>

                <TransactionTypeContainer>
                    <RadioBox type="button" activeColor="green" isActive={type === 'deposit'} className={type === 'deposit' ? 'active' : ''} onClick={() => { setType('deposit')} }>
                        <img src={incomeImg} alt="entrada"/>
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox type="button" activeColor="red" isActive={type === 'withdrawl'} onClick={() => { setType('withdrawl')} }>
                        <img src={outcomeImg} alt="saida"/>
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Categoria"/>
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}