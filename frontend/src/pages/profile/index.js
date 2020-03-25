import React, { useEffect, useState } from 'react'
import { Link, useHistory} from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import { FiPower } from 'react-icons/fi'
import './styles.css'
import api from '../../services/api'
import Cases from './cases'

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])


    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id != id))
        } catch (err) {
            alert("erro ao deletar incident")
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/')
    } 

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>{incidents.map(incident => (<Cases key={incident.id} props={incident} handleDeleteIncident={handleDeleteIncident}/>))
            }
            </ul>
        </div>
    )
}