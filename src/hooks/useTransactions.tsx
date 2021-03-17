import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface ITransactions {
    id: number;
    title: string;
    type: string;
    category: string;
    amount: number;
    createdAt: string;
}

type TransactionInput = Omit<ITransactions, 'id' | 'createdAt'>;


interface TransactionsProviderProps {
    children: ReactNode
}

interface TransactionContextData {
    transactions: ITransactions[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionContextData>({} as TransactionContextData)

export function TransactionsProvider({children}: TransactionsProviderProps) {
    const [ transactions, setTransactions ] = useState<ITransactions[]>([]);

    async function createTransaction(transaction: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transaction,
            createdAt: new Date()
        });
        const { transaction: newTransaction } = response.data;

        setTransactions([...transactions, newTransaction]);
    }

    useEffect(() => {
        api.get('/transactions').then(response => {
            setTransactions(response.data.transactions)
        })
    },[]);

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context
}