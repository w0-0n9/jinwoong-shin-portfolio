export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string; // Markdown content
  image?: string;
  htmlSource?: string;
  bilingual?: boolean;
  certification?: {
    title?: string;
    issuer: string;
    date: string;
    image: string;
    link: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "dell-gb10-edge-ai",
    title: "A Data Center on Your Desk: Dell Pro Max with GB10 for On-Prem & Edge AI",
    description: "What NVIDIA's GB10 Grace Blackwell superchip (Dell Pro Max with GB10 / DGX Spark) really is — unified memory, FP4, the CUDA stack — explained in plain language, then an analysis of how to put it to work on real industrial projects. Readable in English and Korean.",
    date: "2026-06-29",
    tags: ["GB10", "Grace Blackwell", "Edge AI", "On-prem LLM", "CUDA"],
    content: `A jargon-decoded breakdown and industrial use-case analysis of the NVIDIA GB10 Grace Blackwell superchip (Dell Pro Max with GB10 / DGX Spark): unified coherent memory, FP4/NVFP4, the sprinter-vs-decathlete trade-off, three real demos (local 120B LLM + RAG, an RL agent, on-prem driveway video), scaling out with NCCL, and where it actually fits on real projects (data residency, edge multimodal, PoC→production portability). Use the EN / 한국어 toggle to read it in either language.`,
    htmlSource: "/blog-html/dell-gb10-edge-ai.html?v=4",
    bilingual: true,
  },
  {
    slug: "llm-quantization-guide",
    title: "Run a 70B Model on Your Laptop: The Quantization Playbook",
    description: "How quantization shrinks giant LLMs to fit on a laptop — 8-bit vs 4-bit, GPTQ vs AWQ vs GGUF, plus pruning and knowledge distillation, with a hardware-to-tool cheat sheet. Readable in English and Korean.",
    date: "2026-06-29",
    tags: ["LLM", "Quantization", "GPTQ", "AWQ", "GGUF", "On-device AI"],
    content: `A practical guide to running large language models locally through quantization — why giant models are stuck in data centers, how lowering numeric precision (8-bit, 4-bit) saves up to 87.5% of memory, and how to pick between GPTQ, AWQ and GGUF for your hardware. Bonus: pruning and knowledge distillation. Use the EN / 한국어 toggle to read it in either language.`,
    htmlSource: "/blog-html/llm-quantization-guide.html?v=4",
    bilingual: true,
  },
  {
    slug: "rag-concepts-guide",
    title: "RAG, Properly: From Embeddings to Late Chunking",
    description: "Embeddings, chunking, vector DBs, hybrid search, rerankers, contextual retrieval and late chunking — the core concepts wired into one pipeline, distilled from three years of RAG projects. Readable in English and Korean.",
    date: "2026-06-29",
    tags: ["RAG", "LLM", "Embeddings", "Vector Search", "AI Engineering"],
    content: `A core-concepts guide to RAG — what it is, why retrieval (not generation) is where things break, and how embeddings, chunking, vector databases, hybrid search, rerankers, contextual retrieval and late chunking fit into a single pipeline. Use the EN / 한국어 toggle to read it in either language.`,
    htmlSource: "/blog-html/rag-concepts-guide.html?v=4",
    bilingual: true,
  },
  {
    slug: "aws-ai-practitioner",
    title: "Achieving AWS Certified AI Practitioner",
    description: "My journey to understanding AI/ML fundamentals and passing the AWS AI Practitioner exam.",
    date: "2026-01-15",
    tags: ["AWS", "Certification", "AI", "Machine Learning"],
    content: `Study notes and decision patterns from passing the AWS Certified AI Practitioner (AIF-C01) — SageMaker tools, inference options, Bedrock customization, RAG Knowledge Bases, prompts, generation parameters, evaluation metrics and core ML concepts. The full guide renders from the self-contained HTML.`,
    htmlSource: "/blog-html/aws-ai-practitioner.html?v=3",
    certification: {
      title: "AWS Certified AI Practitioner",
      issuer: "Amazon Web Services (AWS)",
      date: "Feb 2026",
      image: "/certifications/aws-ai-practitioner.png",
      link: "https://www.linkedin.com/in/w0-0n9/details/certifications/" // Fallback or specific link
    }
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
