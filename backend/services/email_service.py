import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import os
from typing import Dict

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_server = "smtp.gmail.com"
        self.smtp_port = 587
        self.sender_email = os.environ.get('GMAIL_USER', 'yorramn.dev@gmail.com')
        self.sender_password = os.environ.get('GMAIL_APP_PASSWORD')
        self.recipient_email = 'yorramn.dev@gmail.com'
    
    async def send_contact_email(self, contact_data: Dict) -> bool:
        """
        Send contact form email to yorramn.dev@gmail.com
        """
        try:
            if not self.sender_password:
                logger.error("Gmail app password not configured")
                return False
            
            # Create message
            message = MIMEMultipart()
            message["From"] = self.sender_email
            message["To"] = self.recipient_email
            message["Subject"] = f"Novo contato do Portfolio - {contact_data['name']}"
            
            # Create email body
            body = self._create_email_body(contact_data)
            message.attach(MIMEText(body, "plain", "utf-8"))
            
            # Send email
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.sender_email, self.sender_password)
                text = message.as_string()
                server.sendmail(self.sender_email, self.recipient_email, text)
            
            logger.info(f"Contact email sent successfully for {contact_data['name']}")
            return True
            
        except smtplib.SMTPAuthenticationError:
            logger.error("Gmail authentication failed - check app password")
            return False
        except smtplib.SMTPException as e:
            logger.error(f"SMTP error sending email: {str(e)}")
            return False
        except Exception as e:
            logger.error(f"Unexpected error sending email: {str(e)}")
            return False
    
    def _create_email_body(self, contact_data: Dict) -> str:
        """
        Create formatted email body from contact data
        """
        timestamp = datetime.now().strftime("%d/%m/%Y às %H:%M:%S")
        
        body = f"""
Novo contato recebido através do portfolio

=== DADOS DO CONTATO ===
Nome: {contact_data['name']}
Email: {contact_data['email']}
Telefone: {contact_data['phone']}

=== MENSAGEM ===
{contact_data['message']}

=== INFORMAÇÕES TÉCNICAS ===
Enviado em: {timestamp}
Origem: Portfolio Yorramn
IP: {contact_data.get('ip_address', 'N/A')}

---
Esta mensagem foi enviada automaticamente através do formulário de contato do portfolio.
"""
        
        return body
    
    def validate_contact_data(self, contact_data: Dict) -> Dict:
        """
        Validate contact form data
        """
        errors = []
        
        # Required fields validation
        required_fields = ['name', 'email', 'phone', 'message']
        for field in required_fields:
            if not contact_data.get(field, '').strip():
                errors.append(f"Campo '{field}' é obrigatório")
        
        # Email validation (basic)
        email = contact_data.get('email', '').strip()
        if email and '@' not in email or '.' not in email:
            errors.append("Email inválido")
        
        # Message length validation
        message = contact_data.get('message', '').strip()
        if message and len(message) < 10:
            errors.append("Mensagem deve ter pelo menos 10 caracteres")
        
        # Phone validation (basic)
        phone = contact_data.get('phone', '').strip()
        if phone and len(phone) < 10:
            errors.append("Telefone inválido")
        
        return {
            'valid': len(errors) == 0,
            'errors': errors,
            'cleaned_data': {
                'name': contact_data.get('name', '').strip(),
                'email': email.lower(),
                'phone': phone,
                'message': message
            }
        }