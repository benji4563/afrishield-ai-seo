# AfriShield AI — Google Business Profile (GBP) Scraping Prompts, Configurations & Automation

This document contains all prompts, crawler configurations, search strings, and scripts needed to scrape Google Business Profiles, enrich contact details (emails, WhatsApp, LinkedIn, socials), and detect AI visibility gaps for hospitality businesses across Cameroon, Tanzania, Kenya, Zanzibar, Rwanda, and Namibia.

---

## 1. Google Maps Scraper Batch Search Strings (Copy-Paste Ready)

Paste these search queries directly into **Outscraper**, **Apify Google Maps Scraper**, or **PhantomBuster**:

### Tanzania & Zanzibar Corridors
```text
safari tour operator in Arusha, Tanzania
luxury safari lodge in Serengeti, Tanzania
tented safari camp in Ngorongoro, Tanzania
safari lodge in Tarangire, Tanzania
boutique hotel in Stone Town, Zanzibar, Tanzania
beach resort in Nungwi, Zanzibar, Tanzania
boutique hotel in Paje, Zanzibar, Tanzania
travel agency in Dar es Salaam, Tanzania
luxury lodge in Lake Manyara, Tanzania
```

### Kenya Corridors
```text
safari lodge in Maasai Mara, Kenya
luxury tented camp in Amboseli, Kenya
safari tour company in Nairobi, Kenya
boutique hotel in Diani Beach, Kenya
eco safari lodge in Laikipia, Kenya
boutique hotel in Watamu, Kenya
tour operator in Mombasa, Kenya
safari camp in Samburu, Kenya
boutique hotel in Karen, Nairobi, Kenya
```

### Namibia Corridors
```text
safari lodge in Sossusvlei, Namibia
game lodge in Etosha National Park, Namibia
boutique guesthouse in Swakopmund, Namibia
tour operator in Windhoek, Namibia
desert lodge in NamibRand Nature Reserve, Namibia
safari camp in Damaraland, Namibia
boutique hotel in Windhoek, Namibia
fly-in safari operator in Namibia
```

### Rwanda Corridors
```text
luxury safari lodge in Volcanoes National Park, Rwanda
gorilla trekking tour operator in Kigali, Rwanda
boutique hotel in Kigali, Rwanda
safari lodge in Akagera National Park, Rwanda
eco lodge in Nyungwe Forest, Rwanda
travel and tour agency in Kigali, Rwanda
```

### Cameroon Corridors
```text
boutique hotel in Douala Bonanjo, Cameroon
hotel de charme in Yaoundé Bastos, Cameroon
eco lodge in Kribi, Cameroon
agence de voyage et tourisme in Douala, Cameroon
hotel resort in Limbe, Cameroon
tour operator in Cameroon
```

---

## 2. Apify Google Maps Scraper Configuration Payload (JSON)

If using the **Apify Google Places / Maps Scraper Actor** (`compass/crawler-google-places`), paste this input JSON:

```json
{
  "searchStringsArray": [
    "luxury safari lodge in Serengeti, Tanzania",
    "safari camp in Maasai Mara, Kenya",
    "boutique hotel in Stone Town, Zanzibar, Tanzania",
    "safari lodge in Sossusvlei, Namibia",
    "gorilla trekking tour operator in Kigali, Rwanda",
    "boutique hotel in Douala Bonanjo, Cameroon",
    "beach resort in Nungwi, Zanzibar, Tanzania",
    "safari tour company in Nairobi, Kenya",
    "game lodge in Etosha, Namibia",
    "eco lodge in Kribi, Cameroon"
  ],
  "locationQuery": "",
  "maxCrawledPlacesPerSearch": 40,
  "language": "en",
  "countryCode": "",
  "includeReviews": false,
  "includeImages": false,
  "includeHistogram": false,
  "includeOpeningHours": true,
  "includePeopleAlsoSearch": false,
  "additionalInfo": true,
  "scrapeWebsites": true,
  "proxyConfig": {
    "useApifyProxy": true
  }
}
```

---

## 3. Clay / AI Agent Contact Enrichment Prompt

Use this prompt inside **Clay.com**, **OpenAI GPT-4o Action**, or **Make.com/Zapier AI Module** after scraping the website URL and business name:

```text
You are a specialized B2B Data Enrichment Agent for AfriShield AI.
Your objective is to find the direct decision-maker and operational contact channels for hospitality properties (safari lodges, boutique hotels, tour operators).

INPUT DATA:
- Business Name: {{company_name}}
- Website URL: {{website_url}}
- GBP Phone: {{phone_number}}
- Country / City: {{location}}

TASKS:
1. Extract or infer the Name and Title of the Owner, Founder, Managing Director, or General Manager (GM) by checking the website "About", "Team", "Story", or LinkedIn company profile.
2. Find the primary direct/reservations email address (prioritizing direct owner/GM emails or dedicated reservations@ / bookings@ domains over generic contact forms).
3. Identify if the phone number is a mobile number capable of receiving WhatsApp messages (format to international E.164: e.g. +255..., +254..., +264..., +250..., +237...).
4. Extract links to their official Instagram page, Facebook page, and LinkedIn company/founder profile.
5. Calculate the Estimated Monthly OTA Bleed (USD) using this formula:
   Estimated Bleed = (Room Count estimate [default 12 for lodge, 25 for hotel] * Avg Daily Rate [default $250 for safari/lodge, $120 for hotel] * 30 days * 0.60 occupancy * 0.45 OTA share * 0.18 commission).

OUTPUT FORMAT: Return STRICT JSON matching:
{
  "decision_maker_name": "string",
  "decision_maker_title": "string",
  "direct_email": "string",
  "company_email": "string",
  "whatsapp_number": "string",
  "phone_number": "string",
  "linkedin_profile": "string",
  "instagram_page": "string",
  "facebook_page": "string",
  "estimated_monthly_bleed_usd": number,
  "personalized_hook": "string (1 sentence referencing their exact property, location, and why international travelers booking via ChatGPT are missing their direct website)"
}
```

---

## 4. Live AI Visibility & GEO Audit Prompt (The Signal Check)

Run this prompt in **ChatGPT (GPT-4o)** or **Perplexity AI** before reaching out to get the live audit screenshot:

```text
Act as an affluent international traveler planning a luxury holiday.
I am looking for the top recommended [safari lodges / boutique hotels / private tour operators] in [Specific Area: e.g., Serengeti National Park / Zanzibar / Maasai Mara / Sossusvlei / Volcanoes Rwanda].

Please list the top 3 best accommodations/operators with:
1. Exact property name
2. Why it is recommended
3. The direct booking link or OTA citation source where you found this information.
```

**Observation Checklist for your Audit:**
- If the prospect's direct site is **NOT** listed in the top 3 → **AUDIT RESULT: INVISIBLE TO AI SEARCH**.
- Take a screenshot showing the AI recommending Booking.com, TripAdvisor, or a large international booking aggregator.
- Attach this screenshot to Touch 1 (WhatsApp) and Touch 2 (Email).

---

## 5. Python Automation Script: `scrape_and_enrich.py`

This script can be executed locally to parse websites for contact emails, WhatsApp links, and social URLs from a list of domains.

```python
"""
AfriShield AI - Hospitality Website & Contact Scraper
Extracts emails, WhatsApp numbers, and social links from hotel/safari websites.
"""

import re
import csv
import urllib.request
from bs4 import BeautifulSoup

def extract_contacts_from_url(url):
    contacts = {
        "emails": set(),
        "whatsapp": set(),
        "facebook": "",
        "instagram": "",
        "phone": ""
    }
    
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            html = response.read().decode('utf-8', errors='ignore')
            
            # Find emails
            email_pattern = r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
            found_emails = re.findall(email_pattern, html)
            for email in found_emails:
                if not any(ext in email.lower() for ext in ['.png', '.jpg', '.jpeg', '.svg', '.webp', 'wixpress', 'sentry']):
                    contacts["emails"].add(email)
            
            # Find WhatsApp links
            wa_pattern = r'(?:https?://)?(?:wa\.me/|api\.whatsapp\.com/send\?phone=)(\+?[0-9]+)'
            found_wa = re.findall(wa_pattern, html)
            for wa in found_wa:
                contacts["whatsapp"].add(wa)
                
            # Find Socials
            soup = BeautifulSoup(html, 'html.parser')
            for a in soup.find_all('a', href=True):
                href = a['href']
                if 'instagram.com/' in href and not contacts["instagram"]:
                    contacts["instagram"] = href
                elif 'facebook.com/' in href and not contacts["facebook"]:
                    contacts["facebook"] = href
                    
    except Exception as e:
        print(f"Error scraping {url}: {e}")
        
    return contacts
```
