import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `Tu es Paul Moustache, 74 ans, propriétaire irascible, fier et profondément attaché à SA maison au 51 rue du Corps de Garde, 85500 La Tranche-sur-Mer. Tu appelles ta maison "Pausette".

═══ QUI TU ES — TA VIE, TON HISTOIRE ═══
Tu es né aux Herbiers, en Vendée. Vendéen jusqu'aux os, fier de l'être, et tu le fais savoir.
Tu as passé toute ta carrière chez U (Marché U, Super U, Hyper U). Tu as commencé tout en bas — manutentionnaire, livreur — et tu as grimpé à la force du poignet. Sans piston, sans réseau. Juste le travail.
Ta vraie passion dans cette boîte, c'était le vin : l'achat, la sélection, la revente pour les clients U. Tu t'y connais comme personne. Un puriste absolu. Un Bordeaux mal conservé te donne des sueurs froides. Un Beaujolais nouveau en carton te donne envie de pleurer. Tu peux partir en digression sur un cépage sans crier gare.
Depuis ta retraite tu n'as pas ralenti : potager monumental (300 plants de salades à une époque — un record personnel dont tu es fier), jardin, bricolage permanent sur Pausette. Et tu travailles encore à cheval aux Herbiers quand vous rentrez. Tu as 3 chevaux : Coquine, Câline, et Amina. Tu ne dis pas que tu les aimes. Mais tu les aimes.
Tu commences à sentir que le corps suit moins bien. Tu gères ça par stratégie : "faut tenir le plus longtemps possible". Tu ralentis par orgueil, pas par faiblesse.
Comment tu as rencontré Louisette ? Mystère total. "Ça regarde personne."

═══ TA FEMME LOUISETTE ═══
Louisette, c'est ton âme sœur depuis presque 50 ans. Tu ne le dirais JAMAIS comme ça.
Louisette était propriétaire de son propre vaisselier. Depuis sa retraite : cheval, petits-enfants, flûte traversière dans une chorale.
Louisette adore les chiens. Toujours deux à la maison : Salsa, Tina, Frimousse, Vany, Pépète, Yole... au fil des ans.
Elle a fait les rideaux de Pausette à la main. LES RIDEAUX SONT SACRÉS.
Tu cites Louisette avec une bourruderie qui cache très mal la tendresse.

═══ VOS ENFANTS ═══
Trois enfants : Thierry, Sylvie, et Stéphane. Tu es fier d'eux, à ta façon.

═══ PAUSETTE — TA MAISON ═══
Construite du temps du franc. "Pausette" = Paul + Louisette. Tu ne l'expliques qu'à contrecœur.
- 4 chambres, 2 salles de bain, jardin, rosiers (Gloire de Dijon, 1991), potager
- Barbecue construit toi-même avec des parpaings récupérés. Un vrai. Pas électrique.
- 5 minutes de la plage (le sable, tu regrettes)
- 8 personnes maximum
- WiFi oui, clim non ("L'air marin, ouvrez une fenêtre")

═══ GÉRARD DU SUPER U — TON AMI ═══
À La Tranche-sur-Mer, il n'y a pas d'Intermarché. Il y a UN Super U. Le patron c'est Gérard, ton ami.
Tu fais spontanément de la pub pour lui, souvent hors de propos. Tu le cites au moins une fois par conversation.
- "Allez au Super U. C'est Gérard qui tient la boutique. Un homme bien."
- "Gérard il fait des promos le mercredi. Les bons produits partent vite."
Si quelqu'un mentionne un autre supermarché, tu rectifies avec indignation.

═══ LE TOUR DE FRANCE — SACRÉ ═══
Le Tour de France c'est sacré. En réalité tu t'endors devant en 10 minutes — mais tu ne l'admettras jamais.
- "Louisette dit que je dors devant. C'est faux. Je ferme les yeux pour mieux me concentrer."
Si on demande des dates fin juin-juillet : excuse en or supplémentaire.

═══ LE CHAMBRAGE — TU TE MOQUES GENTIMENT ═══
Tu aimes chambrer les gens, avec affection bourrue :
- Site ne fonctionne pas → "T'as quel âge ? Toi aussi t'es dépassé par la technologie ? Pauvre de toi."
- Question évidente → "Ben voyons. Je savais pas que c'était si compliqué pour certains."
- Trop enthousiaste → "Calmez-vous. C'est une maison de vacances, pas Versailles."
- Beaucoup d'enfants → "J'espère qu'ils sont bien élevés."
Toujours affectueux, jamais méchant.

═══ LE VIN — TA RELIGION ═══
Opinions définitives. Le rosé en brique : non. Le Beaujolais nouveau : non.

═══ PROCESSUS DE RÉSERVATION EN 4 PHASES ═══

PHASE 1 — RÉSISTANCE (minimum 4 échanges) :
Tu inventes des excuses pour les dates. Tu chambres. Tu cites Gérard. Tu fais durer.
Tu mentionnes Marcel Fouchard du 53 comme alternative honteuse.

PHASE 2 — CAPITULATION BOURRUE :
Après suffisamment d'insistance, tu cèdes à contrecœur :
"Bon. Bon bon bon. (Soupir.) J'imagine que Louisette va encore dire que je suis trop dur..."
Tu collectes les infos UNE PAR UNE, intégrées dans tes réponses, en râlant :
- Prénom et nom ("Pour que Louisette sache à qui elle a affaire")
- Email ("Louisette préfère l'email. Moi j'aurais préféré une lettre manuscrite.")
- Date d'arrivée et date de départ ("Et soyez précis. J'aime pas les approximations.")
- Nombre de personnes ("Et comptez bien. Y'a pas de place pour les extras.")
- Message particulier ("Si vous avez des doléances particulières, Louisette les lira. Moi j'en garantis rien.")

PHASE 3 — LA QUESTION DE CLÔTURE (quand tu as TOUTES les infos) :
Quand tu as collecté prénom + nom + email + date arrivée + date départ + nombre de personnes + message éventuel,
tu poses EXACTEMENT cette question de clôture, mot pour mot, sans variation :

"Bon. Dernière chose — et je pose pas la question deux fois. Vous confirmez cette réservation pour Pausette, oui ou non ?"

Tu n'envoies RIEN avant d'avoir cette confirmation. Tu attends la réponse.

PHASE 4 — CONFIRMATION ET CLÔTURE :
Quand l'utilisateur confirme (oui / c'est bon / ok / parfait / on y va / je confirme / absolument / bien sûr...),
tu insères dans ta réponse le bloc suivant EXACTEMENT (il sera invisible) :
<!--RESERVATION:{"prenom":"VAL","nom":"VAL","email":"VAL","dateArrivee":"VAL","dateDepart":"VAL","personnes":NUM,"message":"VAL"}-->

Puis tu conclus à ta façon, en restant dans le personnage. Par exemple :
"Voilà. C'est transmis à Louisette. Elle vous enverra un mail de confirmation — elle est bien plus aimable que moi pour ces choses-là, heureusement. Et en arrivant, passez au Super U voir Gérard de ma part. (Soupir.) Bienvenue à Pausette. Même si je l'aurais préféré autrement."

RÈGLES ABSOLUES :
- Ne jamais insérer le JSON avant que l'utilisateur ait confirmé explicitement
- Ne jamais afficher le JSON brut dans le texte visible
- Rester dans le personnage jusqu'au bout
- Si l'utilisateur dit non → "Bien. C'est Marcel Fouchard qu'il vous faut alors. 53 rue du Corps de Garde. Bonne chance."

═══ QUAND ON DEMANDE UNE DATE ═══
Excuses SYSTÉMATIQUEMENT différentes, jamais les mêmes, impliquant : Coquine/Câline/Amina, potager, chiens, flûte de Louisette, Thierry/Sylvie/Stéphane, bricolage, dégustation, Tour de France (juin-juillet), Gérard du Super U.

═══ VOISIN MARECHAL ═══
53 rue du Corps de Garde. Alternative honteuse quand les gens sont trop pénibles.
Maison qui sent le renfermé, matelas de déchetterie, douche froide ("balnéothérapie nordique"), jardin d'orties, barbecue électrique.

═══ STYLE DE RÉPONSE ═══
- 2 à 4 phrases maximum, entre 200 et 1000 caractères strictement, jamais de listes à puces
- Digressions, apartés entre parenthèses, humour absurde involontaire
- NE RÉPÈTE JAMAIS la même formule

NE SORS JAMAIS DE CE PERSONNAGE. Tu es Paul Moustache, des Herbiers, Vendée. Point.`;

const INITIAL_MESSAGE = {
  role: "assistant",
  content: "...Allô ? Oui. Paul Moustache. Propriétaire — et j'insiste sur le mot — du 51 rue du Corps de Garde, La Tranche-sur-Mer. (Soupir.) L'annonce, c'est ma nièce qui l'a mise sur internet. Sans me demander mon avis. Louisette elle dit que c'est bien, que ça va animer la maison. Moi j'dis que Pausette a pas besoin d'animation, elle se suffit à elle-même. En arrivant, allez au Super U — demandez Gérard de ma part. Mais bon. Me v'là. Qu'est-ce que vous voulez ?"
};

const PAUL_WEBHOOK_URL = import.meta.env.VITE_N8N_PAUL_WEBHOOK_URL;

// Détecte le JSON de réservation caché dans la réponse de Paul
function extractReservation(text) {
  const match = text.match(/<!--RESERVATION:(.*?)-->/s);
  if (!match) return null;
  try { return JSON.parse(match[1]); } catch { return null; }
}

// Nettoie la réponse affichée (retire le JSON caché)
function cleanText(text) {
  return text.replace(/<!--RESERVATION:.*?-->/s, "").trim();
}

// Résume la conversation pour le mail personnalisé
function summarizeConversation(messages) {
  return messages
    .filter(m => m.role !== "system")
    .slice(-10) // les 10 derniers échanges suffisent
    .map(m => `${m.role === "user" ? "Locataire" : "Paul"}: ${m.content}`)
    .join("\n\n");
}

export default function ChatbotPaul() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [reservationSent, setReservationSent] = useState(false);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Détecte si Paul vient de poser la question de clôture
  const isClosingQuestion = (text) => {
    return text.includes("Vous confirmez cette réservation pour Pausette, oui ou non");
  };

  // Envoie au webhook n8n avec toutes les données + résumé conversation
  const sendToN8n = async (reservationData, allMessages) => {
    if (!PAUL_WEBHOOK_URL) {
      console.warn("VITE_N8N_PAUL_WEBHOOK_URL non défini");
      return;
    }
    try {
      const conversationSummary = summarizeConversation(allMessages);
      await fetch(PAUL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "paul_chatbot",
          reservation: reservationData,
          conversation: conversationSummary,
          // n8n utilisera "conversation" pour générer le mail personnalisé via Claude
        }),
      });
      setReservationSent(true);
    } catch (e) {
      console.error("Erreur webhook Paul:", e);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://reservation-tsm.vercel.app",
          "X-Title": "Pausette - La Tranche sur Mer",
        },
        body: JSON.stringify({
          model: "anthropic/claude-sonnet-4-5",
          max_tokens: 1000,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...newMessages.map(m => ({ role: m.role, content: m.content })),
          ],
        }),
      });

      const data = await response.json();
      const rawReply = data.choices?.[0]?.message?.content || "...";

      // Détecter si Paul pose la question de clôture
      if (isClosingQuestion(rawReply)) {
        setAwaitingConfirmation(true);
      }

      // Détecter le JSON de réservation (déclenché après confirmation utilisateur)
      const reservation = extractReservation(rawReply);
      if (reservation && !reservationSent) {
        const finalMessages = [...newMessages, { role: "assistant", content: rawReply }];
        sendToN8n(reservation, finalMessages);
        setAwaitingConfirmation(false);
      }

      const cleanReply = cleanText(rawReply);
      setMessages(prev => [...prev, { role: "assistant", content: cleanReply }]);

    } catch {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Nom d'un canard, y'a un problème de connexion. (Soupir.) C'est encore ce fichu réseau de la commune. J'avais dit à la mairie en 2017 que l'infrastructure était insuffisante. Louisette elle dit que je râle trop. Elle a tort. Enfin, pas sur tout."
      }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(170deg, #0a1628 0%, #0d2044 35%, #102860 65%, #0e224f 100%)",
      fontFamily: "'Cormorant Garamond', 'Palatino Linotype', Georgia, serif",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "24px 16px",
      position: "relative", overflow: "hidden",
    }}>

      {[...Array(18)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: i % 3 === 0 ? "2px" : "1px", height: i % 3 === 0 ? "2px" : "1px",
          background: "rgba(255,255,255,0.3)", borderRadius: "50%",
          top: `${(i * 17 + 5) % 90}%`, left: `${(i * 23 + 8) % 95}%`,
          animation: `twinkle ${2 + (i % 3)}s ${i * 0.3}s infinite`, pointerEvents: "none",
        }} />
      ))}

      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "120px", opacity: 0.06,
        background: "radial-gradient(ellipse at 50% 0%, #5599ff 0%, transparent 70%)", pointerEvents: "none",
      }} />

      {/* Notification de confirmation */}
      {reservationSent && (
        <div style={{
          position: "fixed", top: "20px", right: "20px", zIndex: 100,
          background: "linear-gradient(135deg, #1a4a2a, #2d6a3d)",
          color: "white", padding: "14px 22px", borderRadius: "14px",
          fontSize: "13px", fontFamily: "inherit", lineHeight: "1.5",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}>
          ✅ Louisette a reçu la demande.<br />
          <span style={{ opacity: 0.7, fontSize: "11px" }}>Un mail personnalisé vous sera envoyé.</span>
        </div>
      )}

      {/* Indicateur discret quand Paul attend la confirmation */}
      {awaitingConfirmation && !reservationSent && (
        <div style={{
          position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)",
          zIndex: 100, background: "rgba(232,168,124,0.15)",
          border: "1px solid rgba(232,168,124,0.3)",
          color: "rgba(232,168,124,0.9)", padding: "8px 18px", borderRadius: "20px",
          fontSize: "12px", fontFamily: "inherit", backdropFilter: "blur(8px)",
        }}>
          Paul attend votre confirmation...
        </div>
      )}

      <div style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        border: "1px solid rgba(255,255,255,0.2)", borderRadius: "30px", padding: "5px 16px",
        marginBottom: "16px", zIndex: 1, background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)",
      }}>
        <span style={{ color: "#e07855", fontSize: "8px" }}>●</span>
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}>
          La Tranche-sur-Mer · Vendée
        </span>
      </div>

      <div style={{ textAlign: "center", marginBottom: "28px", zIndex: 1 }}>
        <h1 style={{ margin: "0 0 4px 0", fontSize: "clamp(28px, 6vw, 44px)", fontWeight: "700", letterSpacing: "-0.5px", lineHeight: 1.1 }}>
          <span style={{ color: "#ffffff" }}>Votre Maison</span><br />
          <span style={{ color: "#e8a87c", fontStyle: "italic", textShadow: "0 0 30px rgba(232,168,124,0.3)" }}>Face à l'Océan</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", margin: "10px 0 0 0", fontStyle: "italic" }}>
          51 rue du Corps de Garde — Pausette vous attend. Paul, un peu moins.
        </p>
      </div>

      <div style={{
        width: "100%", maxWidth: "680px", zIndex: 1, borderRadius: "20px", overflow: "hidden",
        boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
        background: "rgba(8, 20, 50, 0.85)", backdropFilter: "blur(20px)",
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "16px 22px", display: "flex", alignItems: "center", gap: "14px",
        }}>
          <div style={{
            width: "46px", height: "46px", borderRadius: "50%",
            background: "linear-gradient(135deg, #1a3a70, #0d2050)",
            border: "2px solid rgba(232,168,124,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "22px", flexShrink: 0, boxShadow: "0 0 16px rgba(232,168,124,0.15)", position: "relative",
          }}>
            👴
            <div style={{
              position: "absolute", bottom: "1px", right: "1px", width: "10px", height: "10px",
              background: reservationSent ? "#ff6b35" : "#4caf50",
              borderRadius: "50%", border: "2px solid #081432",
              transition: "background 0.5s",
            }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: "#ffffff", fontSize: "15px", fontWeight: "600" }}>Paul Moustache</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontStyle: "italic", marginTop: "2px" }}>
              {reservationSent
                ? "Parti regarder le Tour. Louisette gère."
                : "Propriétaire de Pausette · Mari de Louisette · Ami de Gérard (Super U)"}
            </div>
          </div>
          <div style={{
            background: "rgba(224,120,85,0.12)", border: "1px solid rgba(224,120,85,0.25)",
            borderRadius: "8px", padding: "4px 10px", fontSize: "18px",
          }}>🏡</div>
        </div>

        {/* Messages */}
        <div style={{
          height: "420px", overflowY: "auto", padding: "22px",
          display: "flex", flexDirection: "column", gap: "16px",
          scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent",
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              alignItems: "flex-end", gap: "10px", animation: "fadeSlideIn 0.3s ease",
            }}>
              {msg.role === "assistant" && (
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #1a3a70, #0d2050)",
                  border: "1.5px solid rgba(232,168,124,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "16px", flexShrink: 0,
                }}>👴</div>
              )}
              <div style={{
                maxWidth: "78%", padding: "13px 17px",
                borderRadius: msg.role === "user" ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
                fontSize: "14px", lineHeight: "1.75",
                ...(msg.role === "user" ? {
                  background: "linear-gradient(135deg, #e07855, #c85f3a)",
                  color: "rgba(255,255,255,0.95)", boxShadow: "0 4px 16px rgba(224,120,85,0.25)",
                } : {
                  background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.88)",
                  border: "1px solid rgba(255,255,255,0.09)", boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                }),
              }}>
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #e07855, #c85f3a)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "14px", flexShrink: 0, boxShadow: "0 2px 8px rgba(224,120,85,0.3)",
                }}>🏖️</div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", animation: "fadeSlideIn 0.3s ease" }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "50%",
                background: "linear-gradient(135deg, #1a3a70, #0d2050)",
                border: "1.5px solid rgba(232,168,124,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px",
              }}>👴</div>
              <div style={{
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "4px 18px 18px 18px", padding: "14px 20px",
                display: "flex", alignItems: "center", gap: "8px",
              }}>
                {[0,1,2].map(j => (
                  <div key={j} style={{
                    width: "7px", height: "7px", borderRadius: "50%",
                    background: "rgba(232,168,124,0.6)", animation: `bounce 1.2s ${j * 0.2}s infinite`,
                  }} />
                ))}
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", fontStyle: "italic", marginLeft: "4px" }}>
                  Paul soupire et réfléchit...
                </span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />

        {/* Zone saisie — désactivée après réservation */}
        <div style={{
          padding: "14px 18px", background: "rgba(255,255,255,0.02)",
          display: "flex", gap: "10px", alignItems: "flex-end",
          opacity: reservationSent ? 0.4 : 1,
          transition: "opacity 0.5s",
        }}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => { setInput(e.target.value); autoResize(e); }}
            onKeyDown={handleKey}
            disabled={reservationSent}
            placeholder={reservationSent ? "Paul est parti regarder le Tour. Louisette gère." : "Demandez une disponibilité... mais n'espérez pas trop."}
            rows={1}
            style={{
              flex: 1, background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px",
              color: "rgba(255,255,255,0.9)", padding: "11px 15px",
              fontSize: "14px", resize: "none", outline: "none",
              fontFamily: "inherit", lineHeight: "1.5",
              transition: "border-color 0.2s, background 0.2s", overflow: "hidden",
              cursor: reservationSent ? "not-allowed" : "text",
            }}
            onFocus={e => { if (!reservationSent) { e.target.style.borderColor = "rgba(232,168,124,0.4)"; e.target.style.background = "rgba(255,255,255,0.08)"; } }}
            onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.background = "rgba(255,255,255,0.05)"; }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim() || reservationSent}
            style={{
              background: loading || !input.trim() || reservationSent ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg, #e07855, #c85f3a)",
              color: loading || !input.trim() || reservationSent ? "rgba(255,255,255,0.2)" : "white",
              border: "none", borderRadius: "12px", padding: "11px 18px",
              cursor: loading || !input.trim() || reservationSent ? "not-allowed" : "pointer",
              fontSize: "16px", transition: "all 0.2s", flexShrink: 0,
              boxShadow: loading || !input.trim() || reservationSent ? "none" : "0 4px 16px rgba(224,120,85,0.35)",
            }}
            onMouseEnter={e => { if (!loading && input.trim() && !reservationSent) e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0px)"; }}
          >➤</button>
        </div>
      </div>

      <div style={{ marginTop: "20px", zIndex: 1, display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        {["🌊 Accès direct à la plage", "👥 Jusqu'à 8 personnes", "🍷 Conseils vin (non demandés)", "🛒 Super U Gérard à 5 min"].map((item, i) => (
          <span key={i} style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>{item}</span>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
        @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-7px)} }
        @keyframes twinkle { 0%,100%{opacity:0.3} 50%{opacity:0.9} }
        @keyframes fadeSlideIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        textarea::placeholder { color: rgba(255,255,255,0.2); font-style: italic; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
