/**
 * On AI —— 她自己写的判断。
 *
 * 本地六篇出自 CMU 课程的课后反思，每篇原文四段：讲者摘要 / 讲者原话 /
 * Personal Learning / Possible Use Case。这里只收后两段 —— 前两段是复述
 * 别人讲了什么、引用别人的原话，客座讲座不是公开场合，不该替讲者发布。
 *
 * ⚠️ 正文一字未改写。只做了三件机械修订：去掉抬头的 Andrew ID、
 *    统一弯引号、修掉几处笔误（lection → lecture 等，见下方 FIX 记录）。
 *    标题是为了做索引加的，原文只编号不起标题。
 *
 * 日期刻意留在明面上：这些是 2025 年初下的判断，不是现在的观点。
 *
 * 另外两篇在 Medium 上，这里只给出口不搬正文 —— Medium 是正式发表地，
 * 全文搬过来会分散权重，而且从此要维护两份。
 */

export type LocalPost = {
  kind: 'local'
  slug: string
  n: string
  when: string
  topic: string
  title: string
  /** 她的思考 */
  learning: string[]
  /** 她推演的用法 */
  useCase: string[]
}

export type ExternalPost = {
  kind: 'external'
  n: string
  when: string
  where: string
  title: string
  blurb: string
  href: string
  readingTime: string
}

export type Post = LocalPost | ExternalPost

export const POSTS: Post[] = [
  {
    kind: 'external',
    n: '08',
    when: 'September 2026',
    where: 'Medium',
    title: 'OpenAI Now Has Its Own Personal Agent. The Real Race Is for Your Trust.',
    blurb:
      'Everything that shipped at DevDay 2026, what people are saying about it, and why the agent war just changed shape.',
    href: 'https://medium.com/@oliviavvvv/openai-now-has-its-own-personal-agent-the-real-race-is-for-your-trust-fbe79461932a',
    readingTime: '11 min read',
  },
  {
    kind: 'external',
    n: '07',
    when: 'September 2026',
    where: 'Medium',
    title: 'Meta’s Bet: The Next AI Interface Is Something You Already Wear',
    blurb:
      'At Connect 2026, the star wasn’t a pair of glasses. It was Muse, and every device on stage was a doorway to it.',
    href: 'https://medium.com/@oliviavvvv/metas-bet-the-next-ai-interface-is-something-you-already-wear-3c06e38bbf27',
    readingTime: '7 min read',
  },
  {
    kind: 'local',
    slug: "focus-on-software",
    n: "06",
    when: 'Early 2025',
    topic: "AI and software careers",
    title: "Focus on software, not on being a programmer",
    learning: [
      "What resonated most with me was the impact on hiring and career paths. As someone pursuing a career in AI-driven product management, I noticed the growing trend of companies hiring fewer junior engineers. This raises critical questions about entry-level opportunities in tech and how I need to adapt to stay competitive. Ted’s insight that “to become a code cracker, focus on software instead of being a programmer” stood out to me, emphasizing that software design and ideas are now more valuable than raw coding skills. Mastering AI as a tool to enhance execution and productivity will be essential, allowing tech professionals to focus on higher-level problem-solving rather than routine coding tasks.",
      "Additionally, Ted’s presentation on using Windsurf demonstrated that anyone, regardless of technical background, can build software, which challenges the traditional way of who can be a software creator. This evolution of software development means that product managers will need to redefine their roles. As AI takes over execution, instead of just defining features and coordinating teams, PMs must rethink how they design, define, and deliver software products. The speed and accessibility of AI-driven development could lead to rapid iteration cycles, requiring adaptability and a strong strategic vision.",
      "Another key takeaway was how AI-generated code still requires human oversight. AI may write code efficiently, but challenges like hallucination, security vulnerabilities, and integration with real-world systems remain. This reinforces the need for human expertise in system architecture, debugging, and ethical AI considerations.",
    ],
    useCase: [
      "One of the most impactful use cases inspired by Ted’s session is AI-driven workflow optimization in software development. AI coding assistants, such as GitHub Copilot and emerging agentic coding tools, can streamline DevOps, automate repetitive coding tasks, and enhance productivity, allowing developers to focus on higher-level problem-solving.",
      "For instance, automated code generation can significantly reduce development time by providing optimized solutions for standard functions. AI can also handle real-time debugging and security analysis, flagging vulnerabilities before deployment. Additionally, AI-powered test case generation can improve software quality by automatically creating edge cases and integration tests.",
      "One practical implication of AI in software development is the transformation of B2B SaaS platforms. With AI automating coding tasks, low-code and no-code solutions will become even more powerful, enabling businesses to create complex applications with minimal engineering resources. For example, imagine a startup-building platform where entrepreneurs can describe their ideas in natural language, and AI generates a fully functional SaaS product—including backend, frontend, database, and even API integrations. This would significantly reduce the cost and time needed to launch a tech startup, shifting the emphasis from technical execution to strategic market differentiation.",
    ],
  },
  {
    kind: 'local',
    slug: "lines-of-code-is-a-bad-proxy",
    n: "05",
    when: 'Early 2025',
    topic: "Measuring engineers",
    title: "Lines of code is a bad proxy for contribution",
    learning: [
      "One of the key takeaways for me was how AI can play a role in enhancing software engineers' visibility within an organization. Traditionally, developer performance reviews rely on quantitative metrics like lines of code or JIRA task completions. However, these metrics often fail to capture the depth of contributions, problem-solving abilities, and technical leadership.",
      "Exceeds’ approach to using knowledge graphs, AI agents, and summarization techniques could bridge this gap by presenting qualitative insights that better reflect an engineer’s impact. This made me reflect on how AI can empower developers to take ownership of their career growth rather than just being measured by flawed productivity indicators.",
      "Another key takeaway was the challenge of balancing AI-powered automation with data privacy. Exceeds ensures data remains local rather than being uploaded to the cloud, a crucial factor for enterprise adoption. However, the reliance on OpenAI and Gemini models raises potential security concerns, which the company plans to address by developing its own small language models (SLMs) in the future.",
    ],
    useCase: [
      "A future application of Exceeds’ AI-driven skill tracking could be in technical hiring and talent benchmarking. Instead of relying solely on resumes and coding interviews, companies could evaluate candidates based on AI-generated insights from their actual contributions in open-source projects or past work experience. For instance, companies hiring for AI engineering roles could compare candidates' real-world coding experience against industry benchmarks. Exceeds could even help individuals identify skill gaps and recommend tailored learning paths—similar to how Workera personalizes AI career development.",
      "Additionally, Exceeds’ AI-generated training content and video summaries could revolutionize developer onboarding and continuous learning. By automating documentation and code explanations, new engineers could quickly understand projects, reducing onboarding time and increasing productivity.",
    ],
  },
  {
    kind: 'local',
    slug: "data-volume-to-data-quality",
    n: "04",
    when: 'Early 2025',
    topic: "Distributed computing",
    title: "The shift from data volume to data quality",
    learning: [
      "Robert’s insights on distributed computing demonstrated how Ray efficiently allocates AI workloads across multiple machines, enabling faster model training, data processing, and inference, which deepened my understanding of AI infrastructure. One of the most impactful takeaways was the realization that AI development is shifting from data volume to data quality, requiring more computational power for data curation and filtering. He also mentioned the importance of managing risks in the development of the AI model optimization process.",
      "Additionally, Robert’s emphasis on GPU-centric computing and GPU pod scalability helped me grasp the evolving hardware trends in AI, I resonate with the trend as I believe the demand for high-performance GPUs will increase just like the storage of mobile phones. Robert held a similar idea which is a bit counterintuitive from the current market reaction. Furthermore, he mentioned how Ray’s multi-machine scaling approach complements NVIDIA’s single-machine optimization, showcasing the potential for integrated AI solutions.",
      "Previously, concepts like distributed AI workflows felt abstract, but this lecture clarified their practical implications and inspired me to explore the infrastructure side of AI development further. The mention of real-world applications beyond traditional techs, such as drug discovery, quantitative trading, and coding assistance, reinforced how scalable AI infrastructure drives innovation across diverse industries.",
    ],
    useCase: [
      "A practical application inspired by this lecture is real-time fraud detection in financial transactions just like Ray’s first adopter Ant Financial. Legacy financial systems often struggle with outdated infrastructure, which limits their ability to implement robust AI models. By leveraging Ray’s distributed computing framework, financial institutions could deploy fraud detection models across multiple servers, significantly improving the speed and accuracy of transaction analysis. This would enhance security while efficiently managing high data volumes.",
      "Another compelling use case is e-commerce fulfilment optimization, similar to Instacart’s fulfillment pipeline. Large e-commerce platforms could adopt Ray’s global scheduling to balance workloads dynamically, avoiding bottlenecks during peak hours. This real-time resource allocation would improve logistics operations, reduce latency, and ensure cost-effective scaling while maintaining high performance during demand fluctuations.",
    ],
  },
  {
    kind: 'local',
    slug: "efficient-beats-powerful",
    n: "03",
    when: 'Early 2025',
    topic: "Cheap models, and who they help",
    title: "Efficient beats powerful",
    learning: [
      "The emergence of cost-effective AI models like DeepSeek is accelerating innovation and disrupting the market by lowering entry barriers and improving accessibility and affordability, benefiting not only model builders but also infrastructure and consumers. This resonated with me, as it highlights a critical shift—AI models must become not only more powerful but also computationally efficient, similar to how the human brain processes information. This trend will shape the future of AI development, driving the need for smarter, resource-efficient models, thus driving broader AI adoption and advancements, enhancing productivity and efficiency across society.",
      "This aligns with the guest speaker’s topic on transforming traditional industries like insurance by automating processes, improving claim accuracy, and supporting decision-making. However, human oversight is crucial to ensure fairness and quality. The integration of AI with human expertise underscores the need for a hybrid approach—leveraging data and algorithms while maintaining human involvement. His lecture expanded my perspective on AI’s applications in data-rich industries and its challenges in data acquisition. I look forward to seeing future advancements improve AI’s capabilities.",
    ],
    useCase: [
      "The emergence of DeepSeek AI offers transformative potential across industries. In healthcare, AI-driven models can enhance early disease detection by analyzing medical imaging and patient data, enabling earlier diagnoses and more effective treatments. In the energy sector, AI can optimize grid demand prediction by leveraging historical consumption patterns and external factors like weather conditions, improving energy distribution, reducing waste, and enhancing sustainability.",
      "For Andy’s company, AI-driven drone inspections present significant opportunities. AI-powered drones can autonomously assess infrastructure, detect faults, and prevent costly failures in critical areas like bridges, power lines, and oil pipelines, improving efficiency and minimizing human risk. In real estate, AI-enhanced drones can generate high-resolution imaging and 3D models for accurate property valuations based on structural conditions, lot size, and market trends. When combined with predictive analytics, this technology helps property owners and investors anticipate maintenance needs, reducing costly repairs and optimizing asset value. This approach particularly benefits large-scale property management firms, HOAs, and commercial real estate developers.",
    ],
  },
  {
    kind: 'local',
    slug: "multimodal-is-trial-and-error",
    n: "02",
    when: 'Early 2025',
    topic: "AI infrastructure",
    title: "Multimodal work is mostly trial and error",
    learning: [
      "The lecture offered a clear and comprehensive insight into AI infrastructure, emphasizing its foundational role in driving advancements across industries. What resonated most with me was the discussion on the rise of multi-modality AI, which is significantly more data-intensive and involves extensive trial-and-error development. This emphasized the importance of upgrading tools and infrastructure to handle the increasing complexity of AI workloads. Additionally, Zhe’s advice to \"get hands dirty with workflows\" and his observation that AI-assisted coding has made learning and building \"100x easier\" were particularly impactful. These points highlighted how accessible and transformative AI has become, empowering individuals to learn and innovate more efficiently.",
    ],
    useCase: [
      "AI infrastructure has the potential to transform healthcare. GPUs excel in data-intensive tasks like gene sequencing and imaging, making them ideal for biomedical applications. For instance, systems like IBM’s Watson for Oncology provide evidence-based, personalized treatment recommendations, streamlining decisions and improving outcomes. Leveraging advanced GPUs and distributed computing frameworks, healthcare systems can integrate multi-modal data—such as patient histories, imaging, and genomic profiles—enabling precision medicine. Scaling such AI systems can drive innovations in mental health, social services, and beyond, enhancing societal outcomes.",
    ],
  },
  {
    kind: 'local',
    slug: "build-on-what-works",
    n: "01",
    when: 'Early 2025',
    topic: "Generative AI in robotics",
    title: "Build on what already works",
    learning: [
      "The lecture underscored the importance of building on existing systems rather than replacing",
      "them, demonstrating how generative AI complements traditional algorithms. This approach",
      "showed how innovation thrives by addressing limitations while enhancing current technologies. A key takeaway was the importance of robust datasets, especially corner cases, to optimize",
      "performance in robotics. Variability in robot types and grippers requires precise data collection to",
      "ensure accuracy and reliability. This reinforced the critical role of data quality in AI applications.",
      "The discussion on precision and trust in robotics highlighted the stakes in high-risk applications",
      "like robotic surgeries, where fail-safe systems are crucial. Professor Dai’s insights on identifying",
      "critical use cases inspired me to align AI’s unique strengths with impactful challenges, ensuring",
      "meaningful applications that deliver high value and scalability.",
    ],
    useCase: [
      "mBodiOS can revolutionize autonomous warehousing by enabling robots to perform tasks like",
      "picking, packing, sorting, and inventory management using natural language commands. For",
      "example, operators could direct robots to \"Pick items for Order #12345\" or \"Reorganize",
      "inventory by category,\" eliminating the need for programming expertise. Its distributed",
      "computing ensures seamless coordination across multiple robots, making it ideal for large-scale",
      "operations in industries like e-commerce (e.g., Amazon) or logistics (e.g., FedEx). Future",
      "implications include predictive logistics driven by data insights, optimizing resources,",
      "accelerating delivery, and setting a new standard for efficient and adaptive supply chain",
    ],
  },
]
