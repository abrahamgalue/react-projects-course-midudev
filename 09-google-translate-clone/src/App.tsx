import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'

import { useEffect } from 'react'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'

import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'
import { Toast } from './components/Toastify'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants'
import { useDebounce } from './hooks/useDebounce'
import { useStore } from './hooks/useStore'
import { translate } from './services/translate'
import { SectionType } from './types.d'
import { notify } from './utils/toastify'

function App() {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    setFromText,
    setResult,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
  } = useStore()

  const debouncedFromText = useDebounce(fromText, 650)

  useEffect(() => {
    if (debouncedFromText === '')
      return

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then((result) => {
        if (result == null)
          return
        setResult(result)
      })
      .catch(() => setResult('Parece que hubo un problema...'))
  }, [debouncedFromText, fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).then(() => {})
    notify()
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <h2>Google Translate</h2>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              value={fromText}
              onChange={setFromText}
              type={SectionType.From}
            />
          </Stack>
        </Col>

        <Col xs="auto">
          <Button
            variant="link"
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
          >
            <ArrowsIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <div style={{ position: 'relative' }}>
              <TextArea
                loading={loading}
                type={SectionType.To}
                value={result}
                onChange={setResult}
              />
              {fromText && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    display: 'flex',
                  }}
                >
                  <Button variant="link" onClick={handleClipboard}>
                    <ClipboardIcon />
                    <Toast />
                  </Button>
                  <Button variant="link" onClick={handleSpeak}>
                    <SpeakerIcon />
                  </Button>
                </div>
              )}
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
