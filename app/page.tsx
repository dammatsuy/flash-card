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
  { id: 25, category: 'food', emoji: '🍕', name: 'ピザ' },
  { id: 26, category: 'food', emoji: '🍔', name: 'ハンバーガー' },
  { id: 27, category: 'food', emoji: '🍦', name: 'アイスクリーム' },
  { id: 28, category: 'food', emoji: '🍰', name: 'ケーキ' },
  { id: 29, category: 'food', emoji: '🍪', name: 'クッキー' },
  { id: 30, category: 'food', emoji: '🍩', name: 'ドーナツ' },
  { id: 31, category: 'food', emoji: '🍫', name: 'チョコレート' },
  { id: 32, category: 'food', emoji: '🍬', name: 'キャンディ' },
  
  // 動物
  { id: 9, category: 'animal', emoji: '🐶', name: 'いぬ' },
  { id: 10, category: 'animal', emoji: '🐱', name: 'ねこ' },
  { id: 11, category: 'animal', emoji: '🐰', name: 'うさぎ' },
  { id: 12, category: 'animal', emoji: '🐘', name: 'ぞう' },
  { id: 13, category: 'animal', emoji: '🦁', name: 'らいおん' },
  { id: 14, category: 'animal', emoji: '🐯', name: 'とら' },
  { id: 15, category: 'animal', emoji: '🐻', name: 'くま' },
  { id: 16, category: 'animal', emoji: '🦒', name: 'きりん' },
  { id: 33, category: 'animal', emoji: '🐼', name: 'パンダ' },
  { id: 34, category: 'animal', emoji: '🐨', name: 'コアラ' },
  { id: 35, category: 'animal', emoji: '🦊', name: 'きつね' },
  { id: 36, category: 'animal', emoji: '🐺', name: 'おおかみ' },
  { id: 37, category: 'animal', emoji: '🐷', name: 'ぶた' },
  { id: 38, category: 'animal', emoji: '🐮', name: 'うし' },
  { id: 39, category: 'animal', emoji: '🐸', name: 'かえる' },
  { id: 40, category: 'animal', emoji: '🐙', name: 'たこ' },
  
  // 車
  { id: 17, category: 'vehicle', emoji: '🚗', name: 'くるま' },
  { id: 18, category: 'vehicle', emoji: '🚄', name: 'でんしゃ' },
  { id: 19, category: 'vehicle', emoji: '✈️', name: 'ひこうき' },
  { id: 20, category: 'vehicle', emoji: '🚢', name: 'ふね' },
  { id: 21, category: 'vehicle', emoji: '🚲', name: 'じてんしゃ' },
  { id: 22, category: 'vehicle', emoji: '🚌', name: 'バス' },
  { id: 23, category: 'vehicle', emoji: '🏍️', name: 'ばいく' },
  { id: 24, category: 'vehicle', emoji: '🚁', name: 'ヘリコプター' },
  { id: 41, category: 'vehicle', emoji: '🚅', name: 'しんかんせん' },
  { id: 42, category: 'vehicle', emoji: '🚇', name: 'ちかてつ' },
  { id: 43, category: 'vehicle', emoji: '🚑', name: 'きゅうきゅうしゃ' },
  { id: 44, category: 'vehicle', emoji: '🚒', name: 'しょうぼうしゃ' },
  { id: 45, category: 'vehicle', emoji: '🚓', name: 'パトカー' },
  { id: 46, category: 'vehicle', emoji: '🚛', name: 'トラック' },
  { id: 47, category: 'vehicle', emoji: '🚜', name: 'トラクター' },
  { id: 48, category: 'vehicle', emoji: '🚤', name: 'スピードボート' },
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
      <div className="flex items-center justify-center p-3 pt-20">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            🎯 フラッシュカード 🎯
          </h1>
          <p className="text-base text-gray-600 mb-6">
            どのカテゴリーで遊びますか？
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => handleCategorySelect('food')}
              className="flex flex-col items-center bg-orange-50 hover:bg-orange-100 p-5 rounded-xl border-2 border-orange-200 transition-all transform hover:scale-105"
            >
              <span className="text-3xl mb-2">🍎</span>
              <span className="text-sm font-medium text-orange-800">たべもの</span>
              <span className="text-xs text-orange-600">8枚</span>
            </button>
            
            <button
              onClick={() => handleCategorySelect('animal')}
              className="flex flex-col items-center bg-green-50 hover:bg-green-100 p-5 rounded-xl border-2 border-green-200 transition-all transform hover:scale-105"
            >
              <span className="text-3xl mb-2">🐶</span>
              <span className="text-sm font-medium text-green-800">どうぶつ</span>
              <span className="text-xs text-green-600">8枚</span>
            </button>
            
            <button
              onClick={() => handleCategorySelect('vehicle')}
              className="flex flex-col items-center bg-blue-50 hover:bg-blue-100 p-5 rounded-xl border-2 border-blue-200 transition-all transform hover:scale-105"
            >
              <span className="text-3xl mb-2">🚗</span>
              <span className="text-sm font-medium text-blue-800">のりもの</span>
              <span className="text-xs text-blue-600">8枚</span>
            </button>
            
            <button
              onClick={() => handleCategorySelect('all')}
              className="flex flex-col items-center bg-purple-50 hover:bg-purple-100 p-5 rounded-xl border-2 border-purple-200 transition-all transform hover:scale-105"
            >
              <span className="text-3xl mb-2">🎯</span>
              <span className="text-sm font-medium text-purple-800">すべて</span>
              <span className="text-xs text-purple-600">24枚</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-3 pt-20">
      <div className="w-full max-w-sm mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-4">
          <div className="flex justify-between items-center mb-3 bg-white rounded-xl p-3 shadow-lg">
            <button
              onClick={handleBackToHome}
              className="text-gray-600 hover:text-gray-800 px-2 py-1 rounded-lg hover:bg-gray-100 transition-all text-sm"
            >
              ← ホーム
            </button>
            <div className="text-sm font-semibold text-gray-700">
              {currentCardIndex + 1} / {filteredCards.length}
            </div>
            <div className="w-12"></div> {/* スペーサー */}
          </div>
          <div className={`inline-block px-4 py-2 rounded-full text-xs font-semibold border-2 ${getCategoryColor(currentCard.category)}`}>
            {getCategoryEmoji(selectedCategory)} {getCategoryName(selectedCategory)}
          </div>
        </div>

        {/* カード */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-4 border border-gray-100">
          <div className="text-center">
            <div className="text-6xl mb-4 p-4 bg-gray-50 rounded-2xl inline-block">{currentCard.emoji}</div>
            <p className="text-xl font-bold text-gray-800 mb-4">これはなあに？</p>
            
            {/* 答え表示エリア - 固定の高さを確保 */}
            <div className="min-h-[80px] flex items-center justify-center mb-4">
              {showAnswer ? (
                <div className="text-2xl font-bold text-purple-700 bg-purple-50 p-4 rounded-xl">
                  {currentCard.name}
                </div>
              ) : (
                <button
                  onClick={handleShowAnswer}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full text-base font-bold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg transform hover:scale-105"
                >
                  こたえをみる
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ナビゲーション */}
        <div className="flex justify-between items-center bg-white rounded-2xl p-4 shadow-xl">
          <button
            onClick={handlePreviousCard}
            disabled={currentCardIndex === 0}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 ${
              currentCardIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 shadow-lg'
            }`}
          >
            ← まえ
          </button>
          
          <div className="text-center px-3">
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(filteredCards.length, 8) }, (_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${
                    i === currentCardIndex % 8 ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                />
              ))}
              {filteredCards.length > 8 && (
                <span className="text-gray-500 text-xs ml-1">...</span>
              )}
            </div>
          </div>
          
          <button
            onClick={handleNextCard}
            disabled={currentCardIndex === filteredCards.length - 1}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 ${
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
