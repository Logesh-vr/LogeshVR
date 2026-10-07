import { Component, lazy, Suspense, useEffect, useRef, useState, useCallback, type ReactNode } from 'react';
import { ArrowUpRight, ArrowDown, Map, X, RotateCcw, Mail, Copy, Check, BookOpen, ChevronRight, Leaf, Github } from 'lucide-react';
import { gardenName, profile, projects, stops, type ParkStop } from './data';
const World = lazy(() => import('./World'));
class Boundary extends Component<{
    children: ReactNode;
    fallback: ReactNode;
    onFailure: () => void;
}, {
    failed: boolean;
}> {
    state = { failed: false };
    static getDerivedStateFromError() { return { failed: true }; }
    componentDidCatch() { this.props.onFailure(); }
    render() { return this.state.failed ? this.props.fallback : this.props.children; }
}
function supportsGL() { try {
    return !!document.createElement('canvas').getContext('webgl2');
}
catch {
    return false;
} }
function Content({ stop }: {
    stop: ParkStop;
}) {
    const [copied, setCopied] = useState(false);
    const [imageError, setImageError] = useState(false);
    const p = projects.find(p => p.id === stop.projectId);
    useEffect(() => setImageError(false), [stop.id]);
    if (p)
        return <><span className="tag">{p.category}</span><h2>{p.name}</h2><p className="subtitle">{p.subtitle}</p><p>{p.description}</p><div className="detail-section"><h3>How I built it</h3><p>{p.implementation}</p><ul className="chips">{p.choices.map(c => <li key={c}>{c}</li>)}</ul></div>{p.image && !imageError && <figure><img src={p.image} alt={p.caption} onError={() => setImageError(true)} loading="lazy"/><figcaption>{p.caption}</figcaption></figure>}<div className="note"><b>Current limits</b><p>{p.limitations}</p></div><a className="primary" href={`https://github.com/Logesh-vr/${p.repo}`} target="_blank" rel="noreferrer"><Github size={17}/> Explore the repository <ArrowUpRight size={16}/></a><small className="footnote">The park animation is a playful illustration of this project.</small></>;
    if (stop.id === 'about')
        return <><span className="tag">ABOUT ME</span><h2>Hey, I’m Logesh.</h2><p className="subtitle">Computer science student. Building and learning.</p><p>{profile.bio}</p><div className="detail-section"><h3>A little about my world</h3><p>New things excite me. That might be a project, a new way of moving my body, music, or something I haven’t explored yet.</p><p>I’m still learning to stay with projects when the initial excitement fades. This park is a collection of the experiments that stayed with me.</p></div><span className="chips"><span>B.Tech Computer Science</span><span>Builder & experimenter</span></span><div className="detail-section"><h3>Hackathon wins</h3><p>{profile.hackathonWins.length} wins · {profile.hackathonWins.filter(win => win.national).length} at national level</p><ul className="list">{profile.hackathonWins.map(win => <li key={win.name}>{win.name}{win.national && <strong> — National</strong>}</li>)}</ul></div></>;
    if (stop.id === 'interests')
        return <><span className="tag">BEYOND THE KEYBOARD</span><h2>Always in motion.</h2><p className="subtitle">Music, movement, and life outside code.</p><p>I don’t want these years to be only about being a student. Resistance training, running, and calisthenics are part of my life too.</p><div className="detail-section"><h3>Things I’m into</h3><ul className="list">{profile.interests.map(t => <li key={t}>{t}</li>)}</ul></div><div className="detail-section"><h3>Languages I know</h3><ul className="chips">{profile.languages.map(language => <li key={language}>{language}</li>)}</ul></div><div className="detail-section"><h3>My toolkit</h3><ul className="chips">{profile.skills.map(t => <li key={t}>{t}</li>)}</ul></div></>;
    return <><span className="tag">GOOD IDEAS START WITH HELLO</span><h2>Let’s make something.</h2><p className="subtitle">Got something interesting to share?</p><p>A project, an experiment, a collaboration, or just a good conversation. I’d love to hear about it.</p><a className="primary" href={`mailto:${profile.email}`}><Mail size={17}/> Say hello <ArrowUpRight size={17}/></a><button className="email" onClick={async () => { try {
        await navigator.clipboard.writeText(profile.email);
        setCopied(true);
    }
    catch {
        const field = document.createElement('textarea');
        field.value = profile.email;
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.appendChild(field);
        field.select();
        const ok = document.execCommand('copy');
        field.remove();
        setCopied(ok);
    } }}>{copied ? 'Email copied' : profile.email}{copied ? <Check size={16}/> : <Copy size={16}/>}</button><div className="socials">{profile.links.map(l => <a key={l.label} href={l.url} target="_blank" rel="noreferrer">{l.label}<ArrowUpRight size={17}/></a>)}</div></>;
}
function Readable({ onBack, failed = false }: {
    onBack: () => void;
    failed?: boolean;
}) { return <main className="readable"><div className="reading-intro"><span className="tag">LOGESH’S FIELD NOTES</span><h1>{gardenName}.</h1><p>{failed ? 'The 3D park couldn’t load here. You can explore the complete portfolio below.' : 'All the stories from the park, at your own pace.'}</p><button className="secondary" onClick={onBack}>Return to the park <ArrowUpRight size={16}/></button></div>{stops.map(s => <article key={s.id} id={`read-${s.id}`}><Content stop={s}/></article>)}</main>; }
export default function App() {
    const target = useRef(0);
    const [progress, setProgress] = useState(0);
    const [active, setActive] = useState<string | null>(null);
    const [map, setMap] = useState(false);
    const [focusedId,setFocusedId]=useState<string|null>(null);
    const [cameraMode,setCameraMode]=useState('walk');
    const focusReady=useCallback((id:string)=>setFocusedId(id),[]);
    const cameraChanged=useCallback((mode:string)=>setCameraMode(mode),[]);
    const [reading, setReading] = useState(false);
    const [gl] = useState(supportsGL);
    const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
    const closeRef = useRef<HTMLButtonElement>(null);
    const restore = useRef<HTMLElement | null>(null);
    const scrollPosition = useRef(0);
    const nearest = stops.reduce((a, b) => Math.abs(b.progress - progress) < Math.abs(a.progress - progress) ? b : a);
    const stop = stops.find(s => s.id === active);
    useEffect(() => { const mq = matchMedia('(prefers-reduced-motion: reduce)'); const f = () => setReduced(mq.matches); mq.addEventListener('change', f); return () => mq.removeEventListener('change', f); }, []);
    useEffect(() => { if (reading)
        return; const f = () => { const p = Math.max(0, Math.min(1, scrollY / (document.documentElement.scrollHeight - innerHeight))); target.current = p; setProgress(p); }; addEventListener('scroll', f, { passive: true }); addEventListener('resize', f); f(); return () => { removeEventListener('scroll', f); removeEventListener('resize', f); }; }, [reading]);
    useEffect(() => { if (!active && !map)
        return; scrollPosition.current = scrollY; const prev = document.body.style.overflow; document.body.style.overflow = 'hidden'; if (active)
        closeRef.current?.focus({preventScroll:true}); const key = (e: KeyboardEvent) => { if (e.key === 'Escape') {
        setActive(null);
        setMap(false);
    } if (e.key === 'Tab') {
        const panel = document.querySelector<HTMLElement>('[role="dialog"]');
        const nodes = panel?.querySelectorAll<HTMLElement>('button,a[href]');
        if (!nodes?.length)
            return;
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        }
        else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    } }; addEventListener('keydown', key); return () => { document.body.style.overflow = prev; removeEventListener('keydown', key); const button=restore.current?.isConnected?restore.current:(document.querySelector<HTMLElement>('.nearby')??document.querySelector<HTMLElement>('.replay'));button?.focus({preventScroll:true}); }; }, [active, map]);
    useEffect(()=>{if(active&&focusedId===active)closeRef.current?.focus({preventScroll:true})},[active,focusedId]);
    const open = (id: string) => { restore.current = document.activeElement as HTMLElement; setMap(false); setFocusedId(reading||!gl?id:null); setActive(id); };
    const jump = (p: number) => { setMap(false); setActive(null); if (reading)
        setReading(false); requestAnimationFrame(() => window.scrollTo({ top: p * (document.documentElement.scrollHeight - innerHeight), behavior: reduced ? 'instant' : 'smooth' })); };
    const read = () => { scrollPosition.current = scrollY; setActive(null); setMap(false); setReading(true); window.scrollTo(0, 0); };
    const back = () => { setReading(false); requestAnimationFrame(() => window.scrollTo(0, scrollPosition.current)); };
    return <><header className="header"><a className="brand" href="#" onClick={e => { e.preventDefault(); reading ? back() : jump(0); }}><span className="brand-icon"><Leaf size={19}/></span><span>logesh<span className="brand-dot">.</span></span></a><div className="header-center">A SMALL PARK. A WORLD OF IDEAS.</div><nav><a className="portfolio-link" href={profile.portfolioUrl} aria-label="Read portfolio"><BookOpen size={16}/><span>Read portfolio</span></a><button onClick={() => { restore.current = document.activeElement as HTMLElement; setMap(!map); }} aria-label="Park map" aria-expanded={map}><Map size={16}/><span>Park map</span></button><button className="contact-button" onClick={() => open('contact')}>Let’s talk <ArrowUpRight size={16}/></button></nav></header>
    {reading || !gl ? <Readable onBack={back} failed={!gl}/> : <div className="scroll-story"><div className="stage" data-camera-mode={cameraMode}><Boundary onFailure={() => setReading(true)} fallback={<Readable onBack={read} failed/>}><Suspense fallback={<div className="loading"><Leaf size={32}/><p>Growing a little world…</p></div>}><World target={target} active={active} onOpen={open} reduced={reduced} overview={map} onReady={focusReady} onMode={cameraChanged}/></Suspense></Boundary><div className={`intro ${progress > .04 || active ? 'faded' : ''}`}><div className="intro-eyebrow"><span /> {gardenName} / LOGESH</div><h1>A walk through<br /><em>my world.</em></h1><p>Follow the path.<br />Explore my projects along the way.</p><div className="intro-bottom"><span className="tiny-avatar">L</span><span>Student. Builder. Always exploring.</span></div></div><div className="scene-caption"><span className="status-dot"/> {progress < .05 ? 'YOUR WALK STARTS HERE' : progress > .98 ? 'ONE LAP. A WHOLE WORLD.' : nearest.eyebrow}</div><div className="bottom-bar"><button className="walk-hint" onClick={() => jump(progress < .08 ? .08 : Math.min(1, progress + .1))}><span className="scroll-icon"><ArrowDown size={17}/></span><span>{progress < .05 ? 'Scroll to take a walk' : 'Keep exploring'}<small>Click a nearby exhibit to look closer.</small></span></button><div className="progress-group"><div className="progress-track">{stops.map(s => <button key={s.id} aria-label={`Walk to ${s.label}`} className={progress >= s.progress ? 'passed' : ''} onClick={() => jump(s.progress)} title={s.label}/>)}</div><span>{Math.round(progress * 100)}% OF THE WALK</span></div><button className="replay" onClick={() => jump(0)} aria-label="Replay walk"><RotateCcw size={17}/></button></div>{Math.abs(progress-nearest.progress)<.035 && !active && !map && <button className="nearby" onClick={() => open(nearest.id)}><span>{nearest.eyebrow}</span><b>{nearest.label}</b><small>Click to take a closer look</small><ChevronRight size={18}/></button>}</div></div>}
    {map && <div className="modal-overlay" onClick={() => setMap(false)}><section role="dialog" aria-modal="true" aria-label="Park map" className="map-panel" onClick={e => e.stopPropagation()}><button className="close" autoFocus onClick={() => setMap(false)} aria-label="Close park map"><X /></button><span className="tag">YOUR LITTLE FIELD GUIDE</span><h2>Pick a place to wander.</h2><p>Projects, interests, and a little about me.</p><div className="map-list">{stops.map((s, i) => <button key={s.id} onClick={() => jump(s.progress)}><span style={{ background: s.color }}>{String(i + 1).padStart(2, '0')}</span><div><small>{s.eyebrow}</small><b>{s.label}</b></div><ArrowUpRight size={18}/></button>)}</div></section></div>}
    {stop && (focusedId===active || reading || !gl) && <div className="panel-scrim" onClick={() => setActive(null)}><aside className="project-panel" role="dialog" aria-modal="true" aria-label={stop.label} onClick={e => e.stopPropagation()}><button ref={closeRef} className="close" onClick={() => setActive(null)} aria-label="Close details"><X size={21}/></button><div className="panel-mark" style={{ background: stop.color }}>{({ planet: '◉', fly: '✧', dino: '⌁', parcel: '▣', robots: '⋮', chain: '◇', about: 'L', bench: '♫', mail: '↗' })[stop.exhibit]}</div><Content key={stop.id} stop={stop}/><div className="panel-footer"><span>TAKE YOUR TIME. THE PARK CAN WAIT.</span><button onClick={() => setActive(null)}>Back to the walk <ChevronRight size={15}/></button></div></aside></div>}
    {active && focusedId!==active && !reading && gl && <div className="focus-transition" role="status"><span>Taking a closer look…</span><button autoFocus onClick={()=>setActive(null)} aria-label="Cancel close-up"><X size={16}/></button></div>}
    </>;
}
