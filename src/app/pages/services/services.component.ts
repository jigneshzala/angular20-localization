import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  services = signal([
    {
      title: 'Web Development',
      description:
        'Custom web applications built with Angular 20 and modern technologies.',
      features: ['Responsive Design', 'Performance Optimization', 'SEO Ready'],
      price: 'Starting at $2,500',
    },
    {
      title: 'Mobile Development',
      description: 'Cross-platform mobile apps using Ionic and Angular.',
      features: ['iOS & Android', 'Native Performance', 'App Store Ready'],
      price: 'Starting at $4,000',
    },
    {
      title: 'Consulting',
      description:
        'Technical consulting and code reviews for existing projects.',
      features: ['Architecture Review', 'Performance Audit', 'Best Practices'],
      price: 'Starting at $150/hour',
    },
  ]);
}
