/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Inject, Injectable, Optional } from '@angular/core';
import { NB_SECURITY_OPTIONS_TOKEN, NbAclRules, NbAclOptions, NbAclRole, NbAclState } from '../security.options';

/**
 * Common acl service.
 */
@Injectable()
export class NbAclService {

  private state: NbAclState = {};

  constructor(@Optional() @Inject(NB_SECURITY_OPTIONS_TOKEN) protected settings: NbAclOptions = {}) {

    if (settings.accessControl) {
      this.setState(settings.accessControl);
    }
  }

  /**
   * Set/Reset ACL service state
   * @param {NbAclState} state
   */
  setState(state: NbAclState) {
    for (const role of Object.keys(state)) {
      this.register(role, state[role]['parent'], state[role]['can']);
    }
  }

  /**
   * Register a new role with a list of abilities (permission/resources combinations)
   * @param {string} role
   * @param {string} parent
   * @param {NbAclRules} abilities
   */
  register(role: string, parent: string = null, abilities: NbAclRules = {}) {

    this.checkRole(role);

    this.state[role] = {
      parent: parent,
      can: {},
    };

    for (const permission of Object.keys(abilities)) {
      this.allow(role, permission, Object.assign([], abilities[permission]));
    }
  }

  /**
   * Allow a permission for specific resources to a role
   * @param {string} role
   * @param {string} permission
   * @param {string | string[]} resource
   */
  allow(role: string, permission: string, resource: string|string[]) {

    this.checkRole(role);

    if (!this.getRole(role)) {
      this.register(role, null, {});
    }

    resource = typeof resource === 'string' ? [resource] : resource;

    let resources = Object.assign([], this.getRoleResources(role, permission));
    resources = resources.concat(resource);

    this.state[role]['can'][permission] = resources
      .filter((item, pos) => resources.indexOf(item) === pos);
  }

  /**
   * Check whether the role has a permission to a resource
   * @param {string} role
   * @param {string} permission
   * @param {string} resource
   * @returns {boolean}
   */
  can(role: string, permission: string, resource: string) {
    const parentRole = this.getRoleParent(role);
    let parentCan = false;
    if (parentRole) {
      parentCan = this.can(this.getRoleParent(role), permission, resource);
    }
    return parentCan ? parentCan : this.exactCan(role, permission, resource);
  }

  private getRole(role: string): NbAclRole {
    return this.state[role];
  }

  private checkRole(role: string) {
    if (!role) {
      throw new Error('NbAclService: role name cannot be empty');
    }
  }

  private exactCan(role: string, permission: string, resource: string) {
    const resources = this.getRoleResources(role, permission);
    return resources.includes(resource);
  }

  private getRoleResources(role: string, permission: string): string[] {
    return this.getRoleAbilities(role)[permission] || [];
  }

  private getRoleAbilities(role: string): NbAclRules {
    return this.state[role] ? this.state[role]['can'] : {};
  }

  private getRoleParent(role: string): string {
    return this.state[role] ? this.state[role]['parent'] : null;
  }
}
