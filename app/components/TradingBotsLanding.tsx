"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  CheckCircle,
  Cpu,
  LineChart as LineChartIcon,
  Shield,
  Zap,
  Bot,
  MessageCircle,
  Instagram,
  Mail,
  Lock,
  Headphones,
  Rocket,
  CreditCard,
} from "lucide-react";

type BotInfo = {
  name: string;
  description: string;
  pair: string;
  timeframe: string;
  riskProfile: string;
  price: number;
  isPopular?: boolean;
  isComingSoon?: boolean;
  profitRate?: number;
  includes?: string[];
};

type FAQItem = {
  question: string;
  answer: string;
};

const bots: BotInfo[] = [
  {
    name: "Bot Cruce de EMAs XAUUSD",
    description: "Estrategia basada en cruces de EMAs.",
    pair: "XAUUSD (Oro)",
    timeframe: "M5",
    riskProfile: "Riesgo medio, operativa frecuente",
    price: 200,
    isPopular: false,
    profitRate: 48,
    includes: ["Bot", "Soporte", "Actualizaciones"],
  },
  {
    name: "Bot Roturas de Máximos/Mínimos XAUUSD",
    description:
      "Estrategia de rotura del máximo y mínimo del día anterior en XAUUSD. Busca aprovechar impulsos fuertes en sesiones clave, con stops fijos y objetivos amplios.",
    pair: "XAUUSD (Oro)",
    timeframe: "M15",
    riskProfile: "Riesgo medio/alto, enfoque en movimientos explosivos",
    price: 200,
    isPopular: false,
    profitRate: 54,
    includes: ["Bot", "Soporte", "Actualizaciones"],
  },
  {
    name: "Pack Completo (2 Bots)",
    description:
      "Incluye ambos bots (Cruces de EMAs y Roturas) con todas las ventajas del pack completo.",
    pair: "XAUUSD (Oro)",
    timeframe: "M5 / M15",
    riskProfile: "Riesgo medio/alto, estrategia combinada",
    price: 350,
    isPopular: false,
    profitRate: 53,
    includes: ["2 Bots", "Soporte", "Actualizaciones", "Futuros cambios personalizados"],
  },
];

const faqs: FAQItem[] = [
  {
    question: "¿Qué necesito para usar un bot de trading?",
    answer:
      "Solo necesitas tres cosas: Una cuenta de MetaTrader 5 (MT5), un broker compatible, y un VPS o tener el ordenador encendido mientras opera. El bot funciona en automático las 24h siempre que MT5 esté activo.",
  },
  {
    question: "¿Los bots funcionan con cualquier broker?",
    answer:
      "Sí, mientras sea un broker compatible con MT5. Sin embargo, recomiendo brokers con spreads bajos, buen historial y ejecución rápida. Cuentas RAW/ECN si es posible. Si lo necesitas, te doy recomendaciones.",
  },
  {
    question: "¿Los bots garantizan ganancias?",
    answer:
      "No. Ningún sistema automatizado puede garantizar beneficios. Lo que sí puedo garantizar es: Backtests reales, estrategias sólidas, robots sin martingala, gestión de riesgo clara y resultados transparentes. El rendimiento depende del mercado, del broker y de tu configuración.",
  },
  {
    question: "¿Puedo modificar el lotaje, TP, SL o riesgo?",
    answer:
      "Sí. Todos los bots permiten ajustar: Lotaje, Stop Loss, Take Profit, Riesgo porcentual, Horario de operación y Filtros opcionales. Tú decides cómo quieres que opere.",
  },
  {
    question: "¿Incluye soporte después de comprar un bot?",
    answer:
      "Sí, siempre. Incluye: Instalación completa en tu MT5, configuración del bot, resolución de dudas y actualizaciones del bot si se mejora en el futuro. No incluye asesoría financiera.",
  },
  {
    question: "¿Cómo sé si un bot es adecuado para mí?",
    answer:
      "Depende de tu estilo: Breakout Master (Roturas) → Usuarios que quieren movimientos fuertes del oro. EMA Cross Pro → Operativa más suave y tendencial. Bot a medida → Si tienes una idea concreta o una estrategia personalizada. Si dudas, te asesoro gratis.",
  },
  {
    question: "¿Puedo usar varios bots en la misma cuenta?",
    answer:
      "Sí, siempre que: Usen diferentes magic numbers, no entren en conflicto, tengas suficiente margen y el riesgo esté bien gestionado. Si compras el pack, te dejo todo configurado.",
  },
  {
    question: "¿Qué pasa si dejo el bot funcionando y no estoy vigilándolo?",
    answer:
      "El bot opera solo, pero siempre recomiendo revisar al menos una vez al día: Conexión del VPS, estado del broker y movimiento del mercado. Los bots no requieren supervisión constante, pero el trading nunca es 100% pasivo.",
  },
  {
    question: "¿Puedo ver un backtest antes de comprar?",
    answer:
      "Sí, claro. Te paso: Resultados reales, curvas de equity, historial de operaciones y métricas completas. 100% transparencia.",
  },
  {
    question: "¿Qué incluye un bot creado a medida?",
    answer:
      "Incluye: Programación completa según tus reglas, pruebas iniciales, optimización básica, ajustes iniciales tras la entrega y soporte técnico. No incluye: Cambios ilimitados ni nuevas estrategias no acordadas inicialmente.",
  },
  {
    question: "¿Puedo pedir un reembolso si el bot no cumple mis expectativas?",
    answer:
      "No. Los bots son productos digitales que no se pueden devolver. Antes de comprar, puedes pedir: Explicación técnica, backtests, demostración y dudas que tengas. Quiero que compres con total seguridad.",
  },
  {
    question: "¿Es seguro operar con bots en Oro (XAUUSD)?",
    answer:
      "Sí, siempre que: Uses un broker fiable, no sobreexpongas tu saldo, uses lotajes adecuados y tengas configurado SL/TP. Los bots están diseñados específicamente para operar oro.",
  },
];

const equityData = [
  { name: "May", balance: 100000 },
  { name: "Jun", balance: 108500 },
  { name: "Jul", balance: 118200 },
  { name: "Ago", balance: 122500 },
  { name: "Sep", balance: 126800 },
  { name: "Oct", balance: 132000 },
  { name: "Nov", balance: 135352.48 },
];

// Datos reales con altibajos más realistas
const mt5EquityData = [
  { name: "May", balance: 100000 },
  { name: "May", balance: 101772.5 },
  { name: "May", balance: 101239.95 },
  { name: "May", balance: 100709.74 },
  { name: "May", balance: 101919.97 },
  { name: "May", balance: 103672.7 },
  { name: "May", balance: 103145.44 },
  { name: "May", balance: 104900.92 },
  { name: "May", balance: 104374.23 },
  { name: "May", balance: 106138.83 },
  { name: "May", balance: 105609.48 },
  { name: "May", balance: 105078.92 },
  { name: "May", balance: 105164.65 },
  { name: "May", balance: 104770.6 },
  { name: "May", balance: 103211.81 },
  { name: "Jun", balance: 102683.64 },
  { name: "Jun", balance: 104626.01 },
  { name: "Jun", balance: 104098.9 },
  { name: "Jun", balance: 103571.79 },
  { name: "Jun", balance: 103043.64 },
  { name: "Jun", balance: 102515.49 },
  { name: "Jun", balance: 104266.77 },
  { name: "Jun", balance: 104041.61 },
  { name: "Jun", balance: 102672.61 },
  { name: "Jun", balance: 102144.96 },
  { name: "Jun", balance: 101616.31 },
  { name: "Jun", balance: 101091.66 },
  { name: "Jun", balance: 100565.77 },
  { name: "Jun", balance: 102477.48 },
  { name: "Jun", balance: 104951.33 },
  { name: "Jun", balance: 104425.26 },
  { name: "Jun", balance: 106178.42 },
  { name: "Jun", balance: 107500 },
  { name: "Jul", balance: 106991.19 },
  { name: "Jul", balance: 106478.19 },
  { name: "Jul", balance: 105914.39 },
  { name: "Jul", balance: 107619.73 },
  { name: "Jul", balance: 108100.73 },
  { name: "Jul", balance: 109194.7 },
  { name: "Jul", balance: 110098.66 },
  { name: "Jul", balance: 111810.68 },
  { name: "Jul", balance: 112800 },
  { name: "Ago", balance: 113550.49 },
  { name: "Ago", balance: 115280.19 },
  { name: "Ago", balance: 116994.53 },
  { name: "Ago", balance: 118200 },
  { name: "Sep", balance: 119236.74 },
  { name: "Sep", balance: 120954.16 },
  { name: "Sep", balance: 122664.45 },
  { name: "Sep", balance: 124988.77 },
  { name: "Sep", balance: 125775.84 },
  { name: "Sep", balance: 125400 },
  { name: "Oct", balance: 123521.5 },
  { name: "Oct", balance: 123506.6 },
  { name: "Oct", balance: 122994.96 },
  { name: "Oct", balance: 123581.79 },
  { name: "Oct", balance: 123069.17 },
  { name: "Oct", balance: 119369.26 },
  { name: "Oct", balance: 125204.89 },
  { name: "Oct", balance: 127512.23 },
  { name: "Oct", balance: 131374.45 },
  { name: "Oct", balance: 130858.27 },
  { name: "Oct", balance: 130342.48 },
  { name: "Oct", balance: 136828.07 },
  { name: "Oct", balance: 136315.65 },
  { name: "Oct", balance: 129682.76 },
  { name: "Oct", balance: 131200 },
  { name: "Nov", balance: 130161.55 },
  { name: "Nov", balance: 129642.86 },
  { name: "Nov", balance: 126022.72 },
  { name: "Nov", balance: 125502.06 },
  { name: "Nov", balance: 124973.25 },
  { name: "Nov", balance: 126713.35 },
  { name: "Nov", balance: 125514.23 },
  { name: "Nov", balance: 125714.18 },
  { name: "Nov", balance: 125800.14 },
  { name: "Nov", balance: 127265.12 },
  { name: "Nov", balance: 127829.62 },
  { name: "Nov", balance: 129897.61 },
  { name: "Nov", balance: 129813.78 },
  { name: "Nov", balance: 128318.87 },
  { name: "Nov", balance: 127803.4 },
  { name: "Nov", balance: 129522.32 },
  { name: "Nov", balance: 135352.48 },
];

export default function TradingBotsLanding() {
  const [selectedBot, setSelectedBot] = useState<BotInfo | null>(bots[1]);
  const [showLegal, setShowLegal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* NAVBAR */}
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Bot className="h-7 w-7 text-amber-400" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-amber-300/80">
                desarrollatubot
              </p>
              <h1 className="text-sm font-semibold text-slate-50">
                desarrollatubot
              </h1>
            </div>
          </div>
          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            <a href="#bots" className="hover:text-amber-300">
              Bots disponibles
            </a>
            <a href="#metrics" className="hover:text-amber-300">
              Rendimiento
            </a>
            <a href="#results" className="hover:text-amber-300">
              Resultados
            </a>
            <a href="#faq" className="hover:text-amber-300">
              FAQ
            </a>
            <a href="#contacto" className="hover:text-amber-300">
              Contacto
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10">
        {/* HERO */}
        <section className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
              XAUUSD · SISTEMAS ALGORÍTMICOS
            </p>
            <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-50 md:text-4xl">
              Automatiza tu operativa en <span className="text-amber-400">oro</span>{" "}
              con bots reales, probados en cuenta.
            </h2>
            <p className="mb-4 text-sm text-slate-300 md:text-base">
              Bots diseñados para operar XAUUSD de forma disciplinada, con reglas
              claras y gestión de riesgo definida. Sin emociones, sin improvisar.
              Tú decides el riesgo, el bot ejecuta el plan.
            </p>

            {/* Iconos de certificados */}
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="flex flex-col items-center gap-1 rounded-xl bg-slate-900/60 p-3 text-center">
                <Lock className="h-5 w-5 text-emerald-400" />
                <p className="text-[10px] font-semibold text-slate-200">SSL SECURED</p>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-xl bg-slate-900/60 p-3 text-center">
                <Headphones className="h-5 w-5 text-amber-400" />
                <p className="text-[10px] font-semibold text-slate-200">SOPORTE INCLUIDO</p>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-xl bg-slate-900/60 p-3 text-center">
                <Rocket className="h-5 w-5 text-blue-400" />
                <p className="text-[10px] font-semibold text-slate-200">ENTREGA INMEDIATA</p>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-xl bg-slate-900/60 p-3 text-center">
                <CreditCard className="h-5 w-5 text-purple-400" />
                <p className="text-[10px] font-semibold text-slate-200">PAGO SEGURO</p>
              </div>
            </div>

            <div className="mb-6 grid gap-4 text-xs text-slate-200 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl bg-slate-900/60 p-3">
                <Cpu className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-300" />
                <div>
                  <p className="font-semibold text-slate-50">Bots probados</p>
                  <p className="text-[11px] text-slate-300">
                    Estrategias basadas en cruces de EMAs y roturas de máximos/mínimos
                    del día anterior en XAUUSD.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-slate-900/60 p-3">
                <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-300" />
                <div>
                  <p className="font-semibold text-slate-50">Gestión de riesgo</p>
                  <p className="text-[11px] text-slate-300">
                    Stop loss y objetivos definidos; tú controlas el lotaje y el
                    capital arriesgado para dormir tranquilo.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-slate-900/60 p-3">
                <LineChartIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-300" />
                <div>
                  <p className="font-semibold text-slate-50">Métricas visibles</p>
                  <p className="text-[11px] text-slate-300">
                    Historial exportado de MetaTrader 5 para que veas la curva y
                    números clave de la estrategia.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-slate-900/60 p-3">
                <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-300" />
                <div>
                  <p className="font-semibold text-slate-50">Despliegue sencillo</p>
                  <p className="text-[11px] text-slate-300">
                    Te acompaño paso a paso para instalar el bot en MT5 y dejarlo
                    corriendo en tu VPS o PC.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#bots"
                className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-300"
              >
                Ver bots disponibles
              </a>
              <a
                href="#custom-bot"
                className="text-sm font-medium text-slate-200 underline-offset-4 hover:text-amber-300 hover:underline"
              >
                Quiero un bot a medida
              </a>
            </div>

            <p className="mt-4 text-[11px] text-slate-400">
              *El trading conlleva riesgo. No se garantizan resultados y nunca
              debes arriesgar dinero que no puedas permitirte perder.
            </p>
          </div>

          {/* LADO DERECHO HERO: RESUMEN DE RESULTADOS */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl">
            <h3 className="mb-1 text-sm font-semibold text-slate-50">
              Rendimiento real (backtest combinando bots de EMAs y Roturas)
            </h3>
            <p className="mb-4 text-[11px] text-slate-400">
              Datos extraídos de historial de MetaTrader 5 sobre XAUUSD en 2025.
              Resultados orientativos, no garantizados.
            </p>

            <div className="mb-4 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-slate-950/70 p-3">
                <p className="text-[11px] text-slate-400">Beneficio neto aprox.</p>
                <p className="text-base font-semibold text-emerald-400">
                  +35 352&nbsp;$
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Combinando bots de EMAs y Roturas en XAUUSD.
                </p>
              </div>
              <div className="rounded-xl bg-slate-950/70 p-3">
                <p className="text-[11px] text-slate-400">Ratio beneficio</p>
                <p className="text-base font-semibold text-amber-300">53%</p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Rendimiento combinado de ambos bots.
                </p>
              </div>
              <div className="rounded-xl bg-slate-950/70 p-3">
                <p className="text-[11px] text-slate-400">Operaciones totales</p>
                <p className="text-base font-semibold text-slate-50">278</p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Gestión del riesgo clave para aguantar la estrategia.
                </p>
              </div>
              <div className="rounded-xl bg-slate-950/70 p-3">
                <p className="text-[11px] text-slate-400">Máx. Drawdown</p>
                <p className="text-base font-semibold text-rose-400">≈ 13.6%</p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Racha negativa máxima medida sobre el equity.
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-slate-950/80 p-3">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.17em] text-slate-400">
                Highlights
              </p>
              <ul className="space-y-1 text-[11px] text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-3.5 w-3.5 text-emerald-400" />
                  <span>
                    Curva de equity creciente con rachas de pérdidas controladas.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-3.5 w-3.5 text-emerald-400" />
                  <span>
                    Estrategia pensada para cuentas que buscan crecimiento
                    progresivo, no hacerse rico de un día para otro.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-3.5 w-3.5 text-emerald-400" />
                  <span>
                    Te enseño el historial completo para que veas la realidad,
                    con sus rachas buenas y malas.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECCIÓN RESULTADOS DE LOS BOTS */}
        <section id="metrics" className="mt-16">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-50">
                  Resultados de los Bots
                </h3>
                <p className="text-[11px] text-slate-400">
                  Curva de equity de los resultados combinados de los bots de EMAs y Roturas operando XAUUSD. 
                  Evolución del balance desde mayo 2025 hasta noviembre 2025.
                </p>
              </div>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
                Resultados reales
              </span>
            </div>

            {/* Gráfico de área con resultados de los bots */}
            <div className="h-64 w-full rounded-xl bg-slate-950/70 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={equityData}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                      <stop offset="50%" stopColor="#22c55e" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    stroke="#94a3b8" 
                    fontSize={11}
                    tick={{ fill: '#cbd5e1' }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    tick={{ fill: '#cbd5e1' }}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k $`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      fontSize: 12,
                    }}
                    formatter={(value: number) => [`${value.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $`, "Balance"]}
                    labelStyle={{ color: '#e2e8f0', fontWeight: 'bold' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="#22c55e"
                    strokeWidth={3}
                    fill="url(#colorBalance)"
                    dot={false}
                    activeDot={{ r: 5, fill: '#22c55e', stroke: '#fff', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                <span>Balance inicial: <span className="font-semibold text-emerald-400">100,000 $</span></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                <span>Balance final: <span className="font-semibold text-emerald-400">135,352.48 $</span></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                <span>Beneficio: <span className="font-semibold text-emerald-400">+35,352.48 $</span></span>
              </div>
            </div>
          </div>
        </section>

        {/* Gráfico MT5 con datos reales y altibajos */}
        <section className="mt-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="mb-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.17em] text-slate-400">
                Resultados cuenta MT5 (datos reales)
              </p>
              <p className="text-[11px] text-slate-400">
                Curva de equity real procesada del historial de trading MT5. Período: Mayo 2025 - Noviembre 2025. 
                Balance inicial: 100,000 $ | Balance final: 135,352.48 $. Se muestran los altibajos reales de la cuenta.
              </p>
            </div>
            <div className="h-64 w-full rounded-xl bg-slate-950/70 p-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mt5EquityData}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#94a3b8" 
                    fontSize={9}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={10}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#020617",
                      border: "1px solid #1e293b",
                      fontSize: 11,
                    }}
                    formatter={(value: number) => [`${value.toFixed(2)} $`, "Balance"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* SECCIÓN RESULTADOS (VIDEO) */}
        <section id="results" className="mt-16">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="mb-4 text-sm font-semibold text-slate-50">
              Video de Resultados Reales
            </h3>
            <p className="mb-6 text-[11px] text-slate-400">
              Resultados reales de trading en cuenta MT5. Video demostrativo del historial de operaciones.
            </p>
            
            {/* Video de YouTube */}
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-slate-950/50">
              <iframe 
                className="h-full w-full"
                src="https://www.youtube.com/embed/gr23VDSh1Wg"
                title="Resultados Trading MT5"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        {/* BOTS DISPONIBLES */}
        <section id="bots" className="mt-16">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                Bots disponibles
              </p>
              <h3 className="text-xl font-bold text-slate-50 md:text-2xl">
                Elige cómo quieres que tu bot opere el oro.
              </h3>
              <p className="mt-1 text-sm text-slate-300">
                Actualmente tengo 2 bots listos para usar en XAUUSD, y un pack completo
                que incluye ambos con ventajas adicionales. También puedo crear tu bot desde cero
                si tienes una idea clara de estrategia.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {bots.map((bot) => {
              const isSelected = selectedBot?.name === bot.name;
              return (
                <div
                  key={bot.name}
                  className={`flex flex-col rounded-2xl border bg-slate-900/60 p-4 transition
                    ${
                      bot.isComingSoon
                        ? "border-slate-700/60"
                        : isSelected
                        ? "border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.25)]"
                        : "border-slate-800"
                    }`}
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold text-slate-50">
                      {bot.name}
                    </h4>
                    {bot.isPopular && (
                      <span className="rounded-full bg-amber-400/10 px-2 py-1 text-[10px] font-semibold text-amber-300">
                        Más utilizado
                      </span>
                    )}
                    {bot.isComingSoon && (
                      <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] text-slate-300">
                        Próximamente
                      </span>
                    )}
                  </div>

                  <p className="mb-3 text-xs text-slate-300">{bot.description}</p>

                  <div className="mb-3 space-y-1.5 text-[11px] text-slate-300">
                    <p>
                      <span className="font-semibold text-slate-200">Par:</span>{" "}
                      {bot.pair}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-200">Timeframe:</span>{" "}
                      {bot.timeframe}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-200">Perfil:</span>{" "}
                      {bot.riskProfile}
                    </p>
                    {bot.profitRate !== undefined && (
                      <p>
                        <span className="font-semibold text-slate-200">
                          Ratio beneficio:
                        </span>{" "}
                        {bot.profitRate}%
                      </p>
                    )}
                    {bot.includes && (
                      <div className="mt-2 rounded-lg bg-slate-950/50 p-2">
                        <p className="mb-1 text-[10px] font-semibold text-slate-200">
                          Incluye:
                        </p>
                        <ul className="space-y-0.5 text-[10px] text-slate-300">
                          {bot.includes.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3 text-emerald-400" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {!bot.isComingSoon && (
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div>
                        <p className="text-[11px] text-slate-400">
                          Precio por licencia
                        </p>
                        <p className="text-lg font-bold text-emerald-400">
                          {bot.price.toFixed(0)} €
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedBot(bot)}
                        className="rounded-full bg-amber-400 px-3 py-1.5 text-[11px] font-semibold text-slate-950 hover:bg-amber-300"
                      >
                        Me interesa
                      </button>
                    </div>
                  )}

                  {bot.isComingSoon && (
                    <p className="mt-4 text-[11px] text-slate-400">
                      Aún en desarrollo. Si quieres que te avise cuando esté listo,
                      escríbeme por email o Instagram.
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {selectedBot && (
            <div className="mt-8 rounded-2xl border border-emerald-500/40 bg-emerald-500/5 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                Has seleccionado
              </p>
              <div className="mt-1 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-50">
                    {selectedBot.name}
                  </p>
                  <p className="text-xs text-slate-300">
                    {selectedBot.pair} · {selectedBot.timeframe} ·{" "}
                    {selectedBot.riskProfile}
                  </p>
                  {selectedBot.profitRate !== undefined && (
                    <p className="mt-1 text-xs text-slate-300">
                      Ratio beneficio estimado:{" "}
                      <span className="font-semibold text-emerald-400">
                        {selectedBot.profitRate}%
                      </span>
                    </p>
                  )}
                </div>
                <div className="text-xs text-slate-200">
                  <p>
                    Precio:{" "}
                    <span className="font-semibold text-emerald-400">
                      {selectedBot.price.toFixed(0)} €
                    </span>
                  </p>
                </div>
                <a
                  href="#contacto"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-1.5 text-[11px] font-semibold text-slate-950 hover:bg-emerald-400"
                >
                  Quiero info / comprar
                </a>
              </div>
            </div>
          )}
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-16">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                Preguntas Frecuentes
              </p>
              <h3 className="mt-1 text-xl font-bold text-slate-50 md:text-2xl">
                Resuelve tus dudas
              </h3>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-800 bg-slate-950/50 p-4"
                >
                  <p className="mb-2 text-sm font-semibold text-slate-50">
                    {faq.question}
                  </p>
                  <p className="text-xs text-slate-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TÉRMINOS Y CONDICIONES */}
        <section id="terminos" className="mt-16">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                  Términos y Condiciones
                </p>
                <h3 className="mt-1 text-xl font-bold text-slate-50 md:text-2xl">
                  Información Legal
                </h3>
              </div>
              <button
                onClick={() => setShowLegal(!showLegal)}
                className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
              >
                {showLegal ? "Ocultar" : "Ver términos"}
              </button>
            </div>

            {showLegal && (
              <div className="space-y-6 text-sm text-slate-300">
                <div>
                  <h4 className="mb-2 text-base font-semibold text-slate-50">
                    1. Introducción
                  </h4>
                  <p className="text-xs leading-relaxed">
                    Los presentes Términos y Condiciones regulan el acceso y uso de los bots de trading ofrecidos por desarrollatubot, así como de cualquier servicio asociado, incluyendo instalación, soporte y creación de bots personalizados. Al adquirir un bot o utilizar alguno de los servicios, el usuario acepta íntegramente estas condiciones.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 text-base font-semibold text-slate-50">
                    2. Naturaleza del Producto
                  </h4>
                  <p className="mb-2 text-xs leading-relaxed">
                    Los bots ofrecidos son herramientas automatizadas de trading programadas para operar bajo una estrategia predefinida. Se entregan en formato digital (archivo .ex5 o .mq5) y están diseñados para su uso en MetaTrader 5.
                  </p>
                  <p className="text-xs leading-relaxed">
                    Los bots incluyen: Lógica de entrada y salida automatizada, configuraciones editables, parámetros de gestión de riesgo y soporte básico postventa.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 text-base font-semibold text-slate-50">
                    3. Riesgos del Trading Automatizado
                  </h4>
                  <p className="mb-2 text-xs leading-relaxed">
                    El trading en mercados financieros implica riesgos significativos. Aunque se realizan pruebas y backtests extensos, no se garantiza ninguna rentabilidad futura.
                  </p>
                  <p className="text-xs leading-relaxed">
                    El usuario reconoce que: Los resultados pasados no aseguran resultados futuros, las condiciones de mercado pueden variar, el mal uso del bot o una mala gestión del riesgo pueden generar pérdidas, y el comportamiento del bot depende del broker, spreads, VPS, latencia, volatilidad y otros factores externos.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 text-base font-semibold text-slate-50">
                    4. Responsabilidad del Usuario
                  </h4>
                  <p className="text-xs leading-relaxed">
                    El usuario es responsable de: Configurar correctamente los parámetros del bot, elegir un broker confiable, supervisar su cuenta de trading, adaptar el lotaje y riesgo según su capital, y mantener un VPS o dispositivo operativo en caso de usar trading automatizado. desarrollatubot no se responsabiliza por pérdidas económicas, fallos en el servidor, mala configuración o uso inapropiado del bot.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 text-base font-semibold text-slate-50">
                    5. Actualizaciones y Soporte
                  </h4>
                  <p className="mb-2 text-xs leading-relaxed">
                    La compra de un bot incluye: Soporte para instalación inicial, resolución de dudas técnicas básicas y actualizaciones futuras relacionadas con mejoras del bot.
                  </p>
                  <p className="text-xs leading-relaxed">
                    No incluye: Cambios personalizados complejos, reforma completa de estrategia ni asesoría financiera o de inversión.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 text-base font-semibold text-slate-50">
                    6. Política de Reembolsos
                  </h4>
                  <p className="text-xs leading-relaxed">
                    Debido a la naturaleza digital del producto, NO se ofrecen reembolsos una vez entregado el bot. El usuario comprende que no es posible "devolver" un archivo digital y que una vez recibido el bot, la compra se considera completada y definitiva.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 text-base font-semibold text-slate-50">
                    7. Propiedad Intelectual
                  </h4>
                  <p className="mb-2 text-xs leading-relaxed">
                    Todos los bots, códigos fuente, estrategias automatizadas, archivos y diseños pertenecen a desarrollatubot.
                  </p>
                  <p className="text-xs leading-relaxed">
                    No está permitido: Revender los bots, copiar o distribuir el código, reprogramar o modificar el bot sin permiso, publicar el bot en internet ni compartirlo con terceros.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 text-base font-semibold text-slate-50">
                    8. Creación de Bots Personalizados
                  </h4>
                  <p className="mb-2 text-xs leading-relaxed">
                    El usuario proporciona la idea, estrategia o requisitos. El servicio incluye: Programación del bot, pruebas iniciales, un número limitado de ajustes bajo acuerdo y entrega del bot en formato .ex5/.mq5.
                  </p>
                  <p className="text-xs leading-relaxed">
                    No incluye: Rentabilidad garantizada, modificaciones ilimitadas ni coaching financiero.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 text-base font-semibold text-slate-50">
                    9. Limitación de Responsabilidad
                  </h4>
                  <p className="text-xs leading-relaxed">
                    En ningún caso desarrollatubot será responsable por: Pérdidas económicas, fallos técnicos propios del broker o plataforma, problemas del VPS, caída de servidores o ejecutar operaciones inesperadas debido a condiciones de mercado extremas. El usuario opera bajo su propia responsabilidad.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 text-base font-semibold text-slate-50">
                    10. Aceptación de los Términos
                  </h4>
                  <p className="text-xs leading-relaxed">
                    Al comprar un bot, solicitar un servicio o utilizar esta página web, el usuario confirma haber leído, entendido y aceptado estos Términos y Condiciones en su totalidad.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="mt-16">
          <div className="grid gap-8 md:grid-cols-[1.4fr,1fr] md:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                Contacto
              </p>
              <h3 className="mt-1 text-xl font-bold text-slate-50 md:text-2xl">
                ¿Quieres más info, ver el historial completo o encargar tu bot?
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Escríbeme y te respondo lo antes posible. Cuéntame qué bot te
                interesa (EMAs, Roturas, bot a medida…) y en qué situación estás
                (tamaño de cuenta, experiencia, etc.).
              </p>

              <div className="mt-4 space-y-2 text-sm text-slate-200">
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-amber-300" />
                  <span>
                    Email:{" "}
                    <a
                      href="mailto:desarrollatubot@hotmail.com"
                      className="font-semibold text-amber-300 hover:underline"
                    >
                      desarrollatubot@hotmail.com
                    </a>
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-amber-300" />
                  <span>
                    Instagram:{" "}
                    <a
                      href="https://www.instagram.com/desarrollatubot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-amber-300 hover:underline"
                    >
                      @desarrollatubot
                    </a>
                  </span>
                </p>
              </div>

              <p className="mt-4 text-[11px] text-slate-400">
                De momento solo atiendo consultas por email o Instagram. No hay
                registro ni área privada, te respondo personalmente por esos
                canales.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-50">
                <MessageCircle className="h-4 w-4 text-amber-300" />
                Atención por email o Instagram
              </p>
              <p className="text-sm text-slate-200">
                El formulario web está desactivado. Si quieres más detalles, ver
                resultados completos o pedir un bot a medida, escríbeme directamente
                a{" "}
                <span className="font-semibold text-amber-300">
                  desarrollatubot@hotmail.com
                </span>{" "}
                o por{" "}
                <span className="font-semibold text-amber-300">
                  Instagram @desarrollatubot
                </span>
                , y te responderé lo antes posible.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950/90 py-4">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 text-[11px] text-slate-400 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} desarrollatubot. Todos los
            derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="#terminos" className="hover:opacity-80">
              Términos
            </a>
            <a href="#faq" className="hover:opacity-80">
              FAQ
            </a>
            <a href="#terminos" className="hover:opacity-80">
              Riesgo
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}