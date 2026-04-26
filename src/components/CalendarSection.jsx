import { useState, useEffect } from "react";

const CALENDAR_ID = "pausettepaulpineau@gmail.com";
const API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;

const MONTHS_FR = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];
const DAYS_FR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

// Détecte si c'est un événement "EN ATTENTE"
function isEnAttente(event) {
  const text = ((event.summary || "") + " " + (event.description || "")).toLowerCase();
  return text.includes("en attente");
}

// Filtre : seuls les événements liés aux réservations TSM ou en attente
function isReservation(event) {
  const text = ((event.summary || "") + " " + (event.description || "")).toLowerCase();
  return (
    text.includes("en attente") ||
    text.includes("tsm") ||
    text.includes("la tranche") ||
    text.includes("réservation") ||
    text.includes("reservation") ||
    text.includes("pausette")
  );
}

// Extrait le nom du locataire depuis le titre
function extractName(summary) {
  if (!summary) return "Réservé";
  const s = summary
    .replace(/en attente\s*[-—–]?\s*/i, "")
    .replace(/réservation tsm\s*[-—–]?\s*/i, "")
    .replace(/reservation tsm\s*[-—–]?\s*/i, "")
    .replace(/tsm\s*[-—–]?\s*/i, "")
    .replace(/pausette\s*/i, "")
    .replace(/\(.*?\)/g, "")
    .trim();
  return s || "Réservé";
}

function parseDate(str) {
  if (!str) return null;
  return new Date(str);
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isDateInRange(date, start, end) {
  const d = new Date(date); d.setHours(12, 0, 0, 0);
  const s = new Date(start); s.setHours(0, 0, 0, 0);
  const e = new Date(end); e.setHours(23, 59, 59, 999);
  return d >= s && d <= e;
}

export default function CalendarSection() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [currentYear, currentMonth]);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const timeMin = new Date(currentYear, currentMonth, 1).toISOString();
      const timeMax = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59).toISOString();
      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime&maxResults=100`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Erreur API");
      const data = await res.json();
      const filtered = (data.items || []).filter(isReservation);
      setEvents(filtered);
    } catch (e) {
      setError("Impossible de charger le calendrier.");
    }
    setLoading(false);
  };

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const getDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    let startDow = firstDay.getDay();
    startDow = startDow === 0 ? 6 : startDow - 1;
    const days = [];
    for (let i = 0; i < startDow; i++) days.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(currentYear, currentMonth, d));
    return days;
  };

  const getEventForDay = (day) => {
    if (!day) return null;
    return events.find(ev => {
      const start = parseDate(ev.start?.date || ev.start?.dateTime);
      const end = parseDate(ev.end?.date || ev.end?.dateTime);
      if (!start || !end) return false;
      const adjustedEnd = new Date(end);
      if (ev.end?.date) adjustedEnd.setDate(adjustedEnd.getDate() - 1);
      return isDateInRange(day, start, adjustedEnd);
    });
  };

  const isToday = (day) => day && isSameDay(day, today);
  const isPast = (day) => day && day < new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const days = getDays();

  // Résumé des réservations du mois — séparé en deux listes
  const monthEvents = events.map(ev => {
    const start = parseDate(ev.start?.date || ev.start?.dateTime);
    const end = parseDate(ev.end?.date || ev.end?.dateTime);
    if (ev.end?.date) end.setDate(end.getDate() - 1);
    return {
      name: extractName(ev.summary),
      start,
      end,
      pending: isEnAttente(ev),
    };
  }).filter(r => r.start && r.end);

  const confirmedEvents = monthEvents.filter(r => !r.pending);
  const pendingEvents = monthEvents.filter(r => r.pending);

  return (
    <section style={{
      background: "#f8f7f4",
      padding: "80px 24px",
      fontFamily: "'Cormorant Garamond', 'Palatino Linotype', Georgia, serif",
    }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Titre */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{
            color: "#1a3a6e", fontSize: "11px", letterSpacing: "3px",
            textTransform: "uppercase", marginBottom: "12px", fontFamily: "sans-serif",
          }}>DISPONIBILITÉS</p>
          <h2 style={{
            fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "700",
            color: "#1a1a2e", margin: 0, lineHeight: 1.1,
          }}>
            Calendrier des<br />
            <span style={{ color: "#c85f3a", fontStyle: "italic" }}>Réservations</span>
          </h2>
        </div>

        {/* Calendrier */}
        <div style={{
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.06)",
        }}>
          {/* Header navigation */}
          <div style={{
            background: "linear-gradient(135deg, #0d2044, #102860)",
            padding: "20px 28px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <button onClick={prevMonth} style={{
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "10px", color: "white", width: "40px", height: "40px",
              cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            >‹</button>

            <div style={{ color: "white", fontSize: "22px", fontWeight: "600", letterSpacing: "0.5px" }}>
              {MONTHS_FR[currentMonth]} {currentYear}
            </div>

            <button onClick={nextMonth} style={{
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "10px", color: "white", width: "40px", height: "40px",
              cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            >›</button>
          </div>

          {/* Jours de la semaine */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(7, 1fr)",
            background: "#f0f4ff",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}>
            {DAYS_FR.map(d => (
              <div key={d} style={{
                textAlign: "center", padding: "12px 0",
                fontSize: "11px", fontWeight: "600", letterSpacing: "1px",
                color: "#4a6a9a", textTransform: "uppercase", fontFamily: "sans-serif",
              }}>{d}</div>
            ))}
          </div>

          {/* Grille des jours */}
          {loading ? (
            <div style={{ padding: "60px", textAlign: "center", color: "#8a9ab0", fontStyle: "italic" }}>
              Chargement du calendrier...
            </div>
          ) : error ? (
            <div style={{ padding: "60px", textAlign: "center", color: "#c85f3a" }}>
              {error}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
              {days.map((day, i) => {
                const ev = day ? getEventForDay(day) : null;
                const pending = ev ? isEnAttente(ev) : false;
                const reserved = ev && !pending;
                const past = isPast(day);
                const todayDay = isToday(day);

                let bgColor = !day ? "#fafafa"
                  : reserved ? "rgba(26, 58, 112, 0.08)"
                  : pending ? "rgba(200, 95, 58, 0.07)"
                  : past ? "#fafafa"
                  : "white";

                return (
                  <div key={i} style={{
                    minHeight: isMobile ? "48px" : "80px",
                    padding: "8px",
                    border: "1px solid rgba(0,0,0,0.04)",
                    background: bgColor,
                    position: "relative",
                    transition: "background 0.2s",
                  }}>
                    {day && (
                      <>
                        {/* Numéro du jour */}
                        <div style={{
                          width: "28px", height: "28px", borderRadius: "50%",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "13px", fontWeight: todayDay ? "700" : "400",
                          color: todayDay ? "white"
                            : past ? "#c0c8d8"
                            : reserved ? "#1a3a6e"
                            : pending ? "#c85f3a"
                            : "#2a2a4a",
                          background: todayDay ? "#c85f3a" : "transparent",
                          marginBottom: "4px",
                          fontFamily: "sans-serif",
                        }}>
                          {day.getDate()}
                        </div>

                        {/* Mobile : petit point coloré */}
                        {isMobile && (reserved || pending) && (
                          <div style={{
                            position: "absolute", bottom: "5px", left: "50%",
                            transform: "translateX(-50%)",
                            width: "6px", height: "6px", borderRadius: "50%",
                            background: reserved
                              ? "linear-gradient(135deg, #1a3a6e, #2d5fa0)"
                              : "linear-gradient(135deg, #c85f3a, #e07855)",
                          }} />
                        )}

                        {/* Desktop : badge réservé — bleu */}
                        {!isMobile && reserved && (
                          <div style={{
                            background: "linear-gradient(135deg, #1a3a6e, #2d5fa0)",
                            borderRadius: "6px",
                            padding: "3px 6px",
                            fontSize: "10px",
                            color: "white",
                            fontFamily: "sans-serif",
                            fontWeight: "500",
                            lineHeight: "1.3",
                          }}>
                            <div style={{ opacity: 0.8, fontSize: "9px" }}>Réservé</div>
                            <div style={{
                              fontSize: "10px", fontWeight: "600",
                              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                              maxWidth: "80px",
                            }}>
                              {extractName(ev.summary)}
                            </div>
                          </div>
                        )}

                        {/* Desktop : badge en attente — orange */}
                        {!isMobile && pending && (
                          <div style={{
                            background: "linear-gradient(135deg, #c85f3a, #e07855)",
                            borderRadius: "6px",
                            padding: "3px 6px",
                            fontSize: "10px",
                            color: "white",
                            fontFamily: "sans-serif",
                            fontWeight: "500",
                            lineHeight: "1.3",
                          }}>
                            <div style={{ opacity: 0.85, fontSize: "9px" }}>En cours</div>
                            <div style={{
                              fontSize: "10px", fontWeight: "600",
                              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                              maxWidth: "80px",
                            }}>
                              {extractName(ev.summary)}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Légende */}
          <div style={{
            padding: "16px 24px",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            display: "flex", gap: "24px", flexWrap: "wrap",
            background: "#fafbff",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "14px", height: "14px", borderRadius: "3px", background: "white", border: "1px solid #ddd" }} />
              <span style={{ fontSize: "12px", color: "#6a7a9a", fontFamily: "sans-serif" }}>Disponible</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "14px", height: "14px", borderRadius: "3px", background: "linear-gradient(135deg, #1a3a6e, #2d5fa0)" }} />
              <span style={{ fontSize: "12px", color: "#6a7a9a", fontFamily: "sans-serif" }}>Réservé</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "14px", height: "14px", borderRadius: "3px", background: "linear-gradient(135deg, #c85f3a, #e07855)" }} />
              <span style={{ fontSize: "12px", color: "#6a7a9a", fontFamily: "sans-serif" }}>En cours de réservation</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "14px", height: "14px", borderRadius: "50%",
                background: "#c85f3a",
              }} />
              <span style={{ fontSize: "12px", color: "#6a7a9a", fontFamily: "sans-serif" }}>Aujourd'hui</span>
            </div>
          </div>
        </div>

        {/* Résumé réservations confirmées */}
        {!loading && !error && confirmedEvents.length > 0 && (
          <div style={{ marginTop: "32px" }}>
            <h3 style={{
              fontSize: "16px", color: "#1a1a2e", marginBottom: "16px",
              fontWeight: "600", letterSpacing: "0.3px",
            }}>
              Réservations de {MONTHS_FR[currentMonth]}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {confirmedEvents.map((r, i) => (
                <div key={i} style={{
                  background: "white", borderRadius: "12px", padding: "14px 18px",
                  display: "flex", alignItems: "center", gap: "14px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  border: "1px solid rgba(26,58,112,0.1)",
                }}>
                  <div style={{
                    width: "10px", height: "10px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #1a3a6e, #2d5fa0)", flexShrink: 0,
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "600", color: "#1a1a2e", fontSize: "15px" }}>{r.name}</div>
                    <div style={{ color: "#6a7a9a", fontSize: "12px", fontFamily: "sans-serif", marginTop: "2px" }}>
                      {r.start.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
                      {" → "}
                      {r.end.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Résumé en attente */}
        {!loading && !error && pendingEvents.length > 0 && (
          <div style={{ marginTop: "24px" }}>
            <h3 style={{
              fontSize: "16px", color: "#c85f3a", marginBottom: "16px",
              fontWeight: "600", letterSpacing: "0.3px",
            }}>
              En cours de réservation
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {pendingEvents.map((r, i) => (
                <div key={i} style={{
                  background: "white", borderRadius: "12px", padding: "14px 18px",
                  display: "flex", alignItems: "center", gap: "14px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  border: "1px solid rgba(200,95,58,0.2)",
                }}>
                  <div style={{
                    width: "10px", height: "10px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #c85f3a, #e07855)", flexShrink: 0,
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "600", color: "#1a1a2e", fontSize: "15px" }}>{r.name}</div>
                    <div style={{ color: "#6a7a9a", fontSize: "12px", fontFamily: "sans-serif", marginTop: "2px" }}>
                      {r.start.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
                      {" → "}
                      {r.end.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
                      <span style={{ marginLeft: "8px", color: "#c85f3a", fontStyle: "italic" }}>
                        — en attente de validation
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && monthEvents.length === 0 && (
          <div style={{
            marginTop: "24px", textAlign: "center", padding: "20px",
            color: "#8a9ab0", fontStyle: "italic", fontSize: "15px",
          }}>
            Aucune réservation ce mois-ci — Pausette est disponible !
          </div>
        )}

      </div>
    </section>
  );
}
