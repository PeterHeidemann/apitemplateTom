# 🚀 Ultimate AI Education Template - Next.js

> **Een complete, professionele AI template met Gemini API, camera, multi-file upload, audio transcriptie en meer!**
>
> **Gemaakt door Tom Naberink voor de onderwijssector**

Een geavanceerde Next.js template die **alles** biedt wat je nodig hebt voor innovatieve AI-projecten in het onderwijs. Van simpele chatbots tot complexe multi-modal AI applicaties - dit is je startpunt!

## ✨ Complete Feature Set

### 🎯 **Core AI Functionaliteiten**
- 🧠 **Gemini 2.5 Flash Integration**: Nieuwste AI model met vision capabilities
- 🎵 **Audio Transcriptie**: OpenAI Whisper voor speech-to-text
- 📸 **Multi-Image Analysis**: Meerdere afbeeldingen tegelijk analyseren
- 💬 **Markdown Rendering**: Perfecte opmaak van AI responses
- 🗣️ **Spraakherkenning**: Browser native voice input

### 📁 **Geavanceerd File Management**
- 🖼️ **Afbeeldingen**: JPG, PNG, GIF, WebP, BMP - met preview en multi-select
- 📄 **Documenten**: PDF, DOCX, TXT, MD - automatische tekst extractie
- 📊 **Data**: CSV, JSON - gestructureerde data analyse
- 🎵 **Audio**: MP3, WAV, OGG, M4A, AAC, FLAC, MP4, WebM - auto-transcriptie
- 📱 **Camera Capture**: Direct foto's maken vanuit de browser
- 🎯 **Drag & Drop**: Bestanden slepen en neerzetten
- 📋 **Copy/Paste**: Afbeeldingen, URLs en tekst plakken
- ✅ **Batch Processing**: Meerdere bestanden tegelijk selecteren en verwerken

### 🎨 **User Experience**
- 💜 **Modern Design**: Strakke paarse interface met Tailwind CSS
- 📱 **Mobile First**: Perfect responsive op alle apparaten
- ⚡ **Real-time Feedback**: Loading states, progress indicators
- 🎮 **Keyboard Shortcuts**: Enter om te verzenden, Ctrl+V om te plakken
- 🔒 **Secure**: Alle API keys blijven server-side

### 🚀 **Deployment & Performance**
- 🌐 **Netlify Optimized**: Perfect voor Bolt.new deployment
- ⚡ **Next.js 15**: Nieuwste versie met optimale performance
- 🔧 **TypeScript**: Volledig type-safe development
- 📦 **Lean Dependencies**: Alleen wat nodig is, geen bloat

## 🚀 Quick Start: Van 0 naar AI in 5 Minuten!

### Stap 1: 🔑 API Keys Verkrijgen
**Vereist:** [Gemini API Key](https://makersuite.google.com/app/apikey) (gratis)  
**Optioneel:** [OpenAI API Key](https://platform.openai.com/api-keys) (voor audio transcriptie)

⚠️ **Kosten**: Gemini heeft een gratis tier. OpenAI Whisper kost ~$0.006 per minuut audio.

### Stap 2: 🛠️ Project Setup
```bash
# Clone het project
git clone https://github.com/TomNaberink/templateAPIinclcamera.git
cd templateAPIinclcamera

# Dependencies installeren
npm install

# Environment variables
cp .env.example .env.local
# Edit .env.local en voeg je API keys toe
```

### Stap 3: 🔧 Environment Configuration
Maak `.env.local` aan met je API keys:

```env
# VEREIST: Voor Gemini AI functionaliteit
GEMINI_API_KEY=your_gemini_api_key_here

# OPTIONEEL: Voor audio transcriptie met Whisper
OPENAI_API_KEY=your_openai_api_key_here
```

### Stap 4: 🎉 Start & Test
```bash
npm run dev
# Open http://localhost:3000
# Test alle features met de ingebouwde interface!
```

### Stap 5: 🚀 Deploy naar Netlify
1. **In Bolt.new**: "Deploy to Netlify"
2. **Environment Variables toevoegen** in Netlify dashboard:
   - `GEMINI_API_KEY` (vereist)
   - `OPENAI_API_KEY` (optioneel)
3. **Deploy** en je app is live!

## 📋 Volledige Feature Demonstratie

### 🎯 **Multi-Modal AI Conversaties**
```
✅ Upload 3 afbeeldingen + audio bestand + PDF document
✅ Selecteer welke bestanden je wilt analyseren  
✅ Vraag: "Vergelijk deze afbeeldingen met de audio transcriptie"
✅ Gemini analyseert alles tegelijk en geeft uitgebreid antwoord
```

### 📸 **Camera & Vision**
- 📷 Direct foto's maken in de browser
- 🖼️ Afbeelding preview met bewerking opties
- 👁️ Gemini Vision voor object/tekst herkenning
- 🔄 Multi-image comparison en analyse

### 🎵 **Audio Processing Pipeline**
```
Audio Upload → Whisper Transcriptie → Gemini Analyse → Markdown Response
```
- Ondersteunt 10+ audio formaten
- Automatische taaldetectie (Nederlands hint)
- Tot 25MB bestanden
- Perfecte transcriptie kwaliteit

### 📁 **Smart File Management**
- **Visual File Manager**: Grid view met previews
- **Batch Selection**: Checkboxes voor multi-select
- **Type Icons**: 📸 🎵 📄 📊 voor duidelijke herkenning
- **Size & Date Info**: Complete metadata weergave
- **Drag & Drop Zones**: Visuele feedback bij slepen

## 🛠️ Technical Architecture

### 📂 **Project Structure**
```
├── 🔑 .env.local                 # API Keys (maak zelf aan)
├── 📦 package.json               # Dependencies & scripts
├── ⚙️ next.config.js             # Next.js configuration
├── 🌐 netlify.toml               # Netlify deployment config
├── 📋 README.md                  # Deze documentatie
└── src/
    ├── 🎨 app/
    │   ├── 🌍 globals.css         # Tailwind CSS styling
    │   ├── 📱 layout.tsx          # App layout & metadata
    │   ├── 🏠 page.tsx            # Main interface
    │   └── 🔌 api/
    │       ├── 💬 chat/route.ts            # Gemini AI endpoint
    │       ├── 🎵 transcribe-audio/route.ts # Whisper transcription
    │       └── 📄 upload-docx/route.ts     # Document processing
    └── 🧩 components/
        ├── 🤖 TestChatBot.tsx     # Main AI interface
        ├── 📸 CameraCapture.tsx   # Camera functionality
        ├── 📝 MarkdownRenderer.tsx # Response formatting
        ├── 📁 FileUpload.tsx      # File handling
        ├── 🗣️ VoiceInput.tsx      # Speech recognition
        └── 📋 CopyButton.tsx      # Copy functionality
```

### 🔌 **API Endpoints**

| Endpoint | Functie | Input | Output |
|----------|---------|-------|--------|
| `/api/chat` | Gemini AI Conversatie | `message`, `images[]` | AI Response |
| `/api/transcribe-audio` | Audio → Tekst | Audio File | Transcriptie |
| `/api/upload-docx` | Document Processing | PDF/DOCX/CSV | Extracted Text |

### 📊 **Supported File Formats**

| Category | Formats | Processing | Max Size |
|----------|---------|------------|----------|
| 📸 **Images** | JPG, PNG, GIF, WebP, BMP | Gemini Vision | 20MB |
| 🎵 **Audio** | MP3, WAV, OGG, M4A, AAC, FLAC, MP4, WebM | OpenAI Whisper | 25MB |
| 📄 **Documents** | PDF, DOCX, TXT, MD | Text Extraction | 10MB |
| 📊 **Data** | CSV, JSON | Structure Parsing | 5MB |

## 🔧 Advanced Usage & Customization

### 🎨 **Styling Customization**
```css
/* globals.css - Pas het kleurenschema aan */
:root {
  --primary-color: #9333ea;     /* Paars accent */
  --secondary-color: #f3f4f6;   /* Light background */
  --text-color: #1f2937;        /* Dark text */
}
```

### 🤖 **Gemini Model Switching**
```typescript
// src/app/api/chat/route.ts
const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.5-flash-preview-05-20'  // Of: gemini-1.5-pro-latest
});
```

### 🎵 **Whisper Configuration**
```typescript
// src/app/api/transcribe-audio/route.ts
const transcription = await openai.audio.transcriptions.create({
  file: file,
  model: 'whisper-1',
  language: 'nl',              // Taal hint (auto-detect)
  response_format: 'text',     // Of: 'json', 'srt', 'vtt'
});
```

## 🌐 Production Deployment

### 🎯 **Netlify (Aanbevolen)**
**Via Bolt.new:**
1. ✅ "Deploy to Netlify" button
2. ✅ Build settings: `npm run build`
3. ✅ Environment variables toevoegen
4. ✅ Automatische HTTPS & CDN

**Handmatig:**
```bash
# Build voor productie
npm run build

# Deploy naar Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir=.next
```

### ⚡ **Vercel Alternative**
```bash
# Vercel deployment
npm install -g vercel
vercel --prod
# Vergeet niet environment variables in te stellen!
```

### 🔧 **Environment Variables (Production)**
```
GEMINI_API_KEY=gai_xxxxxxxxxxxxx     # Google AI Studio
OPENAI_API_KEY=sk-proj-xxxxxxxxxx    # OpenAI Platform
NODE_ENV=production                   # Auto-set door Netlify
```

## 🚨 Troubleshooting & Common Issues

### ❌ **Build Failures**
| Error | Oorzaak | Oplossing |
|-------|---------|-----------|
| `GEMINI_API_KEY not found` | Missing env var | Check Netlify environment variables |
| `Module not found: openai` | Missing dependency | Run `npm install` |
| `Build command failed` | Wrong build settings | Set build command to `npm run build` |
| `Hydration mismatch` | SSR/Client mismatch | Clear `.next` cache, restart dev server |

### 🔧 **API Issues**
| Problem | Solution |
|---------|----------|
| Gemini 429 Error | Check API quota/billing |
| Whisper fails | Verify audio format & size |
| Upload timeout | Reduce file size < 25MB |
| CORS errors | Check API route configuration |

### 📱 **Mobile Issues**
- **Camera niet beschikbaar**: Gebruik HTTPS (required voor camera API)
- **File upload fails**: Check mobile browser compatibility
- **Touch events**: Tested op iOS Safari & Android Chrome

## 🎓 Educational Use Cases

### 👨‍🏫 **Voor Docenten**
- 🎙️ **Lezingen transcriberen** en analyseren met AI
- 📸 **Werkstukken fotograferen** en automatisch feedback geven  
- 📄 **PDF's uploaden** voor snelle samenvatting
- 🗣️ **Spraaknotities** omzetten naar tekst en structureren

### 👩‍🎓 **Voor Studenten**
- 📝 **Aantekeningen verbeteren** met AI ondersteuning
- 🔍 **Complexe teksten analyseren** en uitleggen
- 🎨 **Creatieve projecten** met multi-modal input
- 💡 **Concepten begrijpen** door verschillende media te combineren

### 🏫 **Institutionele Deployment**
```bash
# Multi-tenant setup
GEMINI_API_KEY=shared_institutional_key
OPENAI_API_KEY=shared_whisper_key
STUDENT_MODE=true                    # Simplified interface
ADMIN_DASHBOARD=true                # Usage analytics
```

## 🔒 Security & Privacy

### 🛡️ **Data Protection**
- ✅ **Server-side API keys**: Nooit client-side exposed
- ✅ **File validation**: Strict type & size checking  
- ✅ **Input sanitization**: XSS prevention
- ✅ **HTTPS only**: Secure transmission

### 📊 **Data Handling**
- 🔄 **Temporary processing**: Files niet permanent opgeslagen
- 🗑️ **Auto-cleanup**: Uploads automatisch verwijderd
- 🚫 **No tracking**: Geen user analytics by default
- 🔐 **Privacy first**: GDPR compliant design

## 🤝 Contributing & Development

### 🛠️ **Development Setup**
```bash
# Development mode
npm run dev

# Type checking  
npm run lint

# Production build test
npm run build && npm start
```

### 📈 **Feature Roadmap**
- [ ] **PDF OCR**: Scanned documents verwerken
- [ ] **Video Upload**: Frame extraction en analyse
- [ ] **Real-time Collaboration**: Multiple users
- [ ] **Template Library**: Pre-made educational prompts
- [ ] **Analytics Dashboard**: Usage insights
- [ ] **SSO Integration**: School account systems

### 🐛 **Bug Reports**
Found een issue? [Open een GitHub Issue](https://github.com/TomNaberink/templateAPIinclcamera/issues) met:
- 🖥️ Browser & OS version
- 📝 Steps to reproduce
- 📋 Error messages/screenshots
- 🎯 Expected vs actual behavior

## 📚 Resources & Links

### 🔗 **API Documentation**
- [Gemini API Docs](https://ai.google.dev/docs) - Google AI ontwikkelaar resources
- [OpenAI Whisper](https://platform.openai.com/docs/guides/speech-to-text) - Audio transcriptie
- [Next.js 15](https://nextjs.org/docs) - Framework documentatie

### 🎥 **Video Tutorials**
- [Gemini API Setup](https://makersuite.google.com/app/apikey) - API key verkrijgen
- [Netlify Deployment](https://netlify.com) - Hosting platform
- [OpenAI Platform](https://platform.openai.com) - Whisper API setup

### 💡 **Community**
- [GitHub Repository](https://github.com/TomNaberink/templateAPIinclcamera)
- [Issues & Feature Requests](https://github.com/TomNaberink/templateAPIinclcamera/issues)
- [Tom Naberink LinkedIn](https://linkedin.com/in/tomnaberink) - Direct contact

---

## 🎉 **Ready to Transform Education?**

Deze template geeft je **alles** wat je nodig hebt om geavanceerde AI-applicaties te bouwen voor het onderwijs. Van simpele chatbots tot complexe multi-modal AI-assistenten - de mogelijkheden zijn eindeloos!

**💜 Gemaakt met passie door Tom Naberink**  
**🚀 Deploy nu en start met bouwen aan de toekomst van onderwijs!**

---

*Versie 2.0 - Complete AI Education Template*  
*Last updated: December 2024* 