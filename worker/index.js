// Cloudflare Worker: статику отдаёт ASSETS, заявки — POST /api/booking → Telegram.

const labels = {
  name: "Имя",
  contact: "Контакт",
  from: "Откуда",
  to: "Куда",
  date: "Дата",
  time: "Время",
  flight: "Рейс",
  passengers: "Пассажиров",
  vehicle: "Машина",
  comment: "Комментарий",
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });

async function booking(request, env) {
  if (request.method !== "POST") return json({ error: "method not allowed" }, 405);

  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return json({ error: "telegram not configured" }, 503);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "bad json" }, 400);
  }

  const get = (k) => String(body?.[k] ?? "").trim().slice(0, 1000);
  if (!get("name") || !get("contact") || !get("from") || !get("to") || !get("date")) {
    return json({ error: "missing fields" }, 400);
  }

  const lines = Object.keys(labels)
    .filter((k) => get(k))
    .map((k) => `<b>${labels[k]}:</b> ${esc(get(k))}`);
  const text = `🚐 <b>Новая заявка</b>\n\n${lines.join("\n")}`;

  const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });

  if (!r.ok) {
    console.error("Telegram error", r.status, await r.text());
    return json({ error: "telegram failed" }, 502);
  }
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/booking") return booking(request, env);
    if (url.pathname.startsWith("/api/")) return json({ error: "not found" }, 404);
    return env.ASSETS.fetch(request);
  },
};
