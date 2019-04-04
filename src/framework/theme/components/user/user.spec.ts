import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbComponentSize, NbLayoutDirectionService, NbUserComponent, NbUserModule } from '@nebular/theme';

const NAME_SELECTOR = '.user-name';
const TITLE_SELECTOR = '.user-title';
const INITIALS_SELECTOR = '.user-picture.initials';
const PICTURE_SELECTOR = '.user-picture.image';
const BADGE_SELECTOR = 'nb-badge';
const COMPONENT_SIZES: NbComponentSize[] = [ 'tiny', 'small', 'medium', 'large', 'giant' ];

describe('NbUserComponent', () => {
  let fixture: ComponentFixture<NbUserComponent>;
  let userComponent: NbUserComponent;
  let userElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ NbUserModule ],
      providers: [ NbLayoutDirectionService ],
    });

    fixture = TestBed.createComponent(NbUserComponent);
    userComponent = fixture.componentInstance;
    userElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should render name if set', () => {
    const name = 'SomeName';
    userComponent.name = name;
    fixture.detectChanges();

    const nameElement = userElement.querySelector(NAME_SELECTOR);
    expect(nameElement).not.toEqual(null);
    expect(nameElement.textContent).toEqual(name);
  });

  it('should not render name if showName set to false', () => {
    const name = 'SomeName';
    userComponent.name = name;
    userComponent.showName = false;
    fixture.detectChanges();

    const nameElement = userElement.querySelector(NAME_SELECTOR);
    expect(nameElement).toEqual(null);
  });

  it('should not render name if set to empty string', () => {
    userComponent.name = '';
    fixture.detectChanges();

    const nameElement = userElement.querySelector(NAME_SELECTOR);
    expect(nameElement).toEqual(null);
  });

  it('should render title if set', () => {
    const title = 'SomeTitle';
    userComponent.title = title;
    fixture.detectChanges();

    const titleElement = userElement.querySelector(TITLE_SELECTOR);
    expect(titleElement).not.toEqual(null);
    expect(titleElement.textContent).toEqual(title);
  });

  it('should not render title if showTitle set to false', () => {
    const title = 'SomeName';
    userComponent.title = title;
    userComponent.showTitle = false;
    fixture.detectChanges();

    const titleElement = userElement.querySelector(TITLE_SELECTOR);
    expect(titleElement).toEqual(null);
  });

  it('should not render title if set to empty string', () => {
    const title = '';
    userComponent.title = title;
    fixture.detectChanges();

    const titleElement = userElement.querySelector(TITLE_SELECTOR);
    expect(titleElement).toEqual(null);
  });

  it(`should show initials if picture isn't set`, () => {
    const name = 'Name Name';
    userComponent.name = name;
    fixture.detectChanges();

    const initialsElement = userElement.querySelector(INITIALS_SELECTOR);
    expect(initialsElement.textContent.trim()).toEqual('NN');
  });

  it(`should not show initials if picture is set`, () => {
    userComponent.name = 'Name';
    userComponent.title = 'Title';
    userComponent.picture = '/';
    fixture.detectChanges();

    expect(userElement.querySelector(INITIALS_SELECTOR)).toEqual(null);
  });

  it('should set color of initials if set color property is set', () => {
    const color = 'red';
    userComponent.color = color;
    fixture.detectChanges();

    const initialsStyle = (userElement.querySelector(INITIALS_SELECTOR) as HTMLElement).style;
    expect(initialsStyle.backgroundColor).toEqual(color);
  });

  describe('onlyPicture', () => {
    it(`should not show title and name if onlyPicture is set to true`, () => {
      userComponent.name = 'Name';
      userComponent.title = 'Title';
      userComponent.onlyPicture = true;
      fixture.detectChanges();

      expect(userElement.querySelector(NAME_SELECTOR)).toEqual(null);
      expect(userElement.querySelector(TITLE_SELECTOR)).toEqual(null);
    });

    it(`should set showName and showTitle to false if set to true`, () => {
      userComponent.showName = true;
      userComponent.showTitle = true;
      userComponent.onlyPicture = true;

      expect(userComponent.showName).toEqual(false);
      expect(userComponent.showTitle).toEqual(false);
      expect(userComponent.onlyPicture).toEqual(true);
    });

    it(`should be false if showName is set to true`, () => {
      userComponent.showName = true;
      expect(userComponent.onlyPicture).toEqual(false);
    });

    it(`should be false if showTitle is set to true`, () => {
      userComponent.showTitle = true;
      expect(userComponent.onlyPicture).toEqual(false);
    });

    it(`should be true if showName and showTitle is set to false`, () => {
      userComponent.showName = false;
      userComponent.showTitle = false;
      expect(userComponent.onlyPicture).toEqual(true);
    });
  });

  describe('getInitials', () => {
    it(`should return empty string if name isn't set`, () => {
      userComponent.name = '';
      expect(userComponent.getInitials()).toEqual('');
    });

    it(`should return one letter for one word name`, () => {
      userComponent.name = 'Name';
      expect(userComponent.getInitials()).toEqual('N');
    });

    it(`should return two letters for two word name`, () => {
      userComponent.name = 'Name Name';
      expect(userComponent.getInitials()).toEqual('NN');
    });

    it(`should return two letters for two first words letters if name set to more then two words`, () => {
      userComponent.name = 'Name Name Name';
      expect(userComponent.getInitials()).toEqual('NN');

      userComponent.name = 'Name Name Name Name Name Name Name Name Name';
      expect(userComponent.getInitials()).toEqual('NN');
    });
  });

  it('should show badge with initials', () => {
    userComponent.badgeText = 'badge text';
    fixture.detectChanges();

    const badges = userElement.querySelectorAll(BADGE_SELECTOR);
    expect(badges.length).toEqual(1);
  });

  it('should show badge with picture', () => {
    userComponent.badgeText = 'badge text';
    userComponent.picture = '/';
    fixture.detectChanges();

    const badges = userElement.querySelectorAll(BADGE_SELECTOR);
    expect(badges.length).toEqual(1);
  });

  it('should show badge with if showInitials is false', () => {
    userComponent.badgeText = 'badge text';
    userComponent.showInitials = false;
    fixture.detectChanges();

    const badges = userElement.querySelectorAll(BADGE_SELECTOR);
    expect(badges.length).toEqual(1);
  });

  it('should show picture if set', () => {
    userComponent.picture = '/';
    fixture.detectChanges();

    expect(userElement.querySelector(PICTURE_SELECTOR)).not.toEqual(null);
  });

  it('should not set picture if falsy value was passed', () => {
    userComponent.picture = '';
    expect(userComponent.imageBackgroundStyle).toEqual(null);
    userComponent.picture = null;
    expect(userComponent.imageBackgroundStyle).toEqual(null);
    userComponent.picture = undefined;
    expect(userComponent.imageBackgroundStyle).toEqual(null);
  });

  it('should set picture string as background image', () => {
    const pictureUrl = '/';
    userComponent.picture = pictureUrl;
    fixture.detectChanges();

    const pictureStyle = (userElement.querySelector(PICTURE_SELECTOR) as HTMLElement).style;
    expect(pictureStyle.backgroundImage).toEqual(`url("${pictureUrl}")`);
  });

  it('should be medium sized by default', () => {
    expect(userComponent.size).toEqual('medium');
  });

  it(`only one size property should be true`, () => {
    const currentSize: NbComponentSize = 'tiny';
    const otherSizes = COMPONENT_SIZES.filter(s => s !== currentSize);

    userComponent.size = currentSize;
    expect(userComponent[currentSize]).toEqual(true);
    for (const size of otherSizes) {
      expect(userComponent[size]).toEqual(false);
    }
  });

  it('should be round shaped by default', () => {
    expect(userComponent.shape).toEqual('round');
  });

  it(`only one shape property should be true`, () => {
    userComponent.shape = 'semi-round';
    expect(userComponent.semiRound).toEqual(true);
    expect(userComponent.rectangle).toEqual(false);
    expect(userComponent.round).toEqual(false);
  });
});
