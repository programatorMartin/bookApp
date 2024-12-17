import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class SettingsPage {

  isModalOpen = false; // Track modal state
  darkMode = false;
  ngOnInit(): void {
    this.checkAppMode();   
  }

  async checkAppMode() {
    const checkIsDarkMode = await Preferences.get({ key: 'darkModeActivated' });
    if (checkIsDarkMode.value === null) {
      // Default to light mode if no value is set
      this.darkMode = false;
    } else {
      this.darkMode = checkIsDarkMode.value === 'true';
    }
    document.body.classList.toggle('dark', this.darkMode);
  }
  

  constructor(private alertController: AlertController) {}

  // Method to show support information (unchanged)
  async showSupportInfo() {
    const alert = await this.alertController.create({
      header: 'Get Support',
      message: 'For support, please contact us:\n\nPhone: +421 905 008 007\n\nEmail: support@example.com',
      buttons: ['OK']
    });
  
    await alert.present();

    const alertElement = document.querySelector('ion-alert');
    if (alertElement) {
      const messageElement = alertElement.querySelector('.alert-message');
      if (messageElement) {
        messageElement.classList.add('centered-message');
      }
    }
  }
  async toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    await Preferences.set({
      key: 'darkModeActivated',
      value: this.darkMode ? 'true' : 'false'
    });
  }
  
  

  // Method to open the About Us modal
  openAboutModal() {
    this.isModalOpen = true; // Open the modal when About Us is clicked
  }

  // Method to close the modal
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen; // Set the modal to open or close
  }
}
