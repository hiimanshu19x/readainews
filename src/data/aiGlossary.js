/**
 * aiGlossary.js - Technical Glossary & Vocabulary Explanations
 * 
 * Provides accessible, journalist-grade explanations and real-world context
 * for AI technical terms, architectures, and challenging vocabulary.
 */

export const AI_GLOSSARY = {
  "test-time compute": {
    term: "Test-Time Compute",
    category: "Architecture & Reasoning",
    simpleDef: "Giving an AI model extra computational time and tokens to think, verify, and deliberate before generating its final response.",
    context: "Traditional models like GPT-4 answer instantaneously in a single forward pass. Test-time compute (popularized by models like OpenAI o1) lets the model run internal reasoning chains, backtrack on errors, and verify its logic prior to outputting an answer.",
    analogy: "Like asking a math student to write out their scratchpad steps before blurting out the final number, rather than guessing on instinct."
  },
  "reasoning engine": {
    term: "Reasoning Engine",
    category: "AI Architecture",
    simpleDef: "An AI system specifically architected to break complex problems into sequential logical steps rather than just predicting the next word statistically.",
    context: "Unlike basic language models that mimic patterns, reasoning engines use reinforcement learning and chain-of-thought processing to solve PhD-level STEM, coding, and competitive mathematical puzzles.",
    analogy: "A chess player thinking several moves ahead, evaluating alternative paths before moving a piece."
  },
  "chain-of-thought": {
    term: "Chain-of-Thought (CoT)",
    category: "Prompting & Reasoning",
    simpleDef: "A step-by-step reasoning process where the model articulates intermediate logic before answering.",
    context: "Forces the model to decompose complex multi-stage problems into smaller verifiable deductions, dramatically cutting down hallucination rates in analytical tasks.",
    analogy: "Showing your work on an exam instead of just writing down the final answer."
  },
  "reinforcement learning": {
    term: "Reinforcement Learning (RL)",
    category: "Machine Learning Paradigm",
    simpleDef: "Training an algorithm by rewarding correct outcomes and penalizing mistakes through trial and error.",
    context: "Powers frontier reasoning models, game-playing engines like AlphaGo, and robotic dexterity by learning optimal policies without needing explicit human step-by-step demonstrations.",
    analogy: "Training a puppy with treats when it performs a trick correctly and withholding treats when it doesn't."
  },
  "de novo": {
    term: "De Novo",
    category: "Scientific Research",
    simpleDef: "Latin for 'from scratch' or 'anew'. In AI biology, designing molecules or proteins from the ground up rather than modifying existing natural ones.",
    context: "Tools like DeepMind AlphaProteo generate custom protein binders tailored to lock onto disease targets with atom-by-atom precision from blank canvases.",
    analogy: "Composing an entirely original symphony note by note rather than remixing an existing popular song."
  },
  "protein binder": {
    term: "Protein Binder",
    category: "Biotechnology & AI",
    simpleDef: "A specially designed molecule that latches onto a specific target protein like a key into a lock.",
    context: "Crucial for targeted cancer therapies, viral neutralizers, and immunotherapy. AI designs these in seconds, eliminating years of trial-and-error laboratory wet-lab screening.",
    analogy: "A custom-machined key engineered to fit only one specific, intricate padlock."
  },
  "multimodal": {
    term: "Multimodal",
    category: "Capabilities",
    simpleDef: "The ability of an AI system to process, understand, and generate multiple types of data simultaneously (text, vision, audio, video, code).",
    context: "Allows a single model to inspect architectural blueprints, listen to a spoken voice query, and return a video breakdown or programmatic fix in one unified context.",
    analogy: "A human using sight, hearing, and touch together to navigate a crowded street."
  },
  "latency": {
    term: "Latency",
    category: "Systems & Performance",
    simpleDef: "The delay between sending a request to an AI model and receiving the first or complete response.",
    context: "Measured in milliseconds. Crucial for real-time voice agents, autonomous vehicles, and interactive chat where users notice delays exceeding 200–300ms.",
    analogy: "The pause between asking someone a question on a phone call with poor reception and hearing their reply."
  },
  "high-throughput": {
    term: "High-Throughput",
    category: "Enterprise Infrastructure",
    simpleDef: "The capacity of a computer system to process enormous volumes of work or data requests per second.",
    context: "Enterprise datacenter clusters must process thousands of concurrent user queries without crashing, throttling, or degrading answer quality.",
    analogy: "A 16-lane superhighway moving tens of thousands of cars per hour compared to a single-lane country road."
  },
  "hardware accelerator": {
    term: "Hardware Accelerator",
    category: "Hardware & Chips",
    simpleDef: "Specialized silicon chips (like GPUs or TPUs) engineered specifically to do billions of matrix math calculations in parallel.",
    context: "Standard computer CPUs do tasks sequentially; GPUs and AI ASICs (NVIDIA H100s, Google TPUs) run trillions of floating-point operations per second to train and run neural nets.",
    analogy: "A kitchen with 100 sous-chefs chopping vegetables in parallel versus one master chef doing every task one at a time."
  },
  "telemetry": {
    term: "Telemetry",
    category: "Operations & Monitoring",
    simpleDef: "Automated collection and transmission of diagnostic data, performance metrics, and error rates from running systems.",
    context: "AI engineering teams monitor token throughput, GPU temperature, response drift, and memory allocation across distributed clusters in real time.",
    analogy: "The dashboard gauges in a spacecraft feeding engine temperature, speed, and fuel pressure back to mission control."
  },
  "token": {
    term: "Token",
    category: "Natural Language Processing",
    simpleDef: "The basic chunk of text (roughly 3-4 characters or 0.75 words in English) that an AI model reads and writes.",
    context: "Language models do not read full words; they slice text into numerical token IDs. A 1,000-word essay is roughly 1,300 tokens.",
    analogy: "Syllables or LEGO building bricks that fit together to construct sentences."
  },
  "context window": {
    term: "Context Window",
    category: "Model Architecture",
    simpleDef: "The total amount of information (in tokens) an AI model can hold in its active working memory at one time.",
    context: "Modern frontier models support 128k to 2 million tokens, enabling them to ingest entire codebases, hour-long videos, or hundreds of legal documents in a single prompt.",
    analogy: "The size of a student's desk: a small desk holds one textbook, while an expansive workbench fits an entire encyclopedia series open at once."
  },
  "hallucination": {
    term: "Hallucination",
    category: "Model Reliability",
    simpleDef: "When an AI generates plausible-sounding statements, citations, or data that are factually false or completely fabricated.",
    context: "Stemming from the model's objective to predict probable tokens rather than verify truth. Reasoning engines and retrieval systems (RAG) are built to counter this.",
    analogy: "A confident storyteller inventing a believable historical date on the spot because it sounds right."
  },
  "rag": {
    term: "Retrieval-Augmented Generation (RAG)",
    category: "Enterprise AI Architecture",
    simpleDef: "A technique that searches an external database for fresh, verified facts and injects them into the prompt before the AI answers.",
    context: "Prevents hallucinations and allows private enterprise systems to chat with company internal wikis without having to retrain multi-million dollar foundation models.",
    analogy: "An open-book exam where the student checks the reference textbook before answering questions."
  },
  "vector database": {
    term: "Vector Database",
    category: "Data Infrastructure",
    simpleDef: "A specialized database that stores information as numerical coordinates (embeddings) representing meaning rather than exact keywords.",
    context: "Allows semantic searches like matching 'canine companion' to 'dog training guide' even if they share zero identical words.",
    analogy: "Organizing books in a library by their philosophical themes and emotional tone rather than alphabetical title order."
  },
  "fine-tuning": {
    term: "Fine-Tuning",
    category: "Model Training",
    simpleDef: "Taking a pre-trained foundation model and training it further on a focused dataset to specialize in a specific domain or tone.",
    context: "Turns a general conversational model into a medical diagnostic assistant, legal contract auditor, or specialized Python code reviewer.",
    analogy: "A general medical school graduate doing a specialized three-year residency in pediatric cardiology."
  },
  "weights": {
    term: "Weights & Parameters",
    category: "Neural Network Internals",
    simpleDef: "The mathematical dial settings and numbers inside a neural network that determine how incoming data is transformed into output.",
    context: "A '70-billion parameter' model has 70 billion individual mathematical weights adjusted during training to encode patterns, knowledge, and reasoning rules.",
    analogy: "The millions of tiny neural synaptic connection strengths inside a brain that dictate how it responds to stimuli."
  },
  "inference": {
    term: "Inference",
    category: "AI Lifecycle",
    simpleDef: "Running a trained AI model in real time to generate predictions or responses for users.",
    context: "Training is the massive one-time process of building the model; inference is the day-to-day execution when you hit 'Send' in an app.",
    analogy: "Training is rehearsing a play for six months; inference is performing it live on opening night."
  },
  "synthetic data": {
    term: "Synthetic Data",
    category: "Data & Training",
    simpleDef: "Artificial data generated by algorithms or other AI models rather than collected from human behavior.",
    context: "Used to train new models when human-generated internet data runs out, or to create millions of rare edge-case driving simulations for autonomous vehicles.",
    analogy: "A flight simulator generating extreme storm scenarios for pilot practice instead of waiting for real blizzards."
  },
  "agentic": {
    term: "Agentic AI / Autonomous Agents",
    category: "Autonomous Systems",
    simpleDef: "AI programs given goals that can independently plan steps, execute code, browse the web, and use external tools with minimal human supervision.",
    context: "Shifts AI from a passive chatbot into an active software co-worker capable of debugging repositories, booking flights, or conducting web research end-to-end.",
    analogy: "An executive assistant who takes a broad goal ('organize our conference') and executes dozens of steps autonomously."
  },
  "diffusion model": {
    term: "Diffusion Model",
    category: "Generative Media",
    simpleDef: "A generative model that creates images, video, or audio by starting with pure random static noise and gradually refining it into a sharp picture.",
    context: "Powers tools like Midjourney, Flux, and Stable Diffusion by learning how to reverse the process of adding noise to real-world photographs.",
    analogy: "A sculptor carving a statue out of a rough block of marble, chipping away rough edges until a lifelike form appears."
  },
  "transformer": {
    term: "Transformer Architecture",
    category: "Foundational AI",
    simpleDef: "The neural network design introduced in 2017 ('Attention Is All You Need') that underpins virtually all modern LLMs.",
    context: "Uses self-attention mechanisms to process all words in a document in parallel, understanding how distant words relate to one another contextually.",
    analogy: "Reading an entire page at a single glance and instantly knowing how the pronoun in paragraph 3 links to the noun in paragraph 1."
  },
  "parameter": {
    term: "Parameters",
    category: "Model Scale",
    simpleDef: "The individual variables inside an AI model that get tuned during training to store knowledge and patterns.",
    context: "Usually counted in billions (7B, 70B, 405B). Higher parameter counts generally yield broader world knowledge and nuanced logic, but require more VRAM and compute.",
    analogy: "The vocabulary, memory nodes, and connection pathways in an expert's mental library."
  },
  "alignment": {
    term: "AI Alignment & Safety",
    category: "Safety & Governance",
    simpleDef: "Techniques used to ensure AI systems follow human values, obey safety guidelines, and do not cause unintended harm.",
    context: "Includes reinforcement learning from human feedback (RLHF), red-teaming, and constitutional AI principles to prevent dangerous advice or malicious misuse.",
    analogy: "Teaching a powerful teenage driver road ethics, defensive driving, and respect for speed limits before handing them the keys."
  },
  "quantization": {
    term: "Quantization",
    category: "Efficiency & Edge Deployment",
    simpleDef: "Compressing an AI model by reducing the numerical precision of its weights (e.g. from 16-bit to 4-bit) so it runs on smaller hardware.",
    context: "Allows large 70B models to run locally on laptops or smartphones with minimal drop in reasoning accuracy while using 75% less RAM.",
    analogy: "Saving a high-resolution lossless photo as a clean, compressed JPEG: imperceptible quality difference to human eyes, but vastly smaller file size."
  }
};
