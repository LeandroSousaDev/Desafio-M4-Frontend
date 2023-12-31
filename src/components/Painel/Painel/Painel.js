import { useEffect, useState } from 'react';
import filtrar from '../../../assets/filtrar.svg';
import api from '../../../service/instancia';
import Resumo from '../Resumo/Resumo';
import Tabela from '../Tabela/Tabela';
import './styles.css';

function Painel() {
    const [transacoes, setTransacoes] = useState([]);
    const [entrada, setEntrada] = useState(0);
    const [saida, setSaida] = useState(0);
    const [resultado, setResultado] = useState(0);
    const token = localStorage.getItem('token');
    const [erroSistema, setErroSistema] = useState('')

    useEffect(() => {
        listarTransacoes();
        resumoSaldo();
    }, []);

    async function listarTransacoes() {
        try {
            const response = await api.get('/transacao', {
                headers: {
                    Authorization: `${token}`
                }
            });
            setTransacoes(response.data);
        } catch (erro) {
            setErroSistema('Erro inesperado detectado na TABELA, entre em contato com o suporte')
        }
    }

    async function resumoSaldo() {
        try {
            const response = await api.get('/transacao/extrato', {
                headers: {
                    Authorization: `${token}`
                }
            })

            setEntrada(response.data.entrada)
            setSaida(response.data.saida)
            setResultado(response.data.entrada - response.data.saida)
        } catch (erro) {
            setErroSistema('Erro inesperado detectado no RESUMO, entre em contato com o suporte')
        }
    }

    return (
        <main className='principal'>
            <button className='filtro'>
                <img src={filtrar} alt='filtrar' />
                Filtrar
            </button>

            <span className='erro'>{erroSistema}</span>

            <div className='container__informacoes'>
                <Tabela
                    listarTransacoes={listarTransacoes}
                    resumoSaldo={resumoSaldo}
                    transacoes={transacoes}
                />
                <Resumo
                    listarTransacoes={listarTransacoes}
                    resumoSaldo={resumoSaldo}
                    saldo={resultado < 0 ? 'negativo' : 'positivo'}
                    entrada={entrada}
                    saida={saida}
                    resultado={resultado}
                />
            </div>
        </main>
    );
}

export default Painel;
