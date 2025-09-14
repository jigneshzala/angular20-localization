import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // Using signals for zoneless change detection
  features = signal([
    {
      title: 'Zoneless Change Detection',
      description:
        "Experience faster performance with Angular 20's experimental zoneless change detection.",
      icon: '⚡',
    },
    {
      title: 'Internationalization',
      description:
        'Built-in i18n support with English and German translations.',
      icon: '🌍',
    },
    {
      title: 'Server-Side Rendering',
      description: 'SEO-optimized with Angular Universal and prerendering.',
      icon: '🚀',
    },
    {
      title: 'Tailwind CSS',
      description:
        'Modern utility-first CSS framework for rapid UI development.',
      icon: '🎨',
    },
  ]);

  ngOnInit() {
    console.log('Home component loaded with signals:', this.features());
  }
}
