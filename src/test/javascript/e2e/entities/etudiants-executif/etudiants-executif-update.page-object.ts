import { element, by, ElementFinder } from 'protractor';

export default class EtudiantsExecutifUpdatePage {
  pageTitle: ElementFinder = element(by.id('pfumv10App.etudiantsExecutif.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  suffixeInput: ElementFinder = element(by.css('input#etudiants-executif-suffixe'));
  nomInput: ElementFinder = element(by.css('input#etudiants-executif-nom'));
  prenomInput: ElementFinder = element(by.css('input#etudiants-executif-prenom'));
  dateNaissanceInput: ElementFinder = element(by.css('input#etudiants-executif-dateNaissance'));
  adresseContactInput: ElementFinder = element(by.css('input#etudiants-executif-adresseContact'));
  villeInput: ElementFinder = element(by.css('input#etudiants-executif-ville'));
  emailInput: ElementFinder = element(by.css('input#etudiants-executif-email'));
  pjBacSelect: ElementFinder = element(by.css('select#etudiants-executif-pjBac'));
  mentionSelect: ElementFinder = element(by.css('select#etudiants-executif-mention'));
  cinPassInput: ElementFinder = element(by.css('input#etudiants-executif-cinPass'));
  paysNationaliteInput: ElementFinder = element(by.css('input#etudiants-executif-paysNationalite'));
  paysResidenceInput: ElementFinder = element(by.css('input#etudiants-executif-paysResidence'));
  codepostalInput: ElementFinder = element(by.css('input#etudiants-executif-codepostal'));
  provinceInput: ElementFinder = element(by.css('input#etudiants-executif-province'));
  telInput: ElementFinder = element(by.css('input#etudiants-executif-tel'));
  photoInput: ElementFinder = element(by.css('input#file_photo'));
  extraitActeNaissanceInput: ElementFinder = element(by.css('input#file_extraitActeNaissance'));
  bacalaureatInput: ElementFinder = element(by.css('input#file_bacalaureat'));
  cinPassportInput: ElementFinder = element(by.css('input#file_cinPassport'));
  diplomeInput: ElementFinder = element(by.css('input#file_diplome'));
  inscriptionvalideInput: ElementFinder = element(by.css('input#etudiants-executif-inscriptionvalide'));
  absentInput: ElementFinder = element(by.css('input#etudiants-executif-absent'));
  userSelect: ElementFinder = element(by.css('select#etudiants-executif-user'));
  filiereSelect: ElementFinder = element(by.css('select#etudiants-executif-filiere'));
  anneeInscriptionSelect: ElementFinder = element(by.css('select#etudiants-executif-anneeInscription'));
  modaliteSelect: ElementFinder = element(by.css('select#etudiants-executif-modalite'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setSuffixeInput(suffixe) {
    await this.suffixeInput.sendKeys(suffixe);
  }

  async getSuffixeInput() {
    return this.suffixeInput.getAttribute('value');
  }

  async setNomInput(nom) {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput() {
    return this.nomInput.getAttribute('value');
  }

  async setPrenomInput(prenom) {
    await this.prenomInput.sendKeys(prenom);
  }

  async getPrenomInput() {
    return this.prenomInput.getAttribute('value');
  }

  async setDateNaissanceInput(dateNaissance) {
    await this.dateNaissanceInput.sendKeys(dateNaissance);
  }

  async getDateNaissanceInput() {
    return this.dateNaissanceInput.getAttribute('value');
  }

  async setAdresseContactInput(adresseContact) {
    await this.adresseContactInput.sendKeys(adresseContact);
  }

  async getAdresseContactInput() {
    return this.adresseContactInput.getAttribute('value');
  }

  async setVilleInput(ville) {
    await this.villeInput.sendKeys(ville);
  }

  async getVilleInput() {
    return this.villeInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async setPjBacSelect(pjBac) {
    await this.pjBacSelect.sendKeys(pjBac);
  }

  async getPjBacSelect() {
    return this.pjBacSelect.element(by.css('option:checked')).getText();
  }

  async pjBacSelectLastOption() {
    await this.pjBacSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setMentionSelect(mention) {
    await this.mentionSelect.sendKeys(mention);
  }

  async getMentionSelect() {
    return this.mentionSelect.element(by.css('option:checked')).getText();
  }

  async mentionSelectLastOption() {
    await this.mentionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setCinPassInput(cinPass) {
    await this.cinPassInput.sendKeys(cinPass);
  }

  async getCinPassInput() {
    return this.cinPassInput.getAttribute('value');
  }

  async setPaysNationaliteInput(paysNationalite) {
    await this.paysNationaliteInput.sendKeys(paysNationalite);
  }

  async getPaysNationaliteInput() {
    return this.paysNationaliteInput.getAttribute('value');
  }

  async setPaysResidenceInput(paysResidence) {
    await this.paysResidenceInput.sendKeys(paysResidence);
  }

  async getPaysResidenceInput() {
    return this.paysResidenceInput.getAttribute('value');
  }

  async setCodepostalInput(codepostal) {
    await this.codepostalInput.sendKeys(codepostal);
  }

  async getCodepostalInput() {
    return this.codepostalInput.getAttribute('value');
  }

  async setProvinceInput(province) {
    await this.provinceInput.sendKeys(province);
  }

  async getProvinceInput() {
    return this.provinceInput.getAttribute('value');
  }

  async setTelInput(tel) {
    await this.telInput.sendKeys(tel);
  }

  async getTelInput() {
    return this.telInput.getAttribute('value');
  }

  async setPhotoInput(photo) {
    await this.photoInput.sendKeys(photo);
  }

  async getPhotoInput() {
    return this.photoInput.getAttribute('value');
  }

  async setExtraitActeNaissanceInput(extraitActeNaissance) {
    await this.extraitActeNaissanceInput.sendKeys(extraitActeNaissance);
  }

  async getExtraitActeNaissanceInput() {
    return this.extraitActeNaissanceInput.getAttribute('value');
  }

  async setBacalaureatInput(bacalaureat) {
    await this.bacalaureatInput.sendKeys(bacalaureat);
  }

  async getBacalaureatInput() {
    return this.bacalaureatInput.getAttribute('value');
  }

  async setCinPassportInput(cinPassport) {
    await this.cinPassportInput.sendKeys(cinPassport);
  }

  async getCinPassportInput() {
    return this.cinPassportInput.getAttribute('value');
  }

  async setDiplomeInput(diplome) {
    await this.diplomeInput.sendKeys(diplome);
  }

  async getDiplomeInput() {
    return this.diplomeInput.getAttribute('value');
  }

  getInscriptionvalideInput() {
    return this.inscriptionvalideInput;
  }
  getAbsentInput() {
    return this.absentInput;
  }
  async userSelectLastOption() {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
  }

  async filiereSelectLastOption() {
    await this.filiereSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async filiereSelectOption(option) {
    await this.filiereSelect.sendKeys(option);
  }

  getFiliereSelect() {
    return this.filiereSelect;
  }

  async getFiliereSelectedOption() {
    return this.filiereSelect.element(by.css('option:checked')).getText();
  }

  async anneeInscriptionSelectLastOption() {
    await this.anneeInscriptionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async anneeInscriptionSelectOption(option) {
    await this.anneeInscriptionSelect.sendKeys(option);
  }

  getAnneeInscriptionSelect() {
    return this.anneeInscriptionSelect;
  }

  async getAnneeInscriptionSelectedOption() {
    return this.anneeInscriptionSelect.element(by.css('option:checked')).getText();
  }

  async modaliteSelectLastOption() {
    await this.modaliteSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async modaliteSelectOption(option) {
    await this.modaliteSelect.sendKeys(option);
  }

  getModaliteSelect() {
    return this.modaliteSelect;
  }

  async getModaliteSelectedOption() {
    return this.modaliteSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
