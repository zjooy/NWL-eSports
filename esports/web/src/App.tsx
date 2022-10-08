import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog'


import { GameController, MagnifyingGlassPlus } from 'phosphor-react'

import './styles/main.css';

import logoImg from './assets/logo-esports.svg';
import { GameBanner } from './components/GameBanner';

import { CreateAdModal } from './components/form/CreateAdModal';
import axios from 'axios';

interface Game {
  id: string;
  bannerUrl: string;
  tittle: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games')
    .then(response => {
      setGames(response.data)
    })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} />

      <h1 className='text-6xl text-white font-black mt-20 '>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              tittle={game.tittle}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          )
        })}

      </div>

      <Dialog.Root>
        <div className='pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden  mt-8'>
          <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>
            <div>
              <strong className='text-2xl text-white font-black block'>Não encontrou seu duo?</strong>
              <span className='text-zinc-400'>Publique um anúncio para encontrar novos players!</span>
            </div>

            <Dialog.Trigger className='py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3'>
              <MagnifyingGlassPlus size={24} />
              Publicar anúncio
            </Dialog.Trigger>
          </div>
        </div>

          <CreateAdModal/>

      </Dialog.Root >
    </div>

      
  )
}

export default App
