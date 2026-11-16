import { site } from "@/config/site";
import { MailIcon, MaxIcon, TelegramIcon, VkIcon, WhatsAppIcon } from "./Icons";

const items = [
  { key: "whatsapp", label: "WhatsApp", Icon: WhatsAppIcon, href: site.messengers.whatsapp },
  { key: "telegram", label: "Telegram", Icon: TelegramIcon, href: site.messengers.telegram },
  { key: "max", label: "MAX", Icon: MaxIcon, href: site.messengers.max },
  { key: "vk", label: "ВКонтакте", Icon: VkIcon, href: site.messengers.vk },
  { key: "email", label: "Почта", Icon: MailIcon, href: site.email ? `mailto:${site.email}` : "" },
];

export default function Messengers({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "msgr msgr-compact" : "msgr"}>
      {items
        .filter((i) => i.href)
        .map(({ key, label, Icon, href }) => (
          <a
            key={key}
            href={href}
            {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener" })}
            className={`msgr-btn msgr-${key}`}
          >
            <Icon className="msgr-ico" />
            <span>{label}</span>
          </a>
        ))}
    </div>
  );
}
