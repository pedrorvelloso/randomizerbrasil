import { ComponentType } from "react";
import {
  TwitchIcon,
  DiscordIcon,
  XIcon,
  YoutubeIcon,
  InstagramIcon,
} from "@/components/icons/social-icons";

export interface Social {
  icon: ComponentType<{ className?: string }>;
  href: string;
  label: string;
}

export const socials: Social[] = [
  {
    icon: TwitchIcon,
    href: "https://www.twitch.tv/randomizerbrasil",
    label: "Twitch",
  },
  {
    icon: DiscordIcon,
    href: "https://discord.gg/U4U62Gysku",
    label: "Discord",
  },
  {
    icon: XIcon,
    href: "https://x.com/RandomizerBr",
    label: "X",
  },
  {
    icon: YoutubeIcon,
    href: "https://www.youtube.com/c/RandomizerBrasil",
    label: "Youtube",
  },
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/randomizerbrasil/",
    label: "Instagram",
  },
];
