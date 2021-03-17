import {    
    Container,
} from './styles';

import incomeIcon from '../../assets/income.svg';
import outcomeIcon from '../../assets/outcome.svg';
import totalIcon from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

export function Summary() {
    const {transactions} = useTransactions();

    const { deposits, total, withdrawl} = transactions.reduce((acc, transactionMapped) => {
        if(transactionMapped.type === 'deposit') {
            acc.deposits += transactionMapped.amount;        
            acc.total += transactionMapped.amount;        
        } else {
            acc.withdrawl += transactionMapped.amount;        
            acc.total -= transactionMapped.amount;        
        }

        return acc;
    },{
        deposits: 0,
        withdrawl: 0,
        total: 0
    })

    return(
        <Container>
            
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeIcon} alt="Entradas"/>
                </header>
                <strong>
                    {
                        new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(deposits)
                    }
                </strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeIcon} alt="Saídas"/>
                </header>
                <strong>- 
                    {
                        new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(withdrawl)
                    }
                </strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalIcon} alt="Total"/>
                </header>
                <strong>
                    {
                        new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(total)
                    }
                </strong>
            </div>
        </Container>
    )
}