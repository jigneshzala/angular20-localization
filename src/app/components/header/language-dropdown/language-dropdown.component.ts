import { CommonModule } from '@angular/common';
import { Component, DOCUMENT, Inject, LOCALE_ID } from '@angular/core';
interface Language {
  code: string;
  name: string;
  flag: string;
}
@Component({
  selector: 'app-language-dropdown',
  imports: [CommonModule],
  templateUrl: './language-dropdown.component.html',
  styleUrl: './language-dropdown.component.scss',
})
export class LanguageDropdownComponent {
  isOpen = false;
  currentLocale: string;

  languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  constructor(
    @Inject(LOCALE_ID) private localeId: string,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.currentLocale = this.localeId;
    console.log('this.currentLocale', this.currentLocale);
  }

  get currentLanguage(): Language {
    return (
      this.languages.find((lang) => lang.code === this.currentLocale) ||
      this.languages[0]
    );
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  switchLanguage(languageCode: string) {
    const currentUrl = this.document.location.pathname;
    let newUrl = '';

    if (languageCode === 'en') {
      // For English, remove any language prefix and go to root
      newUrl = currentUrl.replace(/^\/de/, '') || '/';
    } else {
      // For other languages, add language prefix
      if (currentUrl.startsWith('/de')) {
        newUrl = currentUrl;
      } else {
        newUrl = `/${languageCode}${currentUrl}`;
      }
    }

    this.document.location.href = newUrl;
    this.isOpen = false;
  }
}
