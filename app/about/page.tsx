"use client";

import Link from "next/link";
import { useEffect, useState, startTransition } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ConnectButton } from "@/components/features/connect";
import { socials } from "@/lib/socials";
import { getBaseUrl } from "@/lib/utils/get-base-url";
import { DiscordIcon } from "@/components/icons/social-icons";

export default function AboutPage() {
  const [openItem, setOpenItem] = useState<string>("");

  // Handle initial hash and hash changes after hydration
  useEffect(() => {
    // Check initial hash
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      startTransition(() => {
        setOpenItem(hash);
      });
      // Scroll to the element after a short delay to ensure it's rendered
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }

    // Handle hash changes (e.g., when clicking a link with hash)
    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '');
      startTransition(() => {
        setOpenItem(newHash || "");
      });
      if (newHash) {
        setTimeout(() => {
          document.getElementById(newHash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
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

            <Accordion
              type="single"
              collapsible
              className="relative w-full"
              value={openItem}
              onValueChange={setOpenItem}
            >
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

              <AccordionItem value="aparecer-na-lista" id="aparecer-na-lista">
                <AccordionTrigger>Como aparecer na lista de streams?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">
                    Quer que sua live apareça na página inicial do Randomizer Brasil? É muito simples!
                  </p>

                  {/* Primary action: Connect via website */}
                  <div className="mb-6 p-4 bg-brand-cyan/10 border border-brand-cyan/30 rounded-lg">
                    <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-brand-cyan text-brand-navy text-sm font-bold flex items-center justify-center">1</span>
                      Forma mais rápida: Conecte pelo site
                    </h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      Se você já é membro do nosso Discord e tem sua conta Twitch conectada ao Discord,
                      basta clicar no botão abaixo para registrar sua stream automaticamente.
                    </p>
                    <ConnectButton />
                  </div>

                  {/* Alternative: Bot command */}
                  <div className="mb-4">
                    <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-sm font-bold flex items-center justify-center">2</span>
                      Alternativa: Use o comando do bot
                    </h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      Você também pode registrar sua stream diretamente pelo Discord:
                    </p>
                  </div>
                  <ol className="space-y-3 mb-4 list-decimal list-inside marker:text-brand-cyan">
                    <li className="pl-2">
                      <strong className="text-foreground">Entre no{" "}
                        <Link
                          href={socials.find(s => s.label === "Discord")?.href ?? "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-cyan hover:text-brand-cyan-light underline decoration-brand-cyan/30 hover:decoration-brand-cyan transition-colors"
                        >
                          Discord
                        </Link>
                        {" "}da comunidade
                      </strong>
                      <p className="ml-6 mt-1 text-muted-foreground">
                        Junte-se ao nosso servidor oficial no Discord onde toda a comunidade se reúne.
                      </p>
                    </li>
                    <li className="pl-2">
                      <strong className="text-foreground">Encontre o bot RBR.watch</strong>
                      <p className="ml-6 mt-1 text-muted-foreground">
                        Nosso bot automatizado gerencia a lista de streamers da comunidade.
                      </p>
                    </li>
                    <li className="pl-2">
                      <strong className="text-foreground">Use o comando <code className="px-1.5 py-0.5 bg-muted rounded text-brand-cyan font-mono text-sm">/twitch</code></strong>
                      <p className="ml-6 mt-1 text-muted-foreground">
                        Digite o comando seguido do seu nome de usuário da Twitch para registrar sua stream.
                      </p>
                    </li>
                  </ol>
                  <p className="text-sm text-muted-foreground border-l-2 border-brand-cyan/50 pl-4 py-2 bg-brand-cyan/5 rounded-r">
                    <strong className="text-brand-cyan">Importante:</strong> Sua stream só aparecerá na lista quando você estiver
                    transmitindo um dos jogos randomizados que a comunidade acompanha. Certifique-se de estar jogando
                    um dos títulos listados acima!
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="bot-discord" id="bot-discord">
                <AccordionTrigger>Leve a RBR para seu servidor Discord</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">
                    Quer acompanhar as streams da comunidade diretamente no seu servidor Discord?
                    Adicione o bot RBR.watch e tenha acesso às informações da comunidade sem sair do seu servidor!
                  </p>
                  <div className="mb-4">
                    <h4 className="text-foreground font-semibold mb-2">O que o bot faz no seu servidor:</h4>
                    <ul className="space-y-2 list-disc list-inside marker:text-brand-cyan">
                      <li>Mostra quem está online transmitindo randomizers</li>
                      <li>Exibe a lista de runners da comunidade</li>
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground border-l-2 border-brand-cyan/50 pl-4 py-2 bg-brand-cyan/5 rounded-r mb-4">
                    <strong className="text-brand-cyan">Nota:</strong> O registro de streams só pode ser feito no servidor
                    oficial da RBR. O bot em servidores externos serve para acompanhar a comunidade.
                  </p>
                  <a
                    href={`${getBaseUrl()}/bot`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold rounded-lg transition-colors"
                  >
                    <DiscordIcon className="w-5 h-5" />
                    Adicionar Bot ao Servidor
                  </a>
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
