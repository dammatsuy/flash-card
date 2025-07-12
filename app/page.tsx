'use client'

import { useState, useEffect } from 'react'
import data from './data.json'

// データの型定義
type DataItem = string | { [key: string]: string }
type CategoryData = {
  [key: string]: DataItem[]
}

// フラッシュカードの型定義
type FlashCard = {
  id: string
  category: string
  name: string
  imagePath?: string
  answer?: string
  displayValue?: string
}

export default function FlashCardApp() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [filteredCards, setFilteredCards] = useState<FlashCard[]>([])

  // データからフラッシュカードを生成
  const generateFlashCards = (): FlashCard[] => {
    const cards: FlashCard[] = []
    
    data.forEach((categoryData: any) => {
      const categoryName = Object.keys(categoryData)[0]
      const items = categoryData[categoryName]
      
      if (Array.isArray(items)) {
        items.forEach((item, index) => {
          if (typeof item === 'string') {
            if (categoryName === 'ひらがな') {
              // ひらがなは文字をそのまま表示
              cards.push({
                id: `${categoryName}-${index}`,
                category: categoryName,
                name: item,
                displayValue: item
              })
            } else {
              // その他の文字列アイテム（もの、しぜん、しょくぶつ）
              cards.push({
                id: `${categoryName}-${index}`,
                category: categoryName,
                name: item,
                imagePath: `/flash-cards/images/${categoryName}/${item}.png`
              })
            }
          } else if (typeof item === 'object') {
            // オブジェクトアイテム（あるふぁべっと、かず）
            const key = Object.keys(item)[0]
            const value = item[key]
            if (categoryName === 'あるふぁべっと' || categoryName === 'かず') {
              // アルファベットと数字はvalueを表示
              cards.push({
                id: `${categoryName}-${index}`,
                category: categoryName,
                name: key,
                answer: value,
                displayValue: value
              })
            } else {
              cards.push({
                id: `${categoryName}-${index}`,
                category: categoryName,
                name: key,
                answer: value,
                imagePath: `/flash-cards/images/${categoryName}/${key}.png`
              })
            }
          }
        })
      }
    })
    
    return cards
  }

  const allCards = generateFlashCards()

  // カテゴリに基づいてカードをフィルタリング
  useEffect(() => {
    let cards = [...allCards]
    
    if (selectedCategory && selectedCategory !== 'all') {
      cards = allCards.filter(card => card.category === selectedCategory)
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
    setSelectedCategory('')
    setCurrentCardIndex(0)
    setShowAnswer(false)
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setGameStarted(true)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'どうぶつ': return 'bg-green-50 border-green-200 text-green-800'
      case 'たべもの': return 'bg-orange-50 border-orange-200 text-orange-800'
      case 'のりもの': return 'bg-blue-50 border-blue-200 text-blue-800'
      case 'ひらがな': return 'bg-purple-50 border-purple-200 text-purple-800'
      case 'あるふぁべっと': return 'bg-indigo-50 border-indigo-200 text-indigo-800'
      case 'かず': return 'bg-red-50 border-red-200 text-red-800'
      case 'もの': return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      case 'しぜん': return 'bg-teal-50 border-teal-200 text-teal-800'
      case 'しょくぶつ': return 'bg-emerald-50 border-emerald-200 text-emerald-800'
      default: return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'どうぶつ': return '🐶'
      case 'たべもの': return '🍎'
      case 'のりもの': return '🚗'
      case 'ひらがな': return 'あ'
      case 'あるふぁべっと': return 'A'
      case 'かず': return '1'
      case 'もの': return '📱'
      case 'しぜん': return '🌲'
      case 'しょくぶつ': return '🌸'
      default: return '🎯'
    }
  }

  const getCategoryCount = (category: string) => {
    if (category === 'all') {
      return allCards.length
    }
    return allCards.filter(card => card.category === category).length
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
            {data.map((categoryData: any) => {
              const categoryName = Object.keys(categoryData)[0]
              return (
                <button
                  key={categoryName}
                  onClick={() => handleCategorySelect(categoryName)}
                  className={`flex flex-col items-center p-5 rounded-xl border-2 transition-all transform hover:scale-105 ${getCategoryColor(categoryName)}`}
                >
                  <span className="text-3xl mb-2">{getCategoryEmoji(categoryName)}</span>
                  <span className="text-sm font-medium">{categoryName}</span>
                  <span className="text-xs opacity-70">{getCategoryCount(categoryName)}枚</span>
                </button>
              )
            })}
            
            <button
              onClick={() => handleCategorySelect('all')}
              className="flex flex-col items-center bg-purple-50 hover:bg-purple-100 p-5 rounded-xl border-2 border-purple-200 transition-all transform hover:scale-105"
            >
              <span className="text-3xl mb-2">🎯</span>
              <span className="text-sm font-medium text-purple-800">すべて</span>
              <span className="text-xs text-purple-600">{allCards.length}枚</span>
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
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← 戻る
            </button>
            <div className="text-center">
              <h2 className="text-lg font-bold text-gray-800">
                {selectedCategory === 'all' ? 'すべて' : selectedCategory}
              </h2>
              <p className="text-sm text-gray-600">
                {currentCardIndex + 1} / {filteredCards.length}
              </p>
            </div>
            <div className="w-8"></div>
          </div>
        </div>

        {/* フラッシュカード */}
        {currentCard && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="text-center">
              {/* 画像または文字表示 */}
              <div className="mb-6">
                {currentCard.imagePath ? (
                  <img
                    src={currentCard.imagePath}
                    alt={currentCard.name}
                    className="w-48 h-48 mx-auto object-contain rounded-lg shadow-md"
                    onError={(e) => {
                      // 画像が見つからない場合のフォールバック
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      target.nextElementSibling?.classList.remove('hidden')
                    }}
                  />
                ) : currentCard.displayValue ? (
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-md flex items-center justify-center">
                    <span className="text-8xl font-bold text-gray-800">{currentCard.displayValue}</span>
                  </div>
                ) : (
                  <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center text-4xl text-gray-400">
                    {getCategoryEmoji(currentCard.category)}
                  </div>
                )}
                <div className="hidden w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center text-4xl text-gray-400">
                  {getCategoryEmoji(currentCard.category)}
                </div>
              </div>

              {/* 答え */}
              {showAnswer ? (
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-800">{currentCard.name}</h3>
                  {currentCard.answer && (
                    <p className="text-xl text-blue-600 font-semibold">{currentCard.answer}</p>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleShowAnswer}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-colors w-full"
                >
                  答えを見る
                </button>
              )}
            </div>
          </div>
        )}

        {/* ナビゲーションボタン */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePreviousCard}
            disabled={currentCardIndex === 0}
            className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:cursor-not-allowed"
          >
            前へ
          </button>
          
          <button
            onClick={handleNextCard}
            disabled={currentCardIndex === filteredCards.length - 1}
            className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:cursor-not-allowed"
          >
            次へ
          </button>
        </div>
      </div>
    </div>
  )
}
