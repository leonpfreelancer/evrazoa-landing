import { site } from "@/config/site";
import { MaxIcon, TelegramIcon, VkIcon, WhatsAppIcon } from "./Icons";

const items = [
  { key: "whatsapp", label: "WhatsApp", Icon: WhatsAppIcon },
  { key: "telegram", label: "Telegram", Icon: TelegramIcon },
  { key: "max", label: "MAX", Icon: MaxIcon },
  { key: "vk", label: "ВКонтакте", Icon: VkIcon },
] as const;

export default function Messengers({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "msgr msgr-compact" : "msgr"}>
      {items
        .filter((i) => site.messengers[i.key])
        .map(({ key, label, Icon }) => (
          <a key={key} href={site.messengers[key]} target="_blank" rel="noopener" className={`msgr-btn msgr-${key}`}>
            <Icon className="msgr-ico" />
            <span>{label}</span>
          </a>
        ))}
    </div>
  );
}
