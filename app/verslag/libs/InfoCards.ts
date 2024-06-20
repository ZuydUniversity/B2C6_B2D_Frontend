
import { AlarmClockOff, Clock3, ShieldHalf, Speech, ArrowDownNarrowWide, ArrowUpNarrowWide, LucideIcon } from "lucide-react";

interface IInfoCard {
    title:string;
    icon: LucideIcon;
    bodyText:string;
    id:number;
}

const infoCards: IInfoCard[] = [
    {
        title: "Binnen de Tijd",
        bodyText: "Onze projectgroep staat bekend om haar efficiëntie en vermogen om deadlines te halen. Dankzij een goed georganiseerd en gemotiveerd team plannen we effectiefen werken we samen om doelen op tijd te bereiken.",
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
        bodyText: "Communicatie is de basis van ons succes. We waarderen open communicatie binnen ons team en met  stakeholders. Effectieve communicatie helpt ons verwachtingen af te stemmen en problemen snel op te lossen, wat leidt tot een succesvol project.",
        icon: Speech,
        id: 3
    },
]

export default infoCards