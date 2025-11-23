import type { FC } from 'react';

const Hero: FC = () => {
  const focusNameInput = () => {
    const el = document.getElementById('player-name-input') as HTMLInputElement | null;
    if (el) el.focus();
  };

  return (
    <section className="bg-dark text-white py-5">
      <div className="container text-center">
        <h2 className="display-5 fw-bold">Bienvenido a Valorant Guessing Game</h2>
        <p className="lead opacity-75">Adivina el agente con la menor cantidad de pistas. ¿Listo para el reto?</p>
        <div className="mt-4">
          <button className="btn btn-danger btn-lg me-3" onClick={focusNameInput} aria-label="Comenzar partida">Comenzar Partida</button>
        </div>
      </div>
    </section>
  )
}

export default Hero;
