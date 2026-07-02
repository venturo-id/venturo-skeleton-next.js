import type { IPostProps } from 'src/types/blog';
import type { IAuthorProps } from 'src/types/author';

import { fSub } from 'src/utils/format-time';

// ----------------------------------------------------------------------

const unsplash = (id: string, width: number) =>
  `https://images.unsplash.com/${id}?w=${width}&q=80&auto=format&fit=crop`;

const AUTHORS: IAuthorProps[] = [
  {
    name: 'Sarah Chen',
    role: 'AI Research Engineer',
    about: 'Building and evaluating large language model systems for enterprise products.',
    quotes: 'The best model is the one you can actually ship.',
    avatarUrl: 'https://i.pravatar.cc/150?img=47',
    verified: true,
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Principal Software Engineer',
    about: 'Two decades of building distributed systems and mentoring engineering teams.',
    quotes: 'Simplicity is a feature, complexity is a bug.',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    verified: true,
  },
  {
    name: 'Aisha Rahman',
    role: 'Cloud Solutions Architect',
    about: 'Helping companies design cost-efficient, resilient cloud infrastructure.',
    quotes: 'Architecture is about the decisions that are hard to change.',
    avatarUrl: 'https://i.pravatar.cc/150?img=32',
    verified: true,
  },
  {
    name: 'David Kim',
    role: 'Security Researcher',
    about: 'Focused on applied cryptography, threat modeling, and zero trust architecture.',
    quotes: 'Security is a process, not a product.',
    avatarUrl: 'https://i.pravatar.cc/150?img=59',
    verified: true,
  },
  {
    name: 'Elena Petrova',
    role: 'Frontend Lead',
    about: 'Obsessed with web performance, design systems, and developer experience.',
    quotes: 'The fastest JavaScript is the JavaScript you never ship.',
    avatarUrl: 'https://i.pravatar.cc/150?img=26',
    verified: true,
  },
  {
    name: 'James Okafor',
    role: 'Data Platform Engineer',
    about: 'Building data pipelines and storage systems that scale with the business.',
    quotes: 'Data quality beats data quantity every single time.',
    avatarUrl: 'https://i.pravatar.cc/150?img=68',
    verified: true,
  },
];

// ----------------------------------------------------------------------

type ArticleSeed = {
  id: string;
  title: string;
  category: string;
  imageId: string;
  duration: string;
  tags: string[];
  description: string;
  authorIndex: number;
  content: string;
};

const SEEDS: ArticleSeed[] = [
  {
    id: 'ai-agents-are-rewriting-how-software-gets-built',
    title: 'AI Agents Are Rewriting How Software Gets Built',
    category: 'Artificial Intelligence',
    imageId: 'photo-1677442136019-21780ecad995',
    duration: '8 min read',
    tags: ['AI Agents', 'LLM', 'Developer Tools', 'Automation'],
    authorIndex: 0,
    description:
      'Autonomous coding agents have moved from research demos to daily drivers. Here is how engineering teams are restructuring their workflows around them.',
    content: `
<p>Two years ago, AI coding assistants were autocomplete on steroids. Today, autonomous agents can take a ticket, explore a codebase, write a fix, run the tests, and open a pull request — while the engineer reviews the plan instead of typing the code.</p>
<h4>From copilots to coworkers</h4>
<p>The shift is architectural. Modern agents combine a large language model with tool use: they can read files, execute shell commands, search documentation, and iterate on failures. This loop — plan, act, observe, correct — is what separates an agent from a chatbot.</p>
<p>Teams adopting agents report that the bottleneck moves from writing code to specifying intent. A well-written ticket with clear acceptance criteria is now executable documentation.</p>
<h4>What changes for engineering teams</h4>
<ul>
<li><strong>Code review becomes the primary skill.</strong> Engineers spend more time evaluating generated changes than producing them.</li>
<li><strong>Test suites become guardrails.</strong> Agents iterate against tests, so coverage quality directly limits agent reliability.</li>
<li><strong>Architecture documentation pays compound interest.</strong> Agents perform dramatically better in codebases with clear conventions and CLAUDE.md-style guides.</li>
</ul>
<h4>The honest caveats</h4>
<p>Agents still fail in predictable ways: they overfit to the first plausible solution, they struggle with large refactors that span many modules, and they can be confidently wrong. The winning pattern in production is human-in-the-loop: agents propose, humans approve.</p>
<blockquote>The teams getting the most value treat agents like talented junior engineers — capable of real work, but never merged without review.</blockquote>
<p>The tooling will keep improving, but the organizational lesson is already clear: invest in tests, docs, and review culture, because those are the interfaces through which agents work.</p>
`,
  },
  {
    id: 'rag-in-production-lessons-from-the-field',
    title: 'RAG in Production: Lessons Learned from the Field',
    category: 'Artificial Intelligence',
    imageId: 'photo-1620712943543-bcc4688e7485',
    duration: '10 min read',
    tags: ['RAG', 'LLM', 'Vector Search', 'Machine Learning'],
    authorIndex: 0,
    description:
      'Retrieval-Augmented Generation looks simple on a whiteboard. In production, chunking, evaluation, and retrieval quality decide whether your system is useful or embarrassing.',
    content: `
<p>Retrieval-Augmented Generation (RAG) is the default architecture for grounding large language models in private data. The concept is simple: retrieve relevant documents, stuff them into the prompt, and let the model answer with context. The execution is anything but simple.</p>
<h4>Chunking is a product decision</h4>
<p>How you split documents determines what can be retrieved. Fixed-size chunks are easy but break tables and code samples in half. Semantic chunking — splitting on headings, paragraphs, and structural boundaries — consistently outperforms naive approaches, but requires understanding your corpus.</p>
<h4>Retrieval quality is the ceiling</h4>
<p>No amount of prompt engineering rescues bad retrieval. Production systems layer multiple techniques:</p>
<ul>
<li><strong>Hybrid search</strong> — combining dense vector similarity with keyword BM25 catches both semantic and exact matches.</li>
<li><strong>Reranking</strong> — a cross-encoder reordering the top 50 candidates into a top 5 measurably improves answer quality.</li>
<li><strong>Query rewriting</strong> — expanding the user question into multiple search queries covers ambiguous phrasing.</li>
</ul>
<h4>Evaluate before you celebrate</h4>
<p>Teams that skip evaluation ship confidently wrong systems. Build a golden dataset of question-answer pairs early, measure retrieval hit rate and answer faithfulness separately, and run the suite on every change. Retrieval metrics diagnose whether failures come from search or generation.</p>
<blockquote>Every RAG failure we investigated was either a retrieval miss or a hallucinated synthesis. Instrument both, or you are debugging blind.</blockquote>
<p>RAG is not a weekend project — it is an information retrieval system with a language model attached. Treat the retrieval half with the seriousness it deserves.</p>
`,
  },
  {
    id: 'small-language-models-at-the-edge',
    title: 'The Rise of Small Language Models at the Edge',
    category: 'Artificial Intelligence',
    imageId: 'photo-1485827404703-89b55fcc595e',
    duration: '7 min read',
    tags: ['Edge Computing', 'SLM', 'On-Device AI', 'Privacy'],
    authorIndex: 2,
    description:
      'Not every AI workload needs a frontier model in the cloud. Small language models running on-device are winning on latency, privacy, and cost.',
    content: `
<p>While headlines chase ever-larger frontier models, a quieter revolution is happening in the opposite direction: small language models (SLMs) in the 1–8 billion parameter range now run comfortably on laptops, phones, and embedded hardware.</p>
<h4>Why smaller is sometimes smarter</h4>
<p>Three forces drive adoption. First, <strong>latency</strong>: on-device inference eliminates the network round-trip, enabling sub-100ms responses for autocomplete, summarization, and classification. Second, <strong>privacy</strong>: sensitive data never leaves the device, which simplifies compliance in healthcare, finance, and government. Third, <strong>cost</strong>: inference at the edge is effectively free at the margin once the model ships.</p>
<h4>The distillation pipeline</h4>
<p>Modern SLMs are not merely shrunken versions of big models — they are distilled from them. A frontier model generates high-quality synthetic training data, and the small model learns to imitate the specific capabilities that matter for the task. For narrow domains, a fine-tuned 3B model routinely matches a general-purpose model ten times its size.</p>
<h4>Where the edge wins today</h4>
<ul>
<li>Keyboard prediction and writing assistance on mobile devices</li>
<li>Real-time transcription and translation without connectivity</li>
<li>Smart home devices processing voice commands locally</li>
<li>Industrial sensors summarizing telemetry before transmission</li>
</ul>
<p>The pattern emerging in production is <strong>hybrid routing</strong>: the device model handles the common cases instantly, escalating only hard queries to a cloud model. Users get speed by default and quality on demand — and the cloud bill shrinks accordingly.</p>
`,
  },
  {
    id: 'platform-engineering-devops-next-evolution',
    title: 'Platform Engineering: The Next Evolution of DevOps',
    category: 'Cloud & DevOps',
    imageId: 'photo-1558494949-ef010cbdcc31',
    duration: '9 min read',
    tags: ['Platform Engineering', 'DevOps', 'Developer Experience', 'IDP'],
    authorIndex: 2,
    description:
      '"You build it, you run it" broke down at scale. Platform teams are rebuilding the developer experience with golden paths and internal developer platforms.',
    content: `
<p>DevOps promised that developers would own their services end to end. In practice, it often meant every team reinventing deployment pipelines, monitoring stacks, and Kubernetes manifests — badly and differently. Platform engineering is the correction.</p>
<h4>What a platform team actually does</h4>
<p>A platform team treats infrastructure as a product and developers as customers. Instead of writing bespoke YAML for every service, developers get an <strong>internal developer platform (IDP)</strong>: a paved road covering scaffolding, CI/CD, secrets, observability, and deployment with sensible defaults baked in.</p>
<h4>Golden paths, not golden cages</h4>
<p>The key design principle is that the paved road must be the easiest path, not the only one. Teams with unusual requirements can leave the road — they just take on the operational burden themselves. This preserves autonomy while making the right thing the lazy thing.</p>
<ul>
<li><strong>Self-service by default:</strong> spinning up a new service takes minutes, not tickets.</li>
<li><strong>Standardized observability:</strong> every service gets logs, metrics, and traces without per-team setup.</li>
<li><strong>Security inherited, not bolted on:</strong> images are scanned and secrets rotated by the platform, invisibly.</li>
</ul>
<h4>Measuring success</h4>
<p>The metrics that matter are developer-facing: time from commit to production, time to first deploy for a new service, and the percentage of teams on the paved road by choice. If teams route around your platform, that is customer feedback.</p>
<blockquote>The best platform is boring: developers stop thinking about infrastructure the way they stopped thinking about electricity.</blockquote>
`,
  },
  {
    id: 'zero-trust-security-beyond-the-buzzword',
    title: 'Zero Trust Security: Beyond the Buzzword',
    category: 'Cybersecurity',
    imageId: 'photo-1563986768609-322da13575f3',
    duration: '8 min read',
    tags: ['Zero Trust', 'Security', 'Identity', 'Network'],
    authorIndex: 3,
    description:
      'The castle-and-moat model died with the VPN era. Zero trust replaces network location with continuous identity verification — here is what implementation really involves.',
    content: `
<p>For decades, corporate security assumed a hard perimeter: everything inside the network was trusted, everything outside was hostile. Remote work, cloud services, and supply chain attacks demolished that assumption. Zero trust is the replacement — and it is a strategy, not a product you can purchase.</p>
<h4>The core principle: never trust, always verify</h4>
<p>Zero trust means no request is trusted by default, regardless of where it originates. Every access decision evaluates identity, device health, location, and behavior — every time, not just at login.</p>
<h4>The three pillars in practice</h4>
<ul>
<li><strong>Strong identity:</strong> phishing-resistant MFA (hardware keys or passkeys) for every human, workload identity for every service. Passwords alone are legacy.</li>
<li><strong>Device posture:</strong> access requires a healthy, managed device. A valid credential on a compromised laptop should fail.</li>
<li><strong>Least-privilege segmentation:</strong> users and services reach only what their role requires. Lateral movement — the attacker's favorite technique — hits walls everywhere.</li>
</ul>
<h4>A realistic roadmap</h4>
<p>Successful adoptions are incremental. Start with identity: consolidate on a single identity provider and enforce MFA. Then inventory what talks to what — most organizations discover they cannot answer this. Segment the highest-value systems first, and expand outward. A full migration takes years; meaningful risk reduction takes months.</p>
<blockquote>Zero trust does not mean trusting nothing — it means making trust explicit, scoped, and continuously earned.</blockquote>
<p>The organizations that succeed treat zero trust as an operating model shift with executive backing, not an IT project with a deadline.</p>
`,
  },
  {
    id: 'react-server-components-in-practice',
    title: 'React Server Components in Practice',
    category: 'Web Development',
    imageId: 'photo-1633356122544-f134324a6cee',
    duration: '9 min read',
    tags: ['React', 'Next.js', 'RSC', 'Performance'],
    authorIndex: 4,
    description:
      "Server Components changed React's mental model more than hooks did. A field guide to the boundaries, the wins, and the sharp edges.",
    content: `
<p>React Server Components (RSC) are the biggest shift in React since hooks. Components now default to running only on the server — zero JavaScript shipped to the browser — and opt into interactivity with the <code>'use client'</code> directive. The result is a new architecture hiding inside a familiar API.</p>
<h4>The mental model that makes it click</h4>
<p>Think of your component tree as two zones. Server Components fetch data and render static structure; they can read databases directly and never re-render. Client Components handle interactivity — state, effects, event handlers. The <code>'use client'</code> directive marks the boundary, and everything imported below it joins the client bundle.</p>
<h4>Where the wins come from</h4>
<ul>
<li><strong>Bundle size:</strong> heavy dependencies — markdown renderers, syntax highlighters, date libraries — stay on the server. Users never download them.</li>
<li><strong>Data fetching:</strong> async components fetch where the data lives, eliminating client-side waterfalls and loading spinner cascades.</li>
<li><strong>Streaming:</strong> Suspense boundaries let the shell render immediately while slow data streams in progressively.</li>
</ul>
<h4>The sharp edges</h4>
<p>The boundary rules take practice: props crossing from server to client must be serializable, so no functions or class instances. Context does not cross the boundary. And the biggest team-level mistake is marking entire trees <code>'use client'</code> at the root, silently opting out of every benefit.</p>
<blockquote>Push client boundaries down to the leaves: a page should be server-rendered structure with small interactive islands, not a client app with a server shell.</blockquote>
<p>RSC rewards teams that think about where code runs. That discipline — server for structure and data, client for interaction — is the new craft of React architecture.</p>
`,
  },
  {
    id: 'typescript-at-scale-patterns-from-large-codebases',
    title: 'TypeScript at Scale: Patterns from Large Codebases',
    category: 'Software Development',
    imageId: 'photo-1555066931-4365d14bab8c',
    duration: '11 min read',
    tags: ['TypeScript', 'Architecture', 'Code Quality', 'Monorepo'],
    authorIndex: 1,
    description:
      'What keeps a million-line TypeScript codebase healthy? Strictness budgets, boundary types, and treating the compiler as your first code reviewer.',
    content: `
<p>TypeScript adoption is no longer a debate — the interesting questions are about scale. What works in a 10,000-line app falls apart at a million lines. These patterns come from teams operating at that scale.</p>
<h4>Strictness is cheaper than migration</h4>
<p>Every large codebase regrets the <code>any</code> types it allowed early. Enable <code>strict: true</code> from day one, add <code>noUncheckedIndexedAccess</code>, and treat new <code>any</code> as a code review blocker. Retrofitting strictness into a mature codebase costs 10x more than starting with it.</p>
<h4>Types are strongest at boundaries</h4>
<p>The highest-value types sit at system boundaries: API responses, database rows, message queues, third-party SDKs. Validate at runtime with a schema library like Zod, and derive static types from the schemas — one source of truth for both the compiler and the runtime.</p>
<ul>
<li><strong>Parse, don't validate:</strong> convert untrusted input into rich domain types once, at the edge, then trust the types everywhere inside.</li>
<li><strong>Branded types</strong> prevent unit confusion: a <code>UserId</code> should not be assignable to an <code>OrderId</code> even if both are strings.</li>
<li><strong>Discriminated unions</strong> make invalid states unrepresentable — the compiler enforces exhaustive handling of every variant.</li>
</ul>
<h4>Keep the compiler fast</h4>
<p>Type-checking time is developer experience. Use project references to split the graph, avoid monster union types in hot paths, and measure with <code>tsc --extendedDiagnostics</code> before guessing. A codebase that type-checks in seconds keeps types in the inner loop; one that takes minutes trains developers to ignore them.</p>
<blockquote>In a large codebase the compiler is your most reliable reviewer — the goal is to encode your architecture so the reviewer can enforce it.</blockquote>
`,
  },
  {
    id: 'kubernetes-cost-optimization-strategies',
    title: 'Kubernetes Cost Optimization: Practical Strategies',
    category: 'Cloud & DevOps',
    imageId: 'photo-1451187580459-43490279c0fa',
    duration: '10 min read',
    tags: ['Kubernetes', 'FinOps', 'Cloud Cost', 'Infrastructure'],
    authorIndex: 2,
    description:
      'Most clusters run at under 30% utilization while finance asks why the cloud bill doubled. A practical playbook for cutting Kubernetes spend without cutting reliability.',
    content: `
<p>Kubernetes makes it easy to run workloads — and easier to waste money. Industry studies consistently find average cluster utilization below 30%, which means most organizations pay triple what their workloads require. The waste hides in three places.</p>
<h4>1. Right-size the requests</h4>
<p>Resource requests drive cluster scaling, and developers set them by copy-paste and fear. A container requesting 2 CPUs while using 200 millicores reserves — and bills — ten times its need. Deploy the Vertical Pod Autoscaler in recommendation mode, compare requests against actual usage, and reclaim the gap. This alone typically recovers 30–50% of spend.</p>
<h4>2. Use the cheap compute tiers</h4>
<ul>
<li><strong>Spot instances</strong> cost 60–90% less and suit any workload that tolerates interruption — batch jobs, CI runners, stateless services behind a load balancer.</li>
<li><strong>ARM nodes</strong> deliver 20–40% better price-performance for most containerized workloads, and multi-arch images make the switch mostly transparent.</li>
<li><strong>Autoscaling schedules</strong> shut down dev and staging environments overnight — a 12-hour weekday schedule cuts non-production compute by two thirds.</li>
</ul>
<h4>3. Make cost visible per team</h4>
<p>Engineers cannot optimize what they cannot see. Label workloads by team and product, deploy a cost-allocation tool such as OpenCost, and put a monthly number in front of every owner. Shared platform costs deserve a showback model too — visibility changes behavior faster than mandates.</p>
<blockquote>Cost optimization is not a quarterly cleanup project. It is a feedback loop: measure, right-size, and make the efficient path the default one.</blockquote>
`,
  },
  {
    id: 'webassembly-beyond-the-browser',
    title: 'WebAssembly Beyond the Browser',
    category: 'Software Development',
    imageId: 'photo-1627398242454-45a1465c2479',
    duration: '8 min read',
    tags: ['WebAssembly', 'WASI', 'Serverless', 'Plugins'],
    authorIndex: 1,
    description:
      'Wasm escaped the browser tab. Plugin systems, serverless platforms, and sandboxed compute are quietly becoming its biggest use cases.',
    content: `
<p>WebAssembly was designed to run C++ in a browser tab. Its most interesting deployments today have nothing to do with browsers: it is becoming a universal, sandboxed binary format for running untrusted code anywhere.</p>
<h4>Why server-side Wasm matters</h4>
<p>Three properties make Wasm compelling as a server-side runtime. It is <strong>sandboxed by default</strong> — a module can touch nothing unless explicitly granted. It is <strong>portable</strong> — one binary runs identically on x86, ARM, Linux, or macOS. And it starts in <strong>microseconds</strong>, versus hundreds of milliseconds for a container cold start.</p>
<h4>The killer use case: plugin systems</h4>
<p>Letting users extend your product with custom code used to mean a security nightmare or an embedded scripting language. Wasm changes the equation: plugins run in a capability-based sandbox, written in any language that compiles to Wasm, with near-native performance. Envoy proxies, stream processors, and commercial SaaS platforms already ship Wasm plugin APIs in production.</p>
<h4>The component model changes composition</h4>
<ul>
<li>Modules declare typed imports and exports — language-neutral interfaces instead of raw memory.</li>
<li>A Rust component can call a Go component can call a JavaScript component, safely, in one process.</li>
<li>WASI provides standard, capability-scoped access to files, sockets, and clocks.</li>
</ul>
<p>The honest limitations: the tooling is younger than containers, debugging is rougher, and compute-heavy workloads still pay a modest overhead versus native. But for untrusted code execution and lightweight multi-tenancy, nothing else combines this security model with this performance.</p>
<blockquote>Containers virtualized the operating system. Wasm virtualizes the program — and that is a much smaller, much safer thing to virtualize.</blockquote>
`,
  },
  {
    id: 'post-quantum-cryptography-preparing-for-q-day',
    title: 'Post-Quantum Cryptography: Preparing for Q-Day',
    category: 'Cybersecurity',
    imageId: 'photo-1550751827-4bd374c3f58b',
    duration: '9 min read',
    tags: ['Cryptography', 'Quantum', 'PQC', 'Security'],
    authorIndex: 3,
    description:
      'A cryptographically relevant quantum computer will break RSA and ECC. The migration to quantum-resistant algorithms has already started — and harvest-now-decrypt-later makes it urgent.',
    content: `
<p>Every TLS handshake, signed certificate, and encrypted disk today relies on math problems — factoring, discrete logarithms — that a sufficiently large quantum computer solves efficiently. Nobody knows when such a machine arrives. The threat is already here anyway.</p>
<h4>Harvest now, decrypt later</h4>
<p>Adversaries with long time horizons are recording encrypted traffic today to decrypt once quantum hardware matures. Any data that must stay confidential for a decade — medical records, state secrets, trade negotiations, genetic data — is already at risk. This is why migration timelines are set by data lifetime, not by quantum hardware forecasts.</p>
<h4>The new standards are ready</h4>
<p>NIST finalized its first post-quantum standards: <strong>ML-KEM</strong> (Kyber) for key exchange, <strong>ML-DSA</strong> (Dilithium) and <strong>SLH-DSA</strong> (SPHINCS+) for signatures. Major browsers and cloud providers already run hybrid key exchange — combining classical and post-quantum algorithms so security holds even if one side fails.</p>
<h4>What organizations should do now</h4>
<ul>
<li><strong>Build a cryptographic inventory:</strong> you cannot migrate algorithms you do not know you use. Most organizations are shocked by what the audit reveals.</li>
<li><strong>Demand crypto-agility:</strong> systems should treat algorithms as replaceable components, because this migration will not be the last.</li>
<li><strong>Prioritize long-lived secrets:</strong> data with a ten-year confidentiality requirement needs post-quantum protection first.</li>
<li><strong>Pressure vendors:</strong> ask every supplier for their PQC roadmap — their timeline becomes your timeline.</li>
</ul>
<blockquote>The last cryptographic migration — SHA-1 to SHA-2 — took the industry over a decade. This one is bigger, and the clock started before you read this.</blockquote>
`,
  },
  {
    id: 'measuring-developer-productivity',
    title: 'Measuring Developer Productivity: What Actually Matters',
    category: 'Software Development',
    imageId: 'photo-1519389950473-47ba0277781c',
    duration: '9 min read',
    tags: ['Engineering Management', 'DORA', 'Metrics', 'Team Culture'],
    authorIndex: 1,
    description:
      'Lines of code is a punchline, but the question behind it is legitimate. What the research actually says about measuring engineering effectiveness.',
    content: `
<p>Every engineering leader eventually faces the question: how productive is my team? The wrong answers — lines of code, commit counts, story points — are famous. But mocking bad metrics is easier than proposing good ones, and the question does not go away.</p>
<h4>Measure systems, not individuals</h4>
<p>The foundational insight from two decades of research: developer productivity is a property of the system, not the person. The same engineer ships daily in a healthy codebase with fast CI, and monthly in a legacy tangle with flaky tests. Measuring individuals punishes people for their environment; measuring the system reveals what to fix.</p>
<h4>The metrics with evidence behind them</h4>
<ul>
<li><strong>DORA metrics:</strong> deployment frequency, lead time for changes, change failure rate, and time to restore. Elite performers excel at all four simultaneously — speed and stability are not a trade-off.</li>
<li><strong>Flow metrics:</strong> how long work items wait versus how long they are actively worked. Most lead time is queue time, and queues are fixable.</li>
<li><strong>Developer experience surveys:</strong> perceived friction — build times, review latency, unclear requirements — predicts attrition and velocity better than any dashboard number.</li>
</ul>
<h4>The failure mode to avoid</h4>
<p>Any metric used as a target gets gamed — Goodhart's law is undefeated. Deployment frequency becomes deploy-empty-changes; velocity becomes point inflation. The defense is using metrics as conversation starters for retrospectives, never as quotas in performance reviews.</p>
<blockquote>The goal is not to rank developers. It is to find and remove the friction that prevents good developers from doing good work.</blockquote>
`,
  },
  {
    id: 'vector-databases-explained',
    title: 'Vector Databases Explained: When Do You Actually Need One?',
    category: 'Data Engineering',
    imageId: 'photo-1518770660439-4636190af475',
    duration: '8 min read',
    tags: ['Vector Database', 'Embeddings', 'Search', 'AI Infrastructure'],
    authorIndex: 5,
    description:
      'Embeddings turned meaning into geometry, and a new database category exploded around them. A clear-eyed guide to what vector databases do and when pgvector is all you need.',
    content: `
<p>Embedding models convert text, images, and audio into vectors — points in high-dimensional space where distance means semantic similarity. Vector databases exist to answer one query fast: given this vector, find the nearest neighbors among millions. That single capability powers semantic search, recommendations, deduplication, and every RAG system in production.</p>
<h4>Why a regular index fails</h4>
<p>B-tree indexes excel at exact matches and ranges, but nearest-neighbor search in 1,536 dimensions defeats them — exhaustively comparing a query against ten million vectors is too slow for interactive use. Vector databases use approximate nearest neighbor (ANN) indexes like HNSW, trading a sliver of recall for orders-of-magnitude speedups.</p>
<h4>The decision framework</h4>
<ul>
<li><strong>Under a few million vectors?</strong> Use <code>pgvector</code> in the Postgres you already run. One database, real transactions, joins between vectors and business data. This covers most applications comfortably.</li>
<li><strong>Hundreds of millions of vectors, high QPS?</strong> Dedicated engines — Qdrant, Milvus, Weaviate, Pinecone — earn their operational overhead with sharding, quantization, and specialized filtering.</li>
<li><strong>Already on Elasticsearch or OpenSearch?</strong> Their native vector support makes hybrid keyword-plus-semantic search a configuration change, not a new system.</li>
</ul>
<h4>The details that bite in production</h4>
<p>Metadata filtering interacts badly with ANN indexes — filtering after the search can return too few results, filtering during requires engine support. Index rebuilds after bulk updates take real time. And embedding model upgrades mean re-embedding the entire corpus, so version your embeddings from day one.</p>
<blockquote>Choose boring first: start with pgvector, measure, and graduate to a dedicated engine when the numbers — not the hype — demand it.</blockquote>
`,
  },
  {
    id: 'micro-frontends-architecture-or-overhead',
    title: 'Micro-Frontends: Smart Architecture or Needless Overhead?',
    category: 'Web Development',
    imageId: 'photo-1461749280684-dccba630e2f6',
    duration: '8 min read',
    tags: ['Micro-Frontends', 'Architecture', 'Frontend', 'Module Federation'],
    authorIndex: 4,
    description:
      'Splitting the frontend promises team autonomy and independent deploys. It also multiplies bundles, duplicates dependencies, and fragments UX. Here is how to decide.',
    content: `
<p>Micro-frontends apply the microservices pitch to the browser: split the UI into independently built, independently deployed pieces owned by separate teams. Like microservices, the pattern solves a real problem — and gets adopted by ten times more teams than actually have that problem.</p>
<h4>The problem it genuinely solves</h4>
<p>Micro-frontends address an <em>organizational</em> bottleneck, not a technical one. When five-plus teams ship into one frontend and block each other's releases — merge conflicts, coordinated deploys, release trains — independent deployability restores team velocity. That is the use case. Everything else is fashion.</p>
<h4>The costs nobody puts in the slide deck</h4>
<ul>
<li><strong>Payload duplication:</strong> without careful dependency sharing, users download React three times. Module Federation helps, but adds its own versioning complexity.</li>
<li><strong>UX consistency erosion:</strong> independent teams drift in design, accessibility, and interaction patterns unless a design system is enforced with real governance.</li>
<li><strong>Operational surface:</strong> integration testing, error tracking, and performance budgets all get harder across independently deployed fragments.</li>
</ul>
<h4>If you do it, do it like this</h4>
<p>Successful implementations share traits: routes as boundaries (each page owned by one team) rather than widgets within a page; a strictly versioned design system; a thin shell owning routing and auth; and shared dependencies pinned platform-wide. Teams that split mid-page — multiple micro-frontends composing one view — report the highest regret.</p>
<blockquote>Micro-frontends are an organizational tool with a technical cost. If your teams are not stepping on each other, a well-structured monolith with clear module ownership ships faster.</blockquote>
`,
  },
  {
    id: 'observability-in-distributed-systems',
    title: 'Observability in Distributed Systems: Logs, Metrics, and Traces',
    category: 'IT Infrastructure',
    imageId: 'photo-1531297484001-80022131f5a1',
    duration: '10 min read',
    tags: ['Observability', 'OpenTelemetry', 'Monitoring', 'SRE'],
    authorIndex: 5,
    description:
      'When one user request touches twelve services, "check the logs" stops being a debugging strategy. How the three pillars fit together — and where teams overspend.',
    content: `
<p>In a monolith, debugging meant reading one log file. In a distributed system, a single checkout request might traverse a dozen services, three queues, and two databases. Observability is the discipline of answering "why is this slow?" and "what broke?" without SSH-ing into twelve boxes.</p>
<h4>The three pillars, and what each is for</h4>
<ul>
<li><strong>Metrics</strong> are cheap aggregates — request rates, error percentages, latency histograms. They power alerts and dashboards and answer <em>"is something wrong?"</em></li>
<li><strong>Traces</strong> follow one request across every service it touches, showing where the time went. They answer <em>"where is it wrong?"</em></li>
<li><strong>Logs</strong> carry the detailed, high-cardinality context of specific events. They answer <em>"why exactly did it go wrong?"</em></li>
</ul>
<p>The pillars work as a funnel: an alert fires on a metric, a trace localizes the failure to one service, and that service's logs — linked by trace ID — explain the root cause. Systems where these three are not correlated force engineers to guess across tools.</p>
<h4>OpenTelemetry ended the instrumentation wars</h4>
<p>OpenTelemetry (OTel) is now the de facto standard: one vendor-neutral SDK emits all three signals, and a collector routes them to any backend. Instrument once, switch vendors by configuration. Any tooling decision that ignores OTel compatibility is a lock-in decision.</p>
<h4>Controlling the bill</h4>
<p>Observability costs routinely shock finance — verbose logs at scale can exceed the compute bill of the services they observe. The levers: sample traces (keep all errors, a fraction of successes), set retention by signal value, and prefer wide structured events over chatty log lines. Measure the cost per answered question, not gigabytes ingested.</p>
<blockquote>You cannot debug what you cannot see — but you can absolutely bankrupt yourself seeing everything twice.</blockquote>
`,
  },
  {
    id: 'context-engineering-the-new-prompt-engineering',
    title: 'From Prompt Engineering to Context Engineering',
    category: 'Artificial Intelligence',
    imageId: 'photo-1526374965328-7f61d4dc18c5',
    duration: '7 min read',
    tags: ['Context Engineering', 'LLM', 'Prompt Engineering', 'AI Systems'],
    authorIndex: 0,
    description:
      'Clever prompt phrasing stopped being the bottleneck. The craft has shifted to deciding what information reaches the model — and what gets left out.',
    content: `
<p>Early LLM applications lived and died by prompt wording — the magic incantations, the "think step by step" tricks. As models improved, phrasing stopped mattering as much. What matters now is <strong>context engineering</strong>: deciding what information the model sees at inference time.</p>
<h4>The context window is a budget</h4>
<p>Modern models accept hundreds of thousands of tokens, but capacity is not comprehension. Research consistently shows degraded recall for information buried mid-context, and irrelevant content actively hurts accuracy. A focused 4,000-token context beats a sloppy 100,000-token dump — and costs 25 times less per call.</p>
<h4>The engineering discipline</h4>
<p>Context engineering treats the prompt as a composed artifact with distinct layers, each with its own refresh cadence:</p>
<ul>
<li><strong>Stable instructions:</strong> role, rules, and output format — cached and versioned like code.</li>
<li><strong>Retrieved knowledge:</strong> documents selected per query, ranked and trimmed to what is actually relevant.</li>
<li><strong>State and memory:</strong> conversation history summarized progressively rather than replayed in full.</li>
<li><strong>Tool results:</strong> injected observations, pruned aggressively once consumed.</li>
</ul>
<h4>Why this is a systems problem</h4>
<p>Every token competes for the model's attention, so context assembly is a ranking problem under a budget — retrieval quality, summarization fidelity, and eviction policy all become engineering decisions with measurable consequences. Teams now A/B test context assembly strategies the way they once tested prompt phrasings, and the wins are bigger.</p>
<blockquote>The prompt is the API call. The context is the architecture. Engineers who internalize that difference build systems that keep getting better as models do.</blockquote>
`,
  },
  {
    id: 'green-software-engineering-carbon-aware-code',
    title: 'Green Software Engineering: Writing Carbon-Aware Code',
    category: 'IT Infrastructure',
    imageId: 'photo-1473341304170-971dccb5ac1e',
    duration: '7 min read',
    tags: ['Sustainability', 'Green Computing', 'Cloud', 'Efficiency'],
    authorIndex: 2,
    description:
      'Software has a carbon footprint, and it is bigger than the aviation industry. Practical techniques for measuring and reducing the emissions of the systems you run.',
    content: `
<p>Data centers consume roughly 2–3% of global electricity, and AI workloads are pushing the curve upward. Green software engineering is the emerging practice of treating carbon as a first-class engineering metric — alongside latency, cost, and reliability.</p>
<h4>Efficiency is the biggest lever</h4>
<p>The greenest instruction is the one never executed. Most carbon wins are efficiency wins wearing a different label: right-sized infrastructure, better algorithms, fewer redundant computations, and caching that prevents repeated work. The cloud cost bill is a reasonable first proxy for the carbon bill.</p>
<h4>Carbon-aware scheduling</h4>
<p>Electricity's carbon intensity varies by hour and region — a grid running on wind at 2 AM is far cleaner than the same grid burning gas at peak. Carbon-aware systems exploit this:</p>
<ul>
<li><strong>Time-shifting:</strong> batch jobs, ML training runs, and CI pipelines run when the grid is cleanest.</li>
<li><strong>Region-shifting:</strong> flexible workloads deploy to regions with cleaner energy mixes.</li>
<li><strong>Demand-shaping:</strong> non-critical features degrade gracefully during dirty-grid hours.</li>
</ul>
<h4>Measure before you optimize</h4>
<p>The Software Carbon Intensity (SCI) specification gives teams a consistent score: emissions per functional unit — per request, per user, per training run. Cloud providers now expose carbon dashboards, and open tooling estimates emissions from utilization data. Put the number on the same dashboard as latency and cost; what gets graphed gets managed.</p>
<blockquote>Sustainable software is mostly just well-engineered software — the discipline is making the invisible cost visible enough to act on.</blockquote>
`,
  },
];

// ----------------------------------------------------------------------

export const _articles: IPostProps[] = SEEDS.map((seed, index) => ({
  id: seed.id,
  title: seed.title,
  category: seed.category,
  description: seed.description,
  content: seed.content,
  tags: seed.tags,
  duration: seed.duration,
  favorited: false,
  coverUrl: unsplash(seed.imageId, 800),
  heroUrl: unsplash(seed.imageId, 1920),
  author: AUTHORS[seed.authorIndex],
  createdAt: fSub({ days: index * 5 + 2 }),
}));
