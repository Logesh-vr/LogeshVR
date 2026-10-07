export interface Profile {
    name: string;
    bio: string;
    email: string;
    portfolioUrl: string;
    links: {
        label: string;
        url: string;
    }[];
    interests: string[];
    skills: string[];
    languages: string[];
    hackathonWins: { name: string; national: boolean }[];
}
export interface Project {
    id: string;
    name: string;
    subtitle: string;
    category: string;
    repo: string;
    description: string;
    implementation: string;
    choices: string[];
    limitations: string;
    image?: string;
    caption?: string;
}
export interface ParkStop {
    id: string;
    label: string;
    eyebrow: string;
    exhibit: 'about' | 'planet' | 'fly' | 'dino' | 'bench' | 'parcel' | 'robots' | 'chain' | 'mail';
    progress: number;
    projectId?: string;
    color: string;
}
export const gardenName = 'Mein Garten';
export const profile: Profile = { name: 'Logesh Rajaraman', bio: 'A B.Tech Computer Science student. When something interests me, I go deep: from neural signals and tiny simulated brains to satellites overhead. I like challenging myself and seeing how far an idea can go.', email: 'logeshrv2006@gmail.com', portfolioUrl: 'https://logesh-vr.vercel.app/', links: [{ label: 'GitHub', url: 'https://github.com/Logesh-vr' }, { label: 'LinkedIn', url: 'https://www.linkedin.com/in/logesh-rajaraman-665798323/' }, { label: 'LeetCode', url: 'https://leetcode.com/u/Logesh4545/' }], languages: ['Tamil', 'English', 'German'], hackathonWins: [
    { name: 'DATASET’25', national: true },
    { name: 'Glitchcon 2.0 at VIT Chennai', national: true },
    { name: "SolvaThon26'", national: false },
    { name: 'ORIGINS', national: true },
], interests: ['Resistance training', 'Running & calisthenics', 'Music'], skills: ['React · TypeScript · JavaScript', 'Python · FastAPI · Node.js', 'Three.js · Simulation', 'SQL · PostgreSQL · Git', 'Neural networks · OpenCV · MediaPipe', 'NumPy · Pandas · Flutter'] };
export const projects: Project[] = [
    { id: 'space', name: 'VaanThuli', subtitle: 'A little window into the sky.', category: 'SPACE / VISUALIZATION', repo: 'VaanThuli', description: 'What is passing above us? A 3D space explorer makes satellite orbits and nearby space objects easier to explore.', implementation: 'Orbital elements are propagated with SGP4, served through Fastify, and visualized on an interactive Three.js globe with location-based filtering.', choices: ['SGP4 orbital propagation', 'React Three Fiber globe', 'Spatial filtering and layered caching'], limitations: 'Satellite positions are calculated from orbital data, not direct live measurements. Data availability depends on external providers.' },
    { id: 'fly', name: 'Virtual Fly Lab', subtitle: 'Neural signals become movement.', category: 'NEUROSCIENCE / SIMULATION', repo: 'fuitfly2', description: 'An interactive research prototype connecting a published fruit-fly spiking brain model to a simulated walking body.', implementation: 'Sensory encoding and motor decoding close the loop between the brain and physics world. A second fly runs with an independent brain and body.', choices: ['Python · Brian2', 'MuJoCo · FlyGym', 'Measured neural activity and browser controls'], limitations: 'Research prototype with engineered sensory and motor mappings; not validated fly behavior. The documented reference loop runs slower than real time.', image: 'https://raw.githubusercontent.com/Logesh-vr/fuitfly2/main/docs/images/fly-simulation.png', caption: 'Saved closed-loop experiment: the NeuroMechFly body in MuJoCo.' },
    { id: 'dino', name: 'EvoTheDino', subtitle: 'Every stumble teaches something.', category: 'EVOLUTION / MACHINE LEARNING', repo: 'EvoTheDino', description: 'A neural network learns actions in the Chrome Dino runner through generations of trial and error.', implementation: 'Candidate brains are evaluated in the runner. Selection, crossover, and mutation produce the next generation, while a visualizer exposes network activity.', choices: ['JavaScript neural network', 'Genetic algorithm and elitism', 'Chromium runner integration'], limitations: 'An experimental learning system. Outcomes vary between runs; there is no guaranteed champion or general-purpose game intelligence.' },
    { id: 'parcel', name: 'Emd', subtitle: 'The story inside a delivery.', category: 'DIGITAL TWIN / PHYSICS', repo: 'Emd', description: 'A software digital twin explores what happens to a parcel during transport and how motion relates to potential damage.', implementation: 'A physics simulation streams telemetry through FastAPI WebSockets to an interactive 3D dashboard, with feature extraction and damage assessment.', choices: ['20 Hz simulation loop', 'FastAPI · WebSockets', 'Physics-informed analytics'], limitations: 'Uses synthetic telemetry. Damage and liability estimates are simulation outputs, not validated real-world determinations.' },
    { id: 'finance', name: 'NexusFin', subtitle: 'Three perspectives. One bigger picture.', category: 'MULTI-AGENT / AI SYSTEMS', repo: 'HACKVERSE', description: 'A hackathon financial analysis application brings specialized agents together in a streaming workflow.', implementation: 'The interface shows agent progress and streamed results. The repository includes document research, data preparation, and a fine-tuning workflow.', choices: ['Next.js streaming interface', 'Document research with RAG', 'Local model experiment with cloud fallback'], limitations: 'Hackathon demo, not investment advice. Hosted inference may use a cloud fallback rather than the locally fine-tuned model.' },
    { id: 'chain', name: 'AgentChain', subtitle: 'Decisions you can look inside.', category: 'AGENTS / GOVERNANCE', repo: 'Defy', description: 'An exploration of explainable agent decisions, governance, and auditable activity in a decentralized application.', implementation: 'A React interface connects agent services, governance features, contracts, and policy checks to expose the decision-making process.', choices: ['React and contract integration', 'Decision and activity interfaces', 'Policy and risk-checking services'], limitations: 'Hackathon/demo implementation. Client-side policy checks do not establish production security or financial guarantees.', image: 'https://raw.githubusercontent.com/Logesh-vr/Defy/master/images/dashboard.png', caption: 'AgentChain dashboard image from the project repository.' }
];
export const stops: ParkStop[] = [
    { id: 'about', label: 'Meet Logesh', eyebrow: 'A LITTLE INTRODUCTION', exhibit: 'about', progress: .08, color: '#dbad76' },
    { id: 'space', label: 'VaanThuli', eyebrow: 'LOOK UP', exhibit: 'planet', progress: .17, projectId: 'space', color: '#739bba' },
    { id: 'fly', label: 'Virtual Fly Lab', eyebrow: 'THINK SMALL', exhibit: 'fly', progress: .27, projectId: 'fly', color: '#b59ccb' },
    { id: 'dino', label: 'EvoTheDino', eyebrow: 'LEARN BY DOING', exhibit: 'dino', progress: .37, projectId: 'dino', color: '#93ac78' },
    { id: 'interests', label: 'Beyond the keyboard', eyebrow: 'THE OTHER SIDE OF ME', exhibit: 'bench', progress: .47, color: '#d59678' },
    { id: 'parcel', label: 'Emd', eyebrow: 'FOLLOW THE JOURNEY', exhibit: 'parcel', progress: .57, projectId: 'parcel', color: '#d6b381' },
    { id: 'finance', label: 'NexusFin', eyebrow: 'CONNECT THE DOTS', exhibit: 'robots', progress: .67, projectId: 'finance', color: '#8caaa7' },
    { id: 'chain', label: 'AgentChain', eyebrow: 'BUILD WITH TRUST', exhibit: 'chain', progress: .77, projectId: 'chain', color: '#ab99c2' },
    { id: 'contact', label: 'Let’s make something', eyebrow: 'GOOD IDEAS START WITH HELLO', exhibit: 'mail', progress: .92, color: '#d89586' }
];
export function route(p: number): [
    number,
    number,
    number
] { if (p < .08)
    return [0, 0, 19.5 - (p / .08) * 11.3]; const a = ((p - .08) / .92) * Math.PI * 2; return [-Math.sin(a) * 8.2, 0, Math.cos(a) * 8.2]; }
export function exhibitPosition(p: number): [
    number,
    number,
    number
] { if (Math.abs(p-.08)<.001) return [2.65,0,10.8]; const v = route(p); const l = Math.hypot(v[0], v[2]); return [v[0] / l * 11.2, 0, v[2] / l * 11.2]; }
