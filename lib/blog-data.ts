export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string; // Markdown content
  image?: string;
  htmlSource?: string;
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
    slug: "aws-ai-practitioner",
    title: "Achieving AWS Certified AI Practitioner",
    description: "My journey to understanding AI/ML fundamentals and passing the AWS AI Practitioner exam.",
    date: "2026-01-15",
    tags: ["AWS", "Certification", "AI", "Machine Learning"],
    content: `
# AWS Certified AI Practitioner AIF-C01 Study Guide & Key Concepts

I recently passed the **AWS Certified AI Practitioner (AIF-C01)** exam. During my preparation, I compiled a comprehensive set of notes covering key services, concepts, and decision-making patterns. Here is a summary of the essential topics you need to know.

## 1. SageMaker Capabilities: Quick Identification

Knowing which SageMaker tool to use for a specific task is critical.

### ✅ Quick Matching Guide
- **SageMaker Model Dashboard**: Centralized **monitoring and management** of deployed models/endpoints (a "single pane of glass").
- **SageMaker Model Monitor**: Detects **data drift** or **performance degradation** *after* deployment.
- **SageMaker Clarify**: Detects **bias** and provides **explainability** (feature importance).
- **SageMaker JumpStart**: Quick access to **pre-trained/foundation models** for deployment or customization.
- **SageMaker Ground Truth**: A fully managed **data labeling** service (supports human-in-the-loop).
- **SageMaker Feature Store**: A centralized repository to store, share, and manage features for **consistency** across training and inference.
- **SageMaker Data Wrangler**: A visual tool for **data preparation** (cleaning, transformation) without writing code.
- **SageMaker A2I (Augmented AI)**: A workflow for **human review** of low-confidence model predictions.

---

## 2. SageMaker Inference Options

The choice depends on **latency requirements**, **payload size**, and **traffic patterns**.

| Inference Option | Latency | Payload Size | Traffic Pattern | Cost Structure | Best For... |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Real-time** | Very Low (ms) | Small | Constant / Predictable | Endpoint hourly rate (paid even when idle) | APIs requiring immediate response. |
| **Asynchronous** | Moderate | Large (**< 1GB**) | Bursty / Large payloads | Pay only for processing time | Processing large items where immediate response isn't critical. |
| **Batch** | High | Massive (S3) | Periodic | Computing time only | Processing vast amounts of historical data/logs. |
| **Serverless** | Low~Medium | Small | Intermittent / Unpredictable | Pay per request + duration | Apps with idle periods or unpredictable spikes. |

---

## 3. Bedrock Customization: Continued Pre-training vs. Fine-tuning

- **Continued Pre-training**:
  - Uses **Unlabeled Data**.
  - Goal: Adapt the model to a specific **domain** (e.g., medical, legal) or style.
  - *Keywords: domain adaptation, unlabeled data.*
- **Fine-tuning**:
  - Uses **Labeled Data**.
  - Goal: Optimize performance for a **specific task** (e.g., summarization, classification).
  - *Keywords: supervised, labeled, task-specific.*

> **Exam Tip**: Scenarios involving "enhancing knowledge in a specialized field (e.g., genomics)" often require a combination of Continued Pre-training (for domain knowledge) followed by Fine-tuning (for specific tasks).

---

## 4. Bedrock Throughput: On-Demand vs. Provisioned

- **On-Demand**:
  - Pay-as-you-go. Best for irregular usage or testing/PoC.
- **Provisioned Throughput**:
  - **Reserved capacity** for guaranteed performance and fixed interactions.
  - Required for custom (fine-tuned) models.
  - *Keywords: stable performance, reserved capacity, custom models.*

---

## 5. RAG: Knowledge Bases for Amazon Bedrock

- **RAG (Retrieval-Augmented Generation)**: The most cost-effective way to provide models with up-to-date information without retraining.
- **Knowledge Bases for Amazon Bedrock**: A fully managed end-to-end RAG solution. It handles ingestion, embedding, and vector storage automatically.
  - *Keywords: fully managed RAG, connect data sources directly.*

---

## 6. The 4 Key Elements of a Prompt

A well-structured prompt typically includes:
1.  **Instructions**: What the model should do.
2.  **Context**: Background information or role/persona.
3.  **Input Data**: The actual text/data to process.
4.  **Output Indicator**: Desired format or style of the response.

---

## 7. Generation Parameters

- **Top-K**: Limits the next token selection to the top **K** most likely candidates.
- **Top-P**: Selects from the top candidates whose cumulative probability reaches **P** (Nucleus Sampling).
- **Temperature**: Controls randomness. Higher = more creative/random; Lower = more deterministic/focused.
- **Stop Sequences**: A string that signals the model to **stop generating** text.

---

## 8. Context Window

- The limit on the amount of text (measured in **tokens**) the model can process in a single interaction (input + output).
- *Scenario*: "Why can't I analyze this entire long book at once?" → **Context window limitation**.

---

## 9. Security: VPC Endpoint for S3

- **Scenario**: A SageMaker instance inside a VPC with **no internet access** needs to access an S3 bucket.
- **Solution**: Use a **VPC Endpoint** (Gateway Endpoint) for S3. This keeps traffic entirely within the AWS network.

---

## 10. Security Risks: Poisoning vs. Prompt Leaking

- **Data Poisoning**: Injecting malicious data during training to compromise the model's behavior or output (e.g., causing it to suggest spam links).
- **Prompt Leaking**: The model is tricked into revealing its internal system instructions or private context from previous turns.

---

## 11. Evaluation Metrics

### Classification (Categorical)
- **Accuracy**: General correctness. Good for balanced datasets.
- **Recall (Sensitivity)**: Critical for minimizing False Negatives (e.g., detecting cancer, fraud).
- **Precision**: Critical for minimizing False Positives (e.g., spam filter filters important email).
- **F1-Score**: The harmonic mean of Precision and Recall. Best for imbalanced datasets.

### Regression (Numerical)
- **MAE (Mean Absolute Error)**: Intuitive average error.
- **RMSE (Root Mean Squared Error)**: Penalizes large errors more heavily.
- **R²**: Explains how well the model fits the variance of the data.

### NLP (Text)
- **BLEU**: For Translation (n-gram overlap).
- **ROUGE**: For Summarization (overlap with reference summary).
- **Perplexity**: For Text Generation (how "surprised" the model is by the next word; lower is better).

---

## 12. Data Sets: Train / Validation / Test

- **Training Set**: Used to learn.
- **Validation Set**: Used to tune hyper-parameters during training. **(Optional)**
- **Test Set**: Used for final evaluation. **(Mandatory)**

> **Exam Tip**: "Validation sets are optional" is a correct statement.

---

## 13. AWS AI Services: Quick Selection

- **Amazon Polly**: Text $\\to$ Speech (**TTS**)
- **Amazon Transcribe**: Speech $\\to$ Text (**STT**)
- **Amazon Comprehend**: NLP (Sentiment, Entities, PII)
- **Amazon Lex**: Chatbots / Conversational Interfaces
- **Amazon Rekognition**: Image/Video Analysis

---

## 14. FM vs. LLM

- **Foundation Model (FM)**: Broad term for models trained on vast data (can be multi-modal).
- **LLM (Large Language Model)**: A subset of FMs specialized in text/language.

---

## 15. Machine Learning Paradigms

| Type | Data Key | Goal | Examples |
| :--- | :--- | :--- | :--- |
| **Supervised** | Labeled | Predict outcomes | Regression, Neural Networks |
| **Unsupervised** | Unlabeled | Find hidden patterns | Clustering (K-Means), PCA |
| **Semi-supervised** | Mix | Lower labeling costs | Self-training |
| **Reinforcement** | Rewards | Learn strategy | Robotics, Game AI |
| **Transfer Learning** | Pre-trained | Utilize existing knowledge | Fine-tuning FMs |

---

## 16. Overfitting vs. Underfitting

### Underfitting (High Bias)
- **Cause**: Model is too simple or hasn't learned enough.
- **Fixes**:
    - Increase Epochs
    - Increase Model Complexity
    - Decrease Regularization

### Overfitting (High Variance)
- **Cause**: Model memorized the training data (including noise).
- **Fixes**:
    - **Early Stopping**
    - **Data Augmentation**
    - Increase Regularization / Dropout
    - Decrease Model Complexity
    - Increase Batch Size

---

Passing the AIF-C01 requires a solid understanding of "which service fits this specific constraint" (cost, latency, security). I hope these notes help you in your certification journey!
    `,
    htmlSource: "/blog-html/aws-ai-practitioner.html?v=1",
    certification: {
      title: "AWS Certified AI Practitioner",
      issuer: "Amazon Web Services (AWS)",
      date: "Feb 2026",
      image: "/certifications/aws-ai-practitioner-v3.png",
      link: "https://www.linkedin.com/in/w0-0n9/details/certifications/" // Fallback or specific link
    }
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
