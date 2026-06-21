import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'

const CAREERS = {
  0: "Network Security Engineer", 1: "Software Engineer",
  2: "UI/UX Engineer", 3: "Software Developer",
  4: "Database Developer", 5: "QA Engineer",
  6: "Web Developer", 7: "CRM Technical Developer",
  8: "Technical Supporter", 9: "Systems Security Administrator",
  10: "Applications Developer", 11: "Mobile Applications Developer",
}

const ICONS = { 0:'🔐', 1:'💻', 2:'🎨', 3:'⚙️', 4:'🗄️', 5:'🧪', 6:'🌐', 7:'📊', 8:'🛠️', 9:'🛡️', 10:'📱', 11:'📲' }

const ROADMAPS = {
  0: ["Learn networking fundamentals (TCP/IP, DNS, HTTP)", "Study cybersecurity concepts and ethical hacking", "Get CompTIA Security+ or CEH certification", "Practice with tools like Wireshark, Nmap, Metasploit", "Apply for junior network security roles"],
  1: ["Master data structures and algorithms", "Learn a core language deeply (Python, Java, or C++)", "Build 3-5 projects for your portfolio", "Contribute to open source projects", "Apply for software engineering internships"],
  2: ["Learn design fundamentals (typography, colour, layout)", "Master Figma or Adobe XD", "Study user research and UX principles", "Build a portfolio of 5+ UI/UX case studies", "Apply for junior designer roles"],
  3: ["Pick a stack (React + Node.js or Django + React)", "Build full-stack projects", "Learn Git and version control", "Understand databases (SQL and NoSQL)", "Deploy projects to the cloud"],
  4: ["Learn SQL deeply (MySQL, PostgreSQL)", "Study database design and normalisation", "Learn NoSQL databases (MongoDB, Redis)", "Practice query optimisation", "Get Oracle or Microsoft SQL certification"],
  5: ["Learn software testing fundamentals", "Master automated testing tools (Selenium, Cypress)", "Study API testing with Postman", "Learn CI/CD pipelines", "Get ISTQB certification"],
  6: ["Master HTML, CSS, and JavaScript", "Learn React or Vue.js", "Study responsive design and accessibility", "Learn backend basics (Node.js or Django)", "Build and deploy 5 websites"],
  7: ["Learn CRM platforms (Salesforce, HubSpot)", "Study business process analysis", "Learn SQL for data querying", "Get Salesforce Developer certification", "Build CRM integration projects"],
  8: ["Develop strong communication skills", "Learn IT support fundamentals", "Get CompTIA A+ certification", "Practice troubleshooting methodologies", "Apply for IT helpdesk roles"],
  9: ["Study system administration (Linux, Windows Server)", "Learn identity and access management", "Study compliance frameworks (ISO 27001, NIST)", "Get CompTIA Security+ certification", "Practice incident response"],
  10: ["Master a programming language (Java, Python, Kotlin)", "Learn software architecture patterns", "Study APIs and microservices", "Build and publish applications", "Learn cloud deployment (AWS, GCP)"],
  11: ["Learn React Native or Flutter", "Study iOS and Android fundamentals", "Build and publish a mobile app", "Learn mobile UI/UX best practices", "Apply for junior mobile developer roles"],
}

export default function Result() {
  const navigate = useNavigate()
  const { prediction, probability } = useSelector(state => state.chat)

  if (prediction === null) {
    return (
      <div className="min-h-screen bg-[#0a0f0a] text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl text-gray-400 mb-4">No prediction yet.</p>
            <button onClick={() => navigate('/chat')}
              className="px-8 py-3 bg-[#16a34a] rounded-xl font-semibold hover:bg-[#15803d] transition-all">
              Chat with AI Advisor
            </button>
          </div>
        </div>
      </div>
    )
  }

  const role = CAREERS[prediction]
  const icon = ICONS[prediction]
  const confidence = probability ? Math.round(probability * 100) : null
  const roadmap = ROADMAPS[prediction] || []

  return (
    <div className="min-h-screen bg-[#0a0f0a] text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16">

        {/* Result hero */}
        <div className="text-center mb-12">
          <p className="text-gray-400 mb-4">CareerSense recommends</p>
          <div className="bg-[#111711] border border-[#16a34a]/30 rounded-3xl p-10 mb-6 inline-block w-full">
            <div className="text-7xl mb-4">{icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{role}</h1>
            {confidence && (
              <div className="inline-flex items-center gap-2 bg-[#0a0f0a] border border-[#16a34a]/30 rounded-full px-4 py-2">
                <span className="w-2 h-2 bg-[#16a34a] rounded-full"></span>
                <span className="text-[#4ade80] font-medium">{confidence}% confidence match</span>
              </div>
            )}
          </div>
          <p className="text-gray-400 text-lg">You have what it takes — start building your future today! 💪</p>
        </div>

        {/* Roadmap */}
        <div className="bg-[#111711] border border-[#1a2e1a] rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-[#4ade80]">🗺️</span> Your Career Roadmap
          </h2>
          <div className="flex flex-col gap-4">
            {roadmap.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#16a34a] rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-gray-300 leading-relaxed pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button onClick={() => navigate('/chat')}
            className="py-4 bg-[#16a34a] rounded-2xl font-semibold hover:bg-[#15803d] transition-all">
            💬 Continue Chatting with AI
          </button>
          <button onClick={() => navigate('/dashboard')}
            className="py-4 bg-[#111711] border border-[#1a2e1a] rounded-2xl font-semibold hover:bg-[#1a2e1a] transition-all">
            📊 View Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
