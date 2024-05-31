
import { AlarmClockOff, Clock3, ShieldHalf, ArrowDownNarrowWide, ArrowUpNarrowWide, LucideIcon } from "lucide-react";

interface IInfoCard {
    title:string;
    icon: LucideIcon;
    bodyText:string;
    id:number;
}

const infoCards: IInfoCard[] = [
    {
        title: "Binnen de Tijd",
        bodyText: "Onze projectgroep staat bekend om haar efficiëntie en vermogen om deadlines te halen. Dankzij een goed georganiseerd en gemotiveerd team plannen we effectief, stellen we prioriteiten en werken we samen om doelen op tijd te bereiken.",
        icon: Clock3,
        id: 1
    },
    {
        title: "Multidisciplinair Team",
        bodyText: "Met ons multidisciplinaire team kunnen we complexe uitdagingen aanpakken en innovatieve oplossingen creëren. Door verschillende disciplines te combineren, realiseren we synergie en buitengewone resultaten.",
        icon: ShieldHalf,
        id: 2
    },
    {
        title: "Sterke Communicatie",
        bodyText: "Heldere communicatie is de basis van ons succes. We waarderen open communicatie binnen ons team en met externe stakeholders. Effectieve communicatie helpt ons verwachtingen af te stemmen, problemen snel op te lossen en elkaar te ondersteunen, wat leidt tot een succesvol project.",
        icon: ArrowDownNarrowWide,
        id: 3
    },
]

export default infoCards