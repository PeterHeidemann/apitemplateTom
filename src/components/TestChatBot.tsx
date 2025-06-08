'use client'

import { useState, useRef, useEffect } from 'react'
import MarkdownRenderer from './MarkdownRenderer'
import CameraCapture from './CameraCapture'

interface UploadedFile {
  id: string
  name: string
  type: 'image' | 'document' | 'data'
  preview: string | null
  content: string
  size: number
  uploadedAt: Date
  selected: boolean
}

export default function TestChatBot() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [uploadedContent, setUploadedContent] = useState('')
  const [capturedImage, setCapturedImage] = useState<string>('')
  const [imagePreview, setImagePreview] = useState<string>('')
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [pasteHint, setPasteHint] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<any>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Setup paste event listeners
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.addEventListener('paste', handlePaste)
      return () => {
        textarea.removeEventListener('paste', handlePaste)
      }
    }
  }, [])

  // Voice recognition setup
  const initializeVoiceRecognition = () => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = 'nl-NL'
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setMessage(prev => prev + ' ' + transcript)
        }
        
        recognition.onend = () => {
          setIsListening(false)
        }
        
        recognition.onerror = () => {
          setIsListening(false)
        }
        
        return recognition
      }
    }
    return null
  }

  const toggleVoiceRecognition = () => {
    if (!recognitionRef.current) {
      recognitionRef.current = initializeVoiceRecognition()
    }
    
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop()
        setIsListening(false)
      } else {
        recognitionRef.current.start()
        setIsListening(true)
      }
    }
  }

  const handleCameraCapture = (imageData: string, blob: Blob) => {
    // Add to file manager instead of single image
    const uploadedFile: UploadedFile = {
      id: generateFileId(),
      name: `Camera_${new Date().toLocaleTimeString()}.jpg`,
      type: 'image',
      preview: imageData,
      content: imageData,
      size: blob.size,
      uploadedAt: new Date(),
      selected: true
    }
    
    addUploadedFile(uploadedFile)
  }

  const removeCapturedImage = () => {
    setCapturedImage('')
    setImagePreview('')
  }

  const generateFileId = () => `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  const addUploadedFile = (file: UploadedFile) => {
    setUploadedFiles(prev => [...prev, file])
  }

  const removeUploadedFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id))
  }

  const toggleFileSelection = (id: string) => {
    setUploadedFiles(prev => 
      prev.map(file => 
        file.id === id ? { ...file, selected: !file.selected } : file
      )
    )
  }

  const selectAllFiles = () => {
    setUploadedFiles(prev => prev.map(file => ({ ...file, selected: true })))
  }

  const deselectAllFiles = () => {
    setUploadedFiles(prev => prev.map(file => ({ ...file, selected: false })))
  }

  const getSelectedFiles = () => uploadedFiles.filter(file => file.selected)

  const handlePaste = async (e: ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (!items) return

    // Check for images first
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      
      if (item.type.startsWith('image/')) {
        e.preventDefault()
        const file = item.getAsFile()
        if (file) {
          const reader = new FileReader()
          reader.onload = (event) => {
            const result = event.target?.result as string
            
            // Add to file manager instead of single image
            const uploadedFile: UploadedFile = {
              id: generateFileId(),
              name: file.name || 'Pasted Image',
              type: 'image',
              preview: result,
              content: result,
              size: file.size,
              uploadedAt: new Date(),
              selected: true
            }
            
            addUploadedFile(uploadedFile)
            setPasteHint('📸 Afbeelding geplakt!')
            setTimeout(() => setPasteHint(''), 3000)
          }
          reader.readAsDataURL(file)
        }
        return
      }
    }

    // Check for text/URLs
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      
      if (item.type === 'text/plain') {
        item.getAsString(async (pastedText) => {
          // Check if it's a URL
          const urlRegex = /(https?:\/\/[^\s]+)/g
          const urls = pastedText.match(urlRegex)
          
          if (urls && urls.length === 1 && pastedText.trim() === urls[0]) {
            // It's just a URL, try to fetch content
            e.preventDefault()
            try {
              await handleUrlPaste(urls[0])
            } catch (error) {
              // If URL fetch fails, just paste as normal text
              setMessage(prev => prev + pastedText)
            }
          } else {
            // Regular text paste - let it happen normally
            setPasteHint('📝 Tekst geplakt!')
            setTimeout(() => setPasteHint(''), 2000)
          }
        })
        return
      }
    }
  }

  const handleUrlPaste = async (url: string) => {
    setPasteHint('🔗 URL wordt geladen...')
    
    try {
      // Check if it's an image URL
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp']
      const isImageUrl = imageExtensions.some(ext => url.toLowerCase().includes(ext))
      
      if (isImageUrl) {
        // Load image directly
        setCapturedImage(url)
        setImagePreview(url)
        setPasteHint('🖼️ Afbeelding URL geladen!')
        setTimeout(() => setPasteHint(''), 3000)
      } else {
        // For other URLs, just add to message with instruction
        setMessage(prev => prev + (prev ? '\n\n' : '') + `🔗 URL: ${url}\n\nKun je deze link analyseren of de inhoud samenvatten?`)
        setPasteHint('🔗 URL toegevoegd!')
        setTimeout(() => setPasteHint(''), 3000)
      }
    } catch (error) {
      console.error('URL paste error:', error)
      setMessage(prev => prev + url)
      setPasteHint('❌ URL als tekst geplakt')
      setTimeout(() => setPasteHint(''), 3000)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      if (files.length === 1) {
        await handleFileUpload(files[0])
      } else {
        await handleMultipleFileUpload(files)
      }
    }

    // Also check for dropped text/URLs
    const text = e.dataTransfer.getData('text/plain')
    if (text && !files.length) {
      const urlRegex = /(https?:\/\/[^\s]+)/g
      const urls = text.match(urlRegex)
      
      if (urls && urls.length === 1 && text.trim() === urls[0]) {
        await handleUrlPaste(urls[0])
      } else {
        setMessage(prev => prev + (prev ? '\n\n' : '') + text)
        setPasteHint('📝 Tekst gedropt!')
        setTimeout(() => setPasteHint(''), 2000)
      }
    }
  }

  const handleFileUpload = async (file: File) => {
    return handleSingleFileUpload(file)
  }

  const handleMultipleFileUpload = async (files: FileList | File[]) => {
    const fileArray = Array.from(files)
    const uploadPromises = fileArray.map(file => handleSingleFileUpload(file))
    await Promise.all(uploadPromises)
  }

  const handleSingleFileUpload = async (file: File) => {
    const fileName = file.name.toLowerCase()
    const fileType = file.type.toLowerCase()
    
    // Definieer ondersteunde formaten
    const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp']
    const documentFormats = ['docx', 'pdf', 'txt', 'md']
    const dataFormats = ['csv', 'json']
    
    // Check file extension
    const extension = fileName.split('.').pop() || ''
    const isImage = imageFormats.some(format => fileName.endsWith(`.${format}`)) || fileType.startsWith('image/')
    const isDocument = documentFormats.some(format => fileName.endsWith(`.${format}`))
    const isData = dataFormats.some(format => fileName.endsWith(`.${format}`))
    
    if (!isImage && !isDocument && !isData) {
      alert(`Bestandstype niet ondersteund!\n\nOndersteunde formaten:\n📸 Afbeeldingen: ${imageFormats.join(', ')}\n📄 Documenten: ${documentFormats.join(', ')}\n📊 Data: ${dataFormats.join(', ')}`)
      return
    }

    try {
      if (isImage) {
        // Handle images - add to file manager
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          
          const uploadedFile: UploadedFile = {
            id: generateFileId(),
            name: file.name,
            type: 'image',
            preview: result,
            content: result,
            size: file.size,
            uploadedAt: new Date(),
            selected: true
          }
          
          addUploadedFile(uploadedFile)
        }
        reader.onerror = () => {
          alert('Fout bij het lezen van de afbeelding')
        }
        reader.readAsDataURL(file)
        return
      }
      
      if (fileName.endsWith('.txt') || fileName.endsWith('.md')) {
        // Handle text files - add to file manager
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          
          const uploadedFile: UploadedFile = {
            id: generateFileId(),
            name: file.name,
            type: 'document',
            preview: content.length > 100 ? content.substring(0, 100) + '...' : content,
            content: content,
            size: file.size,
            uploadedAt: new Date(),
            selected: true
          }
          
          addUploadedFile(uploadedFile)
        }
        reader.onerror = () => {
          alert('Fout bij het lezen van het tekstbestand')
        }
        reader.readAsText(file, 'UTF-8')
        return
      }
      
      if (fileName.endsWith('.json')) {
        // Handle JSON files - add to file manager
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const content = e.target?.result as string
            const jsonData = JSON.parse(content)
            const formattedContent = JSON.stringify(jsonData, null, 2)
            
            const uploadedFile: UploadedFile = {
              id: generateFileId(),
              name: file.name,
              type: 'data',
              preview: formattedContent.length > 100 ? formattedContent.substring(0, 100) + '...' : formattedContent,
              content: formattedContent,
              size: file.size,
              uploadedAt: new Date(),
              selected: true
            }
            
            addUploadedFile(uploadedFile)
          } catch (error) {
            alert('Ongeldig JSON bestand')
          }
        }
        reader.readAsText(file, 'UTF-8')
        return
      }
      
      // Handle other documents (PDF, DOCX, CSV) via server upload
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload-docx', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }

      const data = await response.json()
      
      // Add to file manager
      const uploadedFile: UploadedFile = {
        id: generateFileId(),
        name: file.name,
        type: fileName.endsWith('.csv') ? 'data' : 'document',
        preview: data.content.length > 100 ? data.content.substring(0, 100) + '...' : data.content,
        content: data.content,
        size: file.size,
        uploadedAt: new Date(),
        selected: true
      }
      
      addUploadedFile(uploadedFile)
    } catch (error) {
      console.error('File upload error:', error)
      alert('Fout bij uploaden: ' + (error instanceof Error ? error.message : 'Onbekende fout'))
    }
  }

  const sendMessage = async () => {
    const selectedFiles = getSelectedFiles()
    
    if (!message.trim() && selectedFiles.length === 0) return

    setIsLoading(true)
    try {
      const payload: any = { message }
      
      // Add selected files to payload
      if (selectedFiles.length > 0) {
        // Send ALL selected images for Gemini Vision
        const selectedImages = selectedFiles.filter(file => file.type === 'image')
        if (selectedImages.length > 0) {
          payload.images = selectedImages.map(img => img.content)
        }
        
        // Add context from all selected files
        const fileContexts = selectedFiles.map((file, index) => {
          const fileType = file.type === 'image' ? 'Afbeelding' : 
                          file.type === 'document' ? 'Document' : 'Data'
          if (file.type === 'image') {
            return `[${fileType} ${index + 1}: ${file.name}]\n[Afbeelding bijgevoegd voor analyse]`
          } else {
            return `[${fileType}: ${file.name}]\n${file.content}`
          }
        }).join('\n\n---\n\n')
        
        if (message.trim()) {
          payload.message = `${message}\n\n=== BIJGEVOEGDE BESTANDEN ===\n${fileContexts}`
        } else {
          payload.message = `Analyseer de volgende bestanden:\n\n${fileContexts}`
        }
      }

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Er is een fout opgetreden')
      }

      const data = await res.json()
      setResponse(data.response)
    } catch (error) {
      console.error('Error:', error)
      setResponse('Error: ' + (error instanceof Error ? error.message : 'Onbekende fout'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
        <span className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-2">
          <span className="text-white text-sm">💬</span>
        </span>
        Test je API Key
      </h3>
      
      <div className="space-y-4">
        {/* File Manager */}
        {uploadedFiles.length > 0 && (
          <div className="bg-white rounded-lg border border-purple-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-purple-800 flex items-center">
                <span className="w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white text-xs">📁</span>
                </span>
                Geüploade Bestanden ({uploadedFiles.length})
              </h4>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => getSelectedFiles().length === uploadedFiles.length ? deselectAllFiles() : selectAllFiles()}
                  className="text-xs text-purple-600 hover:text-purple-800"
                >
                  {getSelectedFiles().length === uploadedFiles.length ? 'Deselecteer alles' : 'Selecteer alles'}
                </button>
                <span className="text-xs text-gray-500">
                  {getSelectedFiles().length} geselecteerd
                  {getSelectedFiles().filter(f => f.type === 'image').length > 1 && 
                    ` (${getSelectedFiles().filter(f => f.type === 'image').length} afbeeldingen)`
                  }
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className={`border rounded-lg p-3 transition-all cursor-pointer ${
                    file.selected 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => toggleFileSelection(file.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={file.selected}
                        onChange={() => toggleFileSelection(file.id)}
                        className="rounded text-purple-600"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className="text-lg">
                        {file.type === 'image' ? '📸' : file.type === 'document' ? '📄' : '📊'}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeUploadedFile(file.id)
                      }}
                      className="text-red-500 hover:text-red-700 text-sm"
                      title="Verwijder bestand"
                    >
                      ×
                    </button>
                  </div>
                  
                  {file.type === 'image' && file.preview && (
                    <div className="mb-2">
                      <img 
                        src={file.preview} 
                        alt={file.name}
                        className="w-full h-20 object-cover rounded"
                      />
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-700">
                    <p className="font-medium truncate" title={file.name}>
                      {file.name}
                    </p>
                    <p className="text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                    {file.type !== 'image' && (
                      <p className="text-gray-600 mt-1 line-clamp-2">
                        {file.preview}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className={`bg-white rounded-lg border transition-all duration-200 p-3 ${
          isDragOver 
            ? 'border-purple-500 border-2 bg-purple-50' 
            : 'border-purple-200'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>


          {/* Drag & Drop Overlay */}
          {isDragOver && (
            <div className="absolute inset-2 border-2 border-dashed border-purple-400 rounded-lg bg-purple-50 bg-opacity-90 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="text-4xl mb-2">📁</div>
                <p className="text-purple-700 font-semibold">Drop bestanden of tekst hier</p>
                <p className="text-purple-600 text-sm">Afbeeldingen, documenten, of URLs</p>
              </div>
            </div>
          )}

          <div className="flex items-end space-x-2">
            {/* Text Input */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isDragOver ? "Drop bestanden of tekst hier..." : "Typ een vraag voor Gemini... (of plak met Ctrl+V)"}
                className="w-full p-2 border-0 resize-none focus:outline-none"
                rows={2}
                disabled={isLoading}
              />
              {pasteHint && (
                <div className="absolute top-0 right-0 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg">
                  {pasteHint}
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* File Upload Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                title="Bestand uploaden (📸 afbeeldingen, 📄 documenten, 📊 data)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              
              {/* Camera Button */}
              <CameraCapture 
                onCapture={handleCameraCapture}
                disabled={isLoading}
              />
              
              {/* Voice Input Button */}
              <button
                onClick={toggleVoiceRecognition}
                disabled={isLoading}
                className={`p-2 rounded-lg transition-colors ${
                  isListening 
                    ? 'text-red-600 bg-red-50 animate-pulse' 
                    : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50'
                }`}
                title={isListening ? "Stop opnamen" : "Start spraakherkenning"}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
              
              {/* Send Button */}
              <button
                onClick={sendMessage}
                disabled={isLoading || !message.trim()}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? '⏳' : '🚀'}
              </button>
            </div>
          </div>
          
          {/* Upload Status */}
          {uploadedContent && (
            <div className="mt-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
              ✅ Bestand geüpload ({uploadedContent.length} karakters)
            </div>
          )}
          
          {/* Voice Status */}
          {isListening && (
            <div className="mt-2 text-xs text-red-600 bg-red-50 px-2 py-1 rounded flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
              Luistert...
            </div>
          )}
        </div>

        {/* Response Area */}
        {isLoading && (
          <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <span className="text-purple-700 text-sm">Gemini denkt na...</span>
            </div>
          </div>
        )}

        {response && !isLoading && (
          <div className={`p-4 rounded-lg ${
            response.startsWith('Error:') 
              ? 'bg-red-50 border border-red-200' 
              : 'bg-green-50 border border-green-200'
          }`}>
            <p className={`text-sm font-medium mb-2 ${
              response.startsWith('Error:') 
                ? 'text-red-800' 
                : 'text-green-800'
            }`}>
              {response.startsWith('Error:') 
                ? '❌ Fout:' 
                : '✅ Succes! Je API key werkt perfect:'
              }
            </p>
            <div className="bg-white p-3 rounded border">
              {response.startsWith('Error:') ? (
                <p className="text-gray-700 text-sm whitespace-pre-wrap">
                  {response}
                </p>
              ) : (
                <MarkdownRenderer 
                  content={response} 
                  className="text-gray-700 text-sm"
                />
              )}
            </div>
            {response.startsWith('Error:') && (
              <p className="text-red-600 text-xs mt-2">
                Controleer of je API key correct is ingesteld in .env.local
              </p>
            )}
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".docx,.pdf,.txt,.md,.csv,.json,.jpg,.jpeg,.png,.gif,.webp,.bmp,image/*"
          onChange={(e) => {
            const files = e.target.files
            if (files && files.length > 0) {
              if (files.length === 1) {
                handleFileUpload(files[0])
              } else {
                handleMultipleFileUpload(files)
              }
            }
            // Reset input value to allow selecting the same files again
            e.target.value = ''
          }}
          className="hidden"
        />
      </div>
    </div>
  )
}