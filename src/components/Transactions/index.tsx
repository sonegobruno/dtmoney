import { useTransactions } from '../../hooks/useTransactions';
import {    
    Container,
} from './styles';


export function Transactions() {
    const {transactions} = useTransactions();

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