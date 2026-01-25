import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Descubra o que são randomizers, quais jogos nossa comunidade joga e como começar sua jornada no mundo dos randomizers.",
  openGraph: {
    title: "Sobre | Randomizer Brasil",
    description: "Descubra o que são randomizers, quais jogos nossa comunidade joga e como começar sua jornada no mundo dos randomizers.",
  },
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <main className="relative container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="mb-16 relative">
          <div className="mb-10 relative">
            <div className="inline-flex items-center gap-4 relative">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight font-syne uppercase bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
                Sobre
              </h1>
              <div className="hidden md:block w-32 h-1 bg-gradient-to-r from-brand-cyan to-transparent rounded-full" />
            </div>
          </div>

          <p className="text-lg text-foreground/70 font-dm-sans leading-relaxed max-w-2xl">
            Randomizers transformam jogos clássicos em experiências únicas a cada partida.
            Descubra como essa modalidade funciona, conheça os jogos que nossa comunidade
            joga e saiba como começar sua jornada no mundo dos randomizers.
          </p>
        </div>

        {/* Accordion Section */}
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-brand-cyan/20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-brand-cyan/20 pointer-events-none" />

          <div className="relative bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 via-transparent to-accent/5 pointer-events-none" />

            <Accordion type="single" collapsible className="relative w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>O que é Randomizer?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Randomizer é uma modificação de um jogo em que os itens são dispostos de forma aleatória.
                    Os itens são distribuídos dentro de uma lógica que permite chegar ao objetivo final sem que
                    você fique travado, ou seja, todos os jogos randomizados gerados, que chamamos de seed,
                    possuem uma solução. Em casos de competição os dois participantes jogam a mesma seed, que é
                    normalmente identificada por uma hash de identificação no início da partida.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Quais são os jogos que possuem randomizers?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">
                    Hoje existem inúmeros jogos que tem a sua versão randomizer, porém elencar todos aqui
                    ficaria inviável e monótono, com isso listaremos os randomizers que já possuem players
                    dentro de nossa comunidade. São eles:
                  </p>
                  <ul className="space-y-2 mb-4 list-disc list-inside marker:text-brand-cyan">
                    <li>The Legend of Zelda: A Link to The Past - Super Nintendo (ALTTP)</li>
                    <li>The Legend of Zelda: Ocarina of Time - Nintendo 64 (OOT)</li>
                    <li>The Legend of Zelda: Majora&apos;s Mask - Nintendo 64 (MM)</li>
                    <li>The Legend of Zelda: The Minish Cap - GameBoy Advance (Minish)</li>
                    <li>The Legend of Zelda: Skyward Sword - Wii</li>
                    <li>Super Metroid - Super Nintendo</li>
                    <li>Castlevania: Symphony of The Night - Playstation</li>
                    <li>Kingdom Hearts II: Final Mix - Playstation 2 e PC</li>
                    <li>Hollow Knight - PC</li>
                    <li>Pokémon Crystal - GameBoy Color</li>
                    <li>Super Mario World - Super Nintendo</li>
                    <li>Super Mario RPG: The Legend of Seven Stars - Super Nintendo</li>
                    <li>Combo SMZ3 - A Link to The Past + Super Metroid - Super Nintendo</li>
                  </ul>
                  <p>
                    Estes são alguns randomizer que nós temos players jogando porém como dito, existe uma
                    infinidade de outros jogos com sua versão randomizer. Caso tenha interesse basta clicar
                    aqui para conhecer a lista completa e atualizada.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Jogando o Randomizer</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">
                    Cada randomizer possui a sua particularidade. Tanto no quesito de como gerar uma seed
                    randomizada, como também no modo como se pode jogar.
                  </p>
                  <p>
                    Em sua grande maioria as seeds de randomizer são jogadas em seus consoles nativos ou em
                    emuladores, porém há que atentar-se pois para jogar competitivamente existem regras a
                    serem seguidas a respeito dos emuladores permitidos em competições. Porém se o seu
                    objetivo é apenas divertir-se, pode utilizar o que melhor lhe convém.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-16" />
      </main>
    </div>
  );
}
