import * as React from "react";
import Seo, { JsonLd } from "@/components/Seo";
import { PageHero, SiteFrame } from "@/components/SiteFrame";

const posts = [
  {
    slug: "what-is-cerebral-palsy",
    title: "What Is Cerebral Palsy? A Clear Guide for Kenyan Families",
    description: "A plain-language guide to cerebral palsy, movement differences, early support, therapy, and caregiver questions in Kenya.",
    category: "Understanding cerebral palsy",
    image: "/manus-storage/learning-play-v3_c6c612b9.jpg",
    body: [
      "Cerebral palsy is a group of conditions that affect movement, posture, and coordination. It begins in early development and can look different from one child to another. A diagnosis describes support needs; it does not describe a child's personality, potential, or future.",
      "Some children may experience differences in muscle tone, balance, walking, hand use, communication, swallowing, or vision. Many children benefit from a care team that listens closely to the child and family. Physiotherapy, occupational therapy, speech and language support, assistive technology, and inclusive education can all play a role when recommended by qualified professionals.",
      "For families in Kenya, the first practical step is often to write down what you notice, what your child enjoys, and which everyday routines feel difficult. Bring those observations to a qualified clinician or therapist. Early support is not about rushing a child; it is about making participation, comfort, play, and communication easier.",
    ],
  },
  {
    slug: "home-activities-for-cerebral-palsy",
    title: "Safe Home Activities for a Child with Cerebral Palsy",
    description: "Practical, play-based ideas caregivers can discuss with a qualified therapist to support movement, communication, and participation at home.",
    category: "Home therapy and play",
    image: "/manus-storage/therapy-session-v3_3f9ddfa4.jpg",
    body: [
      "Home activities can be small, joyful, and connected to real family routines. The best activity is one that is safe for your child, fits your space, and has been discussed with a qualified therapist when individual positioning or movement needs are involved.",
      "Try placing a favourite toy where your child can see and reach it, singing during dressing or mealtimes, taking turns with a simple game, or giving extra time for a response. These moments can support communication, attention, reaching, and shared enjoyment without turning every interaction into a test.",
      "Stop if your child seems distressed, unusually tired, in pain, or short of breath. Avoid forcing a stretch or copying an exercise from the internet without professional guidance. A therapist can help adapt play, seating, mobility, and communication ideas to your child's body and goals.",
    ],
  },
  {
    slug: "why-caregiver-learning-matters",
    title: "Why Caregiver Learning Matters in Cerebral Palsy Care",
    description: "How practical caregiver education can strengthen daily routines, confidence, referrals, and participation for children with cerebral palsy in Kenya and Africa.",
    category: "Caregiver learning",
    image: "/manus-storage/outreach-community-v3_d9150847.jpg",
    body: [
      "Caregivers are often the people who know a child's routines, preferences, signals, and strengths best. When families receive clear, respectful information, they can ask better questions, notice changes earlier, and make therapy ideas part of ordinary life.",
      "Learning does not replace clinical assessment. It helps families prepare for appointments, understand a care plan, practise agreed activities, and identify when they need to return to a health professional. In rural and urban communities alike, simple information in a familiar language can reduce uncertainty and make support feel more possible.",
      "KindStepCare is building a course model around practical learning: positioning, play, communication, mobility, referral pathways, and the confidence to advocate for inclusion at home, in school, and in the community.",
    ],
  },
  {
    slug: "cerebral-palsy-therapy-in-kenya",
    title: "Cerebral Palsy Therapy in Kenya: What Families Should Know",
    description: "A practical overview of physiotherapy, occupational therapy, speech support, referrals, and accessible rehabilitation for children with cerebral palsy in Kenya.",
    category: "Therapy and rehabilitation",
    image: "/manus-storage/therapy-session-v3_3f9ddfa4.jpg",
    body: [
      "Cerebral palsy therapy is usually guided by a child's goals, comfort, participation, and daily routines. A qualified team may recommend physiotherapy, occupational therapy, speech and language support, assistive technology, or other services.",
      "Families may use public hospitals, private clinics, community programmes, or mobile services depending on location and availability. Ask what the therapy is intended to support, how progress will be reviewed, and what can safely continue at home.",
      "KindStepCare is developing practical caregiver learning and tele-rehabilitation pathways to help families in Kenya stay connected to trusted guidance between appointments.",
    ],
  },
  {
    slug: "communication-and-cerebral-palsy",
    title: "Communication Support for Children with Cerebral Palsy",
    description: "How families can support communication, choice-making, and participation for a child with cerebral palsy at home, school, and in the community.",
    category: "Communication and participation",
    image: "/manus-storage/learning-play-v3_c6c612b9.jpg",
    body: [
      "Communication includes facial expression, movement, gestures, sounds, speech, signs, pictures, and communication devices. Every child deserves a way to express needs, preferences, ideas, and feelings.",
      "Give your child time to respond, offer meaningful choices, notice their signals, and share what you learn with teachers and therapists. A speech and language professional can help identify suitable supports.",
      "Communication support is not about making every child communicate in the same way. It is about making participation easier and ensuring the child's voice is respected.",
    ],
  },
  {
    slug: "cerebral-palsy-and-inclusive-schooling",
    title: "Cerebral Palsy and Inclusive Schooling in Kenya",
    description: "Practical questions for families and educators planning accessible learning, mobility, communication, and participation for children with cerebral palsy.",
    category: "Education and inclusion",
    image: "/manus-storage/outreach-community-v3_d9150847.jpg",
    body: [
      "Inclusive education begins with the assumption that a child belongs in their community and can contribute to classroom life. Support may include accessible routes, flexible seating, communication tools, additional time, and learning materials in suitable formats.",
      "Families can ask schools how they will support mobility, personal care, communication, fatigue, attendance, and participation in play and lessons. A therapist or education support professional can help turn those questions into practical adjustments.",
      "Progress should be considered broadly: learning, friendships, confidence, communication, independence, and enjoyment all matter.",
    ],
  },
  {
    slug: "cerebral-palsy-support-for-caregivers",
    title: "Cerebral Palsy Support for Caregivers: Building a Sustainable Routine",
    description: "Ways caregivers can organise appointments, home activities, rest, questions, and support networks while caring for a child with cerebral palsy.",
    category: "Family support",
    image: "/manus-storage/blog-caregiver-guide-v3_4a9dfa02.jpg",
    body: [
      "Caregiving can involve appointments, transport, school coordination, home activities, advocacy, and emotional work. A sustainable routine should include the caregiver's needs as well as the child's.",
      "Keep a short record of questions, changes, successful activities, and concerns before appointments. Share tasks where possible and accept practical help from trusted people without treating support as a failure.",
      "If you feel overwhelmed, persistently low, unsafe, or unable to cope, speak with a qualified health professional or local support service. Caregivers deserve care too.",
    ],
  },
];

export function Blog() {
  return <SiteFrame><Seo title="Cerebral Palsy Blog & Caregiver Learning in Kenya | KindStepCare" description="SEO-rich, plain-language articles about cerebral palsy, home therapy, caregiver learning, inclusion, and family support in Kenya and Africa." path="/blog" /><PageHero eyebrow="The KindStepCare journal" title="Useful knowledge for the next small step." copy="Practical guidance on cerebral palsy care, therapy, play, and family support." image="/manus-storage/blog-caregiver-guide-v3_4a9dfa02.jpg" /><main className="container py-16"><div className="grid gap-6 lg:grid-cols-3">{posts.map((post) => <article key={post.slug} className="group overflow-hidden rounded-[2rem] border border-[#d9e9e5] bg-white shadow-[0_16px_50px_rgba(26,42,38,.05)]"><img src={post.image} alt="" className="h-56 w-full object-cover transition duration-700 group-hover:scale-105" /><div className="p-7"><div className="eyebrow">{post.category}</div><h2 className="mt-4 font-serif text-3xl font-semibold">{post.title}</h2><p className="mt-4 leading-7 text-[#607a74]">{post.description}</p><a href={`/blog/${post.slug}`} className="mt-6 inline-flex font-bold text-[#0d7a6b]">Read the guide <span className="ml-2">→</span></a></div></article>)}</div><p className="mt-10 text-center text-sm font-semibold text-[#607a74]">More articles coming soon.</p></main></SiteFrame>;
  }

export function BlogArticle({ slug }: { slug: string }) {
  const post = posts.find((entry) => entry.slug === slug);
  if (!post) return <SiteFrame><Seo title="Article not found | KindStepCare" description="This KindStepCare article is not available." path={`/blog/${slug}`} /><main className="container py-24"><h1 className="font-serif text-5xl font-semibold">This article is not available.</h1><a href="/blog" className="mt-6 inline-flex font-bold text-[#0d7a6b]">Back to the blog →</a></main></SiteFrame>;
  return <SiteFrame><Seo title={`${post.title} | KindStepCare`} description={post.description} path={`/blog/${post.slug}`} image={post.image} type="article" /><JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.description, image: [post.image], author: { "@type": "Organization", name: "KindStepCare" }, publisher: { "@type": "Organization", name: "KindStepCare" } }} /><main className="container max-w-5xl py-16"><div className="grid gap-10 lg:grid-cols-[1fr_.72fr] lg:items-start"><article><div className="eyebrow">{post.category}</div><h1 className="mt-5 font-serif text-5xl font-semibold leading-[1.02] tracking-[-.04em] sm:text-7xl">{post.title}</h1><p className="mt-7 text-xl leading-9 text-[#607a74]">{post.description}</p><div className="mt-10 space-y-7 text-lg leading-9 text-[#3e5c56]">{post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><a href="/contact" className="mt-10 inline-flex rounded-full bg-[#f0a12b] px-6 py-4 font-bold text-[#1a2a26]">Talk with the care team →</a></article><aside className="sticky top-8 overflow-hidden rounded-[2rem] bg-[#e8f5f2] p-3"><img src={post.image} alt="" className="aspect-[4/5] w-full rounded-[1.5rem] object-cover" /><div className="p-5"><div className="eyebrow">A gentle reminder</div><p className="mt-3 leading-7 text-[#607a74]">Online information supports questions and confidence. It does not replace an assessment from a qualified health professional.</p></div></aside></div></main></SiteFrame>;
}

const faqs = [
  ["What is cerebral palsy?", "Cerebral palsy is a group of conditions that affect movement and posture because of differences in the developing brain. It affects each child differently and does not define a child's potential."],
  ["Can cerebral palsy be cured?", "There is no single cure, but support can improve comfort, participation, communication, movement, and independence. A qualified care team can help a family choose appropriate goals and therapies."],
  ["What therapies may help a child with cerebral palsy?", "Depending on a child's needs, a care team may recommend physiotherapy, occupational therapy, speech and language support, assistive technology, vision or hearing care, and other services. Recommendations should be individualised."],
  ["What can a caregiver do at home?", "Caregivers can create safe opportunities for play, communication, movement, rest, and participation. Discuss positioning, equipment, exercises, and home activities with a qualified therapist rather than forcing or copying exercises from the internet."],
  ["When should a family seek professional help?", "Seek professional advice when you have concerns about development, movement, feeding, communication, pain, seizures, breathing, sleep, or a sudden change in your child's abilities. Urgent symptoms need urgent medical care."],
  ["How can I support KindStepCare?", "You can sponsor caregiver learning, introduce us to a community or clinical partner, share trusted resources, or start a conversation through the contact page."],
];

export function FAQ() {
  return <SiteFrame><Seo title="Cerebral Palsy FAQ for Parents and Caregivers in Kenya | KindStepCare" description="Answers to common cerebral palsy questions about diagnosis, therapy, home activities, caregiver support, and when to seek professional help." path="/faq" /><JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }} /><PageHero eyebrow="Questions, answered with care" title="A clearer place to begin." copy="Plain-language answers for parents, caregivers, teachers, and community partners. Always discuss an individual child's needs with a qualified professional." image="/manus-storage/therapy-session-v3_3f9ddfa4.jpg" /><main className="container max-w-4xl py-16"><div className="space-y-3">{faqs.map(([question, answer]) => <details key={question} className="group rounded-2xl border border-[#d9e9e5] bg-white p-6"><summary className="cursor-pointer list-none pr-8 font-serif text-2xl font-semibold marker:hidden">{question}<span className="float-right text-[#f0a12b] transition group-open:rotate-45">＋</span></summary><p className="mt-4 max-w-3xl leading-8 text-[#607a74]">{answer}</p></details>)}</div><div className="mt-12 rounded-[2rem] bg-[#1a2a26] p-8 text-white"><div className="eyebrow text-[#f5a623]">Need a next step?</div><h2 className="mt-3 font-serif text-4xl font-semibold">Bring your questions to a real conversation.</h2><p className="mt-4 leading-7 text-[#c3ded8]">Our resources are a starting point. We welcome families, therapists, educators, and partners.</p><a href="/contact" className="mt-7 inline-flex rounded-full bg-[#f0a12b] px-5 py-3 font-bold text-[#1a2a26]">Contact KindStepCare →</a></div></main></SiteFrame>;
}
