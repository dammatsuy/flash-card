'use client'

import { useState, useEffect } from 'react'

// フラッシュカードのデータ
const flashCards = [
  // 食べ物
  { id: 1, category: 'food', emoji: '🍎', name: 'りんご' },
  { id: 2, category: 'food', emoji: '🍌', name: 'ばなな' },
  { id: 3, category: 'food', emoji: '🍊', name: 'みかん' },
  { id: 4, category: 'food', emoji: '🍓', name: 'いちご' },
  { id: 5, category: 'food', emoji: '🍞', name: 'パン' },
  { id: 6, category: 'food', emoji: '🍚', name: 'ごはん' },
  { id: 7, category: 'food', emoji: '🍜', name: 'らーめん' },
  { id: 8, category: 'food', emoji: '🍙', name: 'おにぎり' },
  
  // 動物
  { id: 9, category: 'animal', emoji: '🐶', name: 'いぬ' },
  { id: 10, category: 'animal', emoji: '🐱', name: 'ねこ' },
  { id: 11, category: 'animal', emoji: '🐰', name: 'うさぎ' },
  { id: 12, category: 'animal', emoji: '🐘', name: 'ぞう' },
  { id: 13, category: 'animal', emoji: '🦁', name: 'らいおん' },
  { id: 14, category: 'animal', emoji: '🐯', name: 'とら' },
  { id: 15, category: 'animal', emoji: '🐻', name: 'くま' },
  { id: 16, category: 'animal', emoji: '🦒', name: 'きりん' },
  
  // 車
  { id: 17, category: 'vehicle', emoji: '🚗', name: 'くるま' },
  { id: 18, category: 'vehicle', emoji: '🚄', name: 'でんしゃ' },
  { id: 19, category: 'vehicle', emoji: '✈️', name: 'ひこうき' },
  { id: 20, category: 'vehicle', emoji: '🚢', name: 'ふね' },
  { id: 21, category: 'vehicle', emoji: '🚲', name: 'じてんしゃ' },
  { id: 22, category: 'vehicle', emoji: '🚌', name: 'バス' },
  { id: 23, category: 'vehicle', emoji: '🏍️', name: 'ばいく' },
  { id: 24, category: 'vehicle', emoji: '🚁', name: 'ヘリコプター' },
]

export default function FlashCardApp() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [filteredCards, setFilteredCards] = useState(flashCards)

  // カテゴリに基づいてカードをフィルタリング
  useEffect(() => {
    let cards = [...flashCards]
    
    if (selectedCategory !== 'all') {
      cards = flashCards.filter(card => card.category === selectedCategory)
    }
    
    // シャッフル
    cards = cards.sort(() => Math.random() - 0.5)
    setFilteredCards(cards)
    setCurrentCardIndex(0)
    setShowAnswer(false)
  }, [selectedCategory])

  const currentCard = filteredCards[currentCardIndex]

  const handleShowAnswer = () => {
    setShowAnswer(true)
  }

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
      setShowAnswer(false)
    }
  }

  const handleNextCard = () => {
    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setShowAnswer(false)
    }
  }

  const handleBackToHome = () => {
    setGameStarted(false)
    setCurrentCardIndex(0)
    setShowAnswer(false)
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setGameStarted(true)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'food': return 'bg-orange-50 border-orange-200 text-orange-800'
      case 'animal': return 'bg-green-50 border-green-200 text-green-800'
      case 'vehicle': return 'bg-blue-50 border-blue-200 text-blue-800'
      default: return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'food': return 'たべもの'
      case 'animal': return 'どうぶつ'
      case 'vehicle': return 'のりもの'
      case 'all': return 'すべて'
      default: return ''
    }
  }

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'food': return '🍎'
      case 'animal': return '🐶'
      case 'vehicle': return '🚗'
      case 'all': return '🎯'
      default: return ''
    }
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-3xl shadow-xl p-12 max-w-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎯 フラッシュカード 🎯
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            どのカテゴリーで遊びますか？
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              onClick={() => handleCategorySelect('food')}
              className="flex flex-col items-center bg-orange-50 hover:bg-orange-100 p-6 rounded-2xl border-2 border-orange-200 transition-all transform hover:scale-105"
            >
              <span className="text-4xl mb-2">🍎</span>
              <span className="text-lg font-medium text-orange-800">たべもの</span>
              <span className="text-sm text-orange-600">8枚</span>
            </button>
            
            <button
              onClick={() => handleCategorySelect('animal')}
              className="flex flex-col items-center bg-green-50 hover:bg-green-100 p-6 rounded-2xl border-2 border-green-200 transition-all transform hover:scale-105"
            >
              <span className="text-4xl mb-2">🐶</span>
              <span className="text-lg font-medium text-green-800">どうぶつ</span>
              <span className="text-sm text-green-600">8枚</span>
            </button>
            
            <button
              onClick={() => handleCategorySelect('vehicle')}
              className="flex flex-col items-center bg-blue-50 hover:bg-blue-100 p-6 rounded-2xl border-2 border-blue-200 transition-all transform hover:scale-105"
            >
              <span className="text-4xl mb-2">🚗</span>
              <span className="text-lg font-medium text-blue-800">のりもの</span>
              <span className="text-sm text-blue-600">8枚</span>
            </button>
            
            <button
              onClick={() => handleCategorySelect('all')}
              className="flex flex-col items-center bg-purple-50 hover:bg-purple-100 p-6 rounded-2xl border-2 border-purple-200 transition-all transform hover:scale-105"
            >
              <span className="text-4xl mb-2">🎯</span>
              <span className="text-lg font-medium text-purple-800">すべて</span>
              <span className="text-sm text-purple-600">24枚</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* ヘッダー */}
        <div className="text-center mb-6">
          <div className="flex justify-between items-center mb-4 bg-white rounded-2xl p-4 shadow-lg">
            <button
              onClick={handleBackToHome}
              className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all"
            >
              ← ホーム
            </button>
            <div className="text-lg font-semibold text-gray-700">
              {currentCardIndex + 1} / {filteredCards.length}
            </div>
            <div className="w-16"></div> {/* スペーサー */}
          </div>
          <div className={`inline-block px-6 py-3 rounded-full text-sm font-semibold border-2 ${getCategoryColor(currentCard.category)}`}>
            {getCategoryEmoji(selectedCategory)} {getCategoryName(selectedCategory)}
          </div>
        </div>

        {/* カード */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 border border-gray-100">
          <div className="text-center mb-8">
            <div className="text-9xl mb-6 p-6 bg-gray-50 rounded-3xl inline-block">{currentCard.emoji}</div>
            <p className="text-3xl font-bold text-gray-800 mb-6">これはなあに？</p>
            
            {showAnswer && (
              <div className="text-4xl font-bold text-purple-700 mb-8 bg-purple-50 p-6 rounded-2xl">
                {currentCard.name}
              </div>
            )}
            
            {!showAnswer && (
              <button
                onClick={handleShowAnswer}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg transform hover:scale-105 mb-8"
              >
                こたえをみる
              </button>
            )}
          </div>
        </div>

        {/* ナビゲーション */}
        <div className="flex justify-between items-center bg-white rounded-3xl p-6 shadow-xl">
          <button
            onClick={handlePreviousCard}
            disabled={currentCardIndex === 0}
            className={`flex items-center px-6 py-3 rounded-full text-lg font-bold transition-all transform hover:scale-105 ${
              currentCardIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 shadow-lg'
            }`}
          >
            ← まえ
          </button>
          
          <div className="text-center px-4">
            <div className="flex space-x-2">
              {Array.from({ length: Math.min(filteredCards.length, 10) }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i === currentCardIndex % 10 ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                />
              ))}
              {filteredCards.length > 10 && (
                <span className="text-gray-500 text-sm ml-2">...</span>
              )}
            </div>
          </div>
          
          <button
            onClick={handleNextCard}
            disabled={currentCardIndex === filteredCards.length - 1}
            className={`flex items-center px-6 py-3 rounded-full text-lg font-bold transition-all transform hover:scale-105 ${
              currentCardIndex === filteredCards.length - 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
            }`}
          >
            つぎ →
          </button>
        </div>
      </div>
    </div>
  )
}
