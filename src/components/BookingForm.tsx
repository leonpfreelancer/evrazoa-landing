"use client";

import { useState } from "react";
import { fleet } from "@/config/content";
import { site } from "@/config/site";

type Status = "idle" | "sending" | "ok" | "fallback" | "error";

const fields = {
  name: "Имя",
  contact: "Телефон / мессенджер",
  from: "Откуда",
  to: "Куда",
  date: "Дата",
  time: "Время",
  flight: "Номер рейса",
  passengers: "Пассажиров",
  vehicle: "Машина",
  comment: "Комментарий",
} as const;

type Key = keyof typeof fields;
type Data = Record<Key, string>;

function toText(d: Data) {
  return (
    "Заявка на трансфер\n" +
    (Object.keys(fields) as Key[])
      .filter((k) => d[k]?.trim())
      .map((k) => `${fields[k]}: ${d[k].trim()}`)
      .join("\n")
  );
}

// Запасной канал, если бот Telegram не настроен: WhatsApp (если указан номер), иначе почта
function fallbackLink(d: Data) {
  if (site.whatsappNumber) return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(toText(d))}`;
  return `mailto:${site.email}?subject=${encodeURIComponent("Заявка на трансфер")}&body=${encodeURIComponent(toText(d))}`;
}
const fallbackWhere = site.whatsappNumber ? "WhatsApp" : "почтовой программе";

export default function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [last, setLast] = useState<Data | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (fd.get("company")) return; // honeypot
    const data = Object.fromEntries(
      (Object.keys(fields) as Key[]).map((k) => [k, String(fd.get(k) ?? "")])
    ) as Data;
    setLast(data);
    setStatus("sending");

    try {
      const r = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (r.ok) {
        setStatus("ok");
        form.reset();
      } else if (r.status === 503 || r.status === 502) {
        // Сервер не смог отправить (не настроен или ошибка) — открываем запасной канал
        setStatus("fallback");
        if (site.whatsappNumber) window.open(fallbackLink(data), "_blank");
        else window.location.href = fallbackLink(data);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form className="form" onSubmit={onSubmit}>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hp" aria-hidden />

      <div className="form-grid">
        <label>
          <span>{fields.name} *</span>
          <input name="name" required maxLength={80} autoComplete="name" />
        </label>
        <label>
          <span>{fields.contact} *</span>
          <input name="contact" required maxLength={80} placeholder="+7 …, @telegram" autoComplete="tel" />
        </label>
        <label>
          <span>{fields.from} *</span>
          <input name="from" required maxLength={120} placeholder="Аэропорт IST" />
        </label>
        <label>
          <span>{fields.to} *</span>
          <input name="to" required maxLength={120} placeholder="Отель, адрес" />
        </label>
        <label>
          <span>{fields.date} *</span>
          <input type="date" name="date" required min={today} />
        </label>
        <label>
          <span>{fields.time}</span>
          <input type="time" name="time" />
        </label>
        <label>
          <span>{fields.flight}</span>
          <input name="flight" maxLength={20} placeholder="TK 414" />
        </label>
        <label>
          <span>{fields.passengers}</span>
          <input type="number" name="passengers" min={1} max={50} defaultValue={2} />
        </label>
        <label className="wide">
          <span>{fields.vehicle}</span>
          <select name="vehicle" defaultValue={fleet[0].name}>
            {fleet.map((v) => (
              <option key={v.id} value={v.name}>
                {v.name} — до {v.seats} мест
              </option>
            ))}
          </select>
        </label>
        <label className="wide">
          <span>{fields.comment}</span>
          <textarea name="comment" rows={3} maxLength={1000} placeholder="Детские кресла, багаж, остановки…" />
        </label>
      </div>

      <button className="btn btn-gold" disabled={status === "sending"}>
        {status === "sending" ? "Отправляем…" : "Отправить заявку"}
      </button>

      {status === "ok" && <p className="form-msg ok">Заявка отправлена. Мы свяжемся с вами в ближайшее время.</p>}
      {status === "fallback" && last && (
        <p className="form-msg">
          Текст заявки открыт в {fallbackWhere} — нажмите «Отправить». Не открылось?{" "}
          <a href={fallbackLink(last)} target="_blank" rel="noopener">Открыть ещё раз</a>
        </p>
      )}
      {status === "error" && (
        <p className="form-msg err">
          Не удалось отправить. Напишите нам в{" "}
          <a href={site.messengers.whatsapp || site.messengers.telegram} target="_blank" rel="noopener">
            {site.messengers.whatsapp ? "WhatsApp" : "Telegram"}
          </a>{" "}
          или на <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}
    </form>
  );
}
