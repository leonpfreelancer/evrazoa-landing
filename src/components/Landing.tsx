import Image from "next/image";
import BookingForm from "@/components/BookingForm";
import Messengers from "@/components/Messengers";
import TurkeyMap from "@/components/TurkeyMap";
import PartnerLogo from "@/components/PartnerLogo";
import { WhatsAppIcon, TelegramIcon, Headset, People, Plane, Van, Wifi, stepIcons, vehicleArt } from "@/components/Icons";
import { faq as defaultFaq, fleet, perks, services, steps as defaultSteps, tours } from "@/config/content";
import { cityPages, type CityPage } from "@/config/cities";
import { site } from "@/config/site";

function Logo() {
  return (
    <a href="/" className="logo" aria-label={site.name}>
      <span className="logo-mark">
        <span className="e">E</span>
        <span className="a">A</span>
      </span>
      <span className="logo-text">
        <b>ЕВРАЗИЯ</b>
        <small>СИТИ ТРАНС</small>
      </span>
    </a>
  );
}

export default function Landing({ city }: { city?: CityPage }) {
  const steps = city?.steps ?? defaultSteps;
  const faq = city?.faq ?? defaultFaq;
  const home = city ? "/" : "";
  return (
    <>
      <header className="header">
        <div className="container header-in">
          <div className="brand">
            <Logo />
            {site.partner.url && (
              <a href={site.partner.url} target="_blank" rel="noopener" className="brand-partner" aria-label={`Партнёр ${site.partner.name}`}>
                <PartnerLogo />
              </a>
            )}
          </div>
          <nav className="nav">
            <a href="#how">Трансфер</a>
            <a href="#fleet">Транспорт</a>
            <a href={`${home}#tours`}>Туры</a>
            <a href="#contacts">Контакты</a>
          </nav>
          <a href="#booking" className="btn btn-gold btn-sm">Заказать</a>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <Image src="/img/hero-van.jpg" alt={city?.heroAlt ?? "Mercedes Sprinter на набережной Стамбула"} fill priority className="hero-bg" sizes="100vw" />
          <div className="hero-shade" />
          <div className="container hero-in">
            <p className="eyebrow">{city?.eyebrow ?? "Трансфер · Автомобиль с водителем · Туры по Турции"}</p>
            <h1>
              {city ? city.h1[0] : "Трансфер по Стамбулу"}
              <br />{city ? city.h1[1] : "и всей Турции"}
            </h1>
            <ul className="hero-feats">
              <li><Plane className="ico" />Встреча<br />в аэропорту</li>
              <li><Van className="ico" />Комфортные<br />поездки</li>
              <li><Wifi className="ico" />Интернет<br />в салоне</li>
              <li><Headset className="ico" />Поддержка<br />на русском 24/7</li>
            </ul>
            <div className="hero-cta">
              <a href="#booking" className="btn btn-gold">Заказать трансфер</a>
              <Messengers compact />
            </div>
            <p className="slogan">{site.slogan}</p>
          </div>
        </section>

        {/* ПАРТНЁР */}
        {site.partner.url && (
          <section className="partner">
            <div className="container partner-in">
              <p className="eyebrow">Прямой партнёр</p>
              <a href={site.partner.url} target="_blank" rel="noopener" className="partner-logo">
                <PartnerLogo className="mcd-lg" />
              </a>
              <p className="muted">Заказы {site.partner.name} выполняем напрямую, без посредников.</p>
            </div>
          </section>
        )}

        {/* КАК ЭТО ПРОИСХОДИТ */}
        <section id="how" className="section">
          <div className="container">
            <p className="eyebrow">{city?.howEyebrow ?? "Трансфер из аэропорта"}</p>
            <h2>Как это происходит</h2>
            <ol className="steps">
              {steps.map((s) => {
                const Icon = stepIcons[s.icon];
                return (
                  <li key={s.title}>
                    <span className="step-circle"><Icon className="ico-lg" /></span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </li>
                );
              })}
            </ol>
            <div className="tiles tiles-4">
              {perks.map((p) => (
                <div className="tile" key={p.label}>
                  <small>{p.label}</small>
                  <span>{p.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ФОТО */}
        <section className="gallery">
          <div className="gallery-main">
            <Image src="/img/van-real.jpg" alt="Наш Mercedes-Benz Sprinter" fill sizes="(max-width: 800px) 100vw, 60vw" />
          </div>
          <div className="gallery-side">
            <div className="gallery-item">
              <Image src="/img/interior-1.jpg" alt="Салон VIP-микроавтобуса" fill sizes="(max-width: 800px) 50vw, 20vw" />
            </div>
            <div className="gallery-item">
              <Image src="/img/interior-2.jpg" alt="Кожаные кресла в салоне" fill sizes="(max-width: 800px) 50vw, 20vw" />
            </div>
          </div>
          <div className="gallery-caption container">
            <p className="eyebrow">Ваш салон уже ждёт</p>
            <p className="lead">Mercedes-Benz VIP-класса с водителем, кожаные кресла, Wi-Fi и вода в салоне.</p>
          </div>
        </section>

        {/* ТРАНСПОРТ */}
        <section id="fleet" className="section">
          <div className="container">
            <p className="eyebrow">Транспорт под любую группу</p>
            <h2>Выберите свою машину</h2>
            <p className="lead">Все машины с водителем, кондиционером и багажом для каждого пассажира</p>
          </div>
          <div className="fleet">
            {fleet.map((v) => {
              const Art = vehicleArt[v.id];
              return (
                <div className="fleet-row" key={v.id}>
                  <div className="container fleet-in">
                    <div className={`fleet-art fleet-art-${v.id}`}><Art /></div>
                    <div className="fleet-info">
                      <p className="eyebrow">{v.kind}</p>
                      <h3>{v.name}</h3>
                      <p className="seats">
                        <People className="ico" /> до <b>{v.seats}</b> <small>мест</small>
                      </p>
                      <p className="muted">{v.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="container">
            <div className="tiles tiles-3">
              {services.map((s) => (
                <div className="tile" key={s.label}>
                  <small>{s.label}</small>
                  <span>{city && s.label === "Город" ? city.cityTrips : s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ТЕКСТ О ГОРОДЕ */}
        {city && (
          <section className="section">
            <div className="container narrow city-text">
              <p className="eyebrow">{city.textEyebrow}</p>
              <h2>{city.textTitle}</h2>
              {city.text.map((t) => <p key={t}>{t}</p>)}
              <h3>Популярные направления</h3>
              <ul className="routes">
                {city.routes.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </div>
          </section>
        )}

        {/* ТУРЫ */}
        {!city && <section id="tours" className="section section-tours">
          <div className="container">
            <p className="eyebrow">Гид на русском · от отеля и обратно</p>
            <h2>8 направлений из Стамбула</h2>
          </div>
          <div className="map-wrap">
            <div className="container"><TurkeyMap /></div>
          </div>
          <div className="container">
            <ul className="tours">
              {tours.map((t) => (
                <li key={t.n}>
                  <span className="num">{t.n}</span>
                  <span className="tour-name">{t.name}</span>
                  <small>{t.days}</small>
                </li>
              ))}
            </ul>
          </div>
        </section>}

        {/* ЗАЯВКА */}
        <section id="booking" className="section section-booking">
          <div className="container booking">
            <div className="booking-text">
              <p className="eyebrow">Заказ трансфера</p>
              <h2>Встретим в аэропорту. Довезём без ожидания.</h2>
              <p className="lead">
                Оставьте заявку — подтвердим заказ и назовём цену заранее. Или напишите нам напрямую:
              </p>
              <Messengers />
            </div>
            <BookingForm />
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="container narrow">
            <p className="eyebrow">Вопросы</p>
            <h2>Частые вопросы</h2>
            <div className="faq">
              {faq.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="contacts" className="footer">
        <div className="container footer-in">
          <div>
            <Logo />
            <p className="slogan">{site.slogan}</p>
          </div>
          <div className="footer-contacts">
            {site.phone && <a href={`tel:${site.phoneRaw}`} className="phone">{site.phone}</a>}
            {site.email && <a href={`mailto:${site.email}`} className="email">{site.email}</a>}
            <Messengers compact />
          </div>
        </div>
        <nav className="container footer-links" aria-label="Направления">
          <a href="/">Трансфер в Стамбуле</a>
          {cityPages.map((c) => <a key={c.slug} href={`/${c.slug}/`}>{c.linkText}</a>)}
        </nav>
        <div className="container copy">© {new Date().getFullYear()} {site.name}</div>
      </footer>

      {site.messengers.whatsapp ? (
        <a href={site.messengers.whatsapp} target="_blank" rel="noopener" className="fab" aria-label="Написать в WhatsApp">
          <WhatsAppIcon className="fab-ico" />
        </a>
      ) : site.messengers.telegram ? (
        <a href={site.messengers.telegram} target="_blank" rel="noopener" className="fab fab-tg" aria-label="Написать в Telegram">
          <TelegramIcon className="fab-ico" />
        </a>
      ) : null}
    </>
  );
}
