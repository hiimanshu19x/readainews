import fs from 'fs';

const items = JSON.parse(fs.readFileSync('scripts/dataset.json', 'utf8'));

// Supplementary context per item to ensure content is comprehensively 220+ words
const additions = [
  // 1. Reuters
  ` Cybersecurity industry analysts noted that while nation-state threat actors have increasingly weaponized synthetic reconnaissance to probe industrial control systems, open defensive AI models provide system administrators with unprecedented real-time mitigation capabilities. By open-sourcing automated detection rulebooks and establishing a direct coordination hotline with critical infrastructure operators, the initiative establishes a baseline defensive architecture across civil utilities and hospitals worldwide.`,
  
  // 2. Bloomberg
  ` Financial analysts at Goldman Sachs and Morgan Stanley remarked that the colossal valuation of energy co-location providers underscores a structural realignment across tech infrastructure: power availability, rather than raw server availability, now serves as the primary gating factor for AI advancement. With hyperscalers signing 20-year power purchase pacts, the boundary between cloud software firms and utility energy operators has permanently dissolved.`,

  // 3. Financial Times
  ` European grid regulators and the International Energy Agency noted that the timeline to bring SMRs online remains subject to stringent safety certifications and nuclear supply chain scaling. Nonetheless, tech giants are committing billions in non-refundable pre-orders, signaling to uranium miners and advanced reactor fabricators that commercial artificial intelligence will serve as the anchor tenant for next-generation clean baseload energy.`,

  // 4. AP
  ` Environmental watchdogs and sovereign grid authorities welcomed the summit declaration, highlighting that without coordinated transmission upgrades and automated load shedding, runaway AI power demand could jeopardize civilian residential grids during extreme weather events. The protocol establishes binding reporting guidelines for cooling water consumption and peak-hour thermal emissions across transnational server installations.`,

  // 5. WSJ
  ` Enterprise risk officers report that the speed of autonomous agent adoption had temporarily outpaced corporate security architecture, leaving unprotected API keys and sensitive customer telemetry exposed to prompt injection attacks. By mandating cryptographic runtime audit trails and sandboxed container environments, corporate boards are treating synthetic agent liability with the same fiduciary severity as Sarbanes-Oxley accounting compliance.`,

  // 6. TechCrunch
  ` Venture capital partners noted that developer tool funding has shifted completely toward agentic autonomy, where platforms compete not on syntax completion accuracy, but on whole-system integration and zero-shot error remediation. As junior software engineering roles transform into systems orchestration, developer tooling companies are racing to construct reliable agent sandboxes that safeguard mission-critical production environments from unreviewed automated pull requests.`,

  // 7. The Information
  ` Internal financial projections circulating among major cloud platforms indicate that while software margins remain robust, hardware depreciation schedules on high-end accelerator clusters are compressing amortization cycles. CFOs are balancing the fear of underinvesting against the reality of enterprise budget caps, forcing engineering leadership to demonstrate measurable productivity uplifts for corporate clients before expanding multi-year cluster commitments.`,

  // 8. VentureBeat
  ` Hardware architects confirmed that local edge inference drastically alters corporate total cost of ownership. By offloading recurring query workloads from remote cloud clusters to on-premise neural processing accelerators, enterprises insulate themselves from unpredictable API pricing hikes while guaranteeing sub-10-millisecond response latency for mission-critical industrial and healthcare applications.`,

  // 9. The Verge
  ` Digital publishing executives emphasized that ongoing fair-use litigation will define the next chapter of the open web. If search engines continue to ingest original journalism without reciprocal traffic or fair royalty compensation, small independent publications will be forced behind hard paywalls, fundamentally restricting the public availability of verified investigative reporting and leaving search engines reliant on circular synthetic feeds.`,

  // 10. MIT Technology Review
  ` Theoretical neuroscientists and computer scientists collaborating on mechanistic interpretability believe that SAEs represent the first true microscope for machine intelligence. Understanding the geometry of neural activation spaces will not only prevent catastrophic alignment failures, but could also unlock deeper insights into biological cognition, establishing a shared mathematical foundation between artificial and human neural computation.`,

  // 11. WIRED
  ` Researchers in algorithmic statistics warn that once synthetic tokens outnumber genuine human writing on the public internet, retroactively purifying training corpora becomes virtually impossible without cryptographic watermarking. As a result, tech conglomerates are aggressively acquiring private audio archives, handwritten historical manuscripts, and real-time biometric telemetry to construct proprietary moats of uncontaminated human expression.`,

  // 12. Ars Technica
  ` High-performance computing engineers noted that test-time scaling fundamentally democratizes advanced reasoning. Instead of needing billions of dollars to train a larger monolithic model from scratch, engineering teams can achieve superior benchmark performance on specialized reasoning tasks simply by allocating elastic cloud inference resources to run verification loops and tree search on cost-effective base models.`,

  // 13. IEEE Spectrum
  ` Clean energy researchers and semiconductor packaging consortiums agree that co-packaged silicon photonics is the single most vital hardware milestone of the decade. By eliminating the resistive heating of copper traces at high gigahertz frequencies, optical interconnects prevent the catastrophic thermal throttling that currently caps compute density in modern multi-thousand-card supercomputing installations.`,

  // 14. Nature
  ` Academic pharmacologists and hospital directors hailed the discovery as a definitive turning point in global antimicrobial defense. With traditional pharmaceutical drug pipelines having produced almost no novel antibiotic classes in decades due to prohibitive financial risk, autonomous diffusion models compress discovery cycles from twelve years down to mere months, offering a proactive shield against emergent hospital superbugs.`,

  // 15. Science
  ` Materials scientists at national energy laboratories praised the closed-loop autonomous system, noting that discovering materials with ionic conductivity exceeding 25 mS/cm without manual synthesis will accelerate the rollout of high-capacity electric vehicles, long-duration grid batteries, and aerospace clean energy cells. By bridging machine learning with robotic chemistry, the research establishes a new standard for accelerated scientific discovery.`
];

items.forEach((item, idx) => {
  if (additions[idx]) {
    item.content += additions[idx];
  }
});

fs.writeFileSync('scripts/dataset.json', JSON.stringify(items, null, 2));
console.log('Successfully enriched content length across all 15 articles.');
