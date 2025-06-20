'use client'

import { useState } from 'react'
import Image from 'next/image'

interface FlashCard {
  id: number
  name: string
  image: string
  description: string
  origin: string
  insertion: string
  function: string
  category: 'arm' | 'leg' | 'core' | 'back'
}

const muscleCards: FlashCard[] = [
  {
    id: 1,
    name: "Biceps Brachii",
    image: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Tweekoppige armspier aan de voorkant van de bovenarm",
    origin: "Scapula (lange kop: tuberculum supraglenoidale, korte kop: processus coracoideus)",
    insertion: "Radius (tuberositas radii)",
    function: "Flexie elleboog, supinatie onderarm, flexie schouder",
    category: "arm"
  },
  {
    id: 2,
    name: "Triceps Brachii",
    image: "https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Driekoppige armspier aan de achterkant van de bovenarm",
    origin: "Scapula en humerus (lange kop: tuberculum infraglenoidale, laterale kop: humerus lateraal, mediale kop: humerus mediaal)",
    insertion: "Ulna (olecranon)",
    function: "Extensie elleboog, extensie schouder (lange kop)",
    category: "arm"
  },
  {
    id: 3,
    name: "Quadriceps Femoris",
    image: "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Vierkoppige dijbeenspier aan de voorkant van het bovenbeen",
    origin: "Ilium en femur (4 koppen: rectus femoris, vastus lateralis, vastus medialis, vastus intermedius)",
    insertion: "Tibia (via patella en ligamentum patellae)",
    function: "Extensie knie, flexie heup (rectus femoris)",
    category: "leg"
  },
  {
    id: 4,
    name: "Hamstrings",
    image: "https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Hamstringspieren aan de achterkant van het bovenbeen",
    origin: "Ischium (biceps femoris, semitendinosus, semimembranosus)",
    insertion: "Tibia en fibula",
    function: "Flexie knie, extensie heup",
    category: "leg"
  },
  {
    id: 5,
    name: "Gastrocnemius",
    image: "https://images.pexels.com/photos/1552248/pexels-photo-1552248.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Tweekoppige kuitspier",
    origin: "Femur (condylus medialis en lateralis)",
    insertion: "Calcaneus (via achillespees)",
    function: "Plantairflexie voet, flexie knie",
    category: "leg"
  },
  {
    id: 6,
    name: "Deltoideus",
    image: "https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Deltaspier van de schouder",
    origin: "Clavicula, acromion en spina scapulae",
    insertion: "Humerus (tuberositas deltoidea)",
    function: "Abductie, flexie en extensie schouder",
    category: "arm"
  },
  {
    id: 7,
    name: "Pectoralis Major",
    image: "https://images.pexels.com/photos/1552100/pexels-photo-1552100.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Grote borstspier",
    origin: "Clavicula, sternum en ribben",
    insertion: "Humerus (crista tuberculi majoris)",
    function: "Adductie, flexie en interne rotatie schouder",
    category: "core"
  },
  {
    id: 8,
    name: "Latissimus Dorsi",
    image: "https://images.pexels.com/photos/1552097/pexels-photo-1552097.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Brede rugspier",
    origin: "Wervelkolom (T7-L5), ilium en ribben",
    insertion: "Humerus (crista tuberculi minoris)",
    function: "Adductie, extensie en interne rotatie schouder",
    category: "back"
  },
  {
    id: 9,
    name: "Rectus Abdominis",
    image: "https://images.pexels.com/photos/1552101/pexels-photo-1552101.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Rechte buikspier",
    origin: "Symphysis pubis en os pubis",
    insertion: "Ribben 5-7 en processus xiphoideus",
    function: "Flexie romp, stabilisatie bekken",
    category: "core"
  },
  {
    id: 10,
    name: "Trapezius",
    image: "https://images.pexels.com/photos/1552095/pexels-photo-1552095.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Trapeziumspier van de rug en nek",
    origin: "Occiput, ligamentum nuchae en wervelkolom (C7-T12)",
    insertion: "Clavicula, acromion en spina scapulae",
    function: "Elevatie, retractie en rotatie scapula",
    category: "back"
  }
]

export default function FlashcardsPage() {
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [showAnswer, setShowAnswer] = useState(false)
  const [studyMode, setStudyMode] = useState<'flashcard' | 'quiz'>('flashcard')

  const filteredCards = selectedCategory === 'all' 
    ? muscleCards 
    : muscleCards.filter(card => card.category === selectedCategory)

  const currentMuscle = filteredCards[currentCard]

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % filteredCards.length)
    setIsFlipped(false)
    setShowAnswer(false)
  }

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + filteredCards.length) % filteredCards.length)
    setIsFlipped(false)
    setShowAnswer(false)
  }

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  const markAnswer = (correct: boolean) => {
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }))
    setTimeout(nextCard, 1000)
  }

  const resetScore = () => {
    setScore({ correct: 0, total: 0 })
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'arm': return '💪'
      case 'leg': return '🦵'
      case 'core': return '🫁'
      case 'back': return '🔙'
      default: return '📚'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'arm': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'leg': return 'bg-green-100 text-green-800 border-green-200'
      case 'core': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'back': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (!currentMuscle) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🏥 Fysiotherapie Spieren Flashcards
          </h1>
          <p className="text-lg text-gray-600">
            Leer anatomie met interactieve flashcards
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Study Mode Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Modus:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setStudyMode('flashcard')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    studyMode === 'flashcard'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  📚 Flashcards
                </button>
                <button
                  onClick={() => setStudyMode('quiz')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    studyMode === 'quiz'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  🧠 Quiz
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Categorie:</span>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value)
                  setCurrentCard(0)
                  setIsFlipped(false)
                }}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">📚 Alle spieren</option>
                <option value="arm">💪 Arm spieren</option>
                <option value="leg">🦵 Been spieren</option>
                <option value="core">🫁 Core spieren</option>
                <option value="back">🔙 Rug spieren</option>
              </select>
            </div>

            {/* Score */}
            {score.total > 0 && (
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Score: </span>
                  <span className="text-green-600 font-bold">
                    {score.correct}/{score.total} ({Math.round((score.correct / score.total) * 100)}%)
                  </span>
                </div>
                <button
                  onClick={resetScore}
                  className="text-xs text-gray-500 hover:text-gray-700 underline"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Kaart {currentCard + 1} van {filteredCards.length}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(currentMuscle.category)}`}>
              {getCategoryIcon(currentMuscle.category)} {currentMuscle.category.toUpperCase()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentCard + 1) / filteredCards.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div className="relative mb-6">
          <div 
            className={`relative w-full h-96 cursor-pointer transition-transform duration-700 transform-style-preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={studyMode === 'flashcard' ? flipCard : undefined}
          >
            {/* Front of card */}
            <div className="absolute inset-0 w-full h-full backface-hidden">
              <div className="bg-white rounded-xl shadow-xl p-6 h-full flex flex-col items-center justify-center">
                <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={currentMuscle.image}
                    alt="Spier anatomie"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 px-4 py-2 rounded-lg">
                      <p className="text-lg font-bold text-gray-800">
                        Welke spier is dit?
                      </p>
                    </div>
                  </div>
                </div>
                
                {studyMode === 'flashcard' && (
                  <div className="text-center">
                    <p className="text-gray-600 mb-2">Klik om het antwoord te zien</p>
                    <div className="flex items-center justify-center space-x-2 text-blue-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span className="text-sm font-medium">Omdraaien</span>
                    </div>
                  </div>
                )}

                {studyMode === 'quiz' && !showAnswer && (
                  <div className="text-center w-full">
                    <button
                      onClick={() => setShowAnswer(true)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      💡 Toon Antwoord
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Back of card */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl shadow-xl p-6 h-full">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold mb-2">{currentMuscle.name}</h2>
                  <p className="text-blue-100 text-lg">{currentMuscle.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white bg-opacity-10 rounded-lg p-3">
                    <h3 className="font-semibold mb-2 text-blue-200">🔗 Origo:</h3>
                    <p className="text-blue-50">{currentMuscle.origin}</p>
                  </div>
                  
                  <div className="bg-white bg-opacity-10 rounded-lg p-3">
                    <h3 className="font-semibold mb-2 text-blue-200">📍 Insertie:</h3>
                    <p className="text-blue-50">{currentMuscle.insertion}</p>
                  </div>
                  
                  <div className="bg-white bg-opacity-10 rounded-lg p-3 md:col-span-2">
                    <h3 className="font-semibold mb-2 text-blue-200">⚡ Functie:</h3>
                    <p className="text-blue-50">{currentMuscle.function}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Answer Section */}
        {studyMode === 'quiz' && showAnswer && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {currentMuscle.name}
              </h3>
              <p className="text-gray-600">{currentMuscle.description}</p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => markAnswer(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2"
              >
                <span>✅</span>
                <span>Correct!</span>
              </button>
              <button
                onClick={() => markAnswer(false)}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center space-x-2"
              >
                <span>❌</span>
                <span>Fout</span>
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center">
            <button
              onClick={prevCard}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Vorige</span>
            </button>

            <div className="flex space-x-2">
              {filteredCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentCard(index)
                    setIsFlipped(false)
                    setShowAnswer(false)
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentCard
                      ? 'bg-blue-600'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextCard}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <span>Volgende</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Study Tips */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center">
            <span className="mr-2">💡</span>
            Studietips voor Fysiotherapie
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-700">
            <div>
              <h4 className="font-medium mb-2">🎯 Effectief leren:</h4>
              <ul className="space-y-1 text-purple-600">
                <li>• Herhaal dagelijks 10-15 minuten</li>
                <li>• Focus op origo, insertie en functie</li>
                <li>• Visualiseer de bewegingen</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">🔄 Actief herhalen:</h4>
              <ul className="space-y-1 text-purple-600">
                <li>• Test jezelf zonder antwoorden</li>
                <li>• Teken de spieren uit het hoofd</li>
                <li>• Oefen met echte patiënten</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )
}