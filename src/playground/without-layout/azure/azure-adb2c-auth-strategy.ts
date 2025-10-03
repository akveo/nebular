import { Injectable } from '@angular/core';
import { map, of, switchMap, catchError } from 'rxjs';

import {
  NbOAuth2AuthStrategy,
  NbOAuth2ResponseType,
  NbAuthOAuth2JWTToken,
  NbOAuth2AuthStrategyOptions,
  NbAuthStrategyClass,
  NbAuthResult,
  NbAuthIllegalTokenError,
} from '@nebular/auth';


// Create new token for Azure auth so it returns id_token instead of access_token
export class AuthAzureToken extends NbAuthOAuth2JWTToken {

  // let's rename it to exclude name clashes
  static NAME = 'nb:auth:azure:token';

  getValue(): string {
    return this.token.id_token;
  }
}

@Injectable()
export class AzureADB2CAuthStrategy extends NbOAuth2AuthStrategy {

  // we need this method for strategy setup
  static setup(options: NbOAuth2AuthStrategyOptions): [NbAuthStrategyClass, NbOAuth2AuthStrategyOptions] {
    return [AzureADB2CAuthStrategy, options];
  }

  protected redirectResultHandlers = {
    [NbOAuth2ResponseType.CODE]: () => {
      return of(this.route.snapshot.queryParams).pipe(
        switchMap((params: any) => {
          if (params.code) {
            return this.requestToken(params.code);
          }

          return of(
            new NbAuthResult(
              false,
              params,
              this.getOption('redirect.failure'),
              this.getOption('defaultErrors'),
              [],
            ));
        }),
      );
    },
    id_token: () => {
      const module = 'authorize';
      const requireValidToken = this.getOption(`${module}.requireValidToken`);
      return of(this.route.snapshot.fragment).pipe(
        map(fragment => this.parseHashAsQueryParams(fragment)),
        map((params: any) => {
          if (!params.error) {
            return new NbAuthResult(
              true,
              params,
              this.getOption('redirect.success'),
              [],
              this.getOption('defaultMessages'),
              this.createToken(params, requireValidToken));
          }
          return new NbAuthResult(
            false,
            params,
            this.getOption('redirect.failure'),
            this.getOption('defaultErrors'),
            [],
          );
        }),
        catchError(err => {
          const errors = [];
          if (err instanceof NbAuthIllegalTokenError) {
            errors.push(err.message);
          } else {
            errors.push('Something went wrong.');
          }
          return of(
            new NbAuthResult(
              false,
              err,
              this.getOption('redirect.failure'),
              errors,
            ));
        }),
      );
    },
  };


  protected redirectResults: any = {
    [NbOAuth2ResponseType.CODE]: () => of(null),

    id_token: () => {
      return of(this.route.snapshot.fragment).pipe(
        map(fragment => this.parseHashAsQueryParams(fragment)),
        map((params: any) => !!(params && (params.id_token || params.error))),
      );
    },
  };
}
