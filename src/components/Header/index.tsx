import logo from '../../assets/logo.svg';

import {    
    Container,
    Content
} from './styles'

interface HeaderProps {
    onOpenNewTransactionModal: () => void;
}

export function Header({
    onOpenNewTransactionModal
}: HeaderProps) {
    return(
        <Container>
            <Content>
                <img src={logo} alt="ft money"/>
                <button onClick={onOpenNewTransactionModal}>Nova transação</button>
            </Content>
        </Container>
    )
}