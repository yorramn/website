# Portfolio Backend Integration Contracts

## Overview
Esta documentação define os contratos para integrar o backend com o frontend do portfolio, substituindo dados mock por funcionalidades reais.

## 1. GitHub API Integration

### Endpoint: GET /api/github/repos
**Purpose**: Buscar repositórios do usuário yorramn do GitHub

**Response Format**:
```json
{
  "repos": [
    {
      "name": "string",
      "description": "string", 
      "technologies": ["string"],
      "githubUrl": "string",
      "liveUrl": "string|null",
      "stars": "number",
      "forks": "number",
      "language": "string",
      "updated_at": "string"
    }
  ]
}
```

**Mock Data to Replace**: 
- `mockData.projects` array in `/app/frontend/src/data/mock.js`

**Frontend Integration**:
- Replace mock projects with real GitHub repos
- Add loading states
- Handle API errors gracefully

---

## 2. Contact Form Email Service

### Endpoint: POST /api/contact
**Purpose**: Enviar formulário de contato por email para yorramn.dev@gmail.com

**Request Format**:
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "phone": "string (required)",
  "message": "string (required, min 10 chars)"
}
```

**Response Format**:
```json
{
  "success": true,
  "message": "Email enviado com sucesso"
}
```

**Email Template**:
```
Subject: Novo contato do Portfolio - {name}

Nome: {name}
Email: {email}
Telefone: {phone}

Mensagem:
{message}

---
Enviado através do portfolio em {timestamp}
```

**Mock Data to Replace**:
- Form submission in Portfolio.jsx `handleSubmit` function
- Remove mock console.log, implement real API call

**Frontend Integration**:
- Remove mock form submission
- Add loading state during submission
- Show success/error messages using toast
- Clear form after successful submission

---

## 3. Backend Architecture

### Dependencies to Add:
```
axios (for GitHub API calls)
nodemailer (for email sending)
dotenv (for environment variables)
```

### Environment Variables (.env):
```
GITHUB_USERNAME=yorramn
GMAIL_USER=yorramn.dev@gmail.com
GMAIL_APP_PASSWORD=[to_be_provided_by_user]
```

### API Routes Structure:
```
/api/github/repos - GET (fetch GitHub repositories)
/api/contact - POST (send contact form email)
/api/health - GET (health check)
```

---

## 4. Frontend Integration Points

### Files to Modify:
1. `/app/frontend/src/components/Portfolio.jsx`
   - Replace mockData.projects with API call to `/api/github/repos`
   - Replace mock form submission with API call to `/api/contact`
   - Add loading states and error handling

2. `/app/frontend/src/data/mock.js`
   - Keep only profile data and testimonials
   - Remove projects array (will come from GitHub API)

### New Components to Create:
- `LoadingSpinner.jsx` - For loading states
- `ErrorBoundary.jsx` - For error handling

### State Management:
- Add loading states for GitHub repos
- Add form submission states
- Add error handling states

---

## 5. Implementation Steps

1. **Backend Setup**:
   - Install required dependencies
   - Create GitHub API service
   - Create email service with Nodemailer
   - Create API routes

2. **Environment Configuration**:
   - Set up Gmail app password
   - Configure GitHub API access

3. **Frontend Integration**:
   - Replace mock data with API calls
   - Add loading states
   - Implement error handling
   - Test form submission

4. **Testing**:
   - Test GitHub API integration
   - Test email sending functionality
   - Verify all mock data removed

---

## 6. WhatsApp Integration

**Current Status**: ✅ Already implemented
- Number updated to: +5511989416584
- Message: "Olá, gostaria de fazer um orçamento."

---

## 7. Success Criteria

✅ **GitHub Integration**:
- Real repositories displayed instead of mock data
- Loading spinner while fetching repos
- Error handling if GitHub API fails

✅ **Email Functionality**:
- Contact form sends real emails to yorramn.dev@gmail.com
- Form validation working
- Success/error feedback to user

✅ **Performance**:
- Fast loading times
- Responsive design maintained
- No console errors

✅ **User Experience**:
- Smooth transitions between mock and real data
- Professional error messages
- Clear loading indicators