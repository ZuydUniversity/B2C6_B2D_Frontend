"use client";

import Spline from '@splinetool/react-spline'
import Image from 'next/image'
import Link from 'next/link'
import infoCards from './libs/InfoCards'
import { CheckCheck, LucideIcon } from 'lucide-react'
import { ReactElement } from 'react'
import pricingCards from './libs/PricingCards'

export default function Home() {
  return (
    <main className='flex min-h-screen h-fit flex-col items-center justify-center relative'>
      <Navbar />
      <header id="home" className="flex flex-col-reverse md:flex-row w-full h-screen max-w-7xl items-center justify-center p-8 relative overflow-x-hidden">
        <div className='w-full h-2/4 md:h-full md:w-2/5 flex flex-col justify-center items-center md:items-start gap-8'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-md md:text-2xl'>Welkom bij</h1> 
            <h2 className='text-4xl text-blue-600 font-black md:text-8xl'>Synergy</h2>
          </div>
          <p className='max-w-md text-sm md:text-base text-zinc-500'>Wij zijn een enthousiaste groep van HBO-ICT studenten aan Zuyd Hogeschool. Onze projectgroep, Synergy, staat voor de kracht van samenwerking, waar diverse talenten en ideeën samenkomen om iets groots te creëren.</p>
          <div className='w-full flex items-center justify-center md:justify-start gap-4'>
          <button className='w-48 h-12 text-sm sm:text-base rounded bg-blue-600 text-white hover:bg-white hover:text-blue-600 transition-colors'>Zie Project</button>
            <button className='w-48 h-12 text-sm sm:text-base rounded hover:bg-white hover:text-white hover:bg-opacity-5 transition-colors'>Contact</button>
          </div>
        </div>

      

</header>
<section id="about" className="h-fit min-h-screen w-full flex relative items-center justify-center p-8">
        <div className='absolute -z-10 h-full w-full overflow-hidden'>
          <Image src="/whirl.svg" fill className="absolute object-cover w-full overflow-visible sm:rotate-90" alt="Background Whirl"/>
        </div>
        <div className="w-full h-full flex items-center justify-center flex-col gap-8 max-w-7xl">
          <h3 className='text-4xl md:text-5xl font-bold'>Over Ons</h3>
          <div className="w-full grid grid-cols-1 grid-rows-3 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1 gap-4 justify-between relative">
            {infoCards.map((infoCard) => {
              return (
                <InfoCard key={infoCard.id} Icon={infoCard.icon} title={infoCard.title}>
                  <p className="text-sm sm:text-base text-center md:text-left">{infoCard.bodyText}</p>
                </InfoCard>
              )
            })}
          </div>
        </div>
</section>
    </main>
  )
}

interface IInfoCardProps {
  title:string;
  Icon:LucideIcon;
  children:ReactElement<any,any>
}

function InfoCard({title,Icon,children}:IInfoCardProps) {
  return (
    <div className='w-full h-80 rounded flex flex-col justify-around items-center p-8 bg-gray-900 rounded bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20'>
      <div className="p-4 bg-blue-600 rounded-full">
        <Icon />
      </div>
      <div>
        <h3 className='text-lg font-bold sm:text-xl'>{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  )
}



function Navbar() {
  return (
    <div className='w-full h-16 backdrop-filter backdrop-blur-xl bg-opacity-20 border-b flex items-center justify-center'>
      <div className='max-w-7xl w-full flex items-center justify-between p-4'>
        <h6 className='font-bold'>Synergy</h6>
        <ul className='flex gap-8'>
          <li><Link className='hover:text-blue-600 transition-colors text-xs sm:text-base' href="#home">Home</Link></li>
          <li><Link className='hover:text-blue-600 transition-colors text-xs sm:text-base' href="#about">Over Ons</Link></li>
          <li><Link className='hover:text-blue-600 transition-colors text-xs sm:text-base' href="#pricing">Settings</Link></li>
        </ul>
      </div>

    </div>
  )
}