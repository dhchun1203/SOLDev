import { useCallback, useEffect, useRef, useState } from 'react'
import './ChatBot.css'

const STORAGE_KEY = 'soldev_chat_history'
const MAX_HISTORY = 50
const GROQ_CHAT_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = 'llama-3.3-70b-versatile'

function detectLanguage(text: string): 'ko' | 'en' {
  const koreanRegex = /[\uAC00-\uD7A3]/
  return koreanRegex.test(text) ? 'ko' : 'en'
}

function getSystemPrompt(lang: 'ko' | 'en'): string {
  const prompts = {
    ko: '당신은 SOLDev 웹 제작 서비스의 친절한 상담 챗봇입니다. 웹사이트/웹서비스 제작, 오픈 특가, 베이직 및 서비스형 패키지, 반응형과 React/Next.js 기술 등에 대해 간결하고 도움이 되는 답변을 한국어로 제공하세요. 회사 소개나 가격 문의가 오면 사이트 내용을 바탕으로 안내하고, 구체적인 문의는 문의하기를 권유하세요.',
    en: 'You are a helpful support chatbot for SOLDev, a web development service. Answer concisely in English about website/web app development, open special offers, Basic/Service packages, responsive design, React/Next.js, etc. When asked about the company or pricing, refer to the site content and suggest using the contact form for specific requests.',
  }
  return prompts[lang]
}

export type ChatMessage = {
  id: string
  role: 'user' | 'model'
  text: string
  lang?: 'ko' | 'en'
  createdAt: number
}

function loadHistory(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as ChatMessage[]
    return Array.isArray(parsed) ? parsed.slice(-MAX_HISTORY) : []
  } catch {
    return []
  }
}

function saveHistory(messages: ChatMessage[]) {
  try {
    const toSave = messages.slice(-MAX_HISTORY)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  } catch {
    // ignore
  }
}

const TRAY_CLOSE_DURATION_MS = 320

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadHistory())
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const apiKey = import.meta.env.VITE_GROQ_API_KEY as string | undefined

  useEffect(() => {
    if (messages.length) saveHistory(messages)
  }, [messages])

  useEffect(() => {
    if (open && listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [open, messages])

  useEffect(() => {
    if (!closing) return
    const t = setTimeout(() => {
      setOpen(false)
      setClosing(false)
    }, TRAY_CLOSE_DURATION_MS)
    return () => clearTimeout(t)
  }, [closing])

  const closeTray = useCallback(() => {
    setClosing(true)
    /* open은 슬라이드다운 애니메이션 끝난 뒤 false로 (useEffect에서 처리) */
  }, [])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || loading || !apiKey) {
      if (!apiKey) setError('API 키가 설정되지 않았습니다. VITE_GROQ_API_KEY를 확인하세요.')
      return
    }
    setError(null)
    const lang = detectLanguage(text)
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      lang,
      createdAt: Date.now(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    const modelMsgId = `model-${Date.now()}`
    const modelMsg: ChatMessage = {
      id: modelMsgId,
      role: 'model',
      text: '',
      createdAt: Date.now(),
    }
    setMessages((prev) => [...prev, modelMsg])

    try {
      const systemPrompt = getSystemPrompt(lang)
      const historyWithUser: ChatMessage[] = [...messages, userMsg]
      const prevTurns = historyWithUser.slice(0, -1).slice(-20)
      const apiMessages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
        { role: 'system', content: systemPrompt },
        ...prevTurns.map((m) => ({
          role: (m.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
          content: m.text,
        })),
        { role: 'user', content: text },
      ]

      const res = await fetch(GROQ_CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: apiMessages,
          max_tokens: 1024,
        }),
      })

      if (!res.ok) {
        const errBody = await res.text()
        let errMessage = errBody
        try {
          const j = JSON.parse(errBody)
          errMessage = j.error?.message ?? errBody
        } catch {
          // use errBody as is
        }
        throw new Error(`${res.status} ${errMessage}`)
      }

      const data = await res.json() as { choices?: Array<{ message?: { content?: string } }> }
      const reply = data.choices?.[0]?.message?.content?.trim() ?? ''

      setMessages((prev) =>
        prev.map((m) => (m.id === modelMsgId ? { ...m, text: reply } : m))
      )
    } catch (err) {
      const raw = err instanceof Error ? err.message : '응답을 가져오지 못했습니다.'
      const is429 = raw.includes('429') || raw.toLowerCase().includes('rate limit') || raw.toLowerCase().includes('quota')
      const userMessage = is429
        ? 'API 사용량 한도를 초과했습니다. Groq 콘솔에서 할당량을 확인하거나 잠시 후 다시 시도해 주세요.'
        : '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
      const errorDisplay = is429
        ? '사용량 한도 초과(429). Groq 할당량/요금제를 확인하거나 잠시 후 다시 시도해 주세요.'
        : raw
      setError(errorDisplay)
      setMessages((prev) =>
        prev.map((m) =>
          m.id === modelMsgId ? { ...m, text: userMessage } : m
        )
      )
    } finally {
      setLoading(false)
    }
  }, [input, loading, apiKey, messages])

  const clearHistory = useCallback(() => {
    setMessages([])
    localStorage.removeItem(STORAGE_KEY)
    setError(null)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        sendMessage()
      }
    },
    [sendMessage]
  )

  const handleTrayKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        setOpen(true)
      }
    },
    [open]
  )

  return (
    <div className="chatbot-widget">
      <div
        className={`chatbot-tray ${open ? 'chatbot-tray--open' : ''} ${closing ? 'chatbot-tray--closing' : ''}`}
        role={open ? undefined : 'button'}
        tabIndex={open ? undefined : 0}
        aria-label={open ? undefined : '챗봇 열기'}
        aria-expanded={open}
        onClick={!open ? () => setOpen(true) : undefined}
        onKeyDown={handleTrayKeyDown}
      >
        {/* 닫힐 때: FAB 버튼처럼 보이는 말풍선 아이콘 */}
        <span className="chatbot-tray-fab-face" aria-hidden={open}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        </span>
        {/* 열릴 때: 버튼이 채팅창으로 확장된 내용 */}
        <div className="chatbot-tray-panel" aria-hidden={!open}>
          <div className="chatbot-panel-header">
            <h3 className="chatbot-panel-title">SOLDev 상담</h3>
            <div className="chatbot-panel-actions">
              <button
                type="button"
                className="chatbot-btn-icon"
                onClick={(e) => { e.stopPropagation(); clearHistory() }}
                title="대화 기록 지우기"
                aria-label="대화 기록 지우기"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              </button>
              <button
                type="button"
                className="chatbot-btn-icon"
                onClick={(e) => { e.stopPropagation(); closeTray() }}
                aria-label="챗봇 닫기"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
          <div className="chatbot-messages" ref={listRef}>
            {messages.length === 0 && (
              <div className="chatbot-welcome">
                <p>안녕하세요. SOLDev 상담 챗봇입니다.</p>
                <p>한국어 또는 영어로 질문해 주세요.</p>
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`chatbot-msg chatbot-msg--${m.role}`}>
                <div className="chatbot-msg-bubble">
                  <span className="chatbot-msg-text">{m.text}</span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="chatbot-msg chatbot-msg--model">
                <div className="chatbot-msg-bubble chatbot-msg-bubble--typing">
                  <span className="chatbot-dots">
                    <span /><span /><span />
                  </span>
                </div>
              </div>
            )}
          </div>
          {error && (
            <div className="chatbot-error" role="alert">
              {error}
            </div>
          )}
          <div className="chatbot-input-wrap" onClick={(e) => e.stopPropagation()}>
            <textarea
              ref={inputRef}
              className="chatbot-input"
              placeholder="메시지를 입력하세요..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={loading}
              aria-label="챗봇 메시지 입력"
            />
            <button
              type="button"
              className="chatbot-send"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="보내기"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
