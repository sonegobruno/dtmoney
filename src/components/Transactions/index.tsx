import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import {    
    Container,
} from './styles';

interface ITransactions {
    id: number;
    title: string;
    type: string;
    category: string;
    amount: number;
    createdAt: string;
}

export function Transactions() {
    const [ transactions, setTransactions ] = useState<ITransactions[]>([]);

    useEffect(() => {
        api.get('/transactions').then(response => {
            console.log(response.data.transactions)
            setTransactions(response.data.transactions)
        })
    },[])

    return(
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transactionMapped => (
                        <tr key={transactionMapped.id}>
                            <td>{transactionMapped.title}</td>
                            <td className={transactionMapped.type}>
                                {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(transactionMapped.amount)}
                            </td>
                            <td>{transactionMapped.category}</td>
                            <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(transactionMapped.createdAt))}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}