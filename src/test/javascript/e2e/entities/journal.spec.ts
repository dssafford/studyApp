import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Journal e2e test', () => {

    let navBarPage: NavBarPage;
    let journalDialogPage: JournalDialogPage;
    let journalComponentsPage: JournalComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Journals', () => {
        navBarPage.goToEntity('journal');
        journalComponentsPage = new JournalComponentsPage();
        expect(journalComponentsPage.getTitle()).toMatch(/Journals/);

    });

    it('should load create Journal dialog', () => {
        journalComponentsPage.clickOnCreateButton();
        journalDialogPage = new JournalDialogPage();
        expect(journalDialogPage.getModalTitle()).toMatch(/Create or edit a Journal/);
        journalDialogPage.close();
    });

    it('should create and save Journals', () => {
        journalComponentsPage.clickOnCreateButton();
        journalDialogPage.setDateAddedInput(12310020012301);
        expect(journalDialogPage.getDateAddedInput()).toMatch('2001-12-31T02:30');
        journalDialogPage.setProjectInput('project');
        expect(journalDialogPage.getProjectInput()).toMatch('project');
        journalDialogPage.setFileDirectoryInput('fileDirectory');
        expect(journalDialogPage.getFileDirectoryInput()).toMatch('fileDirectory');
        journalDialogPage.setMachineInput('machine');
        expect(journalDialogPage.getMachineInput()).toMatch('machine');
        journalDialogPage.setTechnologyInput('technology');
        expect(journalDialogPage.getTechnologyInput()).toMatch('technology');
        journalDialogPage.setVersionInput('version');
        expect(journalDialogPage.getVersionInput()).toMatch('version');
        journalDialogPage.setCommentsInput('comments');
        expect(journalDialogPage.getCommentsInput()).toMatch('comments');
        journalDialogPage.getIsActiveInput().isSelected().then((selected) => {
            if (selected) {
                journalDialogPage.getIsActiveInput().click();
                expect(journalDialogPage.getIsActiveInput().isSelected()).toBeFalsy();
            } else {
                journalDialogPage.getIsActiveInput().click();
                expect(journalDialogPage.getIsActiveInput().isSelected()).toBeTruthy();
            }
        });
        journalDialogPage.save();
        expect(journalDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class JournalComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-journal div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class JournalDialogPage {
    modalTitle = element(by.css('h4#myJournalLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    dateAddedInput = element(by.css('input#field_dateAdded'));
    projectInput = element(by.css('input#field_project'));
    fileDirectoryInput = element(by.css('input#field_fileDirectory'));
    machineInput = element(by.css('input#field_machine'));
    technologyInput = element(by.css('input#field_technology'));
    versionInput = element(by.css('input#field_version'));
    commentsInput = element(by.css('input#field_comments'));
    isActiveInput = element(by.css('input#field_isActive'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setDateAddedInput = function(dateAdded) {
        this.dateAddedInput.sendKeys(dateAdded);
    }

    getDateAddedInput = function() {
        return this.dateAddedInput.getAttribute('value');
    }

    setProjectInput = function(project) {
        this.projectInput.sendKeys(project);
    }

    getProjectInput = function() {
        return this.projectInput.getAttribute('value');
    }

    setFileDirectoryInput = function(fileDirectory) {
        this.fileDirectoryInput.sendKeys(fileDirectory);
    }

    getFileDirectoryInput = function() {
        return this.fileDirectoryInput.getAttribute('value');
    }

    setMachineInput = function(machine) {
        this.machineInput.sendKeys(machine);
    }

    getMachineInput = function() {
        return this.machineInput.getAttribute('value');
    }

    setTechnologyInput = function(technology) {
        this.technologyInput.sendKeys(technology);
    }

    getTechnologyInput = function() {
        return this.technologyInput.getAttribute('value');
    }

    setVersionInput = function(version) {
        this.versionInput.sendKeys(version);
    }

    getVersionInput = function() {
        return this.versionInput.getAttribute('value');
    }

    setCommentsInput = function(comments) {
        this.commentsInput.sendKeys(comments);
    }

    getCommentsInput = function() {
        return this.commentsInput.getAttribute('value');
    }

    getIsActiveInput = function() {
        return this.isActiveInput;
    }
    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
