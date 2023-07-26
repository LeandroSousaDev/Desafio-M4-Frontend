import deletar from '../../../assets/deletar.svg';
import editar from '../../../assets/editar.svg';
import './styles.css';

function LinhaTabela({
    dataFormatada,
    keyTransacao,
    data,
    descricao,
    categoria,
    valor,
    tipoTransacao,
    aoEditar,
    aoExcluir,
}) {

    const diaDaSemana = new Date(data).getDay();
    const nomeDiasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

    return (
        <div className='tabela__linha' id={keyTransacao} >
            <p className='tabela__coluna-data'>{dataFormatada(data)}</p>
            <p className='tabela__coluna-dia'>{nomeDiasDaSemana[diaDaSemana]}</p>
            <p className='tabela__coluna-descricao'>{descricao}</p>
            <p className='tabela__coluna-categoria'>{categoria}</p>
            <p className={`tabela__coluna-valor ${tipoTransacao}`}>R$
                <span>{valor}</span>
            </p>

            <div className='container__opcoes'>
                <img src={editar} alt='editar' onClick={aoEditar} />
                <img src={deletar} alt='excluir' onClick={aoExcluir} />
            </div>
        </div>
    );
}

export default LinhaTabela;