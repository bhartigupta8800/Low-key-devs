import React, { useState } from 'react';
import './App.css';

function SettingsPage({ onBack }) {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    preferences: {
      darkMode: false,
      savePaymentInfo: true,
      autoApplyCoupons: true,
      language: "English"
    },
    privacy: {
      shareOrderHistory: false,
      allowDataCollection: true
    }
  });

  const handleToggle = (category, setting) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: !settings[category][setting]
      }
    });
  };

  const handleLanguageChange = (e) => {
    setSettings({
      ...settings,
      preferences: {
        ...settings.preferences,
        language: e.target.value
      }
    });
  };

  return (
    <div className="settings-page app-container">
      <nav className="navbar settings-navbar">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h1>Settings</h1>
        <div></div> {/* Empty div for flex spacing */}
      </nav>
      
      <main className="settings-main">
        <div className="settings-section">
          <h3 className="section-title">Notifications</h3>
          <div className="settings-card">
            <div className="setting-item">
              <div>
                <div className="setting-name">Email Notifications</div>
                <div className="setting-desc">Receive order updates and offers via email</div>
              </div>
              <div className="toggle-wrapper">
                <label className="toggle">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.email}
                    onChange={() => handleToggle('notifications', 'email')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="setting-item">
              <div>
                <div className="setting-name">SMS Notifications</div>
                <div className="setting-desc">Receive order updates and offers via text message</div>
              </div>
              <div className="toggle-wrapper">
                <label className="toggle">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.sms}
                    onChange={() => handleToggle('notifications', 'sms')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="setting-item">
              <div>
                <div className="setting-name">Push Notifications</div>
                <div className="setting-desc">Receive notifications on your device</div>
              </div>
              <div className="toggle-wrapper">
                <label className="toggle">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.push}
                    onChange={() => handleToggle('notifications', 'push')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="settings-section">
          <h3 className="section-title">App Preferences</h3>
          <div className="settings-card">
            <div className="setting-item">
              <div>
                <div className="setting-name">Dark Mode</div>
                <div className="setting-desc">Use dark theme throughout the app</div>
              </div>
              <div className="toggle-wrapper">
                <label className="toggle">
                  <input 
                    type="checkbox" 
                    checked={settings.preferences.darkMode}
                    onChange={() => handleToggle('preferences', 'darkMode')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="setting-item">
              <div>
                <div className="setting-name">Save Payment Information</div>
                <div className="setting-desc">Securely store payment details for faster checkout</div>
              </div>
              <div className="toggle-wrapper">
                <label className="toggle">
                  <input 
                    type="checkbox" 
                    checked={settings.preferences.savePaymentInfo}
                    onChange={() => handleToggle('preferences', 'savePaymentInfo')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="setting-item">
              <div>
                <div className="setting-name">Auto-Apply Coupons</div>
                <div className="setting-desc">Automatically apply the best available discount</div>
              </div>
              <div className="toggle-wrapper">
                <label className="toggle">
                  <input 
                    type="checkbox" 
                    checked={settings.preferences.autoApplyCoupons}
                    onChange={() => handleToggle('preferences', 'autoApplyCoupons')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="setting-item">
              <div>
                <div className="setting-name">Language</div>
                <div className="setting-desc">Choose your preferred language</div>
              </div>
              <div className="select-wrapper">
                <select 
                  value={settings.preferences.language}
                  onChange={handleLanguageChange}
                  className="language-select"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Japanese">Japanese</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="settings-section">
          <h3 className="section-title">Privacy</h3>
          <div className="settings-card">
            <div className="setting-item">
              <div>
                <div className="setting-name">Share Order History</div>
                <div className="setting-desc">Allow restaurants to see your past orders</div>
              </div>
              <div className="toggle-wrapper">
                <label className="toggle">
                  <input 
                    type="checkbox" 
                    checked={settings.privacy.shareOrderHistory}
                    onChange={() => handleToggle('privacy', 'shareOrderHistory')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="setting-item">
              <div>
                <div className="setting-name">Allow Data Collection</div>
                <div className="setting-desc">Help us improve with anonymous usage data</div>
              </div>
              <div className="toggle-wrapper">
                <label className="toggle">
                  <input 
                    type="checkbox" 
                    checked={settings.privacy.allowDataCollection}
                    onChange={() => handleToggle('privacy', 'allowDataCollection')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="settings-section">
          <div className="settings-card danger-zone">
            <h3 className="danger-title">Danger Zone</h3>
            <p>These actions cannot be undone. Please proceed with caution.</p>
            <div className="danger-actions">
              <button className="clear-data-btn">Clear App Data</button>
              <button className="delete-account-btn">Delete Account</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SettingsPage;
