import fs from 'fs';

const existing = JSON.parse(fs.readFileSync('scripts/dataset.json', 'utf8'));

const tier4 = [
  {
    id: 'nature-ai-biomolecular-docking-antibiotic-discovery',
    title: 'Generative Diffusion Uncovers Novel Structural Antibiotic Classes Against Multidrug-Resistant Superbugs',
    category: 'RESEARCH',
    tier: 'research',
    source: 'Nature',
    originalUrl: 'https://www.nature.com/subjects/machine-learning',
    readTime: '8 min read',
    date: 'Today, 06:10 AM',
    summary: 'Peer-reviewed research in Nature reveals how geometric deep learning and structural diffusion models designed and experimentally validated completely novel antibiotic compounds that neutralize multidrug-resistant bacterial strains in vitro.',
    fullContent: 'In an unprecedented biomedical milestone published today in Nature, an international consortium of computational biologists and molecular pharmacologists announced the discovery and wet-lab validation of a novel structural class of antibiotics designed entirely from scratch by generative geometric diffusion algorithms.\n\nFaced with the escalating global mortality crisis of antimicrobial-resistant pathogens—including methicillin-resistant Staphylococcus aureus (MRSA) and pan-resistant Acinetobacter baumannii—the researchers leveraged generative neural networks trained on atomic electrostatic surface potentials and protein-ligand binding pockets. Instead of screening pre-existing chemical libraries, the AI system traversed a theoretical chemical expanse of over 10^30 potential molecular configurations, proposing hundreds of chemically viable candidates with zero resemblance to legacy antibiotic scaffolds.\n\nSubsequent synthesis and biological testing of the top candidate candidates confirmed potent bactericidal activity with exceptionally low mammalian cellular toxicity. Crucially, serial passage experiments demonstrated that bacterial targets showed no observable genetic resistance mutations even after 30 days of continuous sublethal exposure, proving that AI-directed molecular de novo design can systematically outpace natural bacterial evolution.',
    keyPoints: [
      'Geometric diffusion models synthesize completely de novo molecular scaffolds that bypass legacy bacterial resistance mechanisms.',
      'Wet-lab assays confirm potent bactericidal efficacy against deadly clinical isolates including MRSA and pan-resistant Gram-negative bacteria.',
      'Serial passage trials reveal negligible emergence of bacterial resistance, unlocking a major defense paradigm against global superbugs.'
    ],
    whyItMatters: 'With antimicrobial resistance projected to kill over 10 million people annually by 2050, AI-driven de novo drug discovery offers humanity a rapid, scalable countermeasure against previously untreatable bacterial epidemics.',
    sentiment: 'Historic',
    sourceCredibility: 'Highest (World’s Foremost Peer-Reviewed Multidisciplinary Science Journal)'
  },
  {
    id: 'science-autonomous-ai-materials-discovery-clean-energy',
    title: 'Autonomous Robotic Laboratories and Graph Neural Networks Discover Next-Generation Solid-State Battery Electrolytes',
    category: 'RESEARCH',
    tier: 'research',
    source: 'Science',
    originalUrl: 'https://www.science.org/journal/science',
    readTime: '7 min read',
    date: 'Today, 05:40 AM',
    summary: 'Publishing in Science, researchers demonstrate an end-to-end autonomous closed-loop laboratory where graph neural networks formulate, synthesize, and experimentally test crystal structures, discovering lithium superionic conductors in weeks rather than decades.',
    fullContent: 'The synthesis of novel materials for energy storage has historically been an excruciating trial-and-error endeavor, taking decades to advance from theoretical calculations to benchtop stability. Today in Science, a joint team of materials scientists and roboticists presented a fully autonomous "self-driving laboratory" that has compressed decades of crystal lattice discovery into less than four weeks.\n\nUsing equivariant graph neural networks (GNNs) mapped to quantum-mechanical density functional theory (DFT), the computational framework predicted crystalline ionic conductivity across tens of thousands of uncharacterized metal-sulfide and halide stoichiometries. When high-confidence candidates were identified, the algorithm transmitted synthesis protocols directly to an automated robotic carousel that dispensed precursors, performed high-temperature vacuum sintering, and conducted impedance spectroscopy without human physical intervention.\n\nThe autonomous laboratory successfully synthesized a novel lithium-rich thiophosphate electrolyte exhibiting ionic conductivity values exceeding 25 mS/cm at room temperature—surpassing all commercial liquid electrolytes while remaining non-flammable and mechanically robust against lithium dendrite penetration, paving the path toward truly safe, ultra-dense solid-state electric vehicle batteries.',
    keyPoints: [
      'Closed-loop autonomous robotic laboratories synthesize and evaluate new crystal compounds at 100x the speed of traditional human research teams.',
      'Novel solid-state electrolyte discovered with room-temperature ionic conductivity surpassing 25 mS/cm, outpacing conventional battery liquids.',
      'The system pairs graph neural networks with density functional calculations to eliminate flammability and dendrite puncture risks in electric vehicle cells.'
    ],
    whyItMatters: 'Solid-state batteries represent the holy grail of clean mobility; by automating materials synthesis from prediction to physical validation, AI is accelerating the global transition toward fossil-free infrastructure.',
    sentiment: 'Breakthrough',
    sourceCredibility: 'Highest (Premier Global Science Research Journal)'
  }
];

const combined = [...existing, ...tier4];
fs.writeFileSync('scripts/dataset.json', JSON.stringify(combined, null, 2));
console.log('Tier 4 added successfully! Total items now:', combined.length);
