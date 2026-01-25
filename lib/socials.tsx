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
  color: string;
}

export const socials: Social[] = [
  {
    icon: TwitchIcon,
    href: "https://www.twitch.tv/randomizerbrasil",
    label: "Twitch",
    color: "#9146FF",
  },
  {
    icon: DiscordIcon,
    href: "https://discord.gg/U4U62Gysku",
    label: "Discord",
    color: "#5865F2",
  },
  {
    icon: XIcon,
    href: "https://x.com/RandomizerBr",
    label: "X",
    color: "#FFFFFF",
  },
  {
    icon: YoutubeIcon,
    href: "https://www.youtube.com/c/RandomizerBrasil",
    label: "Youtube",
    color: "#FF0000",
  },
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/randomizerbrasil/",
    label: "Instagram",
    color: "#E4405F",
  },
];
