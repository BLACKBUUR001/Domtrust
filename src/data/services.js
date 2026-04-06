import { Baby, SprayCan, HandHelping, Shield, Star, Smartphone, MapPin, CheckCircle, Clock, Users, Award, Heart } from 'lucide-react';

export const services = [
  {
    id: 'garde-enfant',
    name: "Garde d'enfant",
    icon: Baby,
    description: "Des nourrices et baby-sitters de confiance, sélectionnées avec soin pour le bien-être et la sécurité de vos enfants à domicile.",
    features: [
      "Garde à domicile (journée / soirée)",
      "Aide aux devoirs et accompagnement scolaire",
      "Activités ludiques et éducatives",
      "Nourrice diplômée et expérimentée"
    ],
    color: 'var(--amber)'
  },
  {
    id: 'nettoyage-maison',
    name: "Nettoyage de maison",
    icon: SprayCan,
    description: "Entretien régulier ou ponctuel de votre domicile par des professionnels vérifiés et formés aux meilleures pratiques d'hygiène.",
    features: [
      "Nettoyage complet du domicile",
      "Entretien des sols et surfaces",
      "Nettoyage de vitres et façades",
      "Désinfection et nettoyage en profondeur"
    ],
    color: 'var(--navy)'
  },
  {
    id: 'aide-domestique',
    name: "Aide domestique et ménagère",
    icon: HandHelping,
    description: "Un accompagnement quotidien pour l'entretien de votre foyer : repassage, lessive, courses, cuisine et organisation domestique.",
    features: [
      "Repassage et entretien du linge",
      "Préparation des repas quotidiens",
      "Courses et approvisionnement",
      "Organisation et rangement du foyer"
    ],
    color: 'var(--navy-mid)'
  }
];

export const testimonials = [
  {
    id: 1,
    text: "Enfin une solution qui répond à notre besoin de confiance. Trouver une aide domestique fiable à Dakar relevait du parcours du combattant.",
    author: "Fatou S.",
    location: "Almadies, Dakar",
    rating: 5,
    initial: "F"
  },
  {
    id: 2,
    text: "En tant que diaspora, je cherchais un prestataire de confiance pour la maison de ma famille. DomTrust m'a donné une tranquillité d'esprit totale.",
    author: "Moussa K.",
    location: "Diaspora · Paris",
    rating: 5,
    initial: "M"
  },
  {
    id: 3,
    text: "Le paiement mobile est un vrai plus. Simple, rapide, et je sais exactement à qui je fais confiance grâce aux avis vérifiés.",
    author: "Aminata D.",
    location: "Plateau, Dakar",
    rating: 4,
    initial: "A"
  }
];

export const howItWorksData = {
  client: {
    label: "Pour les Clients",
    steps: [
      {
        icon: MapPin,
        title: "Recherchez",
        description: "Trouvez le prestataire ou l'agence idéal(e) près de chez vous grâce à notre moteur de recherche intelligent."
      },
      {
        icon: CheckCircle,
        title: "Réservez",
        description: "Choisissez le créneau qui vous convient et réservez en quelques clics. Paiement mobile sécurisé et transparent."
      },
      {
        icon: Star,
        title: "Évaluez",
        description: "Après chaque prestation, notez et commentez pour aider la communauté à faire les meilleurs choix."
      }
    ]
  },
  prestataire: {
    label: "Pour les Prestataires",
    steps: [
      {
        icon: Users,
        title: "Inscrivez-vous",
        description: "Créez votre profil professionnel, ajoutez vos compétences et passez notre processus de vérification."
      },
      {
        icon: Clock,
        title: "Recevez des missions",
        description: "Soyez notifié dès qu'un client cherche vos services dans votre zone. Acceptez les missions qui vous conviennent."
      },
      {
        icon: Award,
        title: "Développez votre activité",
        description: "Collectez des avis positifs, gagnez en visibilité et augmentez vos revenus de manière régulière."
      }
    ]
  },
  agence: {
    label: "Pour les Agences",
    steps: [
      {
        icon: Shield,
        title: "Créez votre profil agence",
        description: "Enregistrez votre agence, ajoutez votre catalogue de services et vos prestataires certifiés."
      },
      {
        icon: Users,
        title: "Gérez vos équipes",
        description: "Tableau de bord dédié pour piloter vos prestataires, suivre les réservations et gérer la qualité."
      },
      {
        icon: Heart,
        title: "Augmentez votre visibilité",
        description: "Profitez du badge partenaire officiel DomTrust et d'un accès prioritaire aux demandes clients."
      }
    ]
  }
};

export const stats = [
  { value: "50%", label: "Citent la confiance comme priorité n°1" },
  { value: "42%", label: "Exigent des avis certifiés" }
];

export const teamMembers = [
  {
    id: 1,
    name: "Équipe Développement",
    role: "Tech & Produit",
    bio: "Formation Sonatel Academy — passionnés par la tech au service de l'Afrique. En charge de l'architecture plateforme, UX et développement mobile.",
    gradient: "linear-gradient(135deg, var(--navy), var(--navy-mid))"
  },
  {
    id: 2,
    name: "Équipe Opérations",
    role: "Terrain & Vérification",
    bio: "Responsable du processus de sélection et de vérification des prestataires. Garantit les standards de qualité et de confiance DomTrust.",
    gradient: "linear-gradient(135deg, var(--amber), #d4891a)"
  },
  {
    id: 3,
    name: "Équipe Marketing",
    role: "Croissance & Communication",
    bio: "Étude de marché, stratégie digitale et acquisition clients. S'appuie sur les données terrain pour construire une marque de confiance.",
    gradient: "linear-gradient(135deg, #1e3a6e, var(--navy))"
  }
];

export const coverageZones = [
  "Almadies", "Plateau", "Mermoz", "Sacré-Cœur", "Fann", "Point E", "Ngor", "Ouakam"
];
