/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { NbAclService, NB_SECURITY_OPTIONS_TOKEN } from '@nebular/security';
import { deepExtend } from '../../auth/helpers'; // TODO: common module?

let aclService: NbAclService;

function sharedAclTests(defaultSettings) {
  it(`should store different object`, () => {
    // @ts-ignore
    expect(defaultSettings.accessControl).not.toBe(aclService.state);
  });

  it(`forbidden for any role - permission - resource`, () => {
    expect(aclService.can('user', 'view', 'content')).toBe(false);
  });

  it(`can register a role`, () => {
    const modifiedRoles = deepExtend({}, defaultSettings.accessControl);
    modifiedRoles.guest = {
      parent: null,
    };

    aclService.register('guest', null, {});
    // @ts-ignore
    expect(aclService.state).toEqual(modifiedRoles);
  });

  it(`can register a role with default values`, () => {
    const modifiedRoles = deepExtend({}, defaultSettings.accessControl);
    modifiedRoles.guest = {
      parent: null,
    };

    aclService.register('guest');
    // @ts-ignore
    expect(aclService.state).toEqual(modifiedRoles);
  });

  it(`can register a role with custom values`, () => {
    const modifiedRoles = deepExtend({}, defaultSettings.accessControl);
    modifiedRoles.guest = {
      parent: null,
      view: ['users'],
    };

    aclService.register('guest', null, { view: ['users'] });
    // @ts-ignore
    expect(aclService.state).toEqual(modifiedRoles);
  });

  it(`will rewrite newly registered role`, () => {
    let modifiedRoles;

    modifiedRoles = deepExtend({}, defaultSettings.accessControl);
    modifiedRoles.guest = {
      parent: null,
      view: ['users'],
    };
    aclService.register('guest', null, { view: ['users'] });
    // @ts-ignore
    expect(aclService.state).toEqual(modifiedRoles);

    modifiedRoles = deepExtend({}, defaultSettings.accessControl);
    modifiedRoles.guest = {
      parent: null,
      edit: ['users'],
    };
    aclService.register('guest', null, { edit: ['users'] });
    // @ts-ignore
    expect(aclService.state).toEqual(modifiedRoles);
  });

  it(`can register multiple roles`, () => {
    let modifiedRoles;

    modifiedRoles = deepExtend({}, defaultSettings.accessControl);
    modifiedRoles.guest = {
      parent: null,
      view: ['users'],
    };

    aclService.register('guest', null, { view: ['users'] });
    // @ts-ignore
    expect(aclService.state).toEqual(modifiedRoles);

    modifiedRoles = deepExtend({}, defaultSettings.accessControl);
    modifiedRoles.guest = {
      parent: null,
      view: ['users'],
    };
    modifiedRoles.user = {
      parent: 'guest',
      edit: ['users'],
    };
    aclService.register('user', 'guest', { edit: ['users'] });
    // @ts-ignore
    expect(aclService.state).toEqual(modifiedRoles);
  });

  it(`cannot register a role with an empty name`, () => {
    expect(() => aclService.register('', null, { view: ['users'] })).toThrow(
      new Error('NbAclService: role name cannot be empty'),
    );
  });

  it(`cannot check bulk resource`, () => {
    expect(() => aclService.can('guest', 'edit', '*')).toThrow(
      new Error(`NbAclService: cannot use empty or bulk '*' resource placeholder with 'can' method`),
    );
  });

  it(`can handle permissions`, () => {
    aclService.register('guest', null, { view: ['users'] });
    expect(aclService.can('guest', 'view', 'users')).toBe(true);
    expect(aclService.can('guest', 'edit', 'users')).toBe(false);
    expect(aclService.can('user', 'view', 'users')).toBe(false);
  });

  it(`can handle permissions with multiple resorces`, () => {
    aclService.register('guest', null, { view: ['users', 'posts'] });
    expect(aclService.can('guest', 'view', 'users')).toBe(true);
    expect(aclService.can('guest', 'edit', 'users')).toBe(false);
    expect(aclService.can('user', 'view', 'users')).toBe(false);

    expect(aclService.can('guest', 'view', 'posts')).toBe(true);
    expect(aclService.can('guest', 'edit', 'posts')).toBe(false);
    expect(aclService.can('user', 'view', 'posts')).toBe(false);
  });

  it(`can inherit permissions - 2 levels`, () => {
    aclService.register('guest', null, { view: ['users'] });
    aclService.register('user', 'guest', { edit: ['users'] });

    expect(aclService.can('guest', 'view', 'users')).toBe(true);
    expect(aclService.can('guest', 'edit', 'users')).toBe(false);
    expect(aclService.can('user', 'view', 'users')).toBe(true);
    expect(aclService.can('user', 'edit', 'users')).toBe(true);

    expect(aclService.can('custom', 'view', 'users')).toBe(false);
    expect(aclService.can('custom', 'edit', 'users')).toBe(false);
  });

  it(`can inherit permissions - 3 levels`, () => {
    aclService.register('guest', null, { view: ['users'] });
    aclService.register('user', 'guest', { edit: ['users'] });
    aclService.register('admin', 'user', { remove: ['users'] });
    aclService.register('guest-who-can-delete', 'guest', { remove: ['users'] });

    expect(aclService.can('guest', 'view', 'users')).toBe(true);
    expect(aclService.can('guest', 'edit', 'users')).toBe(false);
    expect(aclService.can('guest', 'remove', 'users')).toBe(false);

    expect(aclService.can('user', 'view', 'users')).toBe(true);
    expect(aclService.can('user', 'edit', 'users')).toBe(true);
    expect(aclService.can('user', 'remove', 'users')).toBe(false);

    expect(aclService.can('admin', 'view', 'users')).toBe(true);
    expect(aclService.can('admin', 'edit', 'users')).toBe(true);
    expect(aclService.can('admin', 'remove', 'users')).toBe(true);

    expect(aclService.can('guest-who-can-delete', 'view', 'users')).toBe(true);
    expect(aclService.can('guest-who-can-delete', 'edit', 'users')).toBe(false);
    expect(aclService.can('guest-who-can-delete', 'remove', 'users')).toBe(true);

    expect(aclService.can('custom', 'view', 'users')).toBe(false);
    expect(aclService.can('custom', 'edit', 'users')).toBe(false);
    expect(aclService.can('custom', 'remove', 'users')).toBe(false);
  });

  it(`can inherit permissions - 3 levels, more resources`, () => {
    aclService.register('guest', null, { view: ['users', 'posts'] });
    aclService.register('user', 'guest', { view: ['dashboard'], edit: ['users', 'posts', 'dashboard'] });
    aclService.register('admin', 'user', { remove: ['users', 'posts'] });

    expect(aclService.can('guest', 'view', 'users')).toBe(true);
    expect(aclService.can('guest', 'edit', 'users')).toBe(false);
    expect(aclService.can('guest', 'remove', 'users')).toBe(false);

    expect(aclService.can('guest', 'view', 'posts')).toBe(true);
    expect(aclService.can('guest', 'edit', 'posts')).toBe(false);
    expect(aclService.can('guest', 'remove', 'posts')).toBe(false);

    expect(aclService.can('guest', 'view', 'dashboard')).toBe(false);
    expect(aclService.can('guest', 'edit', 'dashboard')).toBe(false);
    expect(aclService.can('guest', 'remove', 'dashboard')).toBe(false);

    expect(aclService.can('user', 'view', 'users')).toBe(true);
    expect(aclService.can('user', 'edit', 'users')).toBe(true);
    expect(aclService.can('user', 'remove', 'users')).toBe(false);

    expect(aclService.can('user', 'view', 'posts')).toBe(true);
    expect(aclService.can('user', 'edit', 'posts')).toBe(true);
    expect(aclService.can('user', 'remove', 'posts')).toBe(false);

    expect(aclService.can('user', 'view', 'dashboard')).toBe(true);
    expect(aclService.can('user', 'edit', 'dashboard')).toBe(true);
    expect(aclService.can('user', 'remove', 'dashboard')).toBe(false);

    expect(aclService.can('admin', 'view', 'users')).toBe(true);
    expect(aclService.can('admin', 'edit', 'users')).toBe(true);
    expect(aclService.can('admin', 'remove', 'users')).toBe(true);

    expect(aclService.can('admin', 'view', 'posts')).toBe(true);
    expect(aclService.can('admin', 'edit', 'posts')).toBe(true);
    expect(aclService.can('admin', 'remove', 'posts')).toBe(true);

    expect(aclService.can('admin', 'view', 'dashboard')).toBe(true);
    expect(aclService.can('admin', 'edit', 'dashboard')).toBe(true);
    expect(aclService.can('admin', 'remove', 'dashboard')).toBe(false);
  });

  it(`cannot allow empty role for 'allow' method`, () => {
    expect(() => aclService.allow('', null, 'users')).toThrow(new Error('NbAclService: role name cannot be empty'));
  });

  it(`should allow new role`, () => {
    aclService.allow('guest', 'view', 'users');

    expect(aclService.can('guest', 'view', 'users')).toBe(true);
    expect(aclService.can('guest', 'edit', 'users')).toBe(false);
  });

  it(`should allow new permissions on role`, () => {
    aclService.register('guest', null, { view: ['users'] });
    aclService.allow('guest', 'edit', 'users');

    expect(aclService.can('guest', 'view', 'users')).toBe(true);
    expect(aclService.can('guest', 'edit', 'users')).toBe(true);
  });

  it(`should allow new permissions on parent role`, () => {
    aclService.register('guest', null, { view: ['users'] });
    aclService.register('user', 'guest', { remove: ['users'] });

    expect(aclService.can('guest', 'view', 'users')).toBe(true);
    expect(aclService.can('guest', 'edit', 'users')).toBe(false);
    expect(aclService.can('guest', 'remove', 'users')).toBe(false);

    expect(aclService.can('user', 'view', 'users')).toBe(true);
    expect(aclService.can('user', 'edit', 'users')).toBe(false);
    expect(aclService.can('user', 'remove', 'users')).toBe(true);

    aclService.allow('guest', 'edit', 'users');

    expect(aclService.can('guest', 'view', 'users')).toBe(true);
    expect(aclService.can('guest', 'edit', 'users')).toBe(true);
    expect(aclService.can('guest', 'remove', 'users')).toBe(false);

    expect(aclService.can('user', 'view', 'users')).toBe(true);
    expect(aclService.can('user', 'edit', 'users')).toBe(true);
    expect(aclService.can('user', 'remove', 'users')).toBe(true);
  });

  it(`cannot be changed by reference through module options`, () => {
    const settings = {
      accessControl: {
        guest: {
          parent: null,
          count: ['users'],
        },
        super_user: {
          parent: 'admin',
          manage: ['all'],
        },
      },
    };

    aclService.setAccessControl(settings.accessControl);

    expect(aclService.can('admin', 'manage', 'all')).toBe(false);
    expect(aclService.can('admin', 'edit', 'users')).toBe(false);
    expect(aclService.can('super_user', 'view', 'users')).toBe(false);
    expect(aclService.can('super_user', 'edit', 'users')).toBe(false);

    // @ts-ignore
    settings.accessControl.admin = {
      parent: 'guest',
      manage: ['all'],
      view: ['users'],
    };

    // @ts-ignore
    settings.accessControl.admin = {
      parent: 'guest',
      manage: ['all'],
      edit: ['users'],
    };

    expect(aclService.can('admin', 'manage', 'all')).toBe(false);
    expect(aclService.can('admin', 'edit', 'users')).toBe(false);
    expect(aclService.can('super_user', 'view', 'users')).toBe(false);
    expect(aclService.can('super_user', 'edit', 'users')).toBe(false);
  });

  it(`cannot be changed by reference through allow`, () => {
    const resources = ['dashboard'];

    aclService.allow('super_user', 'view', resources);
    expect(aclService.can('super_user', 'view', 'dashboard')).toBe(true);

    resources.push('statistics');
    expect(aclService.can('super_user', 'view', 'statistics')).toBe(false);
  });

  it(`cannot be changed by reference through register`, () => {
    const abilities = { view: ['users'] };

    aclService.register('moderator', null, abilities);

    expect(aclService.can('moderator', 'view', 'users')).toBe(true);

    abilities.view = ['users', 'dashboard'];
    // @ts-ignore
    abilities.edit = ['users'];
    expect(aclService.can('moderator', 'view', 'users')).toBe(true);
    expect(aclService.can('moderator', 'view', 'dashboard')).toBe(false);
    expect(aclService.can('moderator', 'edit', 'users')).toBe(false);
  });

  it(`can accept roles as string`, () => {
    aclService.register('role', null, { view: 'all', edit: '*' });

    expect(aclService.can('role', 'view', 'all')).toBe(true);
    expect(aclService.can('role', 'edit', 'all')).toBe(true);
    expect(aclService.can('role', 'edit', 'any')).toBe(true);
    expect(aclService.can('role', 'delete', 'any')).toBe(false);
  });
}

describe('acl-service', () => {
  describe('with default settings', () => {
    beforeEach(() => {
      // Configure testbed to prepare services
      TestBed.configureTestingModule({
        providers: [{ provide: NB_SECURITY_OPTIONS_TOKEN, useValue: {} }, NbAclService],
      });
    });

    // Single async inject to save references; which are used in all tests below
    beforeEach(waitForAsync(
      inject([NbAclService], (_aclService) => {
        aclService = _aclService;
      }),
    ));

    it(`has empty default state`, () => {
      // @ts-ignore
      expect(aclService.state).toEqual({});
    });

    sharedAclTests({ accessControl: {} });
  });

  describe('with some roles settings', () => {
    const defaultSettings = {
      accessControl: {
        guest: {
          parent: null,
          count: ['users'],
        },
        super_user: {
          parent: 'admin',
          manage: ['all'],
        },
      },
    };

    beforeEach(() => {
      // Configure testbed to prepare services
      TestBed.configureTestingModule({
        providers: [
          { provide: NB_SECURITY_OPTIONS_TOKEN, useValue: defaultSettings }, // useValue will clone
          NbAclService,
        ],
      });
    });

    // Single async inject to save references; which are used in all tests below
    beforeEach(waitForAsync(
      inject([NbAclService], (_aclService) => {
        aclService = _aclService;
      }),
    ));

    it(`has predefined default state`, () => {
      // @ts-ignore
      expect(aclService.state).toEqual(defaultSettings.accessControl);
    });

    sharedAclTests(defaultSettings);

    it(`has predefined rules`, () => {
      expect(aclService.can('super_user', 'manage', 'all')).toBe(true);
      expect(aclService.can('admin', 'manage', 'all')).toBe(false);
      expect(aclService.can('super_user', 'view', 'users')).toBe(false);
    });
  });

  describe('with some roles settings (not cloned)', () => {
    const defaultSettings = {
      accessControl: {
        guest: {
          parent: null,
          count: ['users'],
        },
        super_user: {
          parent: 'admin',
          manage: ['all'],
        },
      },
    };

    beforeEach(() => {
      // Configure testbed to prepare services
      TestBed.configureTestingModule({
        providers: [{ provide: NB_SECURITY_OPTIONS_TOKEN, useFactory: () => defaultSettings }, NbAclService],
      });
    });

    // Single async inject to save references; which are used in all tests below
    beforeEach(waitForAsync(
      inject([NbAclService], (_aclService) => {
        aclService = _aclService;
      }),
    ));

    it(`has predefined default state`, () => {
      // @ts-ignore
      expect(aclService.state).toEqual(defaultSettings.accessControl);
    });

    sharedAclTests(defaultSettings);

    it(`has predefined rules`, () => {
      expect(aclService.can('super_user', 'manage', 'all')).toBe(true);
      expect(aclService.can('admin', 'manage', 'all')).toBe(false);
      expect(aclService.can('super_user', 'view', 'users')).toBe(false);
    });
  });

  describe('with bulk resources', () => {
    const defaultSettings = {
      accessControl: {
        guest: {
          parent: null,
          count: ['users'],
        },
        moderator: {
          parent: 'guest',
          view: ['*'],
          count: ['*'],
        },
        super_user: {
          parent: 'admin',
          manage: ['all'],
        },
      },
    };

    beforeEach(() => {
      // Configure testbed to prepare services
      TestBed.configureTestingModule({
        providers: [
          { provide: NB_SECURITY_OPTIONS_TOKEN, useFactory: () => defaultSettings }, // will provide a reference
          NbAclService,
        ],
      });
    });

    // Single async inject to save references; which are used in all tests below
    beforeEach(waitForAsync(
      inject([NbAclService], (_aclService) => {
        aclService = _aclService;
      }),
    ));

    it(`has predefined default state`, () => {
      // @ts-ignore
      expect(aclService.state).toEqual(defaultSettings.accessControl);
    });

    sharedAclTests(defaultSettings);

    it(`can access anything with '*'`, () => {
      expect(aclService.can('moderator', 'view', 'all')).toBe(true);
      expect(aclService.can('moderator', 'view', 'users')).toBe(true);
      expect(aclService.can('moderator', 'view', 'dashboard')).toBe(true);
      expect(aclService.can('moderator', 'count', 'all')).toBe(true);
      expect(aclService.can('moderator', 'count', 'any')).toBe(true);
      expect(aclService.can('moderator', 'count', 'some')).toBe(true);

      expect(aclService.can('moderator', 'delete', 'all')).toBe(false);
    });
  });
});
