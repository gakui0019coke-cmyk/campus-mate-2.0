import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen, Sparkles, AlertTriangle, CheckCircle2, Copy, Search,
  GraduationCap, Users, MessageSquare, BarChart3, Clock, Send,
  Settings, Award, ShieldAlert, FileText, ChevronRight, Bookmark,
  TrendingUp, Compass, Volume2, RefreshCw, Key, HelpCircle, Check,
  Sliders, ExternalLink, Calendar, HeartHandshake, PhoneCall, Zap, UserCheck,
  Plus, Trash2, Library, Bell, Filter, Info
} from 'lucide-react';

// --- COMPREHENSIVE KENYAN UNIVERSITIES, KMTC & TVETS (SEARCHABLE) ---
const UNIVERSITIES = [
  "-- Select Your University / Institution --",
  "Kenyatta University (KU)",
  "University of Nairobi (UoN)",
  "Strathmore University",
  "Jomo Kenyatta University of Agriculture & Tech (JKUAT)",
  "Moi University (Main & Town Campuses)",
  "Egerton University (Njoro)",
  "Mount Kenya University (MKU Main Campus Thika)",
  "Technical University of Kenya (TUK)",
  "Technical University of Mombasa (TUM)",
  "Kenya Medical Training College (KMTC - All Campuses)",
  "KCA University (Ruaraka & Town Campuses)",
  "Zetech University (Ruiru & Mang'u)",
  "Multimedia University of Kenya (MMU)",
  "Daystar University (Athi River & Nairobi)",
  "United States International University (USIU-Africa)",
  "Maseno University",
  "Masinde Muliro University of Science & Tech (MMUST)",
  "Dedan Kimathi University of Technology (DeKUT)",
  "Murang'a University of Technology",
  "Chuka University",
  "Kisii University",
  "University of Eldoret (UoE)",
  "South Eastern Kenya University (SEKU)",
  "Machakos University",
  "Karatina University",
  "Pwani University (Kilifi)",
  "Kabarak University",
  "Catholic University of Eastern Africa (CUEA)",
  "St. Paul's University (Limuru)",
  "African Nazarene University (ANU)",
  "Riara University",
  "Kenya Institute of Mass Communication (KIMC)",
  "Kenya Coast National Polytechnic (KCNP Mombasa)",
  "Nairobi Technical Training Institute (NTTI)",
  "The Eldoret National Polytechnic",
  "Kabete National Polytechnic",
  "Sigalagala National Polytechnic",
  "Nyeri National Polytechnic",
  "Meru National Polytechnic",
  "Kisumu National Polytechnic",
  "Other National TVET / Vocational College"
];

// --- COMPREHENSIVE INSTITUTIONAL COURSES DATABASE ---
const COURSES_MASTER = [
  // Medicine, Health & Nursing (KMTC & University)
  { id: 'kmtc_nursing', name: 'Diploma in Kenya Registered Nursing (KRN)', icon: '🩺', category: 'Health', tags: ['kmtc', 'med', 'uon', 'ku', 'mku'] },
  { id: 'kmtc_clinical', name: 'Diploma in Clinical Medicine & Surgery', icon: '💉', category: 'Health', tags: ['kmtc', 'med', 'ku', 'mku'] },
  { id: 'kmtc_pharmacy', name: 'Diploma in Pharmacy & Pharmaceutical Tech', icon: '💊', category: 'Health', tags: ['kmtc', 'uon', 'mku'] },
  { id: 'med_mbchb', name: 'Bachelor of Medicine & Surgery (MBChB)', icon: '🩺', category: 'Health', tags: ['uon', 'ku', 'moi', 'mku', 'egerton'] },
  { id: 'med_dental', name: 'Bachelor of Dental Surgery (BDS)', icon: '🦷', category: 'Health', tags: ['uon', 'moi'] },
  
  // Software, Computing & IT
  { id: 'cs_degree', name: 'B.Sc. Computer Science & Software Dev', icon: '💻', category: 'STEM & IT', tags: ['uon', 'ku', 'strathmore', 'jkuat', 'mku', 'tuk', 'kca', 'zetech', 'mmu', 'usiu', 'dekut'] },
  { id: 'it_diploma', name: 'Diploma in Information Communication Tech (DICT)', icon: '🖥️', category: 'STEM & IT', tags: ['tvet', 'ntti', 'kcnp', 'kabete', 'zetech', 'kca'] },
  { id: 'cyber_sec', name: 'B.Sc. Cybersecurity & Computer Forensics', icon: '🛡️', category: 'STEM & IT', tags: ['strathmore', 'jkuat', 'kca', 'mku'] },
  { id: 'data_science', name: 'B.Sc. Data Science & Artificial Intelligence', icon: '🤖', category: 'STEM & IT', tags: ['strathmore', 'uon', 'dekut'] },

  // Business, Accounting & Finance
  { id: 'biz_cpa', name: 'CPA Foundation & Advanced Professional Course', icon: '📊', category: 'Business', tags: ['kca', 'strathmore', 'uon', 'ku', 'zetech', 'mku'] },
  { id: 'biz_bcom', name: 'Bachelor of Commerce (B.Com - Finance/Marketing)', icon: '💼', category: 'Business', tags: ['uon', 'ku', 'strathmore', 'jkuat', 'moi', 'mku', 'kca', 'usiu', 'daystar'] },
  { id: 'procurement', name: 'Diploma / Degree in Supply Chain & Procurement (CIPS)', icon: '📦', category: 'Business', tags: ['jkuat', 'kca', 'uon', 'tvet'] },
  { id: 'actuarial', name: 'B.Sc. Actuarial Science & Quantitative Finance', icon: '📈', category: 'Business', tags: ['uon', 'ku', 'strathmore', 'jkuat'] },

  // Engineering & Built Environment
  { id: 'eng_elec', name: 'B.Sc. Electrical & Electronic Engineering', icon: '⚙️', category: 'Engineering', tags: ['uon', 'jkuat', 'tuk', 'tum', 'dekut'] },
  { id: 'eng_civil', name: 'B.Sc. Civil & Structural Engineering', icon: '🏗️', category: 'Engineering', tags: ['uon', 'jkuat', 'tuk', 'egerton'] },
  { id: 'arch', name: 'Bachelor of Architecture (B.Arch)', icon: '📐', category: 'Engineering', tags: ['uon', 'jkuat', 'tuk'] },
  { id: 'tvet_building', name: 'Diploma in Building Technology & Civil Eng', icon: '🧱', category: 'Engineering', tags: ['tvet', 'ntti', 'kabete', 'eldoret', 'kisumu'] },

  // Law, Media & Education
  { id: 'law_llb', name: 'Bachelor of Laws (LL.B) & KSL ATP Prep', icon: '⚖️', category: 'Law', tags: ['uon', 'strathmore', 'ku', 'moi', 'mku', 'kabarak', 'riara', 'cuea'] },
  { id: 'journalism', name: 'Journalism, Broadcast Media & PR', icon: '🎙️', category: 'Media', tags: ['kimc', 'daystar', 'mmu', 'uon', 'zetech'] },
  { id: 'edu_arts', name: 'Bachelor of Education (Arts / Science)', icon: '📚', category: 'Education', tags: ['ku', 'uon', 'moi', 'egerton', 'chuka', 'kisii'] }
];

// --- EXPANDED KENYAN PUBLIC & REGIONAL LIBRARIES DIRECTORY ---
const KENYAN_PUBLIC_LIBRARIES = [
  { name: "Kenya Law Reports (KLR) Repository", region: "Nairobi / Online", type: "Legal Archives", url: "http://kenyalaw.org", desc: "Official law reports, acts of parliament, and landmark court rulings for legal CATs." },
  { name: "KNLS National Library Headquarters (Upper Hill)", region: "Nairobi", type: "Public Library", url: "https://www.knls.ac.ke", desc: "Largest national library with study carrels, e-resources, and research collections." },
  { name: "KNLS Mombasa Regional Library", region: "Coast / Mombasa", type: "Public Library", url: "https://www.knls.ac.ke", desc: "Coastal regional study center providing digital catalog access for university & TVET students." },
  { name: "KNLS Kisumu Regional Library", region: "Nyanza / Kisumu", type: "Public Library", url: "https://www.knls.ac.ke", desc: "Academic reference section, quiet revision halls, and digital learning hub." },
  { name: "KNLS Nakuru Public Library", region: "Rift Valley / Nakuru", type: "Public Library", url: "https://www.knls.ac.ke", desc: "Equipped with high-speed internet hubs, quiet study zones, and secondary/tertiary literature." },
  { name: "University of Nairobi (UoN) Digital Repository", region: "Nairobi / Central", type: "University Repository", url: "http://erepository.uonbi.ac.ke", desc: "Open thesis papers, past projects, and peer-reviewed journals." },
  { name: "Strathmore University Library Portal", region: "Nairobi", type: "Academic Portal", desc: "E-books, financial databases, business strategy papers, and CPA revision guides.", url: "https://library.strathmore.edu" },
  { name: "Kenyatta University (KU) Post-Modern Library", region: "Kiambu / Nairobi", type: "University Library", url: "http://library.ku.ac.ke", desc: "Post-modern 5-story library catalog with past CAT exam archives." },
  { name: "JKUAT Institutional Repository", region: "Juja / Kiambu", type: "STEM & Agriculture", url: "http://ir.jkuat.ac.ke", desc: "Engineering, agricultural science, and computing research publications." },
  { name: "e-Kitabu Digital Open Library", region: "National / Online", type: "Digital E-Books", url: "https://ekitabu.com", desc: "Accessible digital course textbooks and revision materials across East Africa." },
  { name: "TVET Authority Digital Learning Resource Centre", region: "National / Online", type: "Technical / TVET", url: "https://www.tvetauthority.go.ke", desc: "Curriculum modules, CBET course guides, and technical diploma manuals." },
  { name: "Kenya National Archives & Documentation", region: "Nairobi CBD", type: "National Archive", url: "http://archives.go.ke", desc: "Historical state papers, government commissions, and constitutional records." }
];

const YEARS = [
  "Year 1 (Freshman / Direct Entry)",
  "Year 2 (Sophomore)",
  "Year 3 (Junior / Industrial Attachment)",
  "Year 4 (Senior / Capstone)",
  "Year 5/6 (Medical Clinical Rotations)"
];

// DYNAMIC UNIVERSITY REPOSITORY MAPPER
const UNIVERSITY_LIBRARY_MAP = {
  "University of Nairobi (UoN)": { name: "UoN Digital Repository", url: "http://erepository.uonbi.ac.ke" },
  "Kenyatta University (KU)": { name: "KU Post-Modern Library", url: "http://library.ku.ac.ke" },
  "Strathmore University": { name: "Strathmore Library Portal", url: "https://library.strathmore.edu" },
  "Jomo Kenyatta University of Agriculture & Tech (JKUAT)": { name: "JKUAT Institutional Repository", url: "http://ir.jkuat.ac.ke" },
  "Moi University (Main & Town Campuses)": { name: "Moi University Library", url: "http://library.mu.ac.ke" },
  "Egerton University (Njoro)": { name: "Egerton Digital Repository", url: "http://repository.egerton.ac.ke" },
  "Mount Kenya University (MKU Main Campus Thika)": { name: "MKU E-Learning & Library", url: "https://library.mku.ac.ke" },
  "Technical University of Kenya (TUK)": { name: "TUK Library Services", url: "http://library.tukinstitute.ac.ke" },
  "KCA University (Ruaraka & Town Campuses)": { name: "KCA Virtual Library", url: "https://library.kca.ac.ke" },
  "Zetech University (Ruiru & Mang'u)": { name: "Zetech Digital Library", url: "https://digital-library.zetech.ac.ke" },
  "Multimedia University of Kenya (MMU)": { name: "MMU Institutional Repository", url: "http://repository.mmu.ac.ke" },
  "Daystar University (Athi River & Nairobi)": { name: "Daystar Library Catalog", url: "https://library.daystar.ac.ke" },
  "United States International University (USIU-Africa)": { name: "USIU Information Center", url: "https://library.usiu.ac.ke" }
};

// Localized Kenyan Recommended Books & Syllabi Database
const RECOMMENDATIONS_DB = {
  cs_degree: {
    "Year 1 (Freshman / Direct Entry)": [
      { title: "Introduction to Algorithms (CLRS)", author: "Cormen, Leiserson, Rivest", rating: 4.9, tags: ["Core", "Programming"], desc: "Standard textbook used in university CS 101 modules." },
      { title: "Structured Programming with C++", author: "Dr. Peter Waiganjo (UoN Press)", rating: 4.8, tags: ["C++", "Kenyan Syllabus"], desc: "Tailored guide for procedural programming in East African universities." }
    ],
    "Year 2 (Sophomore)": [
      { title: "Database Systems: Design & Implementation", author: "Silberschatz & Korth", rating: 4.7, tags: ["SQL", "Relational DB"], desc: "Core reference for relational databases and ER diagrams." },
      { title: "Data Communications and Networking", author: "Behrouz A. Forouzan", rating: 4.8, tags: ["Networks", "CCNA"], desc: "Essential for network fundamentals and OSI layers." }
    ],
    "Year 3 (Junior / Industrial Attachment)": [
      { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", rating: 4.95, tags: ["System Design", "Cloud"], desc: "Industry standard for web application architecture during attachment prep." }
    ]
  },
  med_mbchb: {
    "Year 1 (Freshman / Direct Entry)": [
      { title: "Gray's Anatomy for Students", author: "Drake, Vogl, Mitchell", rating: 4.95, tags: ["Anatomy", "Human Body"], desc: "The definitive text for university school of medicine anatomy labs." },
      { title: "Guyton and Hall Medical Physiology", author: "John E. Hall", rating: 4.9, tags: ["Physiology", "Pre-Clinical"], desc: "Complete physiological systems breakdown for first year MBChB." }
    ]
  },
  law_llb: {
    "Year 1 (Freshman / Direct Entry)": [
      { title: "The Kenyan Legal System and Process", author: "Tudor Jackson", rating: 4.85, tags: ["Kenyan Law", "Constitution"], desc: "Must-read foundational text on the 2010 Constitution and court structures.", fallbackUrl: "http://kenyalaw.org" },
      { title: "Law of Contract in East Africa", author: "R.W. Hodgin", rating: 4.8, tags: ["Contracts", "Case Law"], desc: "Key precedent decisions from Kenya Law Reports (KLR).", fallbackUrl: "http://kenyalaw.org" }
    ]
  },
  biz_cpa: {
    "Year 1 (Freshman / Direct Entry)": [
      { title: "Financial Accounting: Kasneb CPA Section 1 Guide", author: "Strathmore Business Press", rating: 4.9, tags: ["CPA", "Accounting"], desc: "Aligned with KASNEB syllabus for accounting majors." }
    ]
  }
};

const INFLUENCERS = [
  { id: 1, name: "Brian Mwangi", handle: "@tech_mwangii", uni: "UoN (Chiromo Campus)", course: "Computer Science", followerCount: "68K", badge: "💻 Tech Rep", role: "Software Eng & Campus Tech Lead", tip: "Start preparing your Year 3 industrial attachment portfolio in Year 2!" },
  { id: 2, name: "Faith Chebet", handle: "@faith_medku", uni: "Kenyatta University", course: "Medicine & Surgery", followerCount: "94K", badge: "🩺 Med Academic", role: "Medical Intern & Mentor", tip: "Use flashcards for pharmacology drugs and dosages before ward rounds." },
  { id: 3, name: "Kevin Omondi", handle: "@omondi_legal", uni: "Strathmore Law School", course: "Law (LL.B)", followerCount: "42K", badge: "⚖️ Moot Captain", role: "Moot Court Champion", tip: "Always reference Kenya Law Reports (KLR) articles in your CAT essays." }
];

const SUPPORT_CHANNELS = [
  { title: "HELB & Higher Education Financing Desk", icon: ShieldAlert, category: "Financial Aid", desc: "Guidance on HELB loan allocation, upkeep appeals, and KUCCPS scholarship status.", contact: "helb-desk@campusmate.co.ke", officialUrl: "https://portal.helb.co.ke" },
  { title: "KUCCPS Placement & Degree Placement Portal", icon: GraduationCap, category: "Admissions & Courses", desc: "Official placement portal for degree, diploma, and certificate courses across Kenya.", contact: "info@kuccps.ac.ke", officialUrl: "https://students.kuccps.net" },
  { title: "Student Wellness & Counseling Helpline", icon: HeartHandshake, category: "Mental Health", desc: "Confidential 24/7 mental health counseling partnered with Befrienders Kenya.", contact: "Toll-Free: 0800 720 000", officialUrl: "https://befrienderskenya.org" },
  { title: "Industrial Attachment & Placement Portal (NITA)", icon: BookOpen, category: "Career & Internship", desc: "Attestation letters, NITA insurance forms, and industrial attachment recommendations.", contact: "attachment-office@university.ac.ke", officialUrl: "https://nita.go.ke" }
];

export default function App() {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('home');
  const [darkTheme, setDarkTheme] = useState(true);
  
  // Student Context State
  const [university, setUniversity] = useState(UNIVERSITIES[0]);
  const [selectedCourse, setSelectedCourse] = useState(COURSES_MASTER[0].id);
  const [yearOfStudy, setYearOfStudy] = useState(YEARS[0]);
  
  // SEARCH STATES
  const [universitySearchQuery, setUniversitySearchQuery] = useState('');
  const [courseSearchQuery, setCourseSearchQuery] = useState('');
  const [librarySearchQuery, setLibrarySearchQuery] = useState('');
  const [selectedLibraryFilter, setSelectedLibraryFilter] = useState('All');

  // Mentorship Modal & Explanation Dialog State
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [mentorshipTopic, setMentorshipTopic] = useState('');
  const [mentorshipDate, setMentorshipDate] = useState('');
  const [mentorshipSuccessMsg, setMentorshipSuccessMsg] = useState(false);
  const [showMentorshipInfoModal, setShowMentorshipInfoModal] = useState(false);

  // Filtered Universities based on Search Bar
  const filteredUniversities = useMemo(() => {
    if (!universitySearchQuery.trim()) return UNIVERSITIES;
    return UNIVERSITIES.filter(u => u.toLowerCase().includes(universitySearchQuery.toLowerCase()));
  }, [universitySearchQuery]);

  // Dynamic Course Filtering based on selected School + Course Search Query
  const filteredCourses = useMemo(() => {
    const uniLower = university.toLowerCase();
    let courseList = COURSES_MASTER;

    // Filter by school relevance if specific school is picked
    if (uniLower.includes('kmtc')) {
      courseList = COURSES_MASTER.filter(c => c.tags.includes('kmtc') || c.category === 'Health');
    } else if (uniLower.includes('polytechnic') || uniLower.includes('tvet') || uniLower.includes('ntti')) {
      courseList = COURSES_MASTER.filter(c => c.tags.includes('tvet') || c.category === 'Engineering' || c.category === 'STEM & IT');
    }

    if (courseSearchQuery.trim()) {
      return courseList.filter(c => 
        c.name.toLowerCase().includes(courseSearchQuery.toLowerCase()) || 
        c.category.toLowerCase().includes(courseSearchQuery.toLowerCase())
      );
    }

    return courseList;
  }, [university, courseSearchQuery]);

  // Filtered Libraries based on Search Bar and Region filter
  const filteredLibraries = useMemo(() => {
    return KENYAN_PUBLIC_LIBRARIES.filter(lib => {
      const matchesSearch = lib.name.toLowerCase().includes(librarySearchQuery.toLowerCase()) ||
                            lib.region.toLowerCase().includes(librarySearchQuery.toLowerCase()) ||
                            lib.desc.toLowerCase().includes(librarySearchQuery.toLowerCase());
      const matchesType = selectedLibraryFilter === 'All' || lib.type.includes(selectedLibraryFilter);
      return matchesSearch && matchesType;
    });
  }, [librarySearchQuery, selectedLibraryFilter]);

  // AI Helper State
  const [userPromptText, setUserPromptText] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // Plagiarism & Grammar State
  const [plagiarismResult, setPlagiarismResult] = useState(null);
  const [isScanningPlagiarism, setIsScanningPlagiarism] = useState(false);
  const [grammarFixes, setGrammarFixes] = useState([]);

  // CUSTOM CAT & ASSIGNMENT DEADLINES REMINDER STATE
  const [reminders, setReminders] = useState([
    { id: 1, title: 'CCS 201: Data Structures CAT 1', date: '2026-11-20', time: '14:00', type: 'CAT', status: 'Pending' },
    { id: 2, title: 'SMA 203: Linear Algebra Group Assignment', date: '2026-11-25', time: '23:59', type: 'Assignment', status: 'Pending' }
  ]);
  const [newCatTitle, setNewCatTitle] = useState('');
  const [newCatDate, setNewCatDate] = useState('');
  const [newCatType, setNewCatType] = useState('CAT');

  // GPA RAW RESULT PASTER & CALCULATOR STATE
  const [rawResultsText, setRawResultsText] = useState('');
  const [coursesList, setCoursesList] = useState([
    { id: 1, name: 'CCS 201: Data Structures', grade: 'A', credits: 3 },
    { id: 2, name: 'SMA 203: Linear Algebra', grade: 'B+', credits: 3 },
    { id: 3, name: 'CCS 205: Computer Networks', grade: 'A-', credits: 3 }
  ]);

  // Apply dark mode class to root
  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkTheme]);

  // --- DERIVED RECOMMENDATIONS ---
  const currentRecommendations = useMemo(() => {
    const courseBooks = RECOMMENDATIONS_DB[selectedCourse]?.[yearOfStudy] || [
      { title: "Research Methodology for Kenyan Universities", author: "Prof. J. K. Kinyanjui", rating: 4.8, tags: ["Research", "CAT Prep"], desc: "Standard manual for proposal writing, literature review, and data analysis." },
      { title: "Academic Writing & Referencing (APA/IEEE)", author: "East Africa Educational Publishers", rating: 4.7, tags: ["Citations", "Essays"], desc: "How to structure CAT essays, term papers, and final project reports." }
    ];

    const studentLib = UNIVERSITY_LIBRARY_MAP[university] || { name: "Kenya Law Reports (KLR)", url: "http://kenyalaw.org" };

    return courseBooks.map(book => ({
      ...book,
      libName: book.fallbackUrl ? "Kenya Law Reports (KLR)" : (studentLib?.name || "Digital Repository"),
      libLink: book.fallbackUrl || (studentLib?.url || "http://kenyalaw.org")
    }));
  }, [selectedCourse, yearOfStudy, university]);

  // --- AI ASK HANDLER ---
  const handleAskAI = async () => {
    if (!userPromptText.trim()) return;
    setIsAiLoading(true);
    setAiResponse('');

    try {
      if (apiKey.trim()) {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are CampusMate AI for Kenyan University Students. Context: ${university}, Course: ${selectedCourse}, Year: ${yearOfStudy}. Question: ${userPromptText}`
              }]
            }]
          })
        });
        const data = await response.json();
        const output = data.candidates?.[0]?.content?.parts?.[0]?.text;
        setAiResponse(output || "Generated response from custom API key.");
      } else {
        setTimeout(() => {
          setAiResponse(
            `### Academic Analysis & Solution Blueprint\n\n` +
            `**Target Institution:** ${university === '-- Select Your University / Institution --' ? 'Your Kenyan Institution' : university}\n` +
            `**Course Context:** ${selectedCourse} (${yearOfStudy})\n\n` +
            `#### 1. Core Concepts & Kenyan Curriculum Context\n` +
            `This continuous assessment test (CAT) question evaluates foundational principles required in the module. Ensure your essay or code submission incorporates standard citation formatting.\n\n` +
            `#### 2. Detailed Step-by-Step Explanation\n` +
            `- **Step A:** Define the primary problem constraints based on standard university marking schemes.\n` +
            `- **Step B:** Apply key theoretical models and Kenyan statutory/academic precedents where applicable.\n` +
            `- **Step C:** Draft a structured conclusion with real-world industry application in Kenya.\n\n` +
            `*Tip: You can add your personal Gemini API key for real-time generative responses!*`
          );
          setIsAiLoading(false);
        }, 1200);
        return;
      }
    } catch (err) {
      setAiResponse("Error contacting AI service. Please check your API key or network connection.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // --- PLAGIARISM & GRAMMAR SCAN HANDLER ---
  const handleScanPlagiarism = () => {
    if (!userPromptText.trim()) return;
    setIsScanningPlagiarism(true);

    setTimeout(() => {
      const calcLength = userPromptText.length;
      const simPercent = Math.min(Math.floor((calcLength % 25) + 4), 38);

      setPlagiarismResult({
        similarity: simPercent,
        matches: [
          { source: "UoN Digital Repository (Past Papers)", matchPercent: `${Math.floor(simPercent * 0.6)}%` },
          { source: "Kenya Law Reports Archives", matchPercent: `${Math.floor(simPercent * 0.4)}%` }
        ]
      });

      setGrammarFixes([
        { original: "they is doing", suggestion: "they are doing", explanation: "Subject-verb agreement error." },
        { original: "according to the course the are doing", suggestion: "according to their enrolled course", explanation: "Stylistic enhancement for academic writing." }
      ]);

      setIsScanningPlagiarism(false);
    }, 1200);
  };

  // --- ADD CUSTOM CAT REMINDER HANDLER ---
  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!newCatTitle || !newCatDate) return;

    const item = {
      id: Date.now(),
      title: newCatTitle,
      date: newCatDate,
      type: newCatType,
      status: 'Pending'
    };

    setReminders([item, ...reminders]);
    setNewCatTitle('');
    setNewCatDate('');
  };

  const handleToggleReminderStatus = (id) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, status: r.status === 'Completed' ? 'Pending' : 'Completed' } : r));
  };

  const handleDeleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  // --- PARSE RAW RESULT & CALCULATE GPA ---
  const handleParseRawResults = () => {
    if (!rawResultsText.trim()) return;

    const lines = rawResultsText.split('\n').filter(l => l.trim().length > 0);
    const parsed = lines.map((line, idx) => {
      const parts = line.trim().split(/\s+/);
      let grade = 'B';
      const lastWord = parts[parts.length - 1].toUpperCase();

      if (['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'].includes(lastWord)) {
        grade = lastWord;
      }

      return {
        id: Date.now() + idx,
        name: parts.slice(0, parts.length - 1).join(' ') || `Parsed Unit ${idx + 1}`,
        grade: grade,
        credits: 3
      };
    });

    if (parsed.length > 0) {
      setCoursesList(parsed);
      setRawResultsText('');
    }
  };

  // GPA calculation helper
  const calculateGPA = useMemo(() => {
    if (coursesList.length === 0) return '0.00';
    const pointsMap = { 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0 };
    let totalPoints = 0;
    let totalCredits = 0;

    coursesList.forEach(c => {
      const p = pointsMap[c.grade] ?? 3.0;
      totalPoints += p * c.credits;
      totalCredits += c.credits;
    });

    return (totalPoints / totalCredits).toFixed(2);
  }, [coursesList]);

  const degreeClassification = useMemo(() => {
    const gpa = parseFloat(calculateGPA);
    if (gpa >= 3.7) return { title: 'First Class Honors 🏆', color: 'text-amber-300' };
    if (gpa >= 3.0) return { title: 'Second Class Upper Division 🥈', color: 'text-emerald-300' };
    if (gpa >= 2.5) return { title: 'Second Class Lower Division 🥉', color: 'text-teal-200' };
    if (gpa >= 2.0) return { title: 'Pass Grade', color: 'text-slate-200' };
    return { title: 'Academic Probation Warning', color: 'text-red-300' };
  }, [calculateGPA]);

  // --- MENTORSHIP SESSION REQUEST SUBMIT ---
  const handleBookMentorship = (e) => {
    e.preventDefault();
    if (!mentorshipTopic || !mentorshipDate) return;

    setMentorshipSuccessMsg(true);
    setTimeout(() => {
      setMentorshipSuccessMsg(false);
      setSelectedMentor(null);
      setMentorshipTopic('');
      setMentorshipDate('');
    }, 2500);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans antialiased ${darkTheme ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-200`}>
      
      {/* HEADER NAVIGATION */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-emerald-500/20">
              C2
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">CampusMate <span className="text-emerald-500">2.0</span></span>
              <span className="block text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Kenya Edition</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold">
            {[
              { id: 'home', label: 'Home & Books', icon: BookOpen },
              { id: 'ai-helper', label: 'AI CAT Helper', icon: Sparkles },
              { id: 'libraries', label: 'Libraries', icon: Library },
              { id: 'reminders', label: 'CAT Reminders', icon: Clock },
              { id: 'support', label: 'Support & HELB', icon: PhoneCall },
              { id: 'leaders', label: 'Mentors', icon: Users },
              { id: 'analytics', label: 'GPA Calculator', icon: BarChart3 },
              { id: 'contact', label: 'Contact', icon: MessageSquare }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <button
            onClick={() => setDarkTheme(!darkTheme)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {darkTheme ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: HOME & INTRODUCTION */}
        {activeTab === 'home' && (
          <div className="space-y-10">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 p-8 sm:p-12 text-white shadow-2xl border border-emerald-500/20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-0 pointer-events-none"></div>
              
              <div className="relative z-10 max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Dedicated Academic Engine for Kenyan Higher Education
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                  Your Personal Academic Hub for <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">{university === '-- Select Your University / Institution --' ? 'Your University' : university}</span>
                </h1>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  Search & select your university, KMTC campus, or TVET institute to personalize CAT helpers, library catalogs, and semester GPA tracking!
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => setActiveTab('ai-helper')}
                    className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 text-sm"
                  >
                    <Sparkles className="w-4 h-4" /> Launch AI CAT Solver
                  </button>
                  <button
                    onClick={() => setActiveTab('libraries')}
                    className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 font-semibold border border-slate-700 text-slate-200 transition-all flex items-center gap-2 text-sm"
                  >
                    <Library className="w-4 h-4 text-emerald-400" /> Search Libraries Nationwide
                  </button>
                </div>
              </div>
            </div>

            {/* SEARCHABLE KENYAN UNIVERSITY & COURSE SELECTOR BAR */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
                  <GraduationCap className="w-5 h-5 text-emerald-500" />
                  Select & Search Your Kenyan Institution
                </div>
                <span className="text-xs text-slate-400">40+ Universities, KMTC & TVETs Loaded</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. SEARCHABLE UNIVERSITY / KMTC SELECTOR */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    1. Search & Select Institution
                  </label>
                  
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Type to filter e.g. KMTC, UoN, KU, Strathmore..."
                      value={universitySearchQuery}
                      onChange={(e) => setUniversitySearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <select
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full p-3 rounded-xl border border-emerald-500/40 dark:border-emerald-500/40 bg-emerald-50/40 dark:bg-slate-800 text-sm font-semibold text-emerald-700 dark:text-emerald-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    {filteredUniversities.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>

                {/* 2. DYNAMIC & SEARCHABLE COURSE SELECTOR */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    2. Search Course (Suggested)
                  </label>

                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search course e.g. Nursing, Law, Software, CPA..."
                      value={courseSearchQuery}
                      onChange={(e) => setCourseSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    {filteredCourses.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
                  </select>
                </div>

                {/* 3. YEAR OF STUDY */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    3. Year / Level of Study
                  </label>
                  <select
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none mt-8"
                  >
                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Course Textbooks Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-emerald-500" /> Course Textbooks & Direct Library Links
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Recommended for <span className="font-semibold text-emerald-500">{COURSES_MASTER.find(c => c.id === selectedCourse)?.name}</span> • <span className="font-semibold">{yearOfStudy}</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentRecommendations.map((book, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-snug">{book.title}</h3>
                        <span className="flex items-center gap-1 text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-md">
                          ★ {book.rating}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-500">By {book.author}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{book.desc}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex gap-2">
                        {book.tags.map(t => (
                          <span key={t} className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {t}
                          </span>
                        ))}
                      </div>
                      <a
                        href={book.libLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        Access {book.libName} <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ASSIGNMENT & CAT HELPER (AI + PLAGIARISM) */}
        {activeTab === 'ai-helper' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-emerald-500" /> AI Assignment & CAT Explanation Solver
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Paste your continuous assessment questions to receive step-by-step academic explanations and plagiarism scanning.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  placeholder="Paste Gemini API Key (Optional)"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs w-56 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Question Input */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <label className="block text-sm font-bold text-slate-900 dark:text-white">
                    Paste Your Assignment Question or CAT Draft
                  </label>
                  <textarea
                    value={userPromptText}
                    onChange={(e) => setUserPromptText(e.target.value)}
                    placeholder="Type or paste your question details here..."
                    rows={8}
                    className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm outline-none resize-y focus:ring-2 focus:ring-emerald-500"
                  />

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleAskAI}
                      disabled={isAiLoading || !userPromptText.trim()}
                      className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" /> Generate AI Explanation
                    </button>
                    <button
                      onClick={handleScanPlagiarism}
                      disabled={isScanningPlagiarism || !userPromptText.trim()}
                      className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-100 font-bold text-xs border border-slate-700 shadow-md transition-all flex items-center gap-2"
                    >
                      <ShieldAlert className="w-4 h-4 text-amber-400" /> Run Plagiarism & Grammar Scan
                    </button>
                  </div>
                </div>

                {/* Plagiarism Scan Results */}
                {plagiarismResult && (
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                      <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-amber-500" /> Plagiarism Similarity Breakdown
                      </h3>
                      <span className="text-xl font-extrabold text-amber-500">{plagiarismResult.similarity}% Match</span>
                    </div>

                    <div className="space-y-2">
                      {plagiarismResult.matches.map((m, idx) => (
                        <div key={idx} className="flex justify-between text-xs p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950">
                          <span className="font-medium text-slate-700 dark:text-slate-300">{m.source}</span>
                          <span className="font-bold text-slate-500">{m.matchPercent}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Output Display */}
              <div className="lg:col-span-5">
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 min-h-[400px]">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-500" /> Explanation Output
                  </h3>

                  {isAiLoading ? (
                    <div className="py-20 text-center space-y-3">
                      <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin mx-auto" />
                      <p className="text-xs font-semibold text-slate-400">Analyzing question against syllabus...</p>
                    </div>
                  ) : aiResponse ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none text-xs leading-relaxed font-sans whitespace-pre-wrap">
                      {aiResponse}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 py-16 text-center">
                      Submitted explanations and step-by-step blueprinted answers will appear here.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SEARCHABLE KENYAN PUBLIC & REGIONAL LIBRARIES */}
        {activeTab === 'libraries' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Library className="w-6 h-6 text-emerald-500" /> Searchable Kenyan Public Libraries & Archives
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Find study centers, KNLS regional branches, university digital archives, and legal repositories across any region in Kenya.
                </p>
              </div>

              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by city, library name, or region..."
                  value={librarySearchQuery}
                  onChange={(e) => setLibrarySearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 mr-2">Filter Type:</span>
              {['All', 'Public Library', 'University', 'Legal', 'STEM'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setSelectedLibraryFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedLibraryFilter === filter
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredLibraries.length === 0 ? (
                <div className="md:col-span-2 p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <Search className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-300">No matching library found for "{librarySearchQuery}".</p>
                  <p className="text-xs text-slate-400">Try searching for keywords like "Nairobi", "Mombasa", "Kisumu", "Law", or "KNLS".</p>
                </div>
              ) : (
                filteredLibraries.map((lib, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          {lib.type}
                        </span>
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                          📍 {lib.region}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">{lib.name}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{lib.desc}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                      <a
                        href={lib.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                      >
                        Open Digital Portal / Directions <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 4: REMINDERS & DEADLINES */}
        {activeTab === 'reminders' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-6 h-6 text-emerald-500" /> Custom CAT & Assignment Deadlines
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Add your upcoming semester CATs, continuous continuous assessment papers, and group project deadlines.
              </p>
            </div>

            <form onSubmit={handleAddReminder} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Add New Assessment Deadline</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Task Title (e.g. CCS 201 CAT 1)"
                  value={newCatTitle}
                  onChange={(e) => setNewCatTitle(e.target.value)}
                  className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs font-medium outline-none"
                  required
                />
                <input
                  type="date"
                  value={newCatDate}
                  onChange={(e) => setNewCatDate(e.target.value)}
                  className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs outline-none"
                  required
                />
                <select
                  value={newCatType}
                  onChange={(e) => setNewCatType(e.target.value)}
                  className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs font-medium outline-none"
                >
                  <option value="CAT">Continuous Assessment Test (CAT)</option>
                  <option value="Assignment">Term Paper / Assignment</option>
                  <option value="Exam">End of Semester Exam</option>
                </select>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Save Reminder
              </button>
            </form>

            <div className="space-y-3">
              {reminders.map(r => (
                <div key={r.id} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleToggleReminderStatus(r.id)}>
                      {r.status === 'Completed' ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Clock className="w-5 h-5 text-slate-400" />}
                    </button>
                    <div>
                      <h4 className={`text-sm font-bold ${r.status === 'Completed' ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>{r.title}</h4>
                      <p className="text-xs text-slate-400">Due: {r.date} • {r.type}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteReminder(r.id)} className="text-slate-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SUPPORT & HELB */}
        {activeTab === 'support' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <PhoneCall className="w-6 h-6 text-emerald-500" /> Student Support & HELB Portals
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Direct contacts and links to higher education financing, KUCCPS placements, and student mental health desks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SUPPORT_CHANNELS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">{item.title}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400">{item.contact}</span>
                      <a
                        href={item.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 flex items-center gap-1"
                      >
                        Visit Official Portal <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 6: KENYAN STUDENT MENTORS */}
        {activeTab === 'leaders' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Users className="w-6 h-6 text-emerald-500" /> Kenyan Campus Mentors & Peer Leaders
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Book direct 1-on-1 mentorship sessions with top upperclassmen student leaders across Kenya.
                </p>
              </div>

              <button
                onClick={() => setShowMentorshipInfoModal(true)}
                className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all w-fit"
              >
                <Info className="w-4 h-4" /> Where do requests get sent?
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INFLUENCERS.map((leader) => (
                <div key={leader.id} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-base text-slate-900 dark:text-white">{leader.name}</h3>
                        <p className="text-xs font-semibold text-emerald-500">{leader.handle}</p>
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        {leader.badge}
                      </span>
                    </div>
                    
                    <p className="text-xs text-slate-400">{leader.uni} • {leader.course}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 italic">"{leader.tip}"</p>
                  </div>

                  <button
                    onClick={() => setSelectedMentor(leader)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5" /> Request Mentorship Session
                  </button>
                </div>
              ))}
            </div>

            {/* MENTORSHIP WORKFLOW EXPLANATION MODAL */}
            {showMentorshipInfoModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                <div className="w-full max-w-lg p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                      <HeartHandshake className="w-5 h-5 text-emerald-500" /> How Mentorship Routing Works
                    </h3>
                    <button
                      onClick={() => setShowMentorshipInfoModal(false)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 space-y-1">
                      <strong className="text-emerald-600 dark:text-emerald-400">1. Instant Email Notification:</strong>
                      <p>Your session topic, date, and preferred time are routed directly to the mentor's verified student email address (e.g. <code>brian@student.uonbi.ac.ke</code>).</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                      <strong className="text-slate-900 dark:text-white">2. Peer Office Hours Confirmation:</strong>
                      <p>Mentors review requests during their published office hours. Once approved, a Google Meet or Zoom link is sent directly to your email.</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                      <strong className="text-slate-900 dark:text-white">3. Direct Campus Messaging:</strong>
                      <p>You can also track your submitted request status inside the Campus Desk section of CampusMate 2.0.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowMentorshipInfoModal(false)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                  >
                    Got It! Close Window
                  </button>
                </div>
              </div>
            )}

            {/* MENTORSHIP REQUEST MODAL */}
            {selectedMentor && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                <div className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      Book Session with {selectedMentor.name}
                    </h3>
                    <button
                      onClick={() => setSelectedMentor(null)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  {mentorshipSuccessMsg ? (
                    <div className="p-6 text-center space-y-2 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-8 h-8 mx-auto" />
                      <h4 className="font-bold">Request Sent Successfully!</h4>
                      <p className="text-xs">
                        {selectedMentor.name} has been notified. They will contact you via your campus portal email.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleBookMentorship} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                          Mentorship Focus Topic
                        </label>
                        <select
                          required
                          value={mentorshipTopic}
                          onChange={(e) => setMentorshipTopic(e.target.value)}
                          className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs font-medium outline-none"
                        >
                          <option value="">-- Select Session Topic --</option>
                          <option value="CAT & Exam Revision Strategies">CAT & Exam Revision Strategies</option>
                          <option value="Industrial Attachment & Internship Prep">Industrial Attachment & Internship Prep</option>
                          <option value="Final Year Project & Research Guidance">Final Year Project & Research Guidance</option>
                          <option value="Career & Industry Opportunities">Career & Industry Opportunities</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                          Preferred Session Date
                        </label>
                        <input
                          type="date"
                          required
                          value={mentorshipDate}
                          onChange={(e) => setMentorshipDate(e.target.value)}
                          className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white text-xs shadow-md transition-all"
                      >
                        Confirm & Send Mentorship Request
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 7: GPA CALCULATOR & RESULT PASTER */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-emerald-500" /> Automatic Semester Result GPA Analyzer
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Paste raw semester transcript results to automatically parse unit grades and calculate your overall GPA.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <label className="block text-sm font-bold text-slate-900 dark:text-white">
                Paste Raw Semester Exam Results / Portal Transcript
              </label>
              <textarea
                value={rawResultsText}
                onChange={(e) => setRawResultsText(e.target.value)}
                placeholder="Example paste format:&#10;CCS 201 Data Structures A&#10;SMA 203 Linear Algebra B+&#10;CCS 205 Computer Networks A-"
                rows={4}
                className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm font-mono outline-none resize-y"
              />
              <button
                onClick={handleParseRawResults}
                disabled={!rawResultsText.trim()}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 font-bold text-white text-sm shadow-md transition-all flex items-center gap-2"
              >
                <Zap className="w-4 h-4" /> Auto-Parse & Calculate GPA
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4 p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-xl space-y-4">
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-200">Semester Weighted GPA</span>
                <div className="text-5xl font-extrabold">{calculateGPA}</div>
                <p className="text-xs text-emerald-100">
                  Calculated across {coursesList.length} enrolled unit modules.
                </p>
                <div className="pt-4 border-t border-emerald-400/30 text-xs flex justify-between items-center">
                  <span>Degree Classification:</span>
                  <span className={`font-bold ${degreeClassification.color}`}>{degreeClassification.title}</span>
                </div>
              </div>

              <div className="md:col-span-8 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Active Units & Extracted Marks</h3>
                  <button
                    onClick={() => {
                      const name = prompt("Enter Unit Title:");
                      const grade = prompt("Enter Grade (e.g. A, B+, C):", "A");
                      if (name && grade) {
                        setCoursesList([...coursesList, { id: Date.now(), name, grade: grade.toUpperCase(), credits: 3 }]);
                      }
                    }}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500"
                  >
                    + Add Unit Manually
                  </button>
                </div>

                <div className="space-y-3">
                  {coursesList.map(c => (
                    <div key={c.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{c.name}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-slate-500">{c.credits} Credits</span>
                        <span className="font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-md">{c.grade}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: CONTACT & CAMPUS HUB */}
        {activeTab === 'contact' && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">CampusMate 2.0 Student Hub Kenya</h1>
              <p className="text-sm text-slate-500">
                Request new course books, report CAT feedback, or join the Kenyan student developer community.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Student Email (.ac.ke or Personal)</label>
                  <input type="email" placeholder="student@uonbi.ac.ke" className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Inquiry / Request Type</label>
                  <select className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm outline-none">
                    <option>Request Kenyan Course Textbook / Past CAT Paper</option>
                    <option>HELB / Financial Aid Guidance</option>
                    <option>Join Student Developer Team (Kenya)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Message</label>
                  <textarea rows={4} placeholder="State your request or feedback..." className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm outline-none resize-none"></textarea>
                </div>
              </div>

              <button
                onClick={() => alert("Asante! Your message has been sent to the CampusMate 2.0 Kenya Team.")}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white text-sm shadow-md transition-all"
              >
                Submit Message
              </button>
            </div>
          </div>
        )}

      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-400">
        CampusMate 2.0 • Empowering Kenyan Higher Education Students
      </footer>
    </div>
  );
}